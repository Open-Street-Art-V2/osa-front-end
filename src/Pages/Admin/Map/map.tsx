import React, { useState, useRef } from "react";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
  // Popup,
} from "react-map-gl";
import useSupercluster from "use-supercluster";
import "./map.css";
// import useSwr from "swr";
import { AiOutlinePlus } from "react-icons/ai";
import { Pin, ArtMap } from "../../../Components";
import dataLoc from "./data.json";

// TO BE CHANGED
type artwork = {
  id: string;
  title: string;
  artist: string;
  latitude: number;
  longitude: number;
  created_at: string;
};

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

  // GET USER POSITION
  /* function userPos(){
      navigator.geolocation.getCurrentPosition(
         ({ coords }) => {
           setViewport({... viewport,
             latitude: coords.latitude, 
             longitude: coords.longitude,
             zoom: 12});
         },
         (blocked) => {
           console.log('blocked');
         },  
         { maximumAge: 600_000 }
       );
     } */

  // INIT SELECTED ARTWORK
  const [selectedArtWork, setselectedArtWork] = useState<any>(null);

  // REF TO GET BOUNDS OF THE MAP, USED LATER ON CLUSTERS
  const mapRef = useRef<any>();

  // GET DATA
  /* const fetcher = (args: string) =>
    fetch(args).then((response) => response.json());
  const url = "http://127.0.0.1:3008/art";
  const { data, error } = useSwr(url, { fetcher });
  const oeuvres = data && !error ? data : []; */
  const oeuvres = dataLoc;
  const points = oeuvres.map((obj: artwork) => ({
    type: "Feature",
    properties: {
      cluster: false,
      oeuvreId: obj.id,
      name: obj.title,
      artist: obj.artist,
    },
    geometry: {
      type: "Point",
      coordinates: [obj.longitude, obj.latitude],
    },
  }));

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
      <div id="add" className="">
        <button
          type="button"
          id="addBtn"
          className="inline-flex items-center justify-center w-10 h-10 bg-amber-500 text-white text-2xl rounded-xl"
        >
          <AiOutlinePlus />
        </button>
      </div>
      {selectedArtWork ? (
        <ArtMap
          data={selectedArtWork.properties}
          onClose={() => {
            setselectedArtWork(null);
          }}
        />
      ) : null}
    </div>
  );
}

export default MapAdmin;
