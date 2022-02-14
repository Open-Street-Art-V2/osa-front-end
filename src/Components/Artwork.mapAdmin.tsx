/* eslint-disable no-unused-vars */
import React, { useRef, useState, PureComponent, useEffect } from "react";
import LoginCtxProvider from "./Context/LoginCtxProvider";
// eslint-disable-next-line no-unused-vars
type info = {
  cluster: boolean;
  oeuvreId: number;
  name: string;
  artist: string;
};

export default function ArtMap(props: any) {
  // eslint-disable-next-line class-methods-use-this

  const { data } = props;
  const [deleted, setDeleted] = useState(false);
  const numPics = Object.keys(data.pictures).length;
  const baseURL = "http://localhost:3008/art/";
  // const [deleteResult, setDeleteResult] = useState(null);
  async function deleteDataById() {
    const id = data.oeuvreId;
    if (id) {
      // try {

      const res = await fetch(`${baseURL}${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im91c3NhbWFBZG1pbkBnbWFpbC5jb20iLCJzdWIiOjQsInJvbGUiOiJST0xFX0FETUlOIiwiaWF0IjoxNjQ0ODQzMzU3LCJleHAiOjE2NDQ4NDY5NTd9.roebXaoofbpE7lAgC5rkqZbC_rY0hy6k5DuNWyLeC_A`,
        },
      });
      const dataR = await res.json();
      console.log(dataR);
      setDeleted(true);
      // eslint-disable-next-line react/destructuring-assignment
      props.onDeleted(props.data.oeuvreId);
      /* const result = {
            status: `${res.status}-${res.statusText}`,
            headers: { "Content-Type": res.headers.get("Content-Type") },
            dataR,
          };
          setDeleteResult(fortmatResponse(result));
        } catch (err) {
          setDeleteResult(err.message);
        } */
    }
  }
  const fortmatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

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
      <div className="px-6 pt-2 pb-5">
        <div className="flex items-center justify-around">
          <button
            className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
          >
            Modifier
          </button>
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
