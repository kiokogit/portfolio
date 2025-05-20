import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertJournalEntrySchema, JournalEntry } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Edit, Save, Trash2, Book, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

// Form schema
const journalEntrySchema = insertJournalEntrySchema.extend({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
}).omit({ userId: true });

type JournalEntryFormData = z.infer<typeof journalEntrySchema>;

export default function Journal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);

  // Fetch journal entries
  const {
    data: journalEntries,
    isLoading,
    error,
  } = useQuery<JournalEntry[]>({
    queryKey: ["/api/private/journal"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/private/journal");
      if (!res.ok) {
        throw new Error("Failed to fetch journal entries");
      }
      return await res.json();
    },
  });

  // Create journal entry mutation
  const createJournalMutation = useMutation({
    mutationFn: async (data: JournalEntryFormData) => {
      const res = await apiRequest("POST", "/api/private/journal", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/private/journal"] });
      setIsCreating(false);
      toast({
        title: "Journal entry created",
        description: "Your journal entry has been saved successfully",
      });
      reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save",
        description: error.message || "There was an error saving your journal entry",
        variant: "destructive",
      });
    },
  });

  // Update journal entry mutation
  const updateJournalMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: JournalEntryFormData }) => {
      const res = await apiRequest("PUT", `/api/private/journal/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/private/journal"] });
      setEditingEntryId(null);
      toast({
        title: "Journal entry updated",
        description: "Your journal entry has been updated successfully",
      });
      reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update",
        description: error.message || "There was an error updating your journal entry",
        variant: "destructive",
      });
    },
  });

  // Delete journal entry mutation
  const deleteJournalMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/private/journal/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/private/journal"] });
      toast({
        title: "Journal entry deleted",
        description: "Your journal entry has been deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete",
        description: error.message || "There was an error deleting your journal entry",
        variant: "destructive",
      });
    },
  });

  // Setup form
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JournalEntryFormData>({
    resolver: zodResolver(journalEntrySchema),
    defaultValues: {
      title: "",
      content: "",
      mood: "",
      tags: [],
      isPrivate: true,
    },
  });

  const onSubmit = (data: JournalEntryFormData) => {
    if (editingEntryId !== null) {
      updateJournalMutation.mutate({ id: editingEntryId, data });
    } else {
      createJournalMutation.mutate(data);
    }
  };

  const startEditing = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    reset({
      title: entry.title,
      content: entry.content,
      mood: entry.mood || "",
      tags: entry.tags || [],
      isPrivate: entry.isPrivate,
    });
  };

  const cancelEditing = () => {
    setEditingEntryId(null);
    setIsCreating(false);
    reset();
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), "PPP");
  };

  const formatTime = (date: Date) => {
    return format(new Date(date), "p");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading journal entries. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center">
                <Book className="mr-2 h-5 w-5" />
                Personal Journal
              </CardTitle>
              <CardDescription>
                Record your private thoughts, reflections and experiences
              </CardDescription>
            </div>
            {!isCreating && editingEntryId === null && (
              <Button 
                onClick={() => setIsCreating(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            )}
          </div>
        </CardHeader>
        
        {(isCreating || editingEntryId !== null) ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your entry a title"
                  {...register("title")}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mood">Mood (Optional)</Label>
                <Input
                  id="mood"
                  placeholder="How are you feeling?"
                  {...register("mood")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Journal Entry</Label>
                <Textarea
                  id="content"
                  placeholder="Write your thoughts, reflections, and experiences..."
                  rows={10}
                  {...register("content")}
                  className={errors.content ? "border-red-500" : ""}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={cancelEditing}
                disabled={createJournalMutation.isPending || updateJournalMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createJournalMutation.isPending || updateJournalMutation.isPending}
              >
                {createJournalMutation.isPending || updateJournalMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    {editingEntryId !== null ? "Update Entry" : "Save Entry"}
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent>
            {journalEntries && journalEntries.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {journalEntries.map((entry) => (
                  <AccordionItem key={entry.id} value={entry.id.toString()}>
                    <AccordionTrigger className="px-4 py-3 hover:bg-light-darker/5 dark:hover:bg-dark-lighter/10">
                      <div className="flex flex-col items-start text-left">
                        <h3 className="text-lg font-medium">{entry.title}</h3>
                        <div className="flex items-center mt-1 text-sm text-dark/60 dark:text-light/60">
                          <Calendar className="h-3 w-3 mr-1" /> {formatDate(entry.createdAt)}
                          <Clock className="h-3 w-3 ml-3 mr-1" /> {formatTime(entry.createdAt)}
                          {entry.mood && <span className="ml-3">Mood: {entry.mood}</span>}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <div className="border-l-2 border-primary/20 pl-4 py-2 whitespace-pre-line">
                        {entry.content}
                      </div>
                      
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startEditing(entry)}
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your journal entry.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteJournalMutation.mutate(entry.id)}>
                                {deleteJournalMutation.isPending ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <Book className="h-12 w-12 text-dark/20 dark:text-light/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Journal Entries Yet</h3>
                <p className="text-dark/60 dark:text-light/60 mb-4">
                  Start documenting your thoughts, experiences, and reflections.
                </p>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Entry
                </Button>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}