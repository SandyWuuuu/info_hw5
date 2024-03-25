import React from "react";

function Routes(props){
    const {projection, routes, selectedAirlineID} = props;
    // TODO: 
    // return the routes of the selected airline; 
    // If the selectedAirlineID is null (i.e., no airline is selected), return <g></g>.
    if (!selectedAirlineID) {
        return <g></g>; // No airline is selected, return an empty group
    }
    
    // Filter routes for the selected airline
    const selectedRoutes = routes.filter(route => route.AirlineID === selectedAirlineID);

    // Map the selected routes to SVG line elements
    const routeLines = selectedRoutes.map((route, index) => {
        const source = projection([route.SourceLongitude, route.SourceLatitude]);
        const destination = projection([route.DestLongitude, route.DestLatitude]);

        return (
            <line
                key={index}
                x1={source[0]}
                y1={source[1]}
                x2={destination[0]}
                y2={destination[1]}
                stroke="#992a5b"
                strokeWidth={0.2}
            />
        );
    });

    return <g>{routeLines}</g>;
}

export { Routes };