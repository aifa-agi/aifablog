// @/app/(_service)/components/nav-bar/admin-flow/editable-nav-bar.tsx
"use client";
import { useEffect, useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { Button } from "@/app/(_service)/components/ui/button";
import EditableMobileMenu from "./editable-mobile-menu";
import { useNavigationMenu, useMenuOperations } from "@/app/(_service)/contexts/nav-bar-provider";
import { DialogsProvider } from "@/app/(_service)/contexts/dialogs";
import { EditableWideMenu } from "./editable-wide-menu";

const HEADER_HEIGHT = 56;
const MOBILE_MENU_OFFSET = 40;

export default function EditableNavBar() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    categories,
    setCategories,
    loading,
    dirty
  } = useNavigationMenu();

  // Use the new menu operations hook
  const { 
    handleUpdate, 
    handleRetry, 
    canRetry, 
    retryCount,
    lastError 
  } = useMenuOperations();

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const mobileMenuTopOffset = `${MOBILE_MENU_OFFSET}px`;
  const handleButtonClick = () => setIsOpen((v) => !v);
  const handleOverlayClick = () => setIsOpen(false);

  // Updated handleUpdate function
  const onUpdateClick = async () => {
    const success = await handleUpdate();
    
    // Optional: additional handling if needed
    if (!success && lastError) {
      console.log("Update failed in navbar:", lastError);
    }
  };

  const onRetryClick = async () => {
    const success = await handleRetry();
    if (!success) {
      console.log("Retry also failed in navbar");
    }
  };

  return (
    <>
    <DialogsProvider>
      <div className="relative">
        <div
          className="flex items-center px-4 h-[56px]"
          style={{ minHeight: HEADER_HEIGHT, maxHeight: HEADER_HEIGHT }}
        >
          {isLargeScreen ? (
            <Button
              variant="destructive"
              onClick={handleButtonClick}
              size="sm"
              className="flex items-center gap-2 whitespace-nowrap px-4"
            >
              <span>{isOpen ? "Close bar menu" : "Open bar menu"}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={handleButtonClick}
              className="flex items-center justify-center px-2"
              aria-label={isOpen ? "Close bar menu" : "Open bar menu"}
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          )}
        </div>
        {isLargeScreen ? (
          <EditableWideMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            categories={categories}
            setCategories={setCategories}
            dirty={dirty}
            loading={loading}
            onUpdate={onUpdateClick}
            onRetry={onRetryClick}
            canRetry={canRetry}
            retryCount={retryCount}
            lastError={lastError}
          />
        ) : (
          <EditableMobileMenu
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            topOffset={mobileMenuTopOffset}
            categories={categories}
            setCategories={setCategories}
          />
        )}
      </div>
      {isOpen && (
        <div
          className={`
            fixed inset-0 bg-black/50 backdrop-blur-sm
            transition-opacity duration-300 ease-in-out
            z-40
          `}
          style={{
            top: "64px",
          }}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}
      </DialogsProvider>
    </>
  );
}
