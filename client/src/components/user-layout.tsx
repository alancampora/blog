import { useAuth } from "@/context/auth";
import VerticalNavbar from "./vertical-navbar";
import RocketIcon from "./icons/rocket";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  hideHeader?: boolean;
  classNameContent?: string;
};

export default function UserLayout({ title, subtitle, children, hideHeader = false, classNameContent = "" }: Props) {

  const { user, loading } = useAuth();

  return (
    <div className={`flex flex-row 100-dvh`}>
      <VerticalNavbar isLoading={loading} />

      {user && (

        <main className="w-full">

          {!hideHeader && (
            <header className="bg-main">
              <div className="flex flex-row items-center space-x-2 p-4">
                <p className="text-2xl font-bold">{title}</p>
              </div>
              {subtitle && <p className="text-lg px-2">{subtitle}</p>}
            </header>
          )}

          <section className={`p-4 h-dvh bg-bg ${classNameContent}`}>{children}</section>
        </main>
      )}
    </div>
  );
}
