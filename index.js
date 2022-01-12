//Llamando y almacenando módulos de Node
const fs = require('fs')
const https = require('https')

// Eliminando los dos primeros objetos arrojados por el argv en consola
const argumentos = process.argv.slice(2)

// almacenando datos y argumentos de consola en variables
let fecha = new Date()
let nombreArchivo = argumentos[0]
let extensionArchivo = argumentos[1]
let indicador = argumentos[2]
let cantidadPesos = argumentos[3]


//Consumiendo Api Mindicador
https.get('https://mindicador.cl/api', (resp) => {
    resp.on('data', (data) => {

        //almacenando datos de la Api formateados
        const indicadores = JSON.parse(data)

        // condición para utilizar el File system y crear el archivo respectivo
        if (indicador == indicadores[indicador].codigo) {

            // Creando y leyendo el archivo con su Información
            fs.writeFile(`${nombreArchivo}.${extensionArchivo}`, `
A la fecha: ${fecha}
fue realizada una cotización con los siguientes datos:
Cantidad de pesos a convertir: ${cantidadPesos} pesos
Convertido a "${indicador}" da un total de: 
$${(cantidadPesos / indicadores[indicador].valor).toFixed(2)} ${indicadores[indicador].nombre}`, 'utf-8', () => {
                console.log('Archivo con cotizaciones creado')

                // Leyendo información del archivo creado y enviandola por consola
                fs.readFile(`${nombreArchivo}.${extensionArchivo}`, 'utf-8', (err, data) =>{
                    console.log(data)
                })
            })
            
        }
    })
})
.on('error', (err) => {
    console.log('Error: ' + err.message)
})
