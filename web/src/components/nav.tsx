'use client'; 
import Link from "next/link";
import { Wand2, ArrowRight, History, Menu, X, Sparkles, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-1.5 rounded-lg">
              <Wand2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-700 to-purple-500 dark:from-violet-400 dark:to-purple-300">
              ReelNova
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Features
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <SignedIn>
            <Link href="/history">
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-violet-200 dark:border-violet-800 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300">
                <History className="h-4 w-4" />
                History
              </Button>
            </Link>
            <Link href="/transform">
              <Button size="sm" className="gap-2 hidden sm:flex bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0">
                Transform
                <Sparkles className="h-4 w-4" />
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="hover:text-violet-600 dark:hover:text-violet-400">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="hidden sm:flex bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white border-0">
                Sign Up
                <User className="h-4 w-4 ml-1" />
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t py-4 px-6 space-y-4 animate-in slide-in-from-top-5 duration-200">
          <Link
            href="/"
            className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="#features"
            className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#examples"
            className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Examples
          </Link>
          <SignedIn>
            <Link
              href="/history"
              className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              History
            </Link>
            <Link
              href="/transform"
              className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Transform Video
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <span
                className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </span>
            </SignInButton>
            <SignUpButton mode="modal">
              <span
                className="block text-base font-medium hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </span>
            </SignUpButton>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
