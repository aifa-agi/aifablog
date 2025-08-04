"use client";

import React, { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Database } from "lucide-react";
import { cn } from "@/lib/utils";

export function VectorStoreActionsDropdown({ linkId }: { linkId: string }) {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
    console.log("VectorStore CONNECTED", linkId);
  };
  const handleDisconnect = () => {
    setConnected(false);
    console.log("VectorStore DISCONNECTED", linkId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          tabIndex={-1}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded transition hover:bg-accent/60",
            connected ? "text-green-500" : "text-gray-400"
          )}
        >
          <Database className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[190px]">
        <DropdownMenuItem onClick={handleConnect}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                connected ? "bg-green-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Connect
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisconnect}>
          <span className="flex items-center">
            <span
              className={cn(
                "inline-block mr-3 align-middle rounded-full border border-black/30",
                !connected ? "bg-green-500" : "bg-muted-foreground"
              )}
              style={{ width: 12, height: 12, minWidth: 12, minHeight: 12 }}
            />
            Disconnect
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
