import { useContext, useEffect, useState } from "react";
import { Container, Box, CssBaseline, createTheme } from "@mui/material";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
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
import { getArt } from "../../../services/art.service";
import { Art } from "../../../types/art";

function FavoriteArtworkDetails() {
  const { id } = useParams();
  const loginCtx = useContext(LoginContext);
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

  const darkTheme = createTheme({
    palette: {
      mode: loginCtx.darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="h-screen w-sreen dark:bg-darkModePrim">
        <Header />
        <div className="ml-4 mt-4 -mb-2 dark:text-white">
          <ReturnButton goBack />
        </div>

        <Container component="main" maxWidth="xs" className="px-5 pb-20">
          <CssBaseline />

          {art && (
            <Box>
              <div
                className={
                  loginCtx.isLoggedIn ? "flex justify-end pb-3" : "pb-5"
                }
              >
                {loginCtx.isLoggedIn && <FavoriteStar id={art.id} isArt />}
              </div>

              <div className="flex justify-between pb-3">
                <div className="font-bold text-xl dark:text-white">
                  {art.title}
                </div>
                <div className="text-base text-right text-sky-700 dark:text-darkModeTextSec">
                  <Moment date={art.created_at} format="DD/MM/YYYY" />
                </div>
              </div>

              <Box>
                <Carousel pictures={art.pictures} nbPictures={numPics} />
              </Box>

              <Box>
                <div className="py-4">
                  <blockquote className="mb-2">
                    <p className="text-gray-700 text-base dark:text-darkModeTextPrem">
                      {art.description}
                    </p>
                  </blockquote>
                  <figcaption className="font-medium">
                    {art.artist && (
                      <div className="text-lg mt-3 mb-2 dark:text-white">
                        <span className="font-bold dark:text-[#7DCCAB]">
                          Artiste :{" "}
                        </span>
                        <span className="mx-2 dark:text-white">
                          {art.artist}
                        </span>
                      </div>
                    )}
                    <div className="text-slate-700 dark:text-slate-500">
                      {art.address}, {art.city}
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
    </ThemeProvider>
  );
}

export default FavoriteArtworkDetails;
