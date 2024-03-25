import React , { useState } from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


export function BarChart (props) {
    const {offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID} = props;
    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    const maxValue = Math.max(...data.map(d => d.Count));
    // 2. define the xScale and yScale
    const xScale = scaleLinear()
        .domain([0, maxValue])
        .range([0,width]);
    const yScale = scaleBand()
        .domain(data.map(d => d.AirlineName))
        .range([0, height])
        .padding(0.2);

    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input.
    // Define the color function for bars
    const getFillColor = (d) => {
        return selectedAirlineID === d.AirlineID ? "#992a5b" : "#2a5599";
    };
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b"; 
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function 
    // that wraps the onMouseOver you defined since it takes d as input.
    
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>
    return (
        <svg width={width + offsetX} height={height + offsetY + offsetY + offsetY} className="svgStyle">
            {/* Plot horizontal bars */}
            {data.map((d, index) => (
                <rect key={index}
                      x={offsetX}
                      y={yScale(d.AirlineName)}
                      width={xScale(d.Count)}
                      height={yScale.bandwidth()}
                      fill={getFillColor(d)}
                      onMouseOver={() => setSelectedAirlineID(d.AirlineID)} 
                      onMouseOut={() => setSelectedAirlineID(null)}
                      
              />
            ))}

            {/* Translate the XAxis based on offsetY */}
            <g transform={`translate(${offsetX}, ${height - offsetY})`}>
                <XAxis xScale={xScale} height={offsetY} width={width} />
            </g>

            {/* Render the YAxis */}
            <g transform={`translate(${offsetX}, 0)`}>
                <YAxis yScale={yScale} height={offsetX} offsetX={offsetX} />
            </g>
        </svg>
    );
}

    
    
    
 //   return <g transform={`translate(${offsetX}, ${offsetY})`}>
        
//   </g>
//}