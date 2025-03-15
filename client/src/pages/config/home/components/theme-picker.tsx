import ThemeColor from "@/components/theme-color"
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
  },
  {
    name: "pop",
    colors: [
      { code: "#fef6e4", name: "bg" },
      { code: "#f582ae", name: "primary" },
      { code: "#8bd3dd", name: "secondary" },
      { code: "#cd004e", name: "accent" }
    ]
  },
]

interface AppSidebarProps {
  onThemeSelected: (theme: string) => void;
  savedTheme: string | undefined;
  onBlogTitleChange: (blogTitle: string) => void;
  savedBlogTitle: string | undefined;
  onBlogDescriptionChange: (blogDescription: string) => void;
  savedBlogDescription: string | undefined;
  showEditPanel: boolean;
}

export function ThemePicker({ onThemeSelected, savedTheme,
  onBlogTitleChange, savedBlogTitle, showEditPanel,
  savedBlogDescription, onBlogDescriptionChange,
}: AppSidebarProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const [blogTitle, setBlogTitle] = useState<string | undefined>(undefined);
  const [blogDescription, setBlogDescription] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedTheme(savedTheme);
    setBlogTitle(savedBlogTitle);
    setBlogDescription(savedBlogDescription);
  }, [savedTheme, savedBlogTitle, savedBlogDescription]);

  const handleThemeSelected = (theme: string) => {
    setSelectedTheme(theme);
    onThemeSelected(theme);
  }

  const handleBlogTitleChange = (blogTitle: string) => {
    setBlogTitle(blogTitle);
    onBlogTitleChange(blogTitle);
  }

  const handleBlogDescriptionChange = (blogDescription: string) => {
    setBlogDescription(blogDescription);
    onBlogDescriptionChange(blogDescription);
  }

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 w-full p-4 bg-main border-t-4 border-border 
      shadow-lg transition-transform duration-300 ease-in-out
      ${showEditPanel ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <Label htmlFor="selectTheme">Select Theme Variant</Label>
      <div id="selectTheme" className="my-2 flex flex-row justify-center items-center gap-4 flex-wrap">
        {themes.map((theme) => (
          <ThemeColor
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
      <Label htmlFor="blogTitle">Blog Description</Label>
      <Input
        className="my-2"
        id="blogDescription"
        type="text"
        value={blogDescription}
        onChange={(e) => handleBlogDescriptionChange(e.target.value)}
      />
    </div>
  )
}