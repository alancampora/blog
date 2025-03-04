import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Post } from "@common/Post";

type Props = {
  theme?: string;
  blogTitle?: string;
  posts?: Post[];
  blogId?: string;
};
const blogPosts = [
  {
    title: "Breaking into Tech",
    description: "How I started my blog and built a brand from scratch.",
    image: "https://img.freepik.com/free-photo/blurred-night-lights_23-2148139308.jpg?t=st=1741046829~exp=1741050429~hmac=f0b369c23796e4a8c4d6c97fbf816f183128c41d96c66ae316cc295aa1cd7738&w=2000",
  },
  {
    title: "The Future of Web Design",
    description: "Exploring trends in web design and development.",
    image: "https://img.freepik.com/free-photo/man-touching-futuristic-blue-screen_53876-143029.jpg?t=st=1741046859~exp=1741050459~hmac=22a5b449d935f235434773c5f6e06949e76c4b8f535c6050de6578c040ec2189&w=2000",
  },
  {
    title: "The Future of Web Design",
    description: "Exploring trends in web design and development.",
    image: "https://img.freepik.com/free-photo/man-touching-futuristic-blue-screen_53876-143029.jpg?t=st=1741046859~exp=1741050459~hmac=22a5b449d935f235434773c5f6e06949e76c4b8f535c6050de6578c040ec2189&w=2000",
  },
];


export default function BaseLayout({ theme, blogTitle, posts, blogId }: Props) {
  return (

    <div className={`runtime-theme-${theme} runtime-theme-light bg-runtimePrimary  min-h-screen text-black`}>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b-4 border-black">
        <h1 className="text-3xl font-bold">{blogTitle}</h1>
        <div className="hidden md:flex gap-6">
          <a href="#" className="font-medium hover:underline">Home</a>
          <a href="#" className="font-medium hover:underline">Articles</a>
          <a href="#" className="font-medium hover:underline">About</a>
        </div>
        <Button variant="outline" className="border-2 border-black shadow-[3px_3px_0px_black]">
          Subscribe
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-5xl font-bold leading-tight">
            Elevate Your Writing <br /> with **NeoBrutalism**
          </h2>
          <p className="mt-4 text-lg">A bold new way to design blogs with character.</p>
          <Button
            className="mt-6 px-6 py-3 bg-yellow-400 border-2 border-black shadow-[4px_4px_0px_black] text-lg"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1">
          <img src="https://img.freepik.com/free-photo/happy-attractive-guy-pointing-fingers-your-logo-showing-promo-his-tshirt-standing-yellow_1258-155118.jpg?t=st=1741046710~exp=1741050310~hmac=bfa6ea6c998769e6724f23a62de58161bc0f3b981a3723f463d514c71f4515c2&w=2000" alt="NeoBrutalist Blog" className="rounded-lg border-4 border-black shadow-[6px_6px_0px_black]" />
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="p-12 bg-runtimePrimaryLight border-t-4 border-black">
        <h3 className="text-3xl font-bold mb-6">Latest Articles</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="border-4 border-black p-6 rounded-lg shadow-[5px_5px_0px_black] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
            >
              <img src={post.image} alt={post.title} className="rounded-md border-2 border-black" />
              <h4 className="text-2xl font-bold mt-4">{post.title}</h4>
              <p className="mt-2 text-gray-700">{post.description}</p>
              <Button
                className="mt-4 px-4 py-2 bg-black text-white border-2 border-black shadow-[3px_3px_0px_black]"
              >
                Read More
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Services / Categories */}
      <section className="p-12 flex flex-col md:flex-row gap-6">
        <div className="flex-1 p-6 bg-blue-300 border-4 border-black shadow-[5px_5px_0px_black] rounded-lg">
          <h3 className="text-2xl font-bold">Writing Tips</h3>
          <p className="text-gray-800 mt-2">Improve your writing skills with expert advice.</p>
        </div>
        <div className="flex-1 p-6 bg-orange-300 border-4 border-black shadow-[5px_5px_0px_black] rounded-lg">
          <h3 className="text-2xl font-bold">Web Design</h3>
          <p className="text-gray-800 mt-2">Learn how to design blogs with character.</p>
        </div>
        <div className="flex-1 p-6 bg-green-300 border-4 border-black shadow-[5px_5px_0px_black] rounded-lg">
          <h3 className="text-2xl font-bold">Marketing</h3>
          <p className="text-gray-800 mt-2">Strategies for growing your audience.</p>
        </div>
      </section>
    </div>
  );
}