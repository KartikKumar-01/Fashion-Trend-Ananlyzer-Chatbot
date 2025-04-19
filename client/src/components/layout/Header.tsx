import { Shirt, User, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="bg-muted px-4 py-3 border-b border-gray-700 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Shirt className="text-accent text-2xl" />
        <h1 className="text-xl font-semibold text-white">Fashion Trend Analyzer</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-300 hover:text-white">
          <User className="h-5 w-5" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
