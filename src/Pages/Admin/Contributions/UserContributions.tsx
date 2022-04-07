import { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CssBaseline } from "@mui/material";
import {
  Header,
  ArtworkProposal,
  ReturnButton,
  SkeletonArt,
} from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { getContributions } from "../ValidateProp/ValidateProp.service";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { User } from "../../../types/user";

type LocationDataType = {
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isPrivate: boolean;
  // in the case of a search
  filter?: string;
  search?: string;
};

function UserContributions() {
  const { t } = useTranslation();
  const [allArtwork, setAllArtwork] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [updateComp, setUpdateComp] = useState(true);
  const loginCtx = useContext(LoginContext);
  const skeletons = [1, 2, 3, 4];
  const { user, isPrivate, filter, search } = useLocation()
    .state as LocationDataType;

  useEffect(() => {
    if (updateComp) {
      setAllArtwork([]);
      setIsLoading(true);
      setCurrentPage(1);
      setUpdateComp(false);
    }
  }, [updateComp]);

  useEffect(() => {
    if (currentPage === 1) {
      getContributions(
        currentPage,
        loginCtx.user?.jwt,
        user.id,
        setHasMoreProp,
        setAllArtwork,
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
            url={isPrivate ? "/profil" : "/users-profile"}
            state={!isPrivate && { user, filter, search }}
          />
        </div>
        <br />

        <div className="flex justify-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl">
          <p className="m-auto text-2xl font-medium">
            {t("contributions.upper")}
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
                <SkeletonArt />
              </div>
            );
          })}
        <InfiniteScroll
          dataLength={allArtwork.length}
          next={() => {
            getContributions(
              currentPage,
              loginCtx.user?.jwt,
              loginCtx.user?.id,
              setHasMoreProp,
              setAllArtwork,
              setCurrentPage,
              setIsLoading
            );
          }}
          hasMore={hasMoreProp}
          loader={skeletons.map((item: any) => {
            return (
              <div
                key={item}
                className="animate-pulse grid grid-cols-6 gap-1 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
              >
                <SkeletonArt />
              </div>
            );
          })}
          scrollableTarget="scrollableDiv"
        >
          {!isLoading &&
            allArtwork.length > 0 &&
            allArtwork.map((Artwork: any) => {
              return (
                <div
                  key={Artwork.id}
                  className="flex content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
                >
                  <Link
                    to="/UserDetailsContribution"
                    state={{ data: Artwork, user, isPrivate, filter, search }}
                    className="grow mx-1"
                  >
                    <ArtworkProposal data={Artwork} />
                  </Link>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}
export default UserContributions;
