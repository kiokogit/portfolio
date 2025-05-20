import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // Submit contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const parseResult = insertContactMessageSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        const errorMessage = fromZodError(parseResult.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(parseResult.data);
      
      // Return success response
      return res.status(201).json({ 
        message: "Contact message saved successfully", 
        id: contactMessage.id 
      });
    } catch (error) {
      console.error("Error saving contact message:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all contact messages
  app.get('/api/contact', async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      return res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get a specific contact message
  app.get('/api/contact/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const message = await storage.getContactMessage(id);
      
      if (!message) {
        return res.status(404).json({ message: "Contact message not found" });
      }
      
      return res.status(200).json(message);
    } catch (error) {
      console.error("Error fetching contact message:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
