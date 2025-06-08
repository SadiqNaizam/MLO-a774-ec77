import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // Assuming shadcn Breadcrumb
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface HeaderProps {
  pageTitle?: string; // To be set by the page component
  // Breadcrumb items could be passed as props or derived from route
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  console.log("Rendering Header, pageTitle:", pageTitle);

  // Example breadcrumb logic (simplified, adapt to your routing)
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  const breadcrumbItems = pathSegments.length > 1 ? pathSegments.slice(1) : [];


  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 ml-64"> {/* ml-64 to offset sidebar width */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Breadcrumbs or Page Title */}
          <div>
            {pageTitle && <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>}
            {/* Example Breadcrumb Usage - you'd need to integrate this with your router */}
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems.map((segment, index) => (
                  <React.Fragment key={segment}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === breadcrumbItems.length - 1 ? (
                        <BreadcrumbPage className="capitalize">{segment.replace('-', ' ')}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={`/dashboard/${breadcrumbItems.slice(0, index + 1).join('/')}`} className="capitalize">
                          {segment.replace('-', ' ')}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Right side: User menu, notifications etc. */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* Add more items like a dropdown menu for user actions */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;