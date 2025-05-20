import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, Book, Home } from "lucide-react";
import { Link } from "wouter";
import PersonalInfo from "@/sections/private/PersonalInfo";
import Journal from "@/sections/private/Journal";

export default function PrivateHome() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Helmet>
        <title>Vincent's Private Portfolio</title>
        <meta name="description" content="Personal and private information for Vincent Kioko" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <header className="bg-white dark:bg-dark-lighter shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-primary hover:text-primary-dark transition-colors">
              <Home className="h-6 w-6" />
            </Link>
            <h1 className="text-xl font-bold">Vincent's Private Portfolio</h1>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-dark/70 dark:text-light/70 mr-2">
              Welcome, {user?.username}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="personal" className="text-base">
              <UserIcon className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="journal" className="text-base">
              <Book className="h-4 w-4 mr-2" />
              Journal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfo />
          </TabsContent>

          <TabsContent value="journal">
            <Journal />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-lighter py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-dark/60 dark:text-light/60">
          <p>This is a private section of Vincent Kioko's portfolio. Not for public viewing.</p>
        </div>
      </footer>
    </div>
  );
}