import { CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";
import {
  ArtworkProposal,
  Header,
  ReturnButton,
  SkeletonArt,
} from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { getFavoriteArts } from "../../../services/favorite.service";
import { Art } from "../../../types/art";
import { User } from "../../../types/user";

type LocationDataType = {
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isPrivate: boolean;
  // in the case of a search
  filter?: string;
  search?: string;
};

function FavoriteArtworks() {
  const { t } = useTranslation();
  const skeletons = [1, 2, 3, 4];
  const loginCtx = useContext(LoginContext);
  const [arts, setArts] = useState<Art[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isPrivate, filter, search } = useLocation()
    .state as LocationDataType;

  useEffect(() => {
    if (currentPage === 1) {
      getFavoriteArts(
        user?.id,
        currentPage,
        loginCtx.user?.jwt,
        setHasMoreProp,
        setArts,
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
          <p className="m-auto text-2xl font-medium">{t("favorite.arts")}</p>
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
          dataLength={arts.length}
          next={() => {
            getFavoriteArts(
              user.id,
              currentPage,
              loginCtx.user?.jwt,
              setHasMoreProp,
              setArts,
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
            arts.length > 0 &&
            arts.map((art: Art) => {
              return (
                <div
                  key={art.id}
                  className="flex content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
                >
                  <Link
                    to="/favorite-artwork-details"
                    state={{ art, user, isPrivate, filter, search }}
                    className="grow mx-1"
                  >
                    <ArtworkProposal data={art} />
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

export default FavoriteArtworks;
