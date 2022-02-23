/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Header, ArtworkProposal } from "../../../Components";
import "./ValidateProp.css";

function ValidateProp() {
  const [allArtwork, setAllArtwork] = useState<any[]>([]);
  async function getArtwork() {
    const url = process.env.REACT_APP_GET_ARTWORK;
    if (url) {
      const res: Response = await fetch(url);
      const data = await res.json();
      // console.log(data);
      setAllArtwork(data);
    }
  }

  useEffect(() => {
    getArtwork();
  }, []);

  return (
    <div className="container max-width-sm ">
      <Header />
      <div className="flex flex-row justify-around px-10 p-5">
        <button
          type="button"
          className="w-28 h-10 bg-green-500 text-white rounded-3xl"
        >
          Accepter
        </button>
        <button
          type="button"
          className="w-28 h-10 bg-red-500 text-white rounded-3xl"
        >
          Refuser
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 content-center form-check w-full h-16 bg-slate-700 text-white rounded-3xl shadow-xl mb-2">
        <input
          className="justify-self-center w-7 h-7 shadow-md form-check-input appearance-none border border-slate-700 rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <p id="propositions" className="content-center col-span-2">
          Propositions
        </p>
      </div>
      {allArtwork &&
        allArtwork.map((Artwork: any) => {
          return (
            <div
              key={Artwork.id}
              className="grid grid-cols-6 gap-1 justify-between content-center form-check w-full h-30 text-white rounded-3xl overflow-hidden py-2"
            >
              <input
                className="justify-self-center self-center shadow-md border border-slate-700 w-7 h-7 content-center form-check-input appearance-none rounded-sm bg-white checked:bg-slate-500 checked:border-gray-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <ArtworkProposal data={Artwork} />
            </div>
          );
        })}
    </div>
  );
}

export default ValidateProp;
