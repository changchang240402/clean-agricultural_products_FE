import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbmdjaGFuZzI0MDQiLCJhIjoiY2x3bHNudHhuMGo1OTJtbnZkM2txMWE1byJ9.TGVqBvLXCw3Z6f-5OZZ35Q';

const MapComponent = ({ startLatitude, startLongitude, endLatitude, endLongitude, zoom, width, height }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [directionsControl, setDirectionsControl] = useState(null);

    useEffect(() => {
        if (mapContainerRef.current && startLatitude && startLongitude && endLatitude && endLongitude) {
            if (!mapRef.current) {
                mapContainerRef.current.innerHTML = ''; // Ensure the container is empty before initializing the map
                mapRef.current = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [startLongitude, startLatitude],
                    zoom: zoom
                });

                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving',
                    language: 'vi',
                });

                mapRef.current.addControl(directions, 'top-left');

                directions.setOrigin([startLongitude, startLatitude]);
                directions.setDestination([endLongitude, endLatitude]);

                directions.on('route', (e) => {
                    if (e.route.length > 0) {
                        const route = e.route[0];
                        console.log('Distance:', route.distance, 'meters');
                        console.log('Duration:', route.duration, 'seconds');
                    }
                });

                setDirectionsControl(directions);
            } else {
                directionsControl.setOrigin([startLongitude, startLatitude]);
                directionsControl.setDestination([endLongitude, endLatitude]);
            }
        }
    }, [startLatitude, startLongitude, endLatitude, endLongitude, zoom, directionsControl]);

    return (
        <div ref={mapContainerRef} style={{ width: width, height: height }} />
    );
};

export default MapComponent;