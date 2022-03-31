import { useState, useContext, useEffect } from "react";
import useSwr from "swr";
import { useNavigate } from "react-router-dom";
import { Map, ArtworkDetails } from "../../../Components";
import NavBarUser from "../../../Components/NavBarUser";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import "./map.css";

function MapUser() {
  // INIT SELECTED ARTWORK
  const [selectedArtWork, setselectedArtWork] = useState<any>(null);
  const loginCtx = useContext(LoginContext);
  const navigate = useNavigate();
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

  useEffect(() => {
    if (loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_ADMIN") {
      navigate("/map/admin");
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
      artId: pic.artId,
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

  return (
    <div>
      <Map
        points={points}
        setselectedArtWork={setselectedArtWork}
        getUserLat={(UserLat: any) => setUserLat(UserLat)}
        getUserLong={(UserLat: any) => setUserLong(UserLat)}
      />

      {selectedArtWork ? (
        <ArtworkDetails
          data={selectedArtWork.properties}
          coords={selectedArtWork.geometry.coordinates}
          lat={userLat}
          long={userLong}
          onClose={() => {
            setselectedArtWork(null);
          }}
        />
      ) : null}
      <NavBarUser />
    </div>
  );
}

export default MapUser;
