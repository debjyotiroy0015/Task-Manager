import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import DisplayTask from "./components/DisplayTask";
import EditTask from "./components/EditTask";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar"; // Assuming you have a SideBar component
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { width } = useWindowSize();
  useEffect(() => {
    if (width > 639) {
      setIsSideBarOpen(true);
    }
  }, [width]);
  return (
    <Router>
      <NavBar setIsSideBarOpen={setIsSideBarOpen} />
      <div className="flex h-full">
        {isSideBarOpen && <SideBar isSideBarOpen={isSideBarOpen} />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DisplayTask />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/edit" element={<EditTask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
