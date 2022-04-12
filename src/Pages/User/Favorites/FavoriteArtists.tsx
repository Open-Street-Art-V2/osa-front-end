import { CssBaseline } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import {
  Header,
  ReturnButton,
  SkeletonCardArt,
  UserSearchCard,
} from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { getFavoriteArtists } from "../../../services/favorite.service";
import { User } from "../../../types/user";

function FavoriteArtists() {
  const { t } = useTranslation();
  const { id } = useParams();
  const skeletons = [1, 2, 3, 4];
  const loginCtx = useContext(LoginContext);
  const [artists, setArtists] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentPage === 1) {
      getFavoriteArtists(
        id,
        currentPage,
        loginCtx.user?.jwt,
        setHasMoreProp,
        setArtists,
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
          <ReturnButton goBack />
        </div>
        <br />

        <div className="flex justify-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl">
          <p className="m-auto text-2xl font-medium">{t("favorite.artists")}</p>
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
                <SkeletonCardArt />
              </div>
            );
          })}
        <InfiniteScroll
          dataLength={artists.length}
          next={() => {
            getFavoriteArtists(
              id,
              currentPage,
              loginCtx.user?.jwt,
              setHasMoreProp,
              setArtists,
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
                <SkeletonCardArt />
              </div>
            );
          })}
          scrollableTarget="scrollableDiv"
        >
          {!isLoading &&
            artists.length > 0 &&
            artists.map((artist: User) => {
              return (
                <div
                  key={artist.id}
                  className="flex content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
                >
                  <Link
                    to={`/users-profile/${artist?.id}`}
                    state={{ isSearch: false }}
                    className="grow mx-1"
                  >
                    <UserSearchCard data={artist} />
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

export default FavoriteArtists;
