import MarkdownEditor from "@/components/markdown-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserLayout from "@/components/user-layout";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

type Post = {
  title: string;
  content: string;
}

export default function Post({ }: Props) {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [markdown, setMarkdown] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        );
        const data = await response.json();
        setContent(data.content);
        setTitle(data.title);
        console.log({ data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => { console.log(markdown) }, [markdown])

  const handleSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        method: 'PUT', // or 'POST' if creating a new post
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include", // Ensures the cookie is sent!
        body: JSON.stringify({ title, content: markdown }),
      });

      const data = await response.json();
      console.log('Post saved:', data);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <UserLayout title={`New Post`}>
      <div className="mx-auto max-w-3xl">
        <div className="py-4 flex flex-col items-left space-y-2 mx-auto max-w-3xl">
          <Label className="uppercase" htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <MarkdownEditor onChangeText={setMarkdown} value={content} />
        <div className="py-4">
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </UserLayout>
  );
}
