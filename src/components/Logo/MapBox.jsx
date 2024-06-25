import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import marker from '../../assets/marker.png'
const Mapbox = ({
    longitude,
    latitude,
    zoom,
    width,
    height,
    name,
}) => {

    return (
        <ReactMapGL
            mapLib={import('mapbox-gl')}
            initialViewState={{
                latitude: latitude,
                longitude: longitude,
                zoom: zoom
            }}
            style={{ width: width, height: height }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken='pk.eyJ1IjoiY2hhbmdjaGFuZzI0MDQiLCJhIjoiY2x3bHNudHhuMGo1OTJtbnZkM2txMWE1byJ9.TGVqBvLXCw3Z6f-5OZZ35Q'

        >
            <NavigationControl position='bottom-right'></NavigationControl>
            <Marker
                latitude={latitude}
                longitude={longitude}
                offsetLeft={-20}
                offsetTop={-30}
            >
                <div className='flex flex-col items-center justify-center'>
                    <span style={{ fontFamily: 'Lora, cursive' }} className="text-black-500 text-[15px] font-bold bg-white ml-5">{name}</span>
                    <img className='rounded-3xl ml-5' loading="lazy" src={marker} height={40} width={40} alt="" />
                </div>
            </Marker>
        </ReactMapGL>
    );
}

export default Mapbox