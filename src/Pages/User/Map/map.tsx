/* eslint-disable prettier/prettier */
import React, { useState, useRef } from "react";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import useSupercluster from "use-supercluster";
import "./map.css";
import useSwr from "swr";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { Pin, ArtworkUser } from "../../../Components";
// added the following 6 lines.

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// import dataLoc from "./data.json";

// TO BE CHANGED
// eslint-disable-next-line no-unused-vars
/* type artwork = {
  id: string;
  title: string;
  artist: string;
  latitude: string;
  longitude: string;
  created_at: string;
}; 

// eslint-disable-next-line no-unused-vars
type picture = {
  position: number;
  url: string;
  created_at: string;
  artId: string;
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

function Map() {
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
  const url = "http://srv-dpi-proj-openstreetart22-test.univ-rouen.fr/api/art";
  const { data, error } = useSwr(url, { fetcher });
  const oeuvres = data && !error ? data : [];
  /* const oeuvres = dataLoc;
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
    })); */

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
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiaWRlcmkiLCJhIjoiY2t5aHZ5ZG15MTl0czJwczh6djN0ZDB4bSJ9.ZZSwZi7-2xwnYRcSXqZDGg"
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
      <div id="login" className="">
        <Link to="/login" className="inline-flex items-center w-10 h-10">
          <button
            type="button"
            id="loginBtn"
            className="inline-flex items-center justify-center w-10 h-10 bg-slate-900 text-white text-sm rounded-xl"
          >
            <AiOutlineUser />
          </button>
        </Link>
      </div>
      {selectedArtWork ? (
        <ArtworkUser
          data={selectedArtWork.properties}
          onClose={() => {
            setselectedArtWork(null);
          }}
        />
      ) : null}
    </div>
  );
}

export default Map;
