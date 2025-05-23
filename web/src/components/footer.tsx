import { Wand2, Github, Linkedin, Heart } from 'lucide-react';
import Link from "next/link";

export function Foot() {
  return (
    <footer className="border-t py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-2 rounded-lg">
                <Wand2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">ReelNova</span>
            </div>
            <p className="text-muted-foreground max-w-md mb-6">
              Transform your videos with state-of-the-art AI technology. Our tool leverages the Hunyuan-Video Model to create stunning visual transformations.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/abhinav2805-ux/GalaxyAi-assignment-ReelNova"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 p-2 rounded-full hover:bg-violet-200 dark:hover:bg-violet-800/50 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/abhinav-gupta-b3317128a/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 p-2 rounded-full hover:bg-violet-200 dark:hover:bg-violet-800/50 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/transform" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Transform Video
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
             © {new Date().getFullYear()} ReelNova • Made with 
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> by Abhinav Gupta
          </div>
        </div>
      </div>
    </footer>
  );
}
