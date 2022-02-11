import React, { PureComponent } from "react";
import { AiOutlineClose } from "react-icons/ai";

type info = {
  cluster: boolean;
  oeuvreId: number;
  name: string;
  artist: string;
};

export default class ArtMap extends PureComponent<{
  data: info;
  onClose: any;
}> {
  render() {
    const { data } = this.props;
    return (
      <div className="popupCard2">
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
                <img
                  src="./../artwork3.jpeg"
                  className="block w-full"
                  alt="First"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
              </div>
            </div>
            <div className="carousel-item relative float-left w-full">
              <div className="relative overflow-hidden bg-no-repeat bg-cover">
                <img
                  src="./../artwork4.jpeg"
                  className="blockw-full"
                  alt="Second"
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-black opacity-0" />
              </div>
            </div>
            <div className="carousel-item relative float-left w-full">
              <div className="relative overflow-hidden bg-no-repeat bg-cover">
                <img
                  src="./../artwork1.jpeg"
                  className="block w-full"
                  alt="Third"
                />
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
            className="absolute top-0 right-0 inline-flex items-center justify-center bg-white m-2 w-10 h-10 text-slate-900 text-2xl rounded-3xl"
            // eslint-disable-next-line react/destructuring-assignment
            onClick={this.props.onClose}
          >
            <AiOutlineClose />
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
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    );
  }
}
