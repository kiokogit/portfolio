import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background">
      <Helmet>
        <title>Page Not Found | Vincent Kioko</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist." />
      </Helmet>
      
      <div className="flex flex-col items-center text-center">
        <AlertTriangle className="h-24 w-24 text-primary mb-6" />
        
        <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
        <p className="mt-4 text-muted-foreground max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild className="mt-8">
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
