import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { LoginContext } from "./Context/LoginCtxProvider";

// eslint-disable-next-line no-unused-vars
/* type info = {
  cluster: boolean;
  oeuvreId: number;
  name: string;
  artist: string;
}; */

export default function ArtMap(props: any) {
  const { data, coords } = props;
  const numPics = Object.keys(data.pictures).length;
  const baseURL = `${process.env.REACT_APP_API}/art/`;
  const loginCtx = useContext(LoginContext);
  const [unauthorizedError, setUnauthorizedError] = useState<boolean>();

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
          // const dataR = await res.json();
          // eslint-disable-next-line react/destructuring-assignment
          props.onDeleted(props.data.oeuvreId);
        } else if (res.status === 401 || res.status === 404) {
          setUnauthorizedError(true);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  }

  return (
    <div className="popupCard2">
      <div
        id="carouselExampleCaptions"
        className="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          {numPics !== 1 &&
            data.pictures.map((pic: any, index: any) => {
              if (index === 0) {
                return (
                  <button
                    type="button"
                    key={pic.position}
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to={index}
                    className="active"
                    aria-current="true"
                    aria-label="Slide"
                  />
                );
              }
              return (
                <button
                  type="button"
                  key={pic.position}
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={index}
                  aria-label="Slide"
                />
              );
            })}
        </div>

        <div className="carousel-inner relative w-full overflow-hidden">
          {data.pictures.map((pic: any, index: any) => {
            if (index === 0) {
              return (
                <div
                  key={pic.position}
                  className="carousel-item active relative float-left w-full"
                >
                  <div className="relative overflow-hidden bg-no-repeat bg-cover">
                    <img
                      src={`./../${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                      className="block w-full"
                      alt={`${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                    />
                    <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
                  </div>
                </div>
              );
            }
            return (
              <div
                key={pic.position}
                className="carousel-item relative float-left w-full"
              >
                <div className="relative overflow-hidden bg-no-repeat bg-cover">
                  <img
                    src={`./../${process.env.REACT_APP_IMAGES_PATH}${pic.url}`}
                    className="block object-fill w-full"
                    alt="Failed to load"
                  />
                  <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
                </div>
              </div>
            );
          })}
        </div>
        {numPics !== 1 && (
          <div>
            <button
              id="btnPrevImg"
              className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon inline-block bg-no-repeat"
                aria-hidden="true"
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              id="btnNextImg"
              className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon inline-block bg-no-repeat"
                aria-hidden="true"
              />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}

        <button
          type="button"
          id="closeBtn"
          className="absolute top-0 right-0 bg-white rounded-full p-2 inline-flex m-2"
          // eslint-disable-next-line react/destructuring-assignment
          onClick={props.onClose}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.title}</div>
        <blockquote>
          <p className="text-gray-700 text-base">{data.description}</p>
        </blockquote>
        <figcaption className="font-medium">
          <div className="text-sky-500 dark:text-sky-400 text-lg mt-3">
            Artiste : {data.artist}
          </div>
          <div className="text-slate-700 dark:text-slate-500">
            {data.address}
          </div>
        </figcaption>
      </div>
      <div className="px-6 pt-2 pb-2">
        <AnimatePresence initial exitBeforeEnter>
          {unauthorizedError && (
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
              <Alert severity="error">Vous êtes pas autorisé</Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
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
              Modifier
            </button>
          </Link>
          <button
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={deleteDataById}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
