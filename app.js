const colors =  await import('colors');
import { capturaEntrada, inquirerMenu, pausa, listadoCiudades } from './js/inquirer.js'
import { Busquedas } from './modelos/busquedas.js';
import dotenv from 'dotenv'

dotenv.config();

const main = async () => {
    let resp;

    const busquedas = new Busquedas();
    do {
        resp = await inquirerMenu();
        
        switch (resp) {
            case 1: const lugar = await capturaEntrada('Ciudad: ');
                    const lugares = await busquedas.ciudad(lugar);
                    const id = await listadoCiudades(lugares);
                    const lugarSeleccionado = lugares.find(ciudad => ciudad.id === id)
                    const clima = await busquedas.climaCiudad(lugarSeleccionado.lat, lugarSeleccionado.lon);

                    console.log(`\n${colors.default.yellow('Ciudad')}: ${lugarSeleccionado.lugar}`);
                    console.log(`${colors.default.yellow('Latitud')}: ${lugarSeleccionado.lat}`);
                    console.log(`${colors.default.yellow('Longitud')}: ${lugarSeleccionado.lon}`);
                    console.log(`${colors.default.yellow('Clima:')} ${clima.desc}`);
                    console.log(`${colors.default.yellow('Temperatura:')} ${clima.temp}`);
                    console.log(`${colors.default.yellow('Temperatura mínima:')} ${clima.mintemp}`);
                    console.log(`${colors.default.yellow('Temperatura máxima:')} ${clima.maxtemp}`);
                    console.log(`${colors.default.yellow('Sensación Térmica:')} ${clima.feels}`);
                    
                    break;
            case 2: break;
        }
        if (resp !== 0) {
            await pausa();
        }

    } while (resp !== 0);
    console.clear();
};

main();