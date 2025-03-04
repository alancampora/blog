import CardV2 from "@/components/ui/card-v2";
import { Post } from "@common/Post";
import { Link } from "react-router-dom";

type Props = {
  theme?: string;
  blogTitle?: string;
  posts?: Post[];
  blogId?: string;
};
export default function FreeLayout({ theme, blogTitle, posts, blogId }: Props) {
  return (
    <div className={`runtime-theme-${theme} runtime-theme-light`}>
      <div id="header" className="p-4 bg-runtimePrimary text-runtimeOnPrimaryBg">
        <h1 className="text-xl font-bold uppercase text-center">{blogTitle}</h1>
      </div>
      <main id="main-content" className="p-4 bg-runtimeSecondary">
        <ul className="flex flex-wrap gap-4">
          {posts?.map((post, index) => (
            <li key={index}>
              <Link to={`/${blogId}/${post._id}`}>
                <CardV2 imageUrl={post?.imageUrl} title={post?.title} content={post?.content} />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}