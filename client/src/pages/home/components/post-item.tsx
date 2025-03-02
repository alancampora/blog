import { ArrowUpRight, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
interface PostItemProps {
  post: {
    _id: string;
    title: string;
    createdAt: string;
    published: boolean;
    imageUrl?: string;
  };
  onDeletePost: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDeletePost }) => {
  const navigate = useNavigate();

  const onEditPost = () => {
    navigate(`/posts/edit/${post._id}`);
  }

  return (
    <div className="flex justify-between items-center p-4 border-b">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-md">
          {post.imageUrl ? (
            <img src={post.imageUrl} alt="Thumbnail" className="w-full h-full rounded-md" />
          ) : (
            <span className="text-gray-500">📷</span>
          )}
        </div>
        <div>
          <h3 className="text-md font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6 text-gray-500">
        <p>N/A <span className="block text-xs">Opened</span></p>
        <p>0 <span className="block text-xs">Views</span></p>

        <Button variant="default" className="bg-danger" size="icon" onClick={() => onDeletePost(post._id)}>
          <Trash className="w-5 h-5" />
        </Button>

        <Button variant="neutral" size="icon" onClick={onEditPost}>
          <ArrowUpRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default PostItem;