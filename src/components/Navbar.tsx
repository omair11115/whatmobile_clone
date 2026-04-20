import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Smartphone, Newspaper, Moon, Sun, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/src/lib/auth';
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
    <nav className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <Smartphone className="h-8 w-8 text-primary" />
            <span className="text-2xl font-black tracking-tighter uppercase text-slate-800">MobiSpec<span className="text-muted-foreground text-sm lowercase">.com</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-bold text-slate-700 hover:text-primary transition-colors">Home</a>
            <a href="/news" className="text-sm font-bold text-slate-700 hover:text-primary transition-colors">News</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex relative mr-2">
              <form onSubmit={handleSearch}>
                <Input 
                  placeholder="Search Mobile..." 
                  className="w-48 lg:w-64 h-9 text-xs rounded-full bg-slate-100 border-transparent focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-9 w-9 rounded-full text-muted-foreground">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="py-4 border-t md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                placeholder="Search phones, brands..." 
                className="w-full h-10 text-sm rounded-lg"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
