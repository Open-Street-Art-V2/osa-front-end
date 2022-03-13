/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import useSwr from "swr";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Map, ArtworkDetails } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { logout } from "../../Guest/SignIn/SignIn.service";
import NavBar from "../../../Components/NavBar";
import "./map.css";

function MapAdmin() {
  // INIT SELECTED ARTWORK
  const [selectedArtWork, setselectedArtWork] = useState<any>(null);
  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (loginCtx.user?.role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [loginCtx]);

  // GET DATA
  const fetcher = (args: string) =>
    fetch(args).then((response) => response.json());
  const url = `${process.env.REACT_APP_API}/art`;
  const { data, error } = useSwr(url, { fetcher });
  const oeuvres = data && !error ? data : [];

  const points = oeuvres.map((obj: any) => {
    const picturesP = obj.pictures.map((pic: any) => ({
      position: pic.position,
      url: pic.url,
      created_at: pic.created_at,
    }));
    const pointsP = {
      type: "Feature",
      properties: {
        cluster: false,
        oeuvreId: obj.id,
        title: obj.title,
        artist: obj.artist,
        description: obj.description,
        address: obj.address,
        city: obj.city,
        pictures: picturesP,
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(obj.longitude), parseFloat(obj.latitude)],
      },
    };
    return pointsP;
  });
  const [newPoint, setNewPoint] = useState<any>(points);
  function handleDelete(id: any) {
    setNewPoint(
      points.filter((point: any) => point.properties.oeuvreId !== id)
    );
    setselectedArtWork(null);
  }

  return (
    <div>
      <Map points={points} setselectedArtWork={setselectedArtWork} />

      {loginCtx.isLoggedIn && (
        <div className="absolute top-2 right-2">
          <button
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 bg-slate-500 text-white text-2xl rounded-xl shadow-lg"
            onClick={() => {
              logout(loginCtx.setUser, loginCtx.setIsLoggedIn);
            }}
          >
            <AiOutlineLogout />
          </button>
        </div>
      )}

      {selectedArtWork ? (
        <ArtworkDetails
          data={selectedArtWork.properties}
          coords={selectedArtWork.geometry.coordinates}
          onClose={() => {
            setselectedArtWork(null);
          }}
          onDeleted={() => {
            handleDelete(selectedArtWork.properties.oeuvreId);
          }}
        />
      ) : null}
      <NavBar />
    </div>
  );
}

export default MapAdmin;
