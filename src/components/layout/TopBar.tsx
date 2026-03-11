import { Bell, HelpCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TopBar = () => {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-card/80 backdrop-blur-sm px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
          <span className="text-xs text-muted-foreground">FreeRADIUS: Online</span>
        </div>
        <span className="text-border">|</span>
        <span className="text-xs text-muted-foreground">SQL Mode</span>
        <Badge variant="outline" className="text-[10px] h-5">v3.2.3</Badge>
      </div>
      <div className="flex items-center gap-1">
        <button className="rounded-md p-2 text-muted-foreground hover:bg-secondary transition-colors" aria-label="Refresh data">
          <RefreshCw className="h-4 w-4" />
        </button>
        <button className="relative rounded-md p-2 text-muted-foreground hover:bg-secondary transition-colors" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-secondary transition-colors" aria-label="Help">
          <HelpCircle className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
