import { Button } from "@/components/ui/button";
import { Post } from "@common/Post";

type Props = {
  theme?: string;
  blogTitle?: string;
  posts?: Post[];
  blogDescription?: string;
  blogId?: string;
};
export default function PopTheme({ theme, blogTitle, posts, blogDescription, blogId }: Props) {
  return (
    <>
      <div className={`
        runtime-theme-${theme} 
        runtime-theme-light 
        min-h-screen 
        bg-runtimePrimary
        text-runtimeOnPrimaryBg 
        p-10 
        `}>

        <header className="bg-runtimeAccent p-6 flex justify-between items-center">
          <h1 className="text-runtimeOnAccent text-3xl font-bold uppercase">{blogId}</h1>
        </header>


        <section className="bg-runtimeBackground relative flex flex-col md:flex-row items-center p-12 ">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-6xl font-extrabold uppercase leading-tight">
              {blogTitle}
            </h2>
            <p className="mt-4 text-lg text-runtimePrimary">
              {blogDescription}
            </p>
          </div>
        </section>

        {/* 🔹 Blog Section */}
        <section className="p-12 bg-runtimeAccent mt-10">
          <h3 className="text-4xl font-bold mb-6">Ultimos Posts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {posts?.map((post) => (
              <div
                key={post._id}
                className="bg-runtimeBackground border-4 border-black p-6 rounded-lg shadow-[5px_5px_0px_black] hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
              >
                <h4 className="text-2xl font-bold">{post.title}</h4>
                <p className="mt-2 text-runtimeSecondary">
                  {post.content}
                </p>
                <Button className="mt-4 px-4 py-2 bg-black text-white border-2 border-black shadow-[3px_3px_0px_black]">
                  Read More
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 Footer */}
        <footer className="py-6 text-center text-runtimeSecondary">
          &copy; {new Date().getFullYear()} done by blogeteca.com
        </footer>
      </div>
    </>

  );
}