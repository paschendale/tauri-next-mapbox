"use client";

import "ol/ol.css";
import { RMap, ROSM } from "rlayers";
import { fromLonLat } from "ol/proj";
import { useRef } from "react";

export default function Map() {
  const mapRef = useRef<RMap | null>(null);

  return (
    <>
      <RMap
        className="w-full h-[600px]"
        //@ts-expect-error - TODO: fix this
        ref={(map) => (mapRef.current = map)}
        initial={{
          center: fromLonLat([-74.006, 40.7128]), // Centro de NYC
          zoom: 10,
        }}
      >
        <ROSM />
      </RMap>
    </>
  );
}
