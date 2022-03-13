import React, { useContext } from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import { Carousel, Header } from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";

function DetailsArtwork() {
  const loginCtx = useContext(LoginContext);
  const location = useLocation();
  const { data } = location.state as any;
  const numPics = Object.keys(data.pictures).length;

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" className="px-5 pb-16">
        <CssBaseline />

        {/* <Box>
          <p className="pt-7 font-sans text-2xl font-bold ">
            {data.user
              ? `${data.user.firstname} ${data.user.name}`
              : "Oeuvre d'origine"}
          </p>
        </Box> */}

        <Box>
          <Box>
            <p className="pb-5 text-base text-right text-sky-700 ">
              <Moment date={data.created_at} format="DD/MM/YYYY" />
            </p>
          </Box>

          <Box>
            <Carousel pictures={data.pictures} nbPictures={numPics} />
          </Box>

          <Box>
            <div className="py-4">
              <div className="font-bold text-xl mb-2">{data.title}</div>
              <blockquote>
                <p className="text-gray-700 text-base">{data.description}</p>
              </blockquote>
              <figcaption className="font-medium">
                {data.artist && (
                  <div className="text-lg mt-3 mb-2">
                    <span className="font-bold">Artiste : </span>
                    {data.artist}
                  </div>
                )}
                <div className="text-slate-700 dark:text-slate-500">
                  {data.address}, {data.city}
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
