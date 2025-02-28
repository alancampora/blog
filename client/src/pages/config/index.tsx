import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Toaster } from '@/components/ui/toaster';
import UserLayout from '@/components/user-layout';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface Props {
}

export default function BlogConfig({ }: Props) {
  const [blogName, setBlogName] = useState("choose-a-name");
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const { toast } = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/config`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          "credentials": "include",
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blog config');
        }

        const data = await response.json();
        setBlogName(data.blogName);
        setActive(data.active);
        setId(data.id);
      } catch (error) {
        console.error('Error fetching blog config:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/config`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          "credentials": "include",
          body: JSON.stringify({ blogName, active, id }),
        });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      await response.json();

      toast({
        className: "bg-green-200",
        title: "Config updated",
        description: "Your blog has been updated successfully",
      });

    } catch (error) {
      toast({
        className: "bg-red-200",
        title: "Error updating blog",
        description: "Your blog has not been updated",
      });
    }
  };

  return (

    <UserLayout title={`Setup your blog config`}>
      <Toaster />
      <Card className="bg-bs">
        <CardContent>
          <div className="my-4">
            <Label htmlFor="blogName">BLOG NAME</Label>
            <Input
              id="blogName"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-2 my-4">
            <Label htmlFor="status">ACTIVATE BLOG</Label>
            <Switch id="airplane-mode" checked={active} onCheckedChange={() => setActive(!active)} />
          </div>
          <Button onClick={handleSave}>Save</Button>


        </CardContent>
      </Card>
    </UserLayout >
  );
};