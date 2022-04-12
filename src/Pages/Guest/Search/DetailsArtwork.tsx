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
    <>
      <Header />
      <div className="ml-4 mt-4 -mb-2">
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
            <div className="flex justify-end pb-3">
              <FavoriteStar id={art.id} isArt />
            </div>

            <div className="flex justify-between pb-3">
              <div className="font-bold text-xl">{art?.title}</div>
              <div className="text-base text-right text-sky-700 ">
                <Moment date={art?.created_at} format="DD/MM/YYYY" />
              </div>
            </div>

            <Box>
              <Carousel pictures={art?.pictures} nbPictures={numPics} />
            </Box>

            <Box>
              <div className="py-4">
                <blockquote className="mb-2">
                  <p className="text-gray-700 text-base">{art?.description}</p>
                </blockquote>
                <figcaption className="font-medium">
                  {art?.artist && (
                    <div className="text-lg mt-3 mb-2">
                      <span className="font-bold">Artiste : </span>
                      {art?.artist}
                    </div>
                  )}
                  <div className="text-slate-700 dark:text-slate-500">
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
    </>
  );
}

export default DetailsArtwork;
