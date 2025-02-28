import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {};

export default function UserBlog({}: Props) {
  const { blogId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (blogId) {
      fetch(`${import.meta.env.VITE_API_URL}/runtime/${blogId}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [blogId]);

  return (
    <div>
      <h1>User Blog</h1>
      <p>{blogId}</p>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
