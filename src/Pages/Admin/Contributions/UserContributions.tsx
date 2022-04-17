import { useEffect, useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import {
  Header,
  ArtworkProposal,
  ReturnButton,
  SkeletonCardArt,
} from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { getContributions } from "../ValidateProp/ValidateProp.service";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";

function UserContributions() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [allArtwork, setAllArtwork] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreProp, setHasMoreProp] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [updateComp, setUpdateComp] = useState(true);
  const loginCtx = useContext(LoginContext);
  const skeletons = [1, 2, 3, 4];
  const darkTheme = createTheme({
    palette: {
      mode: loginCtx.darkMode ? "dark" : "light",
    },
  });

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
        id,
        setHasMoreProp,
        setAllArtwork,
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

          <div className="flex justify-center form-check w-full h-16 bg-slate-700 dark:bg-darkModeTextSec text-white rounded-3xl shadow-xl">
            <p className="m-auto text-2xl font-medium dark:text-slate-50">
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
                  <SkeletonCardArt />
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
                  <SkeletonCardArt />
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
                      to={`/UserDetailsContribution/${Artwork.id}`}
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
    </ThemeProvider>
  );
}
export default UserContributions;
