import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props){
    const {width, height, countries, airports, routes, selectedAirlineID} = props;
    //TODO: 
    // 1.Define a projection which is geoMercator;
    // set .scale(97), and .translate([width/2, height/2+20]);  
    const projection = geoMercator()
        .scale(97)
        .translate([width / 2, height / 2 + 20]);

    // 2. Define a path generator using geoPath();
    const path = geoPath().projection(projection);
    // 3. Plot the world map; remember to use countries.features.map(); (Note: stroke is "#ccc", and color is "#eee");
    const countriesPaths = countries.features.map((feature, index) => (
        <path
            key={`country-${index}`}
            d={path(feature)}
            fill="#eee"
            stroke="#ccc"
        />
    ));
    // 4. Plot the airports; remember to use routes.map(); (Note: radius is 1; color is "#2a5599"); 
    const airportsCircles = airports.map((airport, index) => (
        <circle
            key={index}
            cx={projection([airport.Longitude, airport.Latitude])[0]}
            cy={projection([airport.Longitude, airport.Latitude])[1]}
            r={1}
            fill="#2a5599"
        />
    ));

    //let projection;//TODO: define a projection of Mercator.
    
    return <g>
         <svg width={width} height={height} id="map">
            {countriesPaths}
            {airportsCircles}
        <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID}/>
        </svg>
    </g>


}

export { AirportMap }