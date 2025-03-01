import {
  Home,
  SquareChevronRight,
  User,
  Settings,
  Bell,
  LogOut,
} from "lucide-react"; // Icons
import HomeIcon from "./icons/home";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "./ui/skeleton";
import ProfileIcon from "./icons/profile";
import ShutDownIcon from "./icons/shut-down";
import { useAuth } from "@/context/auth";
import UserIcon from "./icons/user";

const navItems = [
  {
    icon: HomeIcon,
    label: "Home",
    link: "/home",
  },
  {
    icon: UserIcon,
    label: "Profile",
    link: "/profile",
    onClick: null,
  },
  {
    icon: ProfileIcon,
    label: "Config",
    link: "/config",
    onClick: null,
  },
  {
    icon: ShutDownIcon,
    label: "Logout",
    link: "",
    onClick: async (auth: any, navigate: any) => {
      await auth.logout({
        finallyCallback: () => {
          navigate("/");
        },
      });
    },
  },
];

type VerticalNavbarProps = { isLoading: boolean };

const VerticalNavbar = ({ isLoading }: VerticalNavbarProps) => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="w-20 p-2 bg-bs flex flex-col justify-center items-center">
      {navItems.map((item) => (
        <Link to={item?.link}>
          <button
            className="w-full justify-center p-2 flex flex-row items-center space-x-2 transition-colors duration-200 bg-bs hover:bg-gray-50 hover:text-black mb-4"
            onClick={() => item.onClick && item?.onClick(auth, navigate)}
          >
            <item.icon className="w-8 h-8" />
          </button>
        </Link>
      ))}
    </div>
  )
};

export default VerticalNavbar;
