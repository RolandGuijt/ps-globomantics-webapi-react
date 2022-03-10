import { createContext } from "react";
import { HouseType } from "../types/house";

const HousesContext = createContext<HouseType[]>([]);

export default HousesContext;
