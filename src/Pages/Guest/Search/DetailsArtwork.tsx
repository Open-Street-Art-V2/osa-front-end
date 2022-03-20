import { useContext } from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Moment from "react-moment";
import { AiOutlineLeft } from "react-icons/ai";
import { Carousel, Header } from "../../../Components";
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
    <>
      <Header />
      <Box
        sx={{
          marginTop: 0,
          width: "100%",
          display: "absolute",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          id="btnRetour"
          className="flex flex-row place-content-between hTitle pt-4"
        >
          <Link
            to="/search"
            state={{ oldFilter: filter, oldSearch: search }}
            className="inline-flex items-center"
          >
            <button
              type="button"
              id="retBtn"
              className="inline-flex items-center justify-center w-10 h-10 z-10 ml-4 bg-slate-700 text-white text-2xl rounded-2xl"
            >
              <AiOutlineLeft />
            </button>
          </Link>
        </div>
      </Box>

      <Container component="main" maxWidth="xs" className="px-5 pb-20">
        <CssBaseline />

        <Box>
          <Box>
            <p className="pb-5 text-base text-right text-sky-700 ">
              <Moment date={art.created_at} format="DD/MM/YYYY" />
            </p>
          </Box>

          <Box>
            <Carousel pictures={art.pictures} nbPictures={numPics} />
          </Box>

          <Box>
            <div className="py-4">
              <div className="font-bold text-xl mb-2">{art.title}</div>
              <blockquote className="mb-2">
                <p className="text-gray-700 text-base">{art.description}</p>
              </blockquote>
              <figcaption className="font-medium">
                {art.artist && (
                  <div className="text-lg mt-3 mb-2">
                    <span className="font-bold">Artiste : </span>
                    {art.artist}
                  </div>
                )}
                <div className="text-slate-700 dark:text-slate-500">
                  {art.address}, {art.city}
                </div>
              </figcaption>
            </div>
          </Box>
        </Box>
      </Container>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default DetailsArtwork;
