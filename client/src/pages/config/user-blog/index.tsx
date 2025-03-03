import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useUserPosts from "@/hooks/use-posts-user";
import UserBlog from "@/runtime-pages/user-blog";
import { useEffect, useState } from "react";
import { Config } from "@common/Config";
import useConfig from "@/hooks/use-config";
import WebBrowser from "@/components/web-broser";

type Theme = string | undefined;
type BlogTitle = string | undefined;

const updateConfig = async (themeName: Theme, blogTitle: BlogTitle, config: Config | null) => {
  if (!config) return;

  await fetch(`${import.meta.env.VITE_API_URL}/config/${config?._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    "credentials": "include",
    body: JSON.stringify({ theme: themeName, blogTitle: blogTitle })
  });
}

export default function ConfigUserBlog() {
  const [posts] = useUserPosts();
  const [theme, setTheme] = useState<Theme>(undefined);
  const [blogTitle, setBlogTitle] = useState<BlogTitle>(undefined);
  const [config] = useConfig();

  useEffect(() => {
    updateConfig(theme, blogTitle, config);
  }, [blogTitle, theme]);

  useEffect(() => {
    setTheme(config?.theme);
    setBlogTitle(config?.blogTitle);
  }, [config]);

  const handleThemeSelected = (themeName: Theme) => {
    setTheme(themeName);
  }

  const handleBlogTitleChange = (blogTitle: BlogTitle) => {
    setBlogTitle(blogTitle);
  }

  return (
    config && <SidebarProvider>
      <AppSidebar
        onThemeSelected={handleThemeSelected} savedTheme={config?.theme}
        onBlogTitleChange={handleBlogTitleChange} savedBlogTitle={config?.blogTitle} />
      <main className="w-full">
        <SidebarTrigger className="fixed top-2 left-2" />
        <WebBrowser url={`${import.meta.env.VITE_DOMAIN}/${config?.blogName}`}>
          <UserBlog blogId={"test"} posts={posts} theme={theme} blogTitle={blogTitle} />
        </WebBrowser>
      </main>
    </SidebarProvider>
  )
}

