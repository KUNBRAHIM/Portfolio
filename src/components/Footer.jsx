export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background/80 backdrop-blur-xl overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <span className="text-xs text-muted-foreground">
            &copy; 2026 JOKERDEV. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <span className="text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
