import { useMemo } from "react";
import useFetchHouses from "./useFetchHouses";

const useFeaturedHouse = () => {
  const { data, isSuccess } = useFetchHouses();
  const featuredHouse = useMemo(() => {
    if (!isSuccess || !data) return undefined;
    if (data.length) {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
    }
  }, [data]);

  return featuredHouse;
};

export default useFeaturedHouse;
