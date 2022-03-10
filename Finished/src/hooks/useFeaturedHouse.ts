import { useMemo } from "react";
import { HouseType } from "../types/house";

const useFeaturedHouse = (allHouses: HouseType[]) => {
  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);

  return featuredHouse;
};

export default useFeaturedHouse;
