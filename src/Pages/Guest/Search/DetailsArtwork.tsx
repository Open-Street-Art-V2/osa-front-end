import { useContext } from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import { Carousel, Header, ReturnButton } from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { Art } from "../../../types/art";

type LocationDataType = {
  art: Art;
  filter?: string;
  search?: string;
};

function DetailsArtwork() {
  const loginCtx = useContext(LoginContext);
  const { art, filter, search } = useLocation().state as LocationDataType;
  const numPics = Object.keys(art.pictures).length;

  return (
    <div className="dark:bg-darkModePrim">
      <Header />
      <div className="ml-4 mt-4 -mb-1 dark:text-white">
        <ReturnButton
          url="/search"
          state={{ oldFilter: filter, oldSearch: search }}
        />
      </div>

      <Container component="main" maxWidth="xs" className="px-5 pb-20">
        <CssBaseline />

        <Box>
          <Box>
            <p className="pb-5 text-base text-right text-sky-700 dark:text-[#7DCCAB] ">
              <Moment date={art.created_at} format="DD/MM/YYYY" />
            </p>
          </Box>

          <Box>
            <Carousel pictures={art.pictures} nbPictures={numPics} />
          </Box>

          <Box>
            <div className="py-4">
              <div className="font-bold text-xl mb-2 dark:text-[#7DCCAB]">
                {art.title}
              </div>
              <blockquote className="mb-2">
                <p className="text-gray-700 dark:text-white text-base">
                  {art.description}
                </p>
              </blockquote>
              <figcaption className="font-medium">
                {art.artist && (
                  <div className="text-lg mt-3 mb-2 dark:text-white">
                    <span className="font-bold dark:text-[#7DCCAB]">
                      Artiste :
                    </span>
                    <span className="mx-2 dark:text-white">{art.artist}</span>
                  </div>
                )}
                <div className="text-slate-700 dark:text-white">
                  {art.address}, {art.city}
                </div>
              </figcaption>
            </div>
          </Box>
        </Box>
      </Container>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </div>
  );
}

export default DetailsArtwork;
