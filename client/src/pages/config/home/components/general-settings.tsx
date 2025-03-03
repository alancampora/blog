import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useState } from "react";

interface GeneralSettings {
  showGeneralSettings: boolean;
  savedBlogName: string;
  savedActive?: boolean;
  onBlogNameChange: (blogName: string) => void;
  onActiveChange: (active: boolean) => void;
}

export function GeneralSettings({ showGeneralSettings, savedBlogName, savedActive, onBlogNameChange, onActiveChange }: GeneralSettings) {
  const [blogName, setBlogName] = useState<string>(savedBlogName);
  const [active, setActive] = useState<boolean | undefined>(savedActive);

  useEffect(() => {
    setBlogName(savedBlogName);
    setActive(savedActive || false);
  }, [savedBlogName, savedActive]);

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 w-full p-4 bg-main border-t-4 border-border 
      shadow-lg transition-transform duration-300 ease-in-out
      ${showGeneralSettings ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-full opacity-0 pointer-events-none"}`}
    >
      <h1 className="text-2xl font-bold">General Settings</h1>
      <div className="my-4">
        <Label htmlFor="blogName">BLOG NAME</Label>
        <Input
          id="blogName"
          value={blogName}
          onChange={(e) => onBlogNameChange(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center gap-2 my-4">
        <Label htmlFor="status">ACTIVATE BLOG</Label>
        <Switch id="airplane-mode" className="data-[state=checked]:bg-green-500"
          checked={active} onCheckedChange={() => onActiveChange(!active)} />
      </div>
    </div>
  )
}