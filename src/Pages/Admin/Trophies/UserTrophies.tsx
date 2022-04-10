import { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CssBaseline } from "@mui/material";
import { Header, ReturnButton } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { getTrophies } from "../ValidateProp/ValidateProp.service";
import Trophies from "../../../Components/Trophies";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { User } from "../../../types/user";

type LocationDataType = {
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isOwnProfil: boolean;
  // in the case of a search
  filter?: string;
  search?: string;
};

function UserTrophies() {
  const { t } = useTranslation();
  const [allTrophies, setAllTrophies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreTroph, setHasMoreTroph] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [updateComp, setUpdateComp] = useState(true);
  const loginCtx = useContext(LoginContext);
  const skeletons = [1, 2, 3, 4];
  const { user, isOwnProfil, filter, search } = useLocation()
    .state as LocationDataType;

  useEffect(() => {
    if (updateComp) {
      setAllTrophies([]);
      setIsLoading(true);
      setCurrentPage(1);
      setUpdateComp(false);
    }
  }, [updateComp]);

  useEffect(() => {
    if (currentPage === 1) {
      getTrophies(
        currentPage,
        loginCtx.user?.jwt,
        user.id,
        setHasMoreTroph,
        setAllTrophies,
        setCurrentPage,
        setIsLoading
      );
    }
  }, [currentPage]);

  return (
    <div className="container">
      <CssBaseline />
      <div className="">
        <Header />
        <div className="ml-4 mt-4 ">
          <ReturnButton
            url={isOwnProfil ? "/profil" : "/users-profile"}
            state={!isOwnProfil && { user, filter, search }}
          />
        </div>
        <br />

        <div className="grid grid-cols-3 gap-4 content-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl">
          <input className="bg-slate-700" />
          <p className="content-center text-2xl font-medium col-span-2">
            {t("trophies")}
          </p>
        </div>
      </div>
      <div
        id="scrollableDiv"
        className="overflow-auto h-[calc(100vh-364px)] py-2"
      >
        {isLoading &&
          skeletons.map((item: any) => {
            return (
              <div
                key={item}
                className="animate-pulse grid grid-cols-6 gap-1 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
              >
                <div className="flex flex-row col-span-5">
                  <div className="w-32 h-24 bg-slate-200 rounded-3xl" />
                  <div className="w-44 h-20 overflow-hidden pl-2">
                    <div className="flex flex-row justify-between mt-3 mb-2">
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                      <div className="h-2 w-12 bg-slate-200 rounded pt-1" />
                    </div>
                    <div className="mt-5">
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <InfiniteScroll
          dataLength={allTrophies.length}
          next={() => {
            getTrophies(
              currentPage,
              loginCtx.user?.jwt,
              loginCtx.user?.id,
              setHasMoreTroph,
              setAllTrophies,
              setCurrentPage,
              setIsLoading
            );
          }}
          hasMore={hasMoreTroph}
          loader={skeletons.map((item: any) => {
            return (
              <div
                key={item}
                className="animate-pulse grid grid-cols-6 gap-1 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
              >
                <div className="flex flex-row col-span-5">
                  <div className="w-32 h-24 bg-slate-200 rounded-3xl" />
                  <div className="w-44 h-20 overflow-hidden pl-2">
                    <div className="flex flex-row justify-between mt-3 mb-2">
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                      <div className="h-2 w-12 bg-slate-200 rounded pt-1" />
                    </div>
                    <div className="mt-5">
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                      <div className="h-2 bg-slate-200 rounded mb-2" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          scrollableTarget="scrollableDiv"
        >
          {!isLoading &&
            allTrophies.length > 0 &&
            allTrophies.map((Trophie: any) => {
              return (
                <div
                  key={Trophie.id}
                  className="flex content-center form-check w-full h-30 text-black rounded-3xl overflow-hidden py-2"
                >
                  <span className="grow mx-1">
                    <Trophies data={Trophie} />
                  </span>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}
export default UserTrophies;
