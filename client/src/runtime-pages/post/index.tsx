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
    <article className="max-w-4xl mx-auto p-4">
      <div className="text-center ">
        <p className="text-4xl font-bold my-2 uppercase">{postContent.title}</p>
      </div>
      <div className="my-4">
        <Markdown
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold my-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-semibold my-2">{children}</h2>,
            h3: ({ children }) => <h2 className="text-xl font-semibold my-2">{children}</h2>,
            p: ({ children }) => <p className="text-gray-700 dark:text-gray-300 mb-2">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside">{children}</ol>,
            li: ({ children }) => <li className="ml-4">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-500 pl-4 italic">{children}</blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-gray-200 text-red-500 px-1 py-0.5 rounded">{children}</code>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-blue-500 underline hover:text-blue-700">
                {children}
              </a>
            ),
          }}
        >{postContent.content}</Markdown>
      </div>
    </article >
  );
};

export default PostComponent;
