import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import DisplayTask from "./components/DisplayTask";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar"; // Assuming you have a SideBar component
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Task from "./components/Task";
import SigninSignupPage from "./components/SigninSignupPage";
import NoPageFound from "./components/NoPageFound";


function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [componentHeight, setComponentHeight] = useState(0); // State to store the height of the component
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (width > 639) {
      setIsSideBarOpen(true);
    }
  }, [width]);

  return (
    <Router>
      <NavBar setIsSideBarOpen={setIsSideBarOpen} />
      <div className="flex h-full w-[100%]">
        <Routes>
          <Route path="/signin" element={<SigninSignupPage />} /> {/* New route for SignIn component without sidebar */}
          <Route 
            path="*" 
            element={
              <>
                {isSideBarOpen && <SideBar isSideBarOpen={isSideBarOpen} componentHeight={componentHeight} height={height} />}
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<DisplayTask setHeight={setComponentHeight} />} />
                    <Route path="/create" element={<CreateTask setHeight={setComponentHeight} />} />
                    <Route path="/task/:id" element={<Task setHeight={setComponentHeight} />} />
                    <Route path="*" element={<NoPageFound />} />
                  </Routes>
                </main>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
