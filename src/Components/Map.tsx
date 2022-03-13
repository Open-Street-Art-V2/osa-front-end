import React, { useState, useRef } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import useSupercluster from "use-supercluster";
import Pin from "./Pin.map";
import { MapView } from "./utils/types";

export default function Map(props: any) {
  const { points, setselectedArtWork } = props;

  // DEFAULT MAP STATE
  const [viewport, setViewport] = useState({
    latitude: 49.43424,
    longitude: 1.08972,
    zoom: 10,
  });

  // REF TO GET BOUNDS OF THE MAP, USED LATER ON CLUSTERS
  const mapRef = useRef<any>();

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
    options: { radius: 30, maxZoom: 20 },
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
    <ReactMapGL
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...viewport}
      width="100vw"
      height="100vh"
      className="w-100 h-100"
      maxZoom={18}
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(newViewport: MapView) => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
      keyboard={false}
    >
      <GeolocateControl
        className="top-4 left-2 z-10"
        showUserHeading
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        auto
      />

      {clusters.map((cluster: any) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        let style;

        if (isCluster) {
          if (pointCount < 10) style = 1;
          else if (pointCount < 50) style = 2;
          else if (pointCount < 100) style = 3;
          else style = 4;
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                role="button"
                tabIndex={0}
                className={`flex items-center justify-center s-${style} opacity-60 text-white text-lg border-2 border-white rounded-full z-1`}
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
            {setselectedArtWork && (
              <Pin
                pic={cluster.properties.pictures[0].url}
                onClick={() => setselectedArtWork(cluster)}
              />
            )}
            {!setselectedArtWork && <Pin size={20} onClick={() => {}} />}
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
