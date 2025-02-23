import RocketIcon from "@/components/icons/rocket";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/user-layout";
import VerticalNavbar from "@/components/vertical-navbar";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Home({ }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNewPost = () => {
    navigate("/posts/new"); // Replace '/target-path' with your desired route
  };



  return (
    <UserLayout title={`Welcome ${user.username}`}>
      <Button onClick={handleNewPost}>Create a new Post</Button>
    </UserLayout>
  );
}
