import { useEffect, useState } from "react";
import axios from "axios";
import AllInbox from "./AllInbox";
import CenterPage from "./CenterPage";
import RightSection from "./RightSection";

function MainPage() {
  // State to store the fetched data
  const [datas, setData] = useState([]);
  
  // State to manage the loading state
  const [loading, setLoading] = useState(true);
  
  // State to manage the selected thread (email)
  const [selectedThread, setSelectedThread] = useState(null);
  
  console.log(selectedThread);

  // useEffect hook to fetch data at regular intervals
  useEffect(() => {
    // Set up an interval to fetch data every 2.5 seconds
    const interval = setInterval(async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        
        // Make a GET request to fetch the inbox data
        const res = await axios.get(
          "https://hiring.reachinbox.xyz/api/v1/onebox/list",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        
        // Update the state with the fetched data
        setData(res.data.data);
        
        // Set loading to false after data is fetched
        setLoading(false);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching data:", error);
      }
    }, 2500);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return (
      <div className="bg-[#ECEFF3] dark:bg-black dark:text-white text-[#5B5F66] flex h-screen w-full justify-center items-center">
        Loading ...
      </div>
    );
  }

  // Function to handle selecting a thread (email)
  const loadMail = async (threadId) => {
    setSelectedThread(threadId);
  };

  // Render the main page layout
  return (
    <div className="bg-[#ECEFF3] dark:bg-black text-white pt-16 flex w-full h-screen">
      {/* Left section: All inboxes */}
      <div className="w-1/4">
        <AllInbox data={datas} loadMail={loadMail} />
      </div>
      
      {/* Center section: Display selected thread */}
      <div className="w-2/4">
        <CenterPage selectedThread={selectedThread} />
      </div>
      
      {/* Right section: Additional content or details */}
      <div className="w-1/4">
        <RightSection />
      </div>
    </div>
  );
}

export default MainPage;
