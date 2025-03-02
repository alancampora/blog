import { Button } from "@/components/ui/button";
import UserLayout from "@/components/user-layout";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "./components/post-list";

type Props = {};

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home({ }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Untitled post", content: "this is the post" }),
          credentials: "include",
        });

      if (response.status === 403) {
        setError("Session expired. Please log in again.");
        // Redirect to login page or trigger logout
        return;
      }

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      const post = await response.json();

      navigate(`/posts/edit/${post._id}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserLayout title={`Welcome ${user.username}`} hideHeader>
      <PostList onNewPost={handleSubmit} />
    </UserLayout>
  );
}

