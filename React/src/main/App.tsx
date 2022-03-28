import "./app.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseList from "../house/HouseList";
import HouseEdit from "../house/HouseEdit";
import HouseNew from "../house/HouseNew";
import HouseDetail from "../house/HouseDetail";
import Header from "./Header";

function App() {
  return (
    <Router>
      <div className="container">
        <Header subtitle="Providing houses all over the world" />
        <Routes>
          <Route path="/house/new" element={<HouseNew />}></Route>
          <Route path="/house/edit/:id" element={<HouseEdit />}></Route>
          <Route path="/house/:id" element={<HouseDetail />}></Route>
          <Route path="/" element={<HouseList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
