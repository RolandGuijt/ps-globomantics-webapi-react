import React from "react";
import { useNavigate } from "react-router-dom";
import { HouseType } from "../types/house";

type Args = {
  allHouses: HouseType[];
};

const HouseFilter = ({ allHouses }: Args) => {
  const nav = useNavigate();

  const countries: string[] = allHouses
    ? Array.from(new Set(allHouses.map((h: HouseType) => h.country)))
    : [];
  countries.unshift("");

  const onSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    nav(`/searchresults/${country}`);
  };

  return (
    <div className="row mt-3">
      <div className="offset-md-2 col-md-4">
        Look for your dream house in country:
      </div>
      <div className="col-md-4 mb-3">
        <select
          data-testid="countryselect"
          className="form-select"
          onChange={onSearchChange}
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HouseFilter;
