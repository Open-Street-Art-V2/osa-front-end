import { useState, useContext, useEffect } from "react";
import useSwr from "swr";
import { useNavigate } from "react-router-dom";
import { Map, ArtworkDetails, SettingsBtn } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import NavBar from "../../../Components/NavBar";
import "./map.css";

function MapAdmin() {
  // INIT SELECTED ARTWORK
  const [selectedArtWork, setselectedArtWork] = useState<any>(null);
  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);
  const [userLat, setUserLat] = useState(null);
  const [userLong, setUserLong] = useState(null);

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
  // eslint-disable-next-line no-unused-vars
  const [newPoint, setNewPoint] = useState<any>(points);
  function handleDelete(id: any) {
    setNewPoint(
      points.filter((point: any) => point.properties.oeuvreId !== id)
    );
    setselectedArtWork(null);
  }

  return (
    <div>
      <Map
        points={points}
        setselectedArtWork={setselectedArtWork}
        getUserLat={(UserLat: any) => setUserLat(UserLat)}
        getUserLong={(UserLat: any) => setUserLong(UserLat)}
      />

      {loginCtx.isLoggedIn && (
        <div className="fixed top-14 right-2">
          <SettingsBtn />
        </div>
      )}

      {selectedArtWork ? (
        <ArtworkDetails
          data={selectedArtWork.properties}
          coords={selectedArtWork.geometry.coordinates}
          lat={userLat}
          long={userLong}
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
