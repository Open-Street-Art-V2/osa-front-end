import { CssBaseline, createTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import {
  Header,
  ReturnButton,
  SkeletonCardArt,
  UserSearchCard,
} from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { getFavoriteArtists } from "../../../services/favorite.service";
import { User } from "../../../types/user";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";

function FavoriteArtists() {
  const { t } = useTranslation();
  const { id } = useParams();
  const skeletons = [1, 2, 3, 4];
  const loginCtx = useContext(LoginContext);
  const [artists, setArtists] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: loginCtx.darkMode ? "dark" : "light",
    },
  });

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
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <CssBaseline />
        <div className="">
          <Header />
          <div className="ml-4 mt-4 ">
            <ReturnButton goBack />
          </div>
          <br />

          <div className="flex justify-center form-check w-full h-16 bg-slate-700 dark:bg-darkModeTextSec text-white rounded-3xl shadow-xl dark:bg-darkModeTextSec">
            <p className="m-auto text-2xl font-medium dark:text-slate-50">
              {t("favorite.artists")}
            </p>
          </div>
        </div>
        <div
          id="scrollableDiv"
          className="overflow-auto h-[calc(100vh-214px)] py-2 pb-20"
        >
          {isLoading &&
            skeletons.map((item: any) => {
              return (
                <div
                  key={item}
                  className="w-full h-30 justify-between content-center rounded-3xl overflow-hidden p-2"
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
                  className="w-full h-30 justify-between content-center rounded-3xl overflow-hidden p-2"
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
    </ThemeProvider>
  );
}

export default FavoriteArtists;
