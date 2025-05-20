import { 
  users, 
  type User, 
  type InsertUser,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage,
  personalInfo,
  type PersonalInfo,
  type InsertPersonalInfo,
  journalEntries,
  type JournalEntry,
  type InsertJournalEntry
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByAccessCode(accessCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  
  // Personal info operations
  getPersonalInfo(userId: number): Promise<PersonalInfo | undefined>;
  createPersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo>;
  updatePersonalInfo(id: number, info: Partial<PersonalInfo>): Promise<PersonalInfo | undefined>;
  
  // Journal entry operations
  getJournalEntries(userId: number): Promise<JournalEntry[]>;
  getJournalEntry(id: number): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: number, entry: Partial<JournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private personalInfos: Map<number, PersonalInfo>;
  private journalEntries: Map<number, JournalEntry>;
  private userCurrentId: number;
  private messageCurrentId: number;
  private personalInfoCurrentId: number;
  private journalEntryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.personalInfos = new Map();
    this.journalEntries = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    this.personalInfoCurrentId = 1;
    this.journalEntryCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByAccessCode(accessCode: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.accessCode === accessCode && user.isActive,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      isActive: true, 
      createdAt: now 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.messageCurrentId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }
  
  // Personal info methods
  async getPersonalInfo(userId: number): Promise<PersonalInfo | undefined> {
    return Array.from(this.personalInfos.values()).find(
      (info) => info.userId === userId
    );
  }
  
  async createPersonalInfo(info: InsertPersonalInfo): Promise<PersonalInfo> {
    const id = this.personalInfoCurrentId++;
    const createdAt = new Date();
    const personalInfo: PersonalInfo = { 
      ...info, 
      id, 
      createdAt,
      updatedAt: createdAt
    };
    this.personalInfos.set(id, personalInfo);
    return personalInfo;
  }
  
  async updatePersonalInfo(id: number, infoUpdate: Partial<PersonalInfo>): Promise<PersonalInfo | undefined> {
    const info = this.personalInfos.get(id);
    if (!info) return undefined;
    
    const updatedInfo = { 
      ...info, 
      ...infoUpdate,
      updatedAt: new Date()
    };
    this.personalInfos.set(id, updatedInfo);
    return updatedInfo;
  }
  
  // Journal entry methods
  async getJournalEntries(userId: number): Promise<JournalEntry[]> {
    return Array.from(this.journalEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }
  
  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.journalEntryCurrentId++;
    const createdAt = new Date();
    const journalEntry: JournalEntry = { 
      ...entry, 
      id, 
      createdAt,
      updatedAt: createdAt
    };
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }
  
  async updateJournalEntry(id: number, entryUpdate: Partial<JournalEntry>): Promise<JournalEntry | undefined> {
    const entry = this.journalEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry = { 
      ...entry, 
      ...entryUpdate,
      updatedAt: new Date()
    };
    this.journalEntries.set(id, updatedEntry);
    return updatedEntry;
  }
  
  async deleteJournalEntry(id: number): Promise<boolean> {
    return this.journalEntries.delete(id);
  }
}

// Export an instance of the storage
export const storage = new MemStorage();
