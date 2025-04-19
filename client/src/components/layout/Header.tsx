import { Shirt, User, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900/50 to-background px-5 py-3 border-b border-gray-700 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-1.5 bg-gradient-to-br from-primary to-purple-800 rounded-full shadow-lg shadow-primary/20">
          <Shirt className="text-white text-xl" />
        </div>
        <h1 className="text-xl font-semibold text-white tracking-tight">Trenz</h1>
      </div>
      <div className="flex items-center space-x-3">
        <button className="text-gray-300 hover:text-white bg-muted/50 p-1.5 rounded-full hover:bg-muted/80 transition-colors">
          <User className="h-5 w-5" />
        </button>
        <button className="text-gray-300 hover:text-white bg-muted/50 p-1.5 rounded-full hover:bg-muted/80 transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}