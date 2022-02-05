import React, { PureComponent } from "react";

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
        <div className="relative">
          <img
            className="w-full"
            src="artwork3.jpeg"
            alt="Sunset in the mountains"
          />
          <button
            type="button"
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
