import { useQuery } from "@tanstack/react-query";
import { getHome } from "./home.axios";

export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => getHome(),
  });
};
