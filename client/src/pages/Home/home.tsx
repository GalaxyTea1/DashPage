import { DropdownAvatar } from "@/components/DropDownAvatar/dropdownAvatar";
import menuItems from "@/components/MenuItem/menuItem";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import React, { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState(["Getting Page"]);
  const [currentContent, setCurrentContent] = useState(menuItems[0].content);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const isMenuExpanded = (title: string) => expandedMenus.includes(title);

  const isMenuActive = (itemTitle: string, parentTitle?: string) => {
    if (parentTitle) {
      return currentPath[1] === itemTitle && currentPath[0] === parentTitle;
    }
    return currentPath[0] === itemTitle && currentPath.length === 1;
  };

  const handleNavigation = (item: any, parentTitle?: string) => {
    if (item.children) {
      setExpandedMenus((prev) =>
        prev.includes(item.title)
          ? prev.filter((menu) => menu !== item.title)
          : [...prev, item.title]
      );
    }

    if (!item.children) {
      const newPath = parentTitle ? [parentTitle, item.title] : [item.title];
      setCurrentPath(newPath);
      if (item.content) {
        setCurrentContent(item.content);
      }
    }
  };

  return (
    <div className='flex min-h-screen bg-white'>
      {/* Left Sidebar */}
      <div className='w-64 border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <span className='text-yellow-500'>👑</span>
              <div className='font-semibold'>Home</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className='mt-4 relative'>
            <input
              type='text'
              placeholder='Search features...'
              className='w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className='w-4 h-4 text-gray-400 absolute left-2 top-2.5' />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className='flex-1 overflow-y-auto p-4'>
          <div className='space-y-1'>
            {menuItems.map((item, index) => (
              <div key={index} className='space-y-1'>
                <div
                  className={`flex items-center justify-between px-2 py-1.5 text-sm rounded-md cursor-pointer ${
                    isMenuActive(item.title)
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavigation(item)}
                >
                  <span>{item.title}</span>
                  {item.children && (
                    <div className='p-1'>
                      {isMenuExpanded(item.title) ? (
                        <ChevronDown className='w-4 h-4' />
                      ) : (
                        <ChevronRight className='w-4 h-4' />
                      )}
                    </div>
                  )}
                </div>
                {item.children && isMenuExpanded(item.title) && (
                  <div className='ml-4 space-y-1'>
                    {item.children.map((child, childIndex) => (
                      <div
                        key={childIndex}
                        className={`px-2 py-1.5 text-sm rounded-md cursor-pointer ${
                          isMenuActive(child.title, item.title)
                            ? "bg-blue-50 text-blue-600"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleNavigation(child, item.title)}
                      >
                        {child.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1'>
        {/* Breadcrumb */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            {currentPath.map((item, index) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {index < currentPath.length - 1 && (
                  <span className='text-gray-400'>/</span>
                )}
              </React.Fragment>
            ))}
          </div>
          <DropdownAvatar />
        </div>

        {/* Content Area */}
        <div className='p-6'>
          {currentContent || (
            <div className='text-center text-gray-500 mt-10'>
              Select a topic from the sidebar to view content
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

