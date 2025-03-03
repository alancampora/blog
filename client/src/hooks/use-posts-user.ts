import { Post } from "@common/Post";
import { useEffect, useState } from "react";

export default function useUserPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/user`,
          { credentials: "include" }
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return [posts];
}