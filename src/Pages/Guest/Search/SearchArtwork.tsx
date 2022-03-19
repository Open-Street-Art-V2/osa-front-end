import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { ArtworkSearchCard, Header } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import searchArt from "../../../services/art.service";
import { Art } from "../../../types/art";

function LoadingSkeleton() {
  return (
    <div className="mx-3 -mt-2 pt-3 pb-3 mb-20 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
      {[1, 2, 3, 4].map((item: any) => {
        return (
          <div
            key={item}
            className="animate-pulse grid grid-cols-6 gap-1 mt-3 mx-2 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
          >
            <div className="flex flex-row col-span-5">
              <div className="w-36 h-24 bg-slate-200 rounded-3xl" />
              <div className="overflow-hidden pl-3">
                <div className="flex flex-row justify-between mt-3 mb-2">
                  <div className="h-2 w-24 bg-slate-200 rounded" />
                  <div className="h-2 w-12 bg-slate-200 rounded pt-1" />
                </div>
                <div className="mt-6">
                  <div className="h-2 bg-slate-200 rounded mb-2" />
                  <div className="h-2 bg-slate-200 rounded mb-2" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SearchArtwork() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("title");
  const [data, setData] = useState<Art[] | null>(null);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    if (search !== "") {
      setIsLoading(true);
      searchArt(search, filter, 1)
        .then((res) => {
          setData(res.items);
          if (res.meta.totalPages === res.meta.currentPage) {
            setHasMore(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setCurrentPage(currentPage + 1);
        });
    }
  };

  const fetchArts = () => {
    setIsLoading(true);
    searchArt(search, filter, currentPage)
      .then((res) => {
        setData((old: any) => [...old, ...res.items]);
        if (res.meta.totalPages === res.meta.currentPage) {
          setHasMore(false);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentPage(currentPage + 1);
      });
  };

  return (
    <div>
      <Header />

      <div className="absolute right-0 pt-2 mx-3 w-2/5">
        <select
          className="form-select appearance-none block w-full py-1.5 pl-2 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
          onChange={handleInputChange}
        />
        <div className="flex absolute inset-y-0 right-0 items-center pr-3 text-gray-500">
          <button type="button" id="search-button" onClick={handleClick}>
            {t("ok")}
          </button>
        </div>
      </div>

      {data && (
        <div className="mx-3 -mt-2 pt-3 pb-3 mb-20 z-0 border border-gray-300 bg-gray-100 drop-shadow-lg rounded-b-lg">
          <InfiniteScroll
            dataLength={data.length}
            next={() => fetchArts()}
            hasMore={hasMore}
            loader={isLoading && <LoadingSkeleton />}
          >
            {data.length === 0 ? (
              <div className="pt-1 text-center">{t("no.result")}</div>
            ) : (
              data.map((art: any) => {
                return (
                  <div key={art.id} className="mt-3 mx-2">
                    <Link
                      to="/details-artwork"
                      state={{ data: art }}
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
