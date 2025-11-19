import inquirer from "inquirer";
const colors = await import('colors');

const menu = [
    {
        type: 'list',
        name: 'menuOpt',
        message: 'Seleccione una opción: ',
        choices: [
            {
                value: 1,
                name: `1. Buscar ciudad`
            },
            {
                value: 2,
                name: `2. Historial`
            },
            {
                value: 0,
                name: `0. Salir`
            }
        ]
    }
]

export const inquirerMenu = async () => {
    console.clear();
    console.log(colors.default.green("================================"));
    console.log(colors.default.green("=     Seleccione una opción    ="));
    console.log(colors.default.green("================================"));

    const { menuOpt } = await inquirer.prompt(menu)
    return menuOpt;
}

export const pausa = async() => {
    await inquirer.prompt( [ {
        type: 'input',
        name: 'pauseOpt',
        message: `Presione ${colors.default.green("ENTER")} para continuar`
    } ] );
};

export const capturaEntrada = async (message) => {
    const respuesta = await inquirer.prompt([{
        type: 'input',
        name: 'resp',
        message,
        validate: (entrada) => {
            if (entrada.length === 0) {
                return "Entrada inválida. Reintente";
            } else {
                return true;
            }
        }
    }]);
     return respuesta.resp;
};
 
export const confirmar = async (message) => {
    const { ok } = await inquirer.prompt([{
        type: 'confirm',
        name: 'ok',
        message
    }]);
    return ok;
};

export const listadoCiudades = async (listado = []) => {
    let cont = 0;
    const choices = listado.map( (ciudad) => {
        cont++;
        return { 
            value: ciudad.id,
            name: `${colors.default.green(cont.toString() + '.')} ${colors.default.white(ciudad.lugar)}`,
            lat: ciudad.lat,
            lon: ciudad.lon
        }
    });
    choices.unshift({
        value: 0,
        name: `${colors.default.green('0.')} ${colors.default.white('Cancelar.')}`
    });
    const respuesta = await inquirer.prompt([{
        type: 'list',
        name: 'resp',
        message: 'Seleccione la ciudad: ',
        choices
    }]);
    
    return respuesta.resp;
};
