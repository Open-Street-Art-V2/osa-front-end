import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Alert } from "@mui/material";
import MobileDetect from "mobile-detect";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { LoginContext } from "./Context/LoginCtxProvider";
import Carousel from "./Carousel";
import FavoriteStar from "./FavoriteStar";

export default function ArtworkDetails(props: any) {
  const { t } = useTranslation();
  const { data, coords, lat, long } = props;
  const numPics = Object.keys(data.pictures).length;
  const loginCtx = useContext(LoginContext);
  const [unauthorizedError, setUnauthorizedError] = useState<boolean>();
  const baseURL = `${process.env.REACT_APP_API}/art/`;
  const type = new MobileDetect(window.navigator.userAgent);

  async function deleteDataById() {
    const id = data.oeuvreId;
    if (id) {
      try {
        setUnauthorizedError(false);
        const res: Response = await fetch(`${baseURL}${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${loginCtx.user?.jwt}`,
          },
        });
        if (res.ok) {
          // eslint-disable-next-line react/destructuring-assignment
          props.onDeleted(props.data.oeuvreId);
        } else if (res.status === 401 || res.status === 404) {
          setUnauthorizedError(true);
        } else {
          setUnauthorizedError(true);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }
  const openItinerary = () => {
    if (type.os() !== "IOS" || type.os() !== "MacOs") {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${lat},${long}&destination=${coords[1]},${coords[0]}`
      );
    } else {
      window.open(
        `http://maps.apple.com/?saddr=${lat},${long}&daddr=${coords[1]},${coords[0]}`
      );
    }
  };

  return (
    <div className="popupCard2 pb-20">
      <button
        type="button"
        className="fixed right-0 bg-white rounded-full z-10 p-2 m-2"
        // eslint-disable-next-line react/destructuring-assignment
        onClick={props.onClose}
      >
        <GrClose />
      </button>

      <Carousel pictures={data.pictures} nbPictures={numPics} />
      <div className="px-6 py-4">
        <div className="flex justify-between mb-2">
          <div className="font-bold text-xl">{data.title}</div>
          <FavoriteStar artId={data.oeuvreId} />
        </div>
        <div className="text-gray-700 text-base">{data.description}</div>
        <div className="font-medium">
          <div className="font-medium text-sky-500 text-md mt-3">
            {t("artist")} : {data.artist}
          </div>
          <div className="text-slate-700 text-sm">{data.address}</div>
        </div>
      </div>
      {unauthorizedError && (
        <div className="px-6 pt-2 pb-2">
          <AnimatePresence initial exitBeforeEnter>
            <motion.div
              variants={{
                hidden: {
                  scale: 0.5,
                  y: "+30vh",
                  opacity: 0,
                },
                visible: {
                  y: "0",
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 1.5,
                    type: "spring",
                    damping: 25,
                    stiffness: 400,
                  },
                },
                exit: {
                  x: "-30vh",
                  opacity: 0,
                  scale: 0.5,
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Alert severity="error">{t("permession")}</Alert>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_USER" && (
        <div className="px-6 pt-2 pb-5">
          <div className="flex items-center justify-around">
            <Link
              to="/user/contribution"
              state={{ artwork: data, coords }}
              className=""
            >
              <button
                className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
              >
                {t("modify")}
              </button>
            </Link>
          </div>
        </div>
      )}
      {loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_ADMIN" && (
        <div className="px-6 pt-2 pb-5">
          <div className="flex items-center justify-around">
            <Link
              to="/admin/modifyForm"
              state={{ artwork: data, coords }}
              className=""
            >
              <button
                className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
              >
                {t("modify")}
              </button>
            </Link>
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={deleteDataById}
            >
              {t("delete")}
            </button>
            <button
              className="bg-amber-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={openItinerary}
            >
              {t("itinerary")}
            </button>
          </div>
        </div>
      )}
      {loginCtx.user?.role !== "ROLE_ADMIN" && (
        <div className="px-6 pt-2 pb-5">
          <div className="flex items-center justify-around">
            <button
              className="bg-amber-400 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={openItinerary}
            >
              {t("itinerary")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
