import React, { PureComponent } from "react";
import "tw-elements";

type info = {
  cluster: boolean;
  oeuvreId: number;
  name: string;
  artist: string;
};

export default class ArtArtwork extends PureComponent<{
  data: info;
  onClose: any;
}> {
  render() {
    const { data } = this.props;
    return (
      <div className="popupCard2 max-w-sm rounded overflow-hidden shadow-lg">
        <div
          id="carouselExampleCaptions"
          className="carousel slide relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            />
          </div>

          <div className="carousel-inner relative w-full overflow-hidden">
            <div className="carousel-item active relative float-left w-full">
              <div className="relative overflow-hidden bg-no-repeat bg-cover">
                <img src="artwork1.jpeg" className="block w-full" alt="First" />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
              </div>
            </div>
            <div className="carousel-item relative float-left w-full">
              <div className="relative overflow-hidden bg-no-repeat bg-cover">
                <img
                  src="artwork2.jpeg"
                  className="block w-full"
                  alt="Second"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
              </div>
            </div>
            <div className="carousel-item relative float-left w-full">
              <div className="relative overflow-hidden bg-no-repeat bg-cover">
                <img src="artwork3.jpeg" className="block w-full" alt="Third" />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
              </div>
            </div>
          </div>
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
          <button
            type="button"
            id="closeBtn"
            className="absolute top-0 right-0 bg-white rounded-md p-2 inline-flex m-2"
            // eslint-disable-next-line react/destructuring-assignment
            onClick={this.props.onClose}
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
          <div className="font-bold text-xl mb-2">{data.artist}</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
          <p className="text-slate-500 mt-3">
            Pl. de la Cathédrale, 76000 Rouen
          </p>
          <p className="text-slate-500 mt-0">Contributeur : {data.artist}</p>
        </div>
      </div>
    );
  }
}
