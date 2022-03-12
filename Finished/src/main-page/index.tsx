import "./main-page.css";
import Header from "./header";
import FeaturedHouse from "./featured-house";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseFromQuery from "../house/HouseFromQuery";
import useFeaturedHouse from "../hooks/useFeaturedHouse";
import HouseList from "./house-list";
import HouseEdit from "../house/HouseEdit";
import HouseNew from "../house/HouseNew";

function App() {
  //const featuredHouse = useFeaturedHouse();

  return (
    <Router>
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <Routes>
          <Route path="/house/new" element={<HouseNew />}></Route>
          <Route path="/house/edit/:id" element={<HouseEdit />}></Route>
          <Route path="/house/:id" element={<HouseFromQuery />}></Route>
          <Route path="/" element={<HouseList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
