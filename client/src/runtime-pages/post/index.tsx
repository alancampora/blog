import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from '../../../../server/src/bos/posts/posts.model'
import Markdown from 'react-markdown'

const PostComponent = () => {
  const { postId } = useParams();
  const [postContent, setPostContent] = useState<IPost | null>(null);

  console.log(postId);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`)
        const data = await response.json();
        setPostContent(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, []);

  if (!postContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{postContent.title}</p>
      <Markdown>{postContent.content}</Markdown>
    </div >
  );
};

export default PostComponent;
