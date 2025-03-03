import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import useUserPosts from "@/hooks/use-posts-user";
import UserBlog from "@/runtime-pages/user-blog";
import { useEffect, useState } from "react";
import { Config } from "@common/Config";

export default function ConfigUserBlog() {
  const [posts] = useUserPosts();
  const [theme, setTheme] = useState<string>("fancy");
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/config`, {
        method: 'GET',
        "credentials": "include",
      });

      const data = await response.json();
      setConfig(data);
    }

    fetchConfig();
  }, [])

  const updateConfig = async (themeName: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/config/${config?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      "credentials": "include",
      body: JSON.stringify({ theme: themeName })
    });
  }

  const handleThemeSelected = (themeName: string) => {
    console.log({ themeName });
    setTheme(themeName);
    updateConfig(themeName);
  }
  return (
    <div className="">

      <SidebarProvider>
        <AppSidebar onThemeSelected={handleThemeSelected} savedTheme={config?.theme}/>
        <main>
          <SidebarTrigger className="fixed top-2 left-2" />
          <UserBlog blogId={"test"} posts={posts} theme={theme} />
        </main>
      </SidebarProvider>

    </div>
  )
}

