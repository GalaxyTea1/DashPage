import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface MenuItem {
  title: string;
  isActive?: boolean;
  isExpanded?: boolean;
  children?: MenuItem[];
  content?: React.ReactNode;
}

const GettingStartedContent = () => (
  <div className='space-y-4'>
    <h1 className='text-3xl font-bold'>Getting Started</h1>
    <p className='text-gray-600'>
      Welcome to our documentation. Here's how to get started with our platform.
    </p>
    <div className='bg-gray-50 p-4 rounded-lg'>
      <h2 className='text-xl font-semibold mb-2'>Quick Start</h2>
      <ol className='list-decimal list-inside space-y-2'>
        <li>Install the dependencies</li>
        <li>Configure your environment</li>
        <li>Run your first application</li>
      </ol>
    </div>
  </div>
);

const DataFetchingContent = () => (
  <div className='space-y-4'>
    <h1 className='text-3xl font-bold'>Data Fetching</h1>
    <p className='text-gray-600'>
      Learn how to fetch and manage data in your application.
    </p>
    <div className='bg-gray-50 p-4 rounded-lg'>
      <h2 className='text-xl font-semibold mb-2'>Example Code</h2>
      <pre className='bg-gray-800 text-white p-4 rounded-md'>
        {`async function getData() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return data
}`}
      </pre>
    </div>
  </div>
);

const RoutingContent = () => (
  <div className='space-y-4'>
    <h1 className='text-3xl font-bold'>Routing</h1>
    <p className='text-gray-600'>
      Understanding the routing system and navigation.
    </p>
    <div className='grid grid-cols-2 gap-4'>
      <div className='bg-gray-50 p-4 rounded-lg'>
        <h2 className='text-xl font-semibold mb-2'>File-based Routing</h2>
        <p>
          Learn about our file-based routing system and how to organize your
          routes.
        </p>
      </div>
      <div className='bg-gray-50 p-4 rounded-lg'>
        <h2 className='text-xl font-semibold mb-2'>Dynamic Routes</h2>
        <p>Create dynamic routes and handle parameters in your application.</p>
      </div>
    </div>
  </div>
);

const menuItems: MenuItem[] = [
  {
    title: "Getting Started",
    content: <GettingStartedContent />,
  },
  { title: "Installation" },
  { title: "Project Structure" },
  {
    title: "Building Your Application",
    isExpanded: true,
    children: [
      {
        title: "Routing",
        content: <RoutingContent />,
      },
      {
        title: "Data Fetching",
        content: <DataFetchingContent />,
      },
      { title: "Rendering" },
      { title: "Caching" },
    ],
  },
];

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();
  // const { setIsLoading } = useLoading();
  // const handleLogout = async () => {
  //   try {
  //     setIsLoading(true);
  //     localStorage.removeItem("token");
  //     await authAPI.logout();
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const [currentPath, setCurrentPath] = useState([
    "Building Your Application",
    "Data Fetching",
  ]);
  const [currentContent, setCurrentContent] = useState<React.ReactNode>(
    <DataFetchingContent />
  );

  const handleNavigation = (item: MenuItem, parentTitle?: string) => {
    const newPath = parentTitle ? [parentTitle, item.title] : [item.title];
    setCurrentPath(newPath);
    if (item.content) {
      setCurrentContent(item.content);
    }
  };

  return (
    <div className='flex min-h-screen bg-white'>
      {/* Sidebar */}
      <div className='w-64 border-r border-gray-200 flex flex-col'>
        {/* Header */}
        <div className='p-4 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <div className='w-6 h-6 bg-logo rounded-lg '></div>
              <div className='font-semibold'>Dashboard</div>
            </div>
            <ChevronDown className='w-4 h-4 text-gray-400 cursor-pointer' />
          </div>

          {/* Search */}
          <div className='mt-4 relative'>
            <input
              type='text'
              placeholder='Search'
              className='w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className='w-4 h-4 text-gray-400 absolute left-2 top-2.5' />
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 overflow-y-auto p-4'>
          <div className='space-y-1'>
            {menuItems.map((item, index) => (
              <div key={index} className='space-y-1'>
                <div
                  className={`px-2 py-1.5 text-sm rounded-md cursor-pointer ${
                    currentPath[0] === item.title
                      ? "bg-gray-100"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavigation(item)}
                >
                  {item.title}
                </div>
                {item.children && item.isExpanded && (
                  <div className='ml-4 space-y-1'>
                    {item.children.map((child, childIndex) => (
                      <div
                        key={childIndex}
                        className={`px-2 py-1.5 text-sm rounded-md cursor-pointer ${
                          currentPath[1] === child.title
                            ? "bg-gray-100"
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
        <div className='px-6 py-4 border-b border-gray-200'>
          <div className='flex items-center space-x-2 text-sm text-gray-600'>
            {currentPath.map((item, index) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {index < currentPath.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className='p-6'>{currentContent}</div>
      </div>
    </div>
  );
};

export default Documentation;

