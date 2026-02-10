import React from 'react';
import { LayoutDashboard, BarChart2, BookOpen, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Button } from '@/components/ui/button';

const SidebarContent = ({ onClose }) => {
  const menuItems = [
    { path: '/visualizer', label: 'Visualizer', icon: LayoutDashboard },
    { path: '/comparison', label: 'Comparison', icon: BarChart2 },
    { path: '/algorithms', label: 'Algorithms', icon: BookOpen },
  ];

  return (
    <nav className="p-4 space-y-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => {
            // Close sidebar on mobile when item is clicked
            if (window.innerWidth < 768) onClose?.();
          }}
          className={({ isActive }) =>
            clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium',
              isActive
                ? 'bg-primary/10 text-primary shadow-sm translate-x-1'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1'
            )
          }
        >
          <item.icon size={20} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-full z-10 transition-colors duration-300">
        <SidebarContent onClose={onClose} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-background/80 z-30 backdrop-blur-sm"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-72 bg-card z-40 shadow-xl border-r border-border overflow-y-auto"
            >
              <div className="p-4 flex justify-between items-center border-b border-border">
                <span className="font-bold text-lg">Menu</span>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <SidebarContent onClose={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
