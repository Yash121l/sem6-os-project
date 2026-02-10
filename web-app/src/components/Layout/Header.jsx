import React from 'react';
import { Moon, Sun, Github, Menu } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '@/components/ui/button';

const Header = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-background border-b border-border px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/30">
            CPU
          </div>
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">
            Scheduling Visualizer
          </h1>
          <h1 className="text-xl font-bold tracking-tight sm:hidden">
            Scheduler
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/Yash121l/sem6-os-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
