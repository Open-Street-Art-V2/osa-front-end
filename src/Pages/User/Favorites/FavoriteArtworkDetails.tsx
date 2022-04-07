import { useContext } from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import {
  Carousel,
  FavoriteStar,
  Header,
  ReturnButton,
} from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { Art } from "../../../types/art";
import { User } from "../../../types/user";

type LocationDataType = {
  art: Art;
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isPrivate: boolean;
  // in the case of a search
  filter?: string;
  search?: string;
};

function FavoriteArtworkDetails() {
  const loginCtx = useContext(LoginContext);
  const { art, user, isPrivate, filter, search } = useLocation()
    .state as LocationDataType;
  const numPics = Object.keys(art.pictures).length;

  return (
    <>
      <Header />
      <div className="ml-4 mt-4 -mb-2">
        <ReturnButton
          url="/favorite-artworks"
          state={{ user, isPrivate, filter, search }}
        />
      </div>

      <Container component="main" maxWidth="xs" className="px-5 pb-20">
        <CssBaseline />

        <Box>
          <div className={isPrivate ? "flex justify-end pb-3" : "pb-5"}>
            {isPrivate && <FavoriteStar artId={art.id} />}
          </div>

          <div className="flex justify-between pb-3">
            <div className="font-bold text-xl">{art.title}</div>
            <div className="text-base text-right text-sky-700 ">
              <Moment date={art.created_at} format="DD/MM/YYYY" />
            </div>
          </div>

          <Box>
            <Carousel pictures={art.pictures} nbPictures={numPics} />
          </Box>

          <Box>
            <div className="py-4">
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

export default FavoriteArtworkDetails;
