"use client";

import dynamic from "next/dynamic";
import GeoJsonFileMetaData from "../types/GeoJsonFileMetaData"

const DynamicMap = dynamic(() => import("./MapHtml"), {
  ssr: false,
  loading: () => <p style={{ padding: 20 }}>Loading map…</p>,
});

interface GeoJsonLayerProps {
  GeoJsonLayerData: GeoJsonFileMetaData[];
}


const MapClientWrapper = ({ GeoJsonLayerData }: GeoJsonLayerProps) => {
   return <DynamicMap {...GeoJsonLayerData}   />;
};


export default MapClientWrapper;