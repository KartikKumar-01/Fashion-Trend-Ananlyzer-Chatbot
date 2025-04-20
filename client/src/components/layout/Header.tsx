import { Shirt, User, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900/50 to-background px-4 py-2 border-b border-gray-700 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="p-1 bg-gradient-to-br from-primary to-purple-800 rounded-full shadow-lg shadow-primary/20">
          <Shirt className="text-white h-5 w-5" />
        </div>
        <h1 className="text-lg font-semibold text-white tracking-tight">Trenz</h1>
      </div>
      <div className="flex items-center space-x-3">
        <button className="text-gray-300 hover:text-white bg-muted/50 p-1 rounded-full hover:bg-muted/80 transition-colors">
          <User className="h-4 w-4" />
        </button>
        <button className="text-gray-300 hover:text-white bg-muted/50 p-1 rounded-full hover:bg-muted/80 transition-colors">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}