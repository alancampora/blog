import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MarkdownEditor from "@/components/markdown-editor";
import { Post } from '@common/Post'

const BlogEditor = ({ onSave }: { onSave: (postData: Post) => void }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <Input
        className="text-4xl font-bold border-none focus:ring-0"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        className="text-lg text-gray-500 border-none focus:ring-0"
        placeholder="Add a subtitle..."
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center bg-gray-200 px-2 py-1 rounded-full">
            {tag} <button onClick={() => setTags(tags.filter(t => t !== tag))} className="ml-2 text-gray-500">×</button>
          </span>
        ))}
        <Input
          className="border px-2 py-1"
          placeholder="Add a tag..."
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
        />
        <Button onClick={addTag} size="sm"><Tag className="w-4 h-4" /></Button>
      </div>

      <MarkdownEditor onChangeText={setContent} value={content} />

      <div className="p-4 border rounded-lg bg-gray-50">
        <h3 className="font-bold">Preview</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      <div className="py-4">
        <Button onClick={() => onSave({ title, imageUrl, content , published})}>Save</Button>
      </div>

    </div>
  );
};

export default BlogEditor;