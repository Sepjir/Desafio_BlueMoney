//Utilizando el módulo de Child Process de Node para ejecutar el ejemplo del desafio para crear el archivo de cotización transformando 250.000 pesos en dolares
const child_process = require('child_process')

function ejecutar(archivo) {
    return new Promise((resolve)=> {
        child_process.exec(`node ${archivo} cotizacion txt dolar 250000`, function (err, result) {
            resolve(result)
        })
    })
}

ejecutar('index.js').then((promise) => {
    console.log(promise);
})