import Header from "../allComponents/Header";
import LeftSideber from "../allComponents/LeftSideber";
import Footer from "../allComponents/Footer";
import RightSideber from "../allComponents/RightSideber";
import MainContent from "../allComponents/MainContent";
import SearchModal from "../allComponents/SearchModal";
import CartModal from "../allComponents/CartModal";
import DetailsModal from "../allComponents/DetailsModal";
import { useEffect, useState } from "react";

function Layout() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false); // Left sidebar state
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false); // Right sidebar state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Search modal state
  const [showTable, setShowTable] = useState(false); // Cart table view state
  const [showDetails, setShowDetails] = useState(false); // Details modal state
  const [selectedBook, setSelectedBook] = useState(null); // Selected book for details modal

  // Modal Toggle Functions
  const openShowDetails = (book) => {
    setSelectedBook(book); // Set selected book
    setShowDetails(true); // Open details modal
  };

  const closeShowDetails = () => setShowDetails(false); // Close details modal
  const closeDialog = () => setIsDialogOpen(false); // Close search modal
  
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode state

  // Effect to add/remove dark class when dark mode toggles
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode); // Toggle dark mode state
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container px-1 mx-auto">
        
        {/* Header */}
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          toggleLeftSidebar={() => setLeftSidebarOpen(!isLeftSidebarOpen)}
          toggleRightSidebar={() => setRightSidebarOpen(!isRightSidebarOpen)}
          toggleTable={() => setShowTable(!showTable)}
        />

        {/* Hero Section */}
        <div className="flex w-full">
          {/* Left Sidebar */}
          <LeftSideber
            handleClick={() => setIsDialogOpen(true)} // Open search modal when clicked
            isLeftSidebarOpen={isLeftSidebarOpen}
          />

          {/* Main Content */}
          <MainContent openShowDetails={openShowDetails} />

          {/* Right Sidebar */}
          <RightSideber isRightSidebarOpen={isRightSidebarOpen} />
        </div>

        {/* Footer */}
        <Footer />

        {/* Search Modal */}
        <SearchModal 
          isDialogOpen={isDialogOpen}
          closeDialog={closeDialog}
          openShowDetails={openShowDetails} 
        />

        {/* Cart Modal */}
        <CartModal toggleTable={() => setShowTable(!showTable)} showTable={showTable} />

        {/* Details Modal */}
        <DetailsModal
          closeShowDetails={closeShowDetails}
          showDetails={showDetails}
          book={selectedBook}
        />
      </div>
    </div>
  );
}

export default Layout;
