import ThemeColorBar from "@/components/theme-color-bar"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

const themes = [
  {
    name: "colorfull",
    colors: [
      { code: "#fefaf9", name: "bg" },
      { code: "#e85c2e", name: "primary" },
      { code: "#87f2ac", name: "secondary" },
      { code: "#4fe3eb", name: "accent" }]
  },
  {
    name: "fancy",
    colors: [
      { code: "#f5fcf9", name: "bg" },
      { code: "#40c692", name: "primary" },
      { code: "#de91c1", name: "secondary" },
      { code: "#d4906c", name: "accent" }
    ]
  },
  {
    name: "cute",
    colors: [
      { code: "#faf6fa", name: "bg" },
      { code: "#a968a6", name: "primary" },
      { code: "#cba4b0", name: "secondary" },
      { code: "#be8d92", name: "accent" }
    ]
  }
]

interface AppSidebarProps {
  onThemeSelected: (theme: string) => void;
  savedTheme: string | undefined;
  onBlogTitleChange: (blogTitle: string) => void;
  savedBlogTitle: string | undefined;
  showEditPanel: boolean;
}

export function ThemePicker({ onThemeSelected, savedTheme, onBlogTitleChange, savedBlogTitle, showEditPanel }: AppSidebarProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const [blogTitle, setBlogTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedTheme(savedTheme);
    setBlogTitle(savedBlogTitle);
  }, [savedTheme, savedBlogTitle]);

  const handleThemeSelected = (theme: string) => {
    setSelectedTheme(theme);
    onThemeSelected(theme);
  }

  const handleBlogTitleChange = (blogTitle: string) => {
    setBlogTitle(blogTitle);
    onBlogTitleChange(blogTitle);
  }

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 w-full p-4 bg-main border-t-4 border-border 
      shadow-lg transition-transform duration-300 ease-in-out
      ${showEditPanel ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <Label htmlFor="selectTheme">Select Theme Variant</Label>
      <div id="selectTheme" className="my-2">
        {themes.map((theme) => (
          <ThemeColorBar
            key={theme.name}
            name={theme.name}
            colors={theme.colors}
            onSelected={() => handleThemeSelected(theme.name)}
            selected={selectedTheme === theme.name}
          />
        ))}
      </div>
      <Label htmlFor="blogTitle">Blog Title</Label>
      <Input
        className="my-2"
        id="blogTitle"
        type="text"
        value={blogTitle}
        onChange={(e) => handleBlogTitleChange(e.target.value)}
      />
    </div>
  )
}