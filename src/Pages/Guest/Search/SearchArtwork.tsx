import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import { ArtworkSearchCard, Header } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import searchArt from "../../../services/art.service";
import { Art } from "../../../types/art";

function LoadingSkeleton() {
  return (
    <div>
      {[1, 2, 3, 4].map((item: any) => {
        return (
          <div key={item} className="animate-pulse mt-3 mx-2">
            <div className="flex flex-row col-span-5">
              <div className="w-28 h-24 bg-slate-200 rounded-3xl" />
              <div className="overflow-hidden pl-3">
                <div className="flex flex-row justify-between mt-3 mb-2">
                  <div className="h-2 w-32 bg-slate-200 rounded" />
                </div>
                <div className="mt-6 mr-2">
                  <div className="h-2 w-44 bg-slate-200 rounded mb-2" />
                  <div className="h-2 w-44 bg-slate-200 rounded mb-2" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type LocationDataType = {
  oldFilter?: string;
  oldSearch?: string;
};

function SearchArtwork() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<Art[] | null>(null);
  const currentFilter = useRef<string>("title");
  const submittedFilter = useRef<string>("title");

  // for infinite scroll
  const [hasMore, setHasMore] = useState<boolean>(true);
  const currentPage = useRef<number>(1);

  // if the user arrive from details artwork, we recharge his old search
  const location = useLocation().state as LocationDataType;
  useEffect(() => {
    if (location?.oldFilter && location?.oldSearch) {
      currentFilter.current = location?.oldFilter;
      submittedFilter.current = location?.oldFilter;
      setSearch(location?.oldSearch);

      setIsLoading(true);
      searchArt(location?.oldSearch, location?.oldFilter, currentPage.current)
        .then((res) => {
          setData(res.items);
          if (res.meta.totalPages === res.meta.currentPage) {
            setHasMore(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
          currentPage.current += 1;
        });
    }
  }, [location?.oldFilter, location?.oldSearch]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    currentFilter.current = event.target.value;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    if (search !== "") {
      submittedFilter.current = currentFilter.current;
      currentPage.current = 1;
      setHasMore(true);

      setIsLoading(true);
      searchArt(search, submittedFilter.current, currentPage.current)
        .then((res) => {
          setData(res.items);
          if (res.meta.totalPages === res.meta.currentPage) {
            setHasMore(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
          currentPage.current += 1;
        });
    }
  };

  const fetchArts = () => {
    setIsLoading(true);
    searchArt(search, submittedFilter.current, currentPage.current)
      .then((res) => {
        setData((old: any) => [...old, ...res.items]);
        if (res.meta.totalPages === res.meta.currentPage) {
          setHasMore(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
        currentPage.current += 1;
      });
  };

  return (
    <div>
      <Header />

      <div className="absolute right-0 pt-2 mx-3 w-2/5">
        <select
          className="form-select appearance-none block w-full py-1.5 pl-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={currentFilter.current}
          onChange={handleSelectChange}
        >
          <option value="title">{t("filter.title")}</option>
          <option value="city">{t("filter.city")}</option>
          <option value="artist">{t("filter.artist")}</option>
        </select>
      </div>

      <div className="relative z-10 mt-12 mx-3">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search-input"
          className="block p-2 px-10 w-full text-gray-900 bg-gray-50 rounded-xl border border-gray-300 sm:text-sm focus:ring-gray-500 focus:border-gray-50"
          placeholder={t("search.arts")}
          value={search}
          onChange={handleInputChange}
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-500">
          <button type="button" id="search-button" onClick={handleClick}>
            {t("ok")}
          </button>
        </div>
      </div>

      {data && (
        <div className="mx-3 -mt-2 pt-3 pb-3 mb-24 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
          <InfiniteScroll
            dataLength={data.length}
            next={() => fetchArts()}
            hasMore={hasMore}
            loader={isLoading && <LoadingSkeleton />}
          >
            {data.length === 0 ? (
              <div className="pt-1 text-center">{t("no.result")}</div>
            ) : (
              data.map((art: Art) => {
                return (
                  <div key={art.id} className="mt-3 mx-2">
                    <Link
                      to="/details-artwork"
                      state={{ art, filter: submittedFilter.current, search }}
                      className="w-fit"
                    >
                      <ArtworkSearchCard data={art} />
                    </Link>
                  </div>
                );
              })
            )}
          </InfiniteScroll>
        </div>
      )}

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default SearchArtwork;
