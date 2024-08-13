import { useEffect, useState } from "react";
import SubView from "../components/Subview";
import MainPage from "../components/MainPage";
import SideBar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import { useLocation, useNavigate } from "react-router-dom";

function OneBox() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  // Effect to handle token validation and storage
  useEffect(() => {
    if (!token) {
      // Redirect to login if no token is found
      navigate("/login");
    } else {
      // Store the token in localStorage if it exists
      localStorage.setItem("token", `Bearer ${token}`);
    }
  }, [token]);

  // State to manage the selected component to be rendered
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Function to handle menu item clicks in the sidebar
  const handleMenuItemClick = (path: string) => {
    setSelectedComponent(path);
  };

  // Render the default view if no component is selected
  if (selectedComponent === null) {
    return (
      <div className="h-screen w-screen dark:bg-black bg-white pl-14">
        <SideBar onMenuItemClick={handleMenuItemClick} />
        <TopBar />
        <SubView />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen dark:bg-black bg-white pl-14">
      {/* Sidebar and Topbar are common across all views */}
      <SideBar onMenuItemClick={handleMenuItemClick} />
      <TopBar />

      <div>
        {/* Render the appropriate component based on the selected path */}
        {selectedComponent === "/" && <SubView />}
        {selectedComponent === "/search" && <SubView />}
        {selectedComponent === "/mail" && <SubView />}
        {selectedComponent === "/send" && <SubView />}
        {selectedComponent === "/stack" && <SubView />}
        {selectedComponent === "/inbox" && <MainPage />}
        {selectedComponent === "/stacks" && <SubView />}
      </div>
    </div>
  );
}

export default OneBox;
