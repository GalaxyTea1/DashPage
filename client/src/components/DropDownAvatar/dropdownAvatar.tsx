import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Info, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "@/api/api";
import { useLoading } from "@/context/loadingContext";

export const DropdownAvatar = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      localStorage.removeItem("token");
      await authAPI.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='border-2 border-zinc-300 cursor-pointer hover:border-zinc-400'>
          <AvatarImage src='/api/placeholder/40/40' alt='' />
          <AvatarFallback>VN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48 bg-white' align='end'>
        <DropdownMenuItem
          onClick={handleProfile}
          className='cursor-pointer hover:bg-zinc-100'
        >
          <User className='w-4 h-4 mr-2' />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleAbout}
          className='cursor-pointer hover:bg-zinc-100'
        >
          <Info className='w-4 h-4 mr-2' />
          About
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-zinc-200' />
        <DropdownMenuItem
          onClick={handleLogout}
          className='cursor-pointer text-red-600 hover:bg-zinc-100'
        >
          <LogOut className='w-4 h-4 mr-2' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
