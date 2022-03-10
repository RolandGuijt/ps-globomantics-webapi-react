import { useState, useEffect } from "react";
import { HouseType } from "../types/house";

const useHouses = (): HouseType[] => {
  const [allHouses, setAllHouses] = useState<HouseType[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      //const rsp = await fetch("/houses.json");
      const rsp = await fetch(
        "https://reacthousesapi.azurewebsites.net/getallhouses"
      );
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fetchHouses();
  }, []);

  return allHouses;
};

export default useHouses;
