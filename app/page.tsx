"use client";
import { useEffect } from "react";
import Map from "react-map-gl";
import { invoke } from "@tauri-apps/api/core";

export default function Home() {
  const mapbBoxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  console.log(mapbBoxToken);

  useEffect(() => {
    invoke<string>("greet", { name: "Backend" })
      .then((result: string) => console.log(result))
      .catch(console.error);
  }, []);

  return (
    <div>
      <Map
        mapboxAccessToken={mapbBoxToken}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 800, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
}
