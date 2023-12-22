import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import AboutPage from "./AboutPage";
import Navbar from "./Navbar";

function App() {

  return (<>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="about" element={<AboutPage/>}/>
      <Route path="search" element={<SearchPage/>}/>
    </Routes>
  </>)
}

export default App;
