
import Header from "../allComponents/Header";
import LeftSideber from "../allComponents/LeftSideber";
import Footer from "../allComponents/Footer";
import RightSideber from "../allComponents/RightSideber";
import MainContent from "../allComponents/MainContent";
import SearchModal from "../allComponents/SearchModal";
import CartModal from "../allComponents/CartModal";
import DetailsModal from "../allComponents/DetailsModal";
import { useState } from "react";

function Layout() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  // Modal Toggle Functions
  const openShowDetails = (book) => {
    setSelectedBook(book); // বই সেট করা
    setShowDetails(true);
  };
  const closeShowDetails = () => setShowDetails(false);


  return (
    <div className="bg-[#171923] text-white min-h-screen">
      <div className="container px-1 mx-auto">
        
        {/* Header */}
        <Header
          toggleLeftSidebar={() => setLeftSidebarOpen(!isLeftSidebarOpen)}
          toggleRightSidebar={() => setRightSidebarOpen(!isRightSidebarOpen)}
          toggleTable={() => setShowTable(!showTable)}
        />

        {/* {  Hero Section} */}
        <div className="flex w-full">
          {/* Left Sidebar */}
          <LeftSideber
            handleClick={() => setIsDialogOpen(true)}
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
        <SearchModal isDialogOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)}/>

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
