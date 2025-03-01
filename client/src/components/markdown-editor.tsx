import React from "react";
import { useEffect, useState } from "react";
import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  linkPlugin,
  toolbarPlugin,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertCodeBlock,
  InsertSandpack,
  SandpackConfig,
  sandpackPlugin,
  UndoRedo
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { Label } from "./ui/label";

// 🟢 Define Sandpack configuration
const sandpackConfig: SandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      label: "React",
      name: "react",
      meta: "live react",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: `export default function App() { return <h1>Hello Sandpack!</h1>; }`
    }
  ]
};

// 🟢 Define the Toolbar (Ensures it always shows)
const toolbar = toolbarPlugin({
  toolbarContents: () => (
    <>
      <UndoRedo />
      <BlockTypeSelect /> {/* Headings, Paragraphs, Quotes */}
      <BoldItalicUnderlineToggles /> {/* Bold, Italic, Underline */}
      <CreateLink /> {/* Insert Link */}
      <InsertCodeBlock /> {/* Insert Code Block */}
      <InsertSandpack /> {/* Insert Sandpack */}
    </>
  )
});

// 🟢 Define all plugins
const plugins = [
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  linkPlugin(), // Add link support
  codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
  sandpackPlugin({ sandpackConfig }),
  codeMirrorPlugin({ codeBlockLanguages: { js: "JavaScript", css: "CSS" } }),
  toolbar // 🟢 Ensure the toolbar is included
];

type Props = {
  onChangeText: (markdown: string) => void;
  value: string;
}

function MarkdownEditor({ onChangeText, value }: Props) {
  const [markdown, setMarkdown] = useState("default value");
  const ref = React.useRef<MDXEditorMethods>(null)

  useEffect(() => {
    ref.current?.setMarkdown(value);
  }, [value]);


  const handleOnChange = (newText: string) => {
    setMarkdown(newText);
    onChangeText(newText);
  }

  return (
    <div className="mx-auto">
      <div className="">
        <MDXEditor
          ref={ref}
          markdown={markdown}
          onChange={handleOnChange} // Sync state
          autoFocus
          className="bg-grey-100 border rounded-lg shadow-sm p-2"
          plugins={plugins} // 🟢 Ensure the toolbar is used
        />
      </div>
    </div>
  );
}

export default MarkdownEditor;

