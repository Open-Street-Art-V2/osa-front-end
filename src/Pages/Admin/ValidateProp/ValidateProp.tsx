import React from "react";
import { Header } from "../../../Components";

function ValidateProp() {
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
      <div className="flex">
        <div className="flex flex-row justify-around form-check w-full h-16 bg-slate-700 text-white rounded-3xl">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          Propositions
        </div>
      </div>
    </div>
  );
}

export default ValidateProp;
