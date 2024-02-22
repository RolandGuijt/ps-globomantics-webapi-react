import axios, { AxiosError } from "axios";
import Config from "../config";
import { Claim } from "../types/claim";
import { useQuery } from "@tanstack/react-query";

const useFetchUser = () => {
  return useQuery<Claim[], AxiosError>({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`${Config.baseApiUrl}/account/user?slide=false`)
        .then((resp) => resp.data),
  });
};
export default useFetchUser;
