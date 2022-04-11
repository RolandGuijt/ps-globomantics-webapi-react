import { useNavigate } from "react-router-dom";
import { House } from "./../types/house";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Config from "../config";
import axios, { AxiosError, AxiosResponse } from "axios";
import Problem from "../types/problem";
import { useEffect, useState } from "react";

// const useFetchHouses = (): House[] => {
//   const [allHouses, setAllHouses] = useState<House[]>([]);

//   useEffect(() => {
//     const fetchHouses = async () => {
//       const rsp = await fetch(`${Config.baseApiUrl}/houses`);
//       const houses = await rsp.json();
//       setAllHouses(houses);
//     };
//     fetchHouses();
//   }, []);

//   return allHouses;
// };

const useFetchHouses = () => {
  return useQuery<House[], AxiosError>("houses", () =>
    axios.get(`${Config.baseApiUrl}/houses`).then((resp) => resp.data)
  );
};

const useFetchHouse = (id: number) => {
  return useQuery<House, AxiosError>(["houses", id], () =>
    axios.get(`${Config.baseApiUrl}/house/${id}`).then((resp) => resp.data)
  );
};

const useAddHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError, House>(
    (h) => axios.post(`${Config.baseApiUrl}/houses`, h),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houses");
        nav("/");
      },
    }
  );
};

const useUpdateHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError<Problem>, House>(
    (h) => axios.put(`${Config.baseApiUrl}/houses`, h),
    {
      onSuccess: (_, house) => {
        queryClient.invalidateQueries("houses");
        nav(`/house/${house.id}`);
      },
    }
  );
};

const useDeleteHouse = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();
  return useMutation<AxiosResponse, AxiosError, House>(
    (h) => axios.delete(`${Config.baseApiUrl}/houses/${h.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("houses");
        nav("/");
      },
    }
  );
};

export {
  useFetchHouses,
  useFetchHouse,
  useAddHouse,
  useUpdateHouse,
  useDeleteHouse,
};
