import MarkdownEditor from "@/components/markdown-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserLayout from "@/components/user-layout";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Home({ }: Props) {
  const [markdown, setMarkdown] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <UserLayout title={`New Post`}>
      <div className="mx-auto max-w-3xl">
      <div className="py-4 flex flex-col items-left space-y-2 mx-auto max-w-3xl">
        <Label className="uppercase" htmlFor="title">Title</Label>
        <Input id="title" />
      </div>
      <MarkdownEditor onChangeText={setMarkdown} />
      <div className="py-4">
        <Button>Save</Button>
      </div>
      </div>
    </UserLayout>
  );
}
