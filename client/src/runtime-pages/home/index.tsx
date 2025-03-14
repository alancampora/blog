import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post } from "@common/Post";
import useUserRuntimeConfig from "@/hooks/user-runtime-config";
import FreeLayout from "../components/free-layout";
import BaseLayout from "../components/base-layout";
import FormalTemplate from "../components/formal-template";
import MyTheme from "../components/my-theme";


type Props = {
  blogId: string | undefined;
  posts: Post[];
  theme: string | undefined;
  blogTitle: string | undefined;
  blogDescription: string | undefined;
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

export function RuntimeHome() {
  const { blogId } = useParams();
  const [posts] = usePosts(blogId);
  const [runtimeConfig] = useUserRuntimeConfig();

  return (<RuntimeHomeComponent blogId={blogId} posts={posts} theme={runtimeConfig?.theme} blogTitle={runtimeConfig?.blogTitle} />)
}

export default function RuntimeHomeComponent({ blogId, posts, theme, blogTitle, blogDescription }: Props) {
  const [layout] = useState<string>("pop");

  return (
    <>
      {layout === "free" && <FreeLayout theme={theme} blogTitle={blogTitle} posts={posts} blogId={blogId} />}
      {layout === "base" && <BaseLayout theme={theme} blogTitle={blogTitle} posts={posts} blogId={blogId} />}
      {layout === "formal" && <FormalTemplate theme={theme} blogTitle={blogTitle} posts={posts} blogId={blogId} />}
      {layout === "pop" && <MyTheme theme={theme} blogTitle={blogTitle} posts={posts} blogId={blogId} blogDescription={blogDescription} />}
    </>
  );
}

