import { useState } from "react";
import Moment from "react-moment";

export default function ArtworkProposal(props: any) {
  const { data } = props;
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  function handleImageLoad() {
    setImageLoaded(true);
  }
  return (
    <div className="flex flex-row col-span-5">
      <div className="flex-none w-32 h-24">
        {!imageLoaded && (
          <div className="animate-pulse w-32 h-24 bg-slate-200 rounded-3xl" />
        )}

        {data.pictures[0] && (
          <img
            className="object-cover justify-self-center self-center w-32 h-24 rounded-3xl"
            src={`./../${process.env.REACT_APP_IMAGES_PATH}${data.pictures[0].url}`}
            alt="Failed to load"
            onLoad={handleImageLoad}
            style={imageLoaded ? {} : { display: "none" }}
          />
        )}
      </div>
      <div className="grow h-20 overflow-hidden ml-2">
        <div className="flex justify-between mb-2">
          <div className="grow font-bold text-slate-900 text-base overflow-hidden w-16">
            {data.title}
          </div>
          <div className="text-sky-600 text-xs pt-1 pl-2 overflow-hidden">
            <Moment date={data.created_at} format="DD/MM/YYYY" />
          </div>
        </div>
        <p className="text-gray-700 text-xs">{data.description}</p>
      </div>
    </div>
  );
}
