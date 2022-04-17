import { useContext, useEffect, useState } from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  Carousel,
  FavoriteStar,
  Header,
  ReturnButton,
  SkeletonArt,
} from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { Art } from "../../../types/art";
import { getArt } from "../../../services/art.service";

type LocationDataType = {
  filter?: string;
  search?: string;
};

function DetailsArtwork() {
  const loginCtx = useContext(LoginContext);
  const { id } = useParams();
  const location = useLocation().state as LocationDataType;
  const [art, setArt] = useState<Art>();
  const [numPics, setNumPics] = useState<number>(0);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getArt(id)
      .then((o: any) => {
        setArt(o.art);
        setNumPics(Object.keys(o.art.pictures).length);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="dark:bg-darkModePrim">
      <Header />
      <div className="ml-4 mt-4 -mb-1 dark:text-white">
        <ReturnButton
          url={
            location
              ? `/search/${location?.filter}/${location?.search}`
              : "/search"
          }
        />
      </div>

      <Container component="main" maxWidth="xs" className="px-5 pb-20">
        <CssBaseline />

        {art && (
          <Box>
            <div
              className={loginCtx.isLoggedIn ? "flex justify-end pb-3" : "pb-5"}
            >
              {loginCtx.isLoggedIn && <FavoriteStar id={art.id} isArt />}
            </div>
            <div className="flex justify-between mb-3 mt-5 mx-2">
              <div className="grow font-bold text-slate-900 dark:text-white text-2xl overflow-hidden">
                {art?.title}
              </div>
              <div className="flex text-sky-600 dark:text-darkModeTextSec text-lg items-center overflow-hidden">
                <Moment date={art?.created_at} format="DD/MM/YYYY" />
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden">
              <Carousel pictures={art?.pictures} nbPictures={numPics} />
            </div>

            <Box>
              <div className="py-4 px-1">
                <blockquote className="my-2">
                  <p className="text-slate-600 text-lg dark:text-darkModeTextPrem">
                    {art?.description}
                  </p>
                </blockquote>
                <figcaption className="font-medium">
                  {art?.artist && (
                    <div className="text-lg mt-3 dark:text-white">
                      <span className="font-bold dark:text-[#7DCCAB]">
                        Artiste :
                      </span>
                      <span className="mx-2 dark:text-white">
                        {art?.artist}
                      </span>
                    </div>
                  )}
                  <div className="text-sky-700 text-base dark:text-slate-400">
                    {art?.address}, {art?.city}
                  </div>
                </figcaption>
              </div>
            </Box>
          </Box>
        )}

        {loading && (
          <div className="pt-12">
            <SkeletonArt />
          </div>
        )}
      </Container>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default DetailsArtwork;
