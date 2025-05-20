import { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/use-auth";
import { Redirect, Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LockIcon, KeyIcon } from "lucide-react";

// Extend the schema with validation rules
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const accessCodeSchema = z.object({
  accessCode: z.string().min(1, "Access code is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;
type AccessCodeFormData = z.infer<typeof accessCodeSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation, accessMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("access");

  // If user is already logged in, redirect to the private portfolio
  if (user) {
    return <Redirect to="/private" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-dark">
      <Helmet>
        <title>Private Portfolio Access | Vincent Kioko</title>
        <meta name="description" content="Access Vincent Kioko's private portfolio section - for personal connections only." />
      </Helmet>

      {/* Left column - Auth form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Private Portfolio</h1>
            <p className="text-dark/60 dark:text-light/60">
              This section is for Vincent's personal connections only
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="access" className="text-base">Access Code</TabsTrigger>
              <TabsTrigger value="login" className="text-base">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-base">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="access">
              <AccessCodeForm isLoading={accessMutation.isPending} onSubmit={(data) => accessMutation.mutate(data)} />
            </TabsContent>

            <TabsContent value="login">
              <LoginForm isLoading={loginMutation.isPending} onSubmit={(data) => loginMutation.mutate(data)} />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm isLoading={registerMutation.isPending} onSubmit={(data) => {
                // Remove confirmPassword as it's not in the server schema
                const { confirmPassword, ...registerData } = data;
                registerMutation.mutate(registerData);
              }} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right column - Hero section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/90 to-primary-dark items-center justify-center p-8">
        <div className="max-w-md text-white">
          <div className="mb-8">
            <KeyIcon size={48} className="mb-4" />
            <h1 className="text-4xl font-bold mb-4">Personal Portfolio</h1>
            <p className="text-xl mb-6">
              This private section contains personal information, journal entries, and content only accessible to friends and family.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Bio data and personal history</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Journal and personal reflections</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Private ambitions and goals</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                <span>Content for close friends and family</span>
              </li>
            </ul>
          </div>
          <div className="text-sm opacity-80">
            <p>To access this section, you need a personal access code from Vincent.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccessCodeForm({ onSubmit, isLoading }: { onSubmit: (data: AccessCodeFormData) => void; isLoading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<AccessCodeFormData>({
    resolver: zodResolver(accessCodeSchema),
    defaultValues: {
      accessCode: '',
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Access Code</CardTitle>
        <CardDescription>
          Enter the access code provided by Vincent to view private content
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code</Label>
            <Input
              id="accessCode"
              placeholder="Enter your access code"
              {...register("accessCode")}
              className={errors.accessCode ? "border-red-500" : ""}
            />
            {errors.accessCode && (
              <p className="text-red-500 text-sm">{errors.accessCode.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Access Private Portfolio"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function LoginForm({ onSubmit, isLoading }: { onSubmit: (data: LoginFormData) => void; isLoading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function RegisterForm({ onSubmit, isLoading }: { onSubmit: (data: RegisterFormData) => void; isLoading: boolean }) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      accessCode: '',
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register New Account</CardTitle>
        <CardDescription>
          Create a new account to access the private portfolio
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose a username"
              {...register("username")}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Choose a secure password"
              {...register("password")}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="accessCode">Access Code (Optional)</Label>
            <Input
              id="accessCode"
              placeholder="Enter access code if you have one"
              {...register("accessCode")}
              className={errors.accessCode ? "border-red-500" : ""}
            />
            {errors.accessCode && (
              <p className="text-red-500 text-sm">{errors.accessCode.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}