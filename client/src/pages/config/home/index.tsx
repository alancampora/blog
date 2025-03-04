import { ThemePicker } from "./components/theme-picker";
import useUserPosts from "@/hooks/use-posts-user";
import UserBlog from "@/runtime-pages/home";
import { useEffect, useState } from "react";
import { Config } from "@common/Config";
import useConfig from "@/hooks/use-config";
import WebBrowser from "@/components/web-broser";
import UserLayout from "@/components/user-layout";
import { Button } from "@/components/ui/button";
import { GeneralSettings } from "./components/general-settings";
type Theme = string | undefined;
type BlogTitle = string | undefined;

const updateConfig = async (
  themeName: Theme,
  blogTitle: BlogTitle,
  blogName: string,
  active: boolean | undefined,
  config: Config | null) => {
  if (!config) return;

  await fetch(`${import.meta.env.VITE_API_URL}/config/${config?._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    "credentials": "include",
    body: JSON.stringify({ theme: themeName, blogTitle: blogTitle, blogName: blogName, active: active })
  });
}

export default function ConfigHome() {
  const [posts] = useUserPosts();
  const [theme, setTheme] = useState<Theme>(undefined);
  const [blogTitle, setBlogTitle] = useState<BlogTitle>(undefined);
  const [config] = useConfig();
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showGeneralSettings, setShowGeneralSettings] = useState(false);
  const [blogName, setBlogName] = useState<string>(config?.blogName || "");
  const [active, setActive] = useState<boolean | undefined>(false);

  useEffect(() => {
    updateConfig(theme, blogTitle, blogName, active, config);
  }, [blogTitle, theme, blogName, active]);

  useEffect(() => {
    setTheme(config?.theme);
    setBlogTitle(config?.blogTitle);
    setBlogName(config?.blogName || "");
    setActive(config?.active);
  }, [config]);

  const handleThemeSelected = (themeName: Theme) => {
    setTheme(themeName);
  }

  const handleBlogTitleChange = (blogTitle: BlogTitle) => {
    setBlogTitle(blogTitle);
  }

  const handleBlogNameChange = (blogName: string) => {
    setBlogName(blogName);
  }

  const handleActiveChange = (active: boolean) => {
    setActive(active);
  }

  return (
    config &&
    <UserLayout hideHeader>
      <div className="flex flex-row">
        <main className="w-full">
          <div className="flex flex-row gap-2">
            <Button className="bg-main" onClick={() => {
              setShowEditPanel(!showEditPanel);
              setShowGeneralSettings(false);
            }}>
              Pick a theme
            </Button>
            <Button className="bg-main" onClick={() => {
              setShowGeneralSettings(!showGeneralSettings);
              setShowEditPanel(false);
            }}>
              General Settings
            </Button>
          </div>
          <WebBrowser url={`${import.meta.env.VITE_DOMAIN}/${config?.blogName}`}>
            <UserBlog blogId={"test"} posts={posts} theme={theme} blogTitle={blogTitle} />
          </WebBrowser>
        </main>
        <ThemePicker
          showEditPanel={showEditPanel}
          onThemeSelected={handleThemeSelected} savedTheme={theme}
          onBlogTitleChange={handleBlogTitleChange} savedBlogTitle={blogTitle} />
        <GeneralSettings
          showGeneralSettings={showGeneralSettings}
          savedBlogName={blogName}
          savedActive={active}
          onBlogNameChange={handleBlogNameChange}
          onActiveChange={handleActiveChange} />
      </div>
    </UserLayout>
  )
}

