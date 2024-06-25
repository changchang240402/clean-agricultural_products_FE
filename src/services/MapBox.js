import axios from "axios";

function mapBox() {

    const MAPBOX_TOKEN = "pk.eyJ1IjoiY2hhbmdjaGFuZzI0MDQiLCJhIjoiY2x3bHNudHhuMGo1OTJtbnZkM2txMWE1byJ9.TGVqBvLXCw3Z6f-5OZZ35Q"
    const getLocate = async (address) => {
        try {
            const responseloca = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_TOKEN}`
            );
            return {
                latitude: responseloca.data.features[0].center[1],
                longitude: responseloca.data.features[0].center[0],
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    const fetchRoute = (addressMarker, currentPosition) => {
        axios
            .get(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${addressMarker.longitude},${addressMarker.latitude};${currentPosition.longitude},${currentPosition.latitude}.json?access_token=${TOKEN}`
        )
            .then(response => {
                const route = response.data.routes[0].geometry;

                const decodedRoute = polyline.decode(route);
                const geojson = {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: decodedRoute.map(coord => [coord[1], coord[0]]),
                    },
                };
                setRoute(geojson);
            })
            .catch(error => {
                console.error(error);
            });
    };
    return {
        getLocate,
    };
};

export default mapBox;