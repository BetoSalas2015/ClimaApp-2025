import axios from "axios";

export class Busquedas {
    historial = [];
    
    constructor() {
        
    }

    async ciudad( lugar = '') {
        const consulta = axios.create({
            baseURL: `https://api.mapbox.com/search/geocode/v6/forward`,
            params: {
                q: `${lugar}`,
                limit: 5,
                language: 'es',
                'access_token': process.env.MAPBOX_KEY
            }
        })
        const resp = await consulta.get();
        
        return resp.data.features.map( (ubicacion) => ({
            id: ubicacion.id,
            lugar: ubicacion.properties.full_address,
            lon: ubicacion.geometry.coordinates[0],
            lat: ubicacion.geometry.coordinates[1]
        }) );
    }

    climaCiudad = async (lat, lon) => {
        const consulta = axios.create({
            baseURL: 'https://api.openweathermap.org/data/2.5/weather',
            params: {
                lon: lon,
                lat: lat,
                appid: process.env.OPENWEATHER,
                lang: 'es',
                units: 'metric'
            }
        });
        const resp = await consulta.get();
        
        return {
            desc: resp.data.weather[0].description,
            temp: resp.data.main.temp,
            maxtemp: resp.data.main.temp_max,
            mintemp: resp.data.main.temp_min,
            feels: resp.data.main.feels_like
        }
    };

}


 