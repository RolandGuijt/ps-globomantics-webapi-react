import { useState, useEffect, useMemo } from "react";
import "./main-page.css";
import Header from "./header";
import FeaturedHouse from "./featured-house";
import HouseFilter from "./house-filter";
import SearchResults from "../search-results";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HouseFromQuery from "../house/HouseFromQuery";
import useHouses from "../hooks/useHouses";
import useFeaturedHouse from "../hooks/useFeaturedHouse";
import HousesContext from "../contexts/housesContext";

function App() {
  const allHouses = useHouses();
  const featureHouse = useFeaturedHouse(allHouses);

  return (
    <Router>
      <HousesContext.Provider value={allHouses}>
        <div className="container">
          <Header subtitle="Providing houses all over the world" />
          <HouseFilter allHouses={allHouses} />

          <Routes>
            <Route
              path="/searchresults/:country"
              element={<SearchResults />}
            ></Route>

            <Route path="/house/:id" element={<HouseFromQuery />}></Route>

            <Route
              path="/"
              element={<FeaturedHouse house={featureHouse} />}
            ></Route>
          </Routes>
        </div>
      </HousesContext.Provider>
    </Router>
  );
}

export default App;
