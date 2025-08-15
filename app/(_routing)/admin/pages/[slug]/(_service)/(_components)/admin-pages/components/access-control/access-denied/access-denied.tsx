
// @/app/(_service)/components/access-control/access-denied/access-denied.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/(_service)/components/ui/button";
import { Shield, Home } from "lucide-react";


export interface AccessDeniedProps {
  currentRole: string;
  requiredRole?: string;
  redirectPath?: string;
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}


export function AccessDenied({
  currentRole,
  requiredRole = "Admin",
  redirectPath = "/",
  title = "Access Denied",
  description = "You don't have permission to access this admin page",
  showHomeButton = true
}: AccessDeniedProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <div className="flex bg-background items-center justify-center py-12">
      <div className="text-center">
        <Shield className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          Required role:{" "}
          <span className="font-mono bg-muted px-2 py-1 rounded">{requiredRole}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Your role:{" "}
          <span className="font-mono bg-muted px-2 py-1 rounded">{currentRole}</span>
        </p>

        {showHomeButton && (
          <Button
            onClick={handleRedirect}
            variant="outline"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Go to Home Page
          </Button>
        )}
      </div>
    </div>
  );
}
