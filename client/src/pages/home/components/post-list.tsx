import { useEffect, useState } from "react";
import PostItem from "./post-item";
import PostFilters from "./post-filters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Plus } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogDescription } from "@/components/ui/alert-dialog";

interface IPost {
  _id: string;
  title: string;
  createdAt: string;
  published: boolean;
  imageUrl?: string;
}

interface PostListProps {
  onNewPost: () => void;
}

const PostList = ({ onNewPost }: PostListProps) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [activeFilter, setActiveFilter] = useState("Published");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<IPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error deleting post");
      }

      await response.json();

      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeletePost(postToDelete?._id || "")}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Posts</h1>
          <Button variant="default" className="flex items-center gap-2" onClick={onNewPost}>
            <Plus className="w-4 h-4" />
            New post
          </Button>
        </header>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <PostFilters activeFilter={activeFilter} onFilterChange={setActiveFilter}
            amountDrafts={posts.filter(post => !post.published).length}
            amountPublished={posts.filter(post => post.published).length} />
          <div className="flex items-center space-x-2">
            <Input className="w-60" placeholder="Search..." />
          </div>
        </div>

        {/* Post List */}
        <div className="bg-white shadow-lg border-border border-2 rounded-lg p-4  ">
          {posts.filter(post => (activeFilter === "Published" ? post.published : !post.published))
            .map((post) => (
              <PostItem key={post._id} post={post} onDeletePost={() => {
                setPostToDelete(post);
                setShowDeleteModal(true)
              }
              } />
            ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center py-4">
          <p className="text-sm text-gray-500">1 - {posts.length} of {posts.length}</p>
          <div className="space-x-2">
            <Button variant="neutral">{"<"}</Button>
            <Button variant="neutral">{">"}</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostList;