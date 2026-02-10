import React from 'react';

const Footer = () => (
  <footer className="bg-background border-t border-border px-6 py-6 text-center transition-colors duration-300">
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 text-sm font-medium text-muted-foreground">
      <a href="/terms" className="hover:text-primary transition-colors">
        Terms & Conditions
      </a>
      <a href="/privacy" className="hover:text-primary transition-colors">
        Privacy Policy
      </a>
    </div>
    <p className="text-muted-foreground text-xs">
      © 2026 CPU Scheduling Visualizer. Built for OS Course By SASB [@Yash121l
      and @r69].
    </p>
  </footer>
);

export default Footer;
