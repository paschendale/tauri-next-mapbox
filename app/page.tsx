"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./_components/Map"), {
  loading: () => <p>Loading Map...</p>,
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
