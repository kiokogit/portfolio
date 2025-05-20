import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertPersonalInfoSchema, PersonalInfo as PersonalInfoType } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Save, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Extend the schema with validation rules
const personalInfoSchema = insertPersonalInfoSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
}).omit({ userId: true });

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export default function PersonalInfo() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch personal info
  const {
    data: personalInfo,
    isLoading,
    error,
  } = useQuery<PersonalInfoType | null>({
    queryKey: ["/api/private/personal-info"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/private/personal-info");
      if (!res.ok && res.status !== 404) {
        throw new Error("Failed to fetch personal information");
      }
      const data = await res.json();
      return data;
    },
  });

  // Save personal info mutation
  const savePersonalInfoMutation = useMutation({
    mutationFn: async (data: PersonalInfoFormData) => {
      const res = await apiRequest("POST", "/api/private/personal-info", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/private/personal-info"] });
      setIsEditing(false);
      toast({
        title: "Personal information saved",
        description: "Your personal information has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save",
        description: error.message || "There was an error saving your personal information",
        variant: "destructive",
      });
    },
  });

  // Setup form
  const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      residence: "",
      spouse: "",
      bio: "",
      ambitions: "",
    },
  });

  // Reset form when data changes
  useEffect(() => {
    if (personalInfo) {
      reset({
        fullName: personalInfo.fullName,
        birthDate: personalInfo.birthDate || "",
        residence: personalInfo.residence || "",
        spouse: personalInfo.spouse || "",
        bio: personalInfo.bio || "",
        ambitions: personalInfo.ambitions || "",
      });
    } else if (!isLoading) {
      // Initialize with empty values if no data exists
      reset({
        fullName: user?.username || "",
        birthDate: "1994-10-15", // Vincent's birthday as default
        residence: "Marurui, Nairobi",
        spouse: "Joan Mutanu",
        bio: "",
        ambitions: "",
      });
    }
  }, [personalInfo, isLoading, reset, user]);

  const onSubmit = (data: PersonalInfoFormData) => {
    savePersonalInfoMutation.mutate(data);
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
        <p className="text-red-500">Error loading personal information. Please try again.</p>
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
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your private information visible only to you
              </CardDescription>
            </div>
            {!isEditing && (
              <Button 
                onClick={() => setIsEditing(true)}
                variant="outline"
              >
                Edit
              </Button>
            )}
          </div>
        </CardHeader>
        
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register("fullName")}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  placeholder="e.g. October 15, 1994"
                  {...register("birthDate")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="residence">Residence</Label>
                <Input
                  id="residence"
                  placeholder="e.g. Marurui, Nairobi"
                  {...register("residence")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spouse">Spouse</Label>
                <Input
                  id="spouse"
                  placeholder="e.g. Joan Mutanu"
                  {...register("spouse")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Your personal biography"
                  rows={5}
                  {...register("bio")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ambitions">Personal Ambitions</Label>
                <Textarea
                  id="ambitions"
                  placeholder="Your private goals and ambitions"
                  rows={5}
                  {...register("ambitions")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                disabled={savePersonalInfoMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={!isDirty || savePersonalInfoMutation.isPending}
              >
                {savePersonalInfoMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-dark/60 dark:text-light/60">Full Name</h3>
              <p className="mt-1 text-lg">{personalInfo?.fullName || "Not set"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-dark/60 dark:text-light/60">Birth Date</h3>
              <p className="mt-1">{personalInfo?.birthDate || "Not set"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-dark/60 dark:text-light/60">Residence</h3>
              <p className="mt-1">{personalInfo?.residence || "Not set"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-dark/60 dark:text-light/60">Spouse</h3>
              <p className="mt-1">{personalInfo?.spouse || "Not set"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-dark/60 dark:text-light/60">Bio</h3>
              <p className="mt-1 whitespace-pre-line">{personalInfo?.bio || "Not set"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-dark/60 dark:text-light/60">Personal Ambitions</h3>
              <p className="mt-1 whitespace-pre-line">{personalInfo?.ambitions || "Not set"}</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}