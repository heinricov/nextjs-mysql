"use client";

import { useState } from "react";
import PostForm from "@/components/PostForm";
import PostTable from "@/components/PostTable";
import { Toaster } from "sonner";

export default function HomePage() {
  const [refreshSignal, setRefreshSignal] = useState(0);

  const handlePostCreated = () => {
    // Increment refresh signal to trigger PostTable refresh
    setRefreshSignal((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Manajemen Post
          </h1>
          <p className="text-muted-foreground">
            Kelola dan lihat semua post Anda dalam satu tempat
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Form Section */}
          <div className="space-y-6">
            <PostForm onPostCreated={handlePostCreated} />
          </div>

          {/* Table Section */}
          <div className="space-y-6">
            <PostTable refreshSignal={refreshSignal} />
          </div>
        </div>
        <Toaster position="bottom-right" richColors />
      </div>
    </div>
  );
}
