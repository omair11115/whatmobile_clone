import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Smartphone, Newspaper, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/lib/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1a3a5a] text-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-[#d32f2f]" />
            <span className="text-xl font-bold uppercase tracking-tight">Mobi<span className="text-white">Spec</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-bold uppercase hover:text-white/80 transition-colors">Home</a>
            <a href="/news" className="text-sm font-bold uppercase hover:text-white/80 transition-colors">News</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex relative">
              <form onSubmit={handleSearch}>
                <Input 
                  placeholder="Search mobiles..." 
                  className="w-48 lg:w-64 h-8 text-xs rounded-none bg-white text-[#1a3a5a]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-8 w-8 text-[#1a3a5a] hover:bg-transparent">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
