import MapClientWrapper from "./component/MapClientWrapper";


import path from 'path'
import fs from 'fs'
import geoJsonFileMetaData from './types/GeoJsonFileMetaData'

import type { GeoJsonObject } from "geojson";




export const dynamic = 'force-static'

function load_all_geojson_layers(): geoJsonFileMetaData[] {
  const geoJsonFiles: geoJsonFileMetaData[] = []
  const country_directories = ['Ethopia', 'Nepal']

  for (const country_directory of country_directories) {
    const dir = path.join(process.cwd(), 'public', 'data', country_directory)

    const files_json = JSON.parse(
      fs.readFileSync(path.join(dir, 'FileMetaData.json'), 'utf8')
    )

    for (const file of files_json.filenames as string[]) {
      const geo_json_info = JSON.parse(
        fs.readFileSync(path.join(dir, file), 'utf8')
      ) as GeoJsonObject

      geoJsonFiles.push({
        country_name: country_directory,
        region_name: file.split('.')[0].replace('_', ' '),
        geo_json_info,
      })
    }
  }
  return geoJsonFiles
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