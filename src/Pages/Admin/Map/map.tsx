/* eslint-disable */
import React, { useState, useContext, useRef, useEffect } from "react";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import useSupercluster from "use-supercluster";
import "./map.css";
import useSwr from "swr";
import { AiOutlinePlus, AiOutlineLogout } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { Pin, ArtMap } from "../../../Components";
import { LoginContext } from "../../../Components/Context/LoginCtxProvider";
import { logout } from "../../Guest/SignIn/SignIn.service";
import NavBar from "../../../Components/NavBar";
// eslint-disable-next-line no-unused-vars
/* type artwork = {
  id: string;
  title: string;
  artist: string;
  latitude: number;
  longitude: number;
  created_at: string;
}; */

type mapView = {
  latitude: number;
  longitude: number;
  width: string;
  height: string;
  zoom: number;
};

const navControlStyle = {
  left: 10,
  top: 60,
  zIndex: 1,
};
const geolocateControlStyle = {
  left: 10,
  top: 20,
  zIndex: 1,
};

/* type position = {
  latitude : number,
  longitude : number,
}
type point = {
  cluster: boolean, 
  oeuvreId: number, 
  name: string, 
  street: string
} */

function MapAdmin() {
  // DEFAULT MAP STATE
  const [viewport, setViewport] = useState({
    latitude: 49.43424,
    longitude: 1.08972,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  // INIT SELECTED ARTWORK
  const [selectedArtWork, setselectedArtWork] = useState<any>(null);

  // REF TO GET BOUNDS OF THE MAP, USED LATER ON CLUSTERS
  const mapRef = useRef<any>();

  // GET DATA
  const fetcher = (args: string) =>
    fetch(args).then((response) => response.json());
  const url = `${process.env.REACT_APP_API}/art`;
  const { data, error } = useSwr(url, { fetcher });
  const oeuvres = data && !error ? data : [];

  const allPoints = oeuvres.map((obj: any) => {
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

  const [points, setPoints] = useState(allPoints);
  const [initPoints, setInitPoints] = useState(false);

  useEffect(() => {
    if (allPoints.length > 0 && !initPoints) {
      const initialState = allPoints;
      setPoints(initialState);
      setInitPoints(true);
    }
  }, [allPoints]);

  function handleDelete(id: any) {
    setPoints(points.filter((point: any) => point.properties.oeuvreId !== id));
    setselectedArtWork(null);
  }

  // GET BOUNDS : [lat,long,lat,long] (4 corners)
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  // ADD CLUSTERS, SUPERCLUSTER
  // cluster options (70,20)
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 70, maxZoom: 20 },
  });

  function markerClick(cluster: any, latitude: number, longitude: number) {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );

    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: expansionZoom,
    });
  }

  const navigate = useNavigate();
  const loginCtx = useContext(LoginContext);

  useEffect(() => {
    if (loginCtx.user?.role !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [loginCtx]);

  function logoutR() {
    if (loginCtx.isLoggedIn && loginCtx.user?.role === "ROLE_ADMIN") {
      logout(loginCtx.setUser, loginCtx.setIsLoggedIn);
    }
  }
  return (
    <div>
      <ReactMapGL
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...viewport}
        maxZoom={18}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(newViewport: mapView) => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
        keyboard={false}
      >
        <NavigationControl style={navControlStyle} />
        <GeolocateControl
          style={geolocateControlStyle}
          showUserHeading
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          auto
        />

        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          let style;

          if (isCluster) {
            if (pointCount < 50) style = 1;
            else if (pointCount < 500) style = 2;
            else style = 3;

            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  role="button"
                  tabIndex={0}
                  className={`cluster-marker s-${style}`}
                  onClick={() => markerClick(cluster, latitude, longitude)}
                  onKeyDown={() => {}}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`oeuvre-${cluster.properties.oeuvreId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <Pin size={20} onClick={() => setselectedArtWork(cluster)} />
            </Marker>
          );
        })}
      </ReactMapGL>
      <div id="" className="absolute top-6 right-2">
        <Link to="/form/admin" className="inline-flex items-center w-10 h-10">
          <button
            type="button"
            id="addBtn"
            className="inline-flex items-center justify-center w-10 h-10 bg-slate-50 text-slate-500 text-2xl rounded-xl"
          >
            <AiOutlinePlus />
          </button>
        </Link>
      </div>
      <div id="logout" className="absolute top-20 right-2">
        <button
          type="button"
          id="logoutBtn"
          className="inline-flex items-center justify-center w-10 h-10 bg-slate-500 text-white text-2xl rounded-xl"
          onClick={() => {
            logoutR();
          }}
        >
          <AiOutlineLogout />
        </button>
      </div>
      {selectedArtWork ? (
        <ArtMap
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
