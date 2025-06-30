"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Hash } from "lucide-react";
import { toast } from "sonner";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function PostTable({
  refreshSignal,
}: {
  refreshSignal: number;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/posts");

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);

        // Show error toast
        toast.error("Gagal memuat data", {
          description:
            "Terjadi kesalahan saat mengambil data post. Silakan refresh halaman.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [refreshSignal]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateContent = (content: string, maxLength = 100) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Daftar Post
        </CardTitle>
        <CardDescription>
          {loading ? "Memuat data..." : `Total ${posts.length} post`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-muted-foreground">
              Memuat data...
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada post yang dibuat</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">
                      <div className="flex items-center gap-1">
                        <Hash className="h-4 w-4" />
                        ID
                      </div>
                    </TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Konten
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Tanggal
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <Badge variant="outline">{post.id}</Badge>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs">
                        <div className="truncate" title={post.title}>
                          {post.title}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell max-w-md">
                        <div
                          className="text-muted-foreground"
                          title={post.content}
                        >
                          {truncateContent(post.content)}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        ID: {post.id}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    <h3 className="font-medium text-sm leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {truncateContent(post.content, 80)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
