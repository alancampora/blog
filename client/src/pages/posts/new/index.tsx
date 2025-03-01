import { Toaster } from "@/components/ui/toaster";
import UserLayout from "@/components/user-layout";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import MarkdownEditor from "@/components/markdown-editor";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {};

export default function Post({ }: Props) {
  const { postId } = useParams();
  const [markdown, setMarkdown] = useState("");
  const { toast } = useToast()
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        );
        const data = await response.json();
        setContent(data.content);
        setTitle(data.title);
        setPublished(data.published);
        setImageUrl(data.imageUrl);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    const delay = setTimeout(() => {
      handleSave();
    }, 1000);

    return () => clearTimeout(delay);
  }, [title, subtitle, markdown, published, imageUrl]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        method: 'PUT', // or 'POST' if creating a new post
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", // Ensures the cookie is sent!
        body: JSON.stringify({ title, content: markdown, published, imageUrl }),
      });

      await response.json();

    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <UserLayout classNameContent="bg-white" title={`New Post`} hideHeader>
      <Toaster />
      <header className="flex flex-row justify-between">
        <div id="left-side">
        </div>
        <div id="right-side" className="flex flex-row items-center space-x-4">
          <div className="py-2 flex flex-row items-center space-x-2">
            <Switch id="published" checked={published} onCheckedChange={() => setPublished(!published)} />
            <Label className="uppercase" htmlFor="published">{published ? "Published" : "Draft"}</Label>
          </div>
        </div>
      </header>
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
        <MarkdownEditor onChangeText={setMarkdown} value={content} />

        <div className="p-4 border rounded-lg bg-gray-50 overflow-auto">
          <h3 className="font-bold">Preview</h3>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>

        <div className="py-4">
        </div>

      </div>
    </UserLayout>
  );
}
