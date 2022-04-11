import { useContext } from "react";
import { Container, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import { FcManager } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { FavoriteStar, Header, ReturnButton } from "../../../Components";
import NavBar from "../../../Components/NavBar";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { User } from "../../../types/user";

type LocationDataType = {
  artist: User;
  user: User;
  // to know if we are on our personnal profil or on another user profil
  isPrivate: boolean;
  // in the case of a search
  filter?: string;
  search?: string;
};

function FavoriteArtistDetails() {
  const { t } = useTranslation();
  const loginCtx = useContext(LoginContext);
  const { artist, user, isPrivate, filter, search } = useLocation()
    .state as LocationDataType;

  return (
    <>
      <Header />
      <div className="ml-4 mt-4 -mb-2">
        <ReturnButton
          url="/favorite-artists"
          state={{ user, isPrivate, filter, search }}
        />
      </div>

      <Container component="main" maxWidth="xs" className="px-5 pb-20">
        <CssBaseline />

        <div className="flex justify-end -mb-2 -mt-3 pr-5">
          <FavoriteStar id={artist.id} isArt={false} />
        </div>

        <div className="p-3">
          <div className=" p-6 h-20 grid grid-cols-3 gap-4 content-center">
            <div className="flex items-center text-5xl">
              <FcManager className="items-center text-6xl" />
            </div>
            <div className="col-span-2 items-center">
              <div className="flex items-center text-black-800 font-bold text-xl">
                {artist?.firstname} {artist?.name}
              </div>
              <p className="text-gray-600 ">
                {artist?.role === "ROLE_ADMIN" ? t("admin") : t("contributor")}
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-black ml-8">
          {t("name")}: {artist?.name}
        </h1>
        <h1 className="text-black ml-8">
          {t("fname")}: {artist?.firstname}
        </h1>
        {artist?.email && (
          <h1 className="text-black ml-8">
            {t("email")}: {artist?.email}
          </h1>
        )}
      </Container>

      {loginCtx.user?.role === "ROLE_ADMIN" ? <NavBar /> : <NavBarUser />}
    </>
  );
}

export default FavoriteArtistDetails;
