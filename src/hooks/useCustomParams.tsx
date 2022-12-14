import { useEffect } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";

interface Params {
  page: number;
  search?: string;
}

export const useCustomParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page"));
  const searchParam = searchParams.get("search");

  useEffect(() => {
   if(pageParam < 1) {
     setSearchParams(
       createSearchParams({
         page: "1",
       })
     );
   }
  }, [pageParam, setSearchParams]);

  return {
    params: {
      page: pageParam,
      search: searchParam ?? "",
    },
    setParams: (params: Params) => {
      params.search
        ? setSearchParams(
            createSearchParams({
              page: params.page.toString(),
              search: params.search,
            })
          )
        : setSearchParams({ page: params.page.toString() });
    },
  };
};
