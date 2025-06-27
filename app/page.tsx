"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Next.js with shadcn/ui
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          This is a simple homepage with Tailwind CSS and shadcn/ui components
        </p>
        <Button 
          onClick={() => alert("Button clicked!")}
          className="mr-4"
        >
          Click me!
        </Button>
        <Button variant="outline">
          Outline Button
        </Button>
      </div>
    </main>
  );
}
