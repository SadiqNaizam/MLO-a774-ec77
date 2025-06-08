import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils'; // For conditional class names
import { ScrollArea } from '@/components/ui/scroll-area';
import { Home, BarChart2, Users, Settings, Package } from 'lucide-react'; // Example icons

interface NavItem {
  path: string;
  label: string;
  icon?: React.ElementType;
}

const navItems: NavItem[] = [
  { path: '/dashboard', label: 'Overview', icon: Home },
  { path: '/dashboard/sales', label: 'Sales Analytics', icon: BarChart2 },
  { path: '/dashboard/customers', label: 'Customer Insights', icon: Users },
  { path: '/dashboard/products', label: 'Product Performance', icon: Package },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const NavigationMenu: React.FC = () => {
  const location = useLocation();
  console.log("Rendering NavigationMenu, current path:", location.pathname);

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
      <div className="p-4 border-b border-gray-700">
        <Link to="/dashboard" className="text-2xl font-semibold hover:text-gray-300">
          Dashboard
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="py-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-150",
                    location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard')
                      ? "bg-gray-900 text-white font-medium"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
        {/* Optional: User profile quick access or version */}
        App Version 1.0.0
      </div>
    </aside>
  );
};

export default NavigationMenu;