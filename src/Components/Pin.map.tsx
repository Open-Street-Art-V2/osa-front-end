import React, { useState } from "react";

export default function Pin(props: any) {
  const { onClick, pic } = props;
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  function handleImageLoad() {
    setImageLoaded(true);
  }
  return (
    <button type="button" className="w-10 h-10" onClick={onClick}>
      {!imageLoaded && (
        <div className="w-10 h-10 border-2 bg-slate-200 border-white rounded-full shadow-2xl" />
      )}

      <img
        src={`/${process.env.REACT_APP_IMAGES_PATH}${pic}`}
        onLoad={handleImageLoad}
        className="object-cover justify-self-center self-center w-10 h-10 border-2 border-white rounded-full shadow-2xl"
        alt="Failed to load"
        style={imageLoaded ? {} : { display: "none" }}
      />
    </button>
  );
}
