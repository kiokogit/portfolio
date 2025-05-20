import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User } from "@shared/schema";
import createMemoryStore from "memorystore";

// Create a memory store for sessions
const MemoryStore = createMemoryStore(session);

declare global {
  namespace Express {
    interface User extends User {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Generate a random access code (6 characters)
export function generateAccessCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export function setupAuth(app: Express) {
  const sessionStore = new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  });

  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "vincent-portfolio-secret-key",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Username + password strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // User serialization/deserialization for session
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Register endpoint
  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if user exists
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Generate access code if not provided
      const accessCode = req.body.accessCode || generateAccessCode();

      // Create user with hashed password
      const user = await storage.createUser({
        username: req.body.username,
        password: await hashPassword(req.body.password),
        accessCode
      });

      // Auto login after registration
      req.login(user, (err) => {
        if (err) return next(err);
        // Don't send password in response
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      });
    } catch (err) {
      next(err);
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        // Don't send password in response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Access code login (no username/password needed)
  app.post("/api/access", async (req, res, next) => {
    try {
      const { accessCode } = req.body;
      if (!accessCode) {
        return res.status(400).json({ message: "Access code is required" });
      }

      const user = await storage.getUserByAccessCode(accessCode);
      if (!user) {
        return res.status(401).json({ message: "Invalid access code" });
      }

      req.login(user, (err) => {
        if (err) return next(err);
        // Don't send password in response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    } catch (err) {
      next(err);
    }
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  // Get current user endpoint
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Don't send password in response
    const { password, ...userWithoutPassword } = req.user as User;
    res.json(userWithoutPassword);
  });

  // Middleware to check if user is authenticated
  app.use("/api/private", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  });

  // Personal info endpoints
  app.get("/api/private/personal-info", async (req, res, next) => {
    try {
      const user = req.user as User;
      const personalInfo = await storage.getPersonalInfo(user.id);
      res.json(personalInfo || null);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/private/personal-info", async (req, res, next) => {
    try {
      const user = req.user as User;
      // Check if personal info already exists
      const existing = await storage.getPersonalInfo(user.id);
      
      if (existing) {
        // Update existing
        const updated = await storage.updatePersonalInfo(existing.id, {
          ...req.body,
          userId: user.id
        });
        res.json(updated);
      } else {
        // Create new
        const personalInfo = await storage.createPersonalInfo({
          ...req.body,
          userId: user.id
        });
        res.json(personalInfo);
      }
    } catch (err) {
      next(err);
    }
  });

  // Journal endpoints
  app.get("/api/private/journal", async (req, res, next) => {
    try {
      const user = req.user as User;
      const entries = await storage.getJournalEntries(user.id);
      res.json(entries);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/private/journal/:id", async (req, res, next) => {
    try {
      const entryId = parseInt(req.params.id);
      const entry = await storage.getJournalEntry(entryId);
      
      if (!entry) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      
      // Check if entry belongs to user
      const user = req.user as User;
      if (entry.userId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(entry);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/private/journal", async (req, res, next) => {
    try {
      const user = req.user as User;
      const entry = await storage.createJournalEntry({
        ...req.body,
        userId: user.id
      });
      res.status(201).json(entry);
    } catch (err) {
      next(err);
    }
  });

  app.put("/api/private/journal/:id", async (req, res, next) => {
    try {
      const entryId = parseInt(req.params.id);
      const entry = await storage.getJournalEntry(entryId);
      
      if (!entry) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      
      // Check if entry belongs to user
      const user = req.user as User;
      if (entry.userId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updated = await storage.updateJournalEntry(entryId, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  });

  app.delete("/api/private/journal/:id", async (req, res, next) => {
    try {
      const entryId = parseInt(req.params.id);
      const entry = await storage.getJournalEntry(entryId);
      
      if (!entry) {
        return res.status(404).json({ message: "Journal entry not found" });
      }
      
      // Check if entry belongs to user
      const user = req.user as User;
      if (entry.userId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteJournalEntry(entryId);
      res.json({ message: "Journal entry deleted successfully" });
    } catch (err) {
      next(err);
    }
  });
}