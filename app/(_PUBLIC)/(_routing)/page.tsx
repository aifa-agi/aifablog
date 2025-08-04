// @/app/(_PUBLIC)/(_routing)/page.tsx

import FakeAuthSelector from "../../(_FAKE_AUTH)/fake-auth-selector";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-8">
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">Hover over the Open bar menu button</h1>
          <p className="text-gray-400 text-lg">To see the animated menu in action</p>
        </div>
        <FakeAuthSelector />
        <Button 
          variant="outline" 
          className="mt-8" 
          asChild
        >
          <a href="https://github.com/aifa-agi" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit GitHub
          </a>
        </Button>
      </main>
    </div>
  )
}
