
'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Layer } from 'leaflet'
import { GeoJSON } from 'react-leaflet/GeoJSON'
import { Feature,  } from "geojson"

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import Legend from "./Legend"
import OtherLinks from './OtherLinks'

import CountryMetaDataMap from '../types/CountryMetaDataMap';
import GeoJsonFileMetaData from '../types/GeoJsonFileMetaData';

const MapHtml = (  GeoJsonLayerData : GeoJsonFileMetaData[] ) => {

  const geoJsonLayerArray : GeoJsonFileMetaData[]  = GeoJsonLayerData
  const TempCountryList : CountryMetaDataMap = new Map()

  TempCountryList.set("Ethopia", {
      "coordinates": [9.1450, 40.4897],
      "zoomLevel" :  7,
      "color" : "red",
      "name" : "Ethopia"
  })

  TempCountryList.set("Nepal", {
      "coordinates" : [28.00, 84.00],
      "zoomLevel" : 7.5,
      "color" : "green",
      "name" : "Nepal"
  })

  console.log(GeoJsonLayerData)
  console.log(geoJsonLayerArray)


  return (
    <MapContainer center={[9.1450, 40.4897]} zoom={7} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"

        />
          {...Object.values(geoJsonLayerArray).map((region : GeoJsonFileMetaData ) => {
            const styling = {
              color: TempCountryList.get(region.country_name)?.color ?? "gray"
            }

            const onEachFeature = (feature : Feature, layer : Layer) => {
              layer.bindTooltip(region.region_name)
            }

            console.log(region.geo_json_info)
            // console.log
            return(
              <GeoJSON style={styling} onEachFeature={onEachFeature} key={`${region.region_name}`} data={region.geo_json_info} />
            )
          })}


        <Marker
            position={[40.8054,-74.0241]}
            draggable={true}
        >
        </Marker>

        <Legend CountryInfoList={TempCountryList}></Legend>
        <OtherLinks></OtherLinks>

    </MapContainer>
  )
}

export default MapHtml