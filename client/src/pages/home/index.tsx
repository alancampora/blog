import RocketIcon from "@/components/icons/rocket";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/user-layout";
import VerticalNavbar from "@/components/vertical-navbar";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home({}: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/posts`,
        {
          credentials: "include",
        }
      );

      if (response.status === 403) {
        setError("Session expired. Please log in again.");
        return;
      }

      if (!response.ok) {
        throw new Error("Error fetching posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

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
          credentials: "include", // Ensures the cookie is sent!
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

      navigate(`/posts/${post._id}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleNewPost = () => {
    navigate("/posts/new"); // Replace '/target-path' with your desired route
  };

  return (
    <UserLayout title={`Welcome ${user.username}`}>
      <div className="space-y-6">
        <Button 
          onClick={handleSubmit}
          className="bg-yellow-400 hover:bg-yellow-500 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all"
        >
          Create a new Post
        </Button>
        
        {loading && <p className="font-bold text-lg">Loading posts...</p>}
        {error && <p className="text-red-500 font-bold border-2 border-red-500 p-4 bg-red-100">{error}</p>}
        
        <div className="space-y-6">
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="p-6 bg-white border-2 border-black rounded-lg cursor-pointer
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-[-4px] hover:translate-y-[-4px]
                transition-all duration-200
                relative
                before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-black"
              onClick={() => navigate(`/posts/${post._id}`)}
            >
              <div className="absolute top-1 right-2">
                <span className="font-mono text-sm bg-yellow-300 px-2 py-1 border border-black">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h2 className="text-2xl font-black mb-4 font-mono">{post.title}</h2>
              <p className="text-gray-700 font-medium mb-3 pl-4 border-l-4 border-blue-400">
                {post.content.length > 150 
                  ? `${post.content.substring(0, 150)}...` 
                  : post.content}
              </p>
              
              <div className="mt-4 flex justify-end">
                <span className="text-sm bg-green-300 px-3 py-1 border border-black font-bold">
                  Read More →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
}

