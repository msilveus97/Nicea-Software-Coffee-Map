import MapClientWrapper from "./component/MapClientWrapper";


import path from 'path'
import fs from 'fs'
import geoJsonFileMetaData from './types/GeoJsonFileMetaData'

import type { GeoJsonObject } from "geojson";


async function load_all_geojson_layers() {
  const geoJsonFiles = [];

  try {
    const country_directories : Array<string> = ["Ethopia", "Nepal"]
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    
    for (const country_directory of country_directories) {

      const fileMetaDataRes = await fetch( origin + '/data/' + country_directory + '/' + 'FileMetaData.json')

      const files_json = await fileMetaDataRes.json()
      const files = files_json['filenames']

      for (const file of files) {

        const geoJsonDataRawRes = await fetch('/data/' + country_directory + '/' + file)
        const geoJsonDataRaw = JSON.stringify(await geoJsonDataRawRes.json())

        const geoJsonData = JSON.parse(geoJsonDataRaw) as GeoJsonObject

        const geo_json_info = geoJsonData;
        const region_name = file.split('.')[0].replace('_', ' ');
        geoJsonFiles.push({
            'country_name' : country_directory,
            'region_name' : region_name,
            'geo_json_info' : geo_json_info,
        });
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }

  return geoJsonFiles;
}



export default async function Home() {
  const  geo_json_files : geoJsonFileMetaData[]  = await load_all_geojson_layers();

  return (
    // give the main element a viewport height so the MapContainer (height: 100%) is visible
    <main style={{ height: "100vh" }}>
      <MapClientWrapper GeoJsonLayerData={geo_json_files} />
    </main>
  );
}