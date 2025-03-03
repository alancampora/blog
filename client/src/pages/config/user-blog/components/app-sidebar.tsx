import ThemeColorBar from "@/components/theme-color-bar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
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
  }
]

interface AppSidebarProps {
  onThemeSelected: (theme: string) => void;
  savedTheme: string | undefined;
}
export function AppSidebar({ onThemeSelected, savedTheme }: AppSidebarProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedTheme(savedTheme);
    console.log({ savedTheme });
  }, [savedTheme]);

  const handleThemeSelected = (theme: string) => {
    console.log({ theme });
    setSelectedTheme(theme);
    onThemeSelected(theme);
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="bg-main">
      <SidebarHeader className="bg-bg">
        <p className="text-xl font-bold text-center">
          Customize your blog
        </p>
      </SidebarHeader>
      <SidebarContent className="bg-bg">
        <SidebarGroup>
          <p className="text-md text-center">Select your theme variant</p>
          {themes.map(theme => (
            <ThemeColorBar name={theme.name} colors={theme.colors} onSelected={() => handleThemeSelected(theme.name)} selected={selectedTheme === theme.name} />
          ))}

        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}