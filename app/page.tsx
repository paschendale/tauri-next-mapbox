"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("./_components/Map"), {
  loading: () => <p>Loading Map...</p>,
  ssr: false,
});

export default function Home() {
  const [zipCodes, setZipCodes] = useState<number>();

  async function getZipCodes() {
    try {
      const response = await fetch("/api/zip");
      if (!response.ok) {
        throw new Error("Failed to fetch zip codes");
      }
      const zipCodes = await response.json();
      return zipCodes;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    getZipCodes()
      .then((zipCodes) => setZipCodes(zipCodes.length))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="h-10">Found {zipCodes} zip codes</div>
      <Map />
    </div>
  );
}
