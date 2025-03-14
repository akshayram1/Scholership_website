import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { Menu, X, User, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import logo from '../assets/logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Handle scroll event to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Check if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo on the left */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">

              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto" // Adjust height as needed
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium ${isActiveRoute('/')
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'
                } transition-all duration-300`}
            >
              Home
            </Link>
            <Link
              to="/scholarships"
              className={`text-sm font-medium ${isActiveRoute('/scholarships')
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'
                } transition-all duration-300`}
            >
              Scholarships
            </Link>
            <Link
              to="/scholarship-recommendation"
              className={`text-sm font-medium ${isActiveRoute('/scholarship-recommendation')
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'
                } transition-all duration-300`}
            >
              Recommendations
            </Link>
            <Link
              to="/schemes"
              className={`text-sm font-medium ${isActiveRoute('/schemes')
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'
                } transition-all duration-300`}
            >
              Schemes
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${isActiveRoute('/about')
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'
                } transition-all duration-300`}
            >
              About Us
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`text-sm font-medium ${isActiveRoute('/dashboard')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary hover:border-b-2 hover:border-primary/50'
                  } transition-all duration-300`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right-side actions (Login/Signup or User Dropdown) */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-primary/10">
                    <Avatar className="h-8 w-8">
                      
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {user?.name ? getInitials(user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer hover:bg-gray-100">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer hover:bg-gray-100">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer hover:bg-gray-100">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Dialog open={dialogOpen && authType === 'login'} onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (open) setAuthType('login');
                }}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors duration-300"
                    >
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md border-none shadow-xl bg-white/90 backdrop-blur-xl p-6">
                    <LoginForm onSuccess={() => setDialogOpen(false)} onSwitchToSignup={() => {
                      setAuthType('signup');
                      setDialogOpen(true);
                    }} />
                  </DialogContent>
                </Dialog>

                <Dialog open={dialogOpen && authType === 'signup'} onOpenChange={(open) => {
                  setDialogOpen(open);
                  if (open) setAuthType('signup');
                }}>
                  <DialogTrigger asChild>
                    <Button
                      className="text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 transition-all duration-500"
                    >
                      Sign Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md border-none shadow-xl bg-white/90 backdrop-blur-xl p-6">
                    <SignupForm onSuccess={() => setDialogOpen(false)} onSwitchToLogin={() => {
                      setAuthType('login');
                      setDialogOpen(true);
                    }} />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md border-b border-gray-200">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveRoute('/') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              } transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/scholarships"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveRoute('/scholarships') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              } transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Scholarships
          </Link>
          <Link
            to="/scholarship-recommendation"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveRoute('/scholarship-recommendation') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              } transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Recommendations
          </Link>
          <Link
            to="/schemes"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveRoute('/schemes') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              } transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Schemes
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveRoute('/about') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              } transition-colors duration-300`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          {isAuthenticated && (
            <Link
              to="/dashboard"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActiveRoute('/dashboard') ? 'text-primary bg-primary/5' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                } transition-colors duration-300`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {!isAuthenticated && (
            <>
              <Dialog open={dialogOpen && authType === 'login'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (open) setAuthType('login');
              }}>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full justify-start text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors duration-300"
                  >
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-none shadow-xl bg-white/90 backdrop-blur-xl p-6">
                  <LoginForm onSuccess={() => setDialogOpen(false)} onSwitchToSignup={() => {
                    setAuthType('signup');
                    setDialogOpen(true);
                  }} />
                </DialogContent>
              </Dialog>

              <Dialog open={dialogOpen && authType === 'signup'} onOpenChange={(open) => {
                setDialogOpen(open);
                if (open) setAuthType('signup');
              }}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white hover:from-purple-600 hover:to-violet-700 transition-all duration-500"
                  >
                    Sign Up
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-none shadow-xl bg-white/90 backdrop-blur-xl p-6">
                  <SignupForm onSuccess={() => setDialogOpen(false)} onSwitchToLogin={() => {
                    setAuthType('login');
                    setDialogOpen(true);
                  }} />
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
    </header>
  );
}