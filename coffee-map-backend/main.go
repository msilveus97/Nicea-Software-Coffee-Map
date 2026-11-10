package main

import (
	"coffee-map-rest-api/geospatial"
	"coffee-map-rest-api/info"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// GeoSpatial Search
	router.GET("/geospatial/search/region", geospatial.SearchRegion)

	// GeoSpatial Legend
	router.GET("/geospatial/legend/country/details", geospatial.GetContinentDetails)
	router.GET("/geospatial/legend/continent/details", geospatial.GetContinentDetails)

	// GeoSpatial Map
	router.GET("/geospatial/map/", geospatial.GetAllGeoJson)

	// Info Region
	router.GET("/info/region", info.GetRegionInfo)

	//Info Search
	router.GET("/info/search/varietals", info.SearchCoffeeVarietals)
	router.GET("/info/search/species", info.SearchCoffeeSpecies)
	router.GET("/info/search/keywords", info.SearchKeyWords)
	router.GET("/info/search/sources", info.SearchSources)

	//Info Sources
	router.GET("/info/sources", info.GetSources)

}
