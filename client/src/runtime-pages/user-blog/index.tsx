import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardV2 from "@/components/ui/card-v2";
import { Post } from "@common/Post";
import useUserRuntimeConfig from "@/hooks/user-runtime-config";

type Props = {
  blogId: string | undefined;
  posts: Post[];
  theme: string | undefined;
  blogTitle: string | undefined;
};

const usePosts = (blogId: string | undefined) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (blogId) {
      fetch(`${import.meta.env.VITE_API_URL}/runtime/${blogId}`)
        .then(response => response.json())
        .then(data => setPosts(data.posts))
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [blogId]);

  return [posts];
}

export function RuntimeUserBlog() {
  const { blogId } = useParams();
  const [posts] = usePosts(blogId);
  const [runtimeConfig] = useUserRuntimeConfig();

  return (<UserBlog blogId={blogId} posts={posts} theme={runtimeConfig?.theme} />)
}

export default function UserBlog({ blogId, posts, theme, blogTitle }: Props) {
  console.log({ blogTitle });
  return (
    <>
      <div className={`runtime-theme-${theme} runtime-theme-light`}>
        <div id="header" className="p-4 bg-runtimePrimary text-runtimeOnPrimaryBg">
          <h1 className="text-xl font-bold uppercase text-center">{blogTitle}</h1>
        </div>
        <main id="main-content" className="p-4 bg-runtimeSecondary">
          <ul className="flex flex-wrap gap-4">
            {posts?.map((post, index) => (
              <li key={index}>
                <Link to={`/${blogId}/${post._id}`}>
                  <CardV2 imageUrl={post?.imageUrl} title={post?.title} content={post?.content} />
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
