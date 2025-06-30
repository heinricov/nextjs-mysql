"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PostForm({
  onPostCreated,
}: {
  onPostCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts` || "/api/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const newPost = await response.json();

      setTitle("");
      setContent("");
      onPostCreated(); // Refresh data

      // Show success toast
      toast.success("Post berhasil dibuat!", {
        description: `Post "${newPost.title}" telah berhasil disimpan ke database.`,
      });
    } catch (error) {
      console.error("Error creating post:", error);

      // Show error toast
      toast.error("Gagal membuat post", {
        description:
          "Terjadi kesalahan saat menyimpan post. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Buat Post Baru</CardTitle>
        <CardDescription>
          Isi form di bawah untuk membuat post baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul</Label>
            <Input
              id="title"
              type="text"
              placeholder="Masukkan judul post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              placeholder="Masukkan konten post"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={loading}
              className="min-h-[120px] resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={loading || !title.trim() || !content.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Post"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
