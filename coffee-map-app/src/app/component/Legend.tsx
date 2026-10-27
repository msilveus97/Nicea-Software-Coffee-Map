'use client';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

import CountryMetaDataMap from '../types/CountryMetaDataMap';

interface LegendProps {
  CountryInfoList  : CountryMetaDataMap
}

const Legend = ( { CountryInfoList }: LegendProps ) => {

  const map = useMap()
  useEffect(() => {
    const legend = L.control.zoom({ position: 'bottomright' })

    legend.onAdd = (map) => {
        const legend_div = L.DomUtil.create('div', 'Country List')

        legend_div.style.backgroundColor = 'white'
        legend_div.style.padding = '10px'
        legend_div.style.color = 'black'


        const title = document.createElement('h4')
        title.textContent = 'Country List';
        legend_div.appendChild(title);


        CountryInfoList.forEach(country_info => {
          const parent_div = document.createElement('div')
          parent_div.style.display = 'flex'
          parent_div.style.flexDirection = 'row'
          parent_div.style.padding = '4px 0'

          const entry_name = document.createElement('div')
          entry_name.textContent = country_info.name
          entry_name.style.cursor = 'pointer'
          entry_name.style.userSelect = 'none'
          entry_name.style.marginRight = '10px'
          entry_name.style.width = '50px'

          const entry_color = document.createElement('div')
          entry_color.style.height = '17.5px'
          entry_color.style.width = '17.5px'
          entry_color.style.marginTop = '1px'
          entry_color.style.backgroundColor = country_info.color

          parent_div.appendChild(entry_name)
          parent_div.appendChild(entry_color)

          L.DomEvent.on(entry_name, 'click', () => {
            map.flyTo(country_info.coordinates, country_info.zoomLevel)
          })

          legend_div.appendChild(parent_div)
        })


        return legend_div
    }

    legend.addTo(map)

      return () => {
        legend.remove();
      };
    }, [map])

    return null
}


export default Legend
