// "use client";

// import dynamic from "next/dynamic";
// import GeoJsonFileMetaData from "../types/GeoJsonFileMetaData"

// const DynamicMap = dynamic(() => import("./MapHtml"), {
//   ssr: false,
//   loading: () => <p style={{ padding: 20 }}>Loading map…</p>,
// });

// interface GeoJsonLayerProps {
//   GeoJsonLayerData: GeoJsonFileMetaData[];
// }


// const MapClientWrapper = ({ GeoJsonLayerData }: GeoJsonLayerProps) => {
//    return <DynamicMap {...GeoJsonLayerData}   />;
// };


// export default MapClientWrapper;


"use client";

// interface GeoJsonLayerProps {
//   GeoJsonLayerData: GeoJsonFileMetaData[];
// }


import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GeoJsonFileMetaData from "../types/GeoJsonFileMetaData";


const DynamicMap = dynamic(() => import("./MapHtml"), {
  ssr: false,
  loading: () => <p style={{ padding: 20 }}>Loading map…</p>,
});

const COUNTRIES = ["Ethopia", "Nepal"];

const MapClientWrapper = () => {
  const [GeoJsonLayerData, setLayers] = useState<GeoJsonFileMetaData[]>([]);

  useEffect(() => {
    Promise.all(
      COUNTRIES.map(async (country) => {
        const meta = await (await fetch(`/data/${country}/FileMetaData.json`)).json();
        return Promise.all(
          (meta.filenames as string[]).map(async (file) => ({
            country_name: country,
            region_name: file.split(".")[0].replace("_", " "),
            geo_json_info: await (await fetch(`/data/${country}/${file}`)).json(),
          }))
        );
      })
    )
      .then((r) => setLayers(r.flat()))
      .catch(console.error);
  }, []);


  return <DynamicMap {...GeoJsonLayerData}   />;
};

export default MapClientWrapper;