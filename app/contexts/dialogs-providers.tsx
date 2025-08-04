// @/app/contexts/dialogs-provider.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DialogType = "create" | "edit" | "delete";

type DialogState =
  | {
      open: true;
      type: DialogType;
      title: string;
      description?: string;
      value?: string;
      onConfirm?: (value?: string) => void;
      onCancel?: () => void;
      confirmLabel?: string;
      cancelLabel?: string;
      confirmLoading?: boolean;
    }
  | { open: false };

interface DialogsContextValue {
  show: (
    options: {
      type: DialogType;
      title: string;
      description?: string;
      value?: string;
      onConfirm?: (value?: string) => void;
      onCancel?: () => void;
      confirmLabel?: string;
      cancelLabel?: string;
      confirmLoading?: boolean;
    }
  ) => void;
  close: () => void;
  state: DialogState;
}

const DialogsContext = createContext<DialogsContextValue | undefined>(undefined);

export function useDialogs() {
  const context = useContext(DialogsContext);
  if (!context) throw new Error("useDialogs must be used within DialogsProvider");
  return context;
}

export function DialogsProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>({ open: false });
  const [input, setInput] = useState("");

  useEffect(() => {
    if (dialog.open) setInput(dialog.value ?? "");
    else setInput("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialog.open, dialog.open ? dialog.value : undefined]);

  const show: DialogsContextValue["show"] = (options) => {
    setDialog({ open: true, ...options });
    setInput(options.value ?? "");
  };

  const close = () => setDialog({ open: false });

  const handleConfirm = () => {
    if (dialog.open && dialog.onConfirm) {
      const valueToSend = dialog.type === "delete" ? undefined : input.trim();
      dialog.onConfirm(valueToSend);
    }
    close();
    setInput("");
  };

  return (
    <DialogsContext.Provider value={{ show, close, state: dialog }}>
      {children}
      {dialog.open && (
        <Dialog open onOpenChange={close}>
          <DialogContent
            className={`sm:max-w-[425px] ${dialog.type === "delete" ? "border-2 border-red-600" : ""}`}
          >
            <DialogHeader>
              <DialogTitle>{dialog.title}</DialogTitle>
              {dialog.description && (
                <DialogDescription>{dialog.description}</DialogDescription>
              )}
            </DialogHeader>
            {dialog.type !== "delete" && (
              <div className="grid gap-4 py-2">
                <Input
                  autoFocus
                  value={input}
                  onChange={e => setInput(e.currentTarget.value)}
                  placeholder={
                    dialog.type === "create" ? "Enter new value..." : "Edit value..."
                  }
                  disabled={dialog.confirmLoading}
                  onKeyDown={e => {
                    if (e.key === "Enter" && input.trim() && !dialog.confirmLoading) {
                      handleConfirm();
                    }
                  }}
                />
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={dialog.confirmLoading}
                  onClick={dialog.onCancel || close}
                >
                  {dialog.cancelLabel || "Cancel"}
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant={dialog.type === "delete" ? "destructive" : "default"}
                disabled={
                  dialog.confirmLoading ||
                  (dialog.type !== "delete" && !input.trim())
                }
                onClick={handleConfirm}
              >
                {dialog.confirmLabel ||
                  (dialog.type === "delete"
                    ? "Delete"
                    : dialog.type === "edit"
                    ? "Save changes"
                    : "Create")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DialogsContext.Provider>
  );
}
