import { useEffect, useState } from "react";
import {
  MDXEditor,
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
}

function MarkdownEditor({ onChangeText }: Props) {
  const [markdown, setMarkdown] = useState("## Welcome to MDX Editor 🚀");

  useEffect(() => {
    console.log("Markdown content:", markdown);
  }, [markdown]);

  const handleOnChange = (newText:string) => {
    setMarkdown(newText);
    onChangeText(newText);
  }

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white border-2 border-border">
      <h1 className="text-xl font-bold mb-4">MDX Editor</h1>
      <MDXEditor
        markdown={markdown}
        onChange={setMarkdown} // Sync state
        autoFocus
        className="bg-grey-100 border rounded-lg shadow-sm p-2"
        plugins={plugins} // 🟢 Ensure the toolbar is used
      />
      <h2 className="text-lg font-semibold mt-4">Output:</h2>
      <pre className="bg-gray-100 p-2 rounded">{markdown}</pre>
    </div>
  );
}

export default MarkdownEditor;
