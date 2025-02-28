import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import CardV2 from "@/components/ui/card-v2";

type Props = {};

export default function UserBlog({ }: Props) {
  const { blogId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (blogId) {
      fetch(`${import.meta.env.VITE_API_URL}/runtime/${blogId}`)
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [blogId]);

  return (
    <div className="">

      <div id="header" className="p-4">
        <h1 className="text-xl font-bold uppercase">Bienvienid@s a mi blog</h1>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <ul className="flex flex-wrap gap-4">
          {posts.map((post, index) => (
            <li key={index}>
              <Link to={`/${blogId}/${post._id}`}>
                <CardV2 title={post.title} content={post.content} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
