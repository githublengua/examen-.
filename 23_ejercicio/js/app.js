
import { P } from './api.js'
export function app() {
    console.log('Cargada app')

    // Nodos del DOM
    let btnBuscar = document.querySelector('#btn-buscar')
    let inClave = document.querySelector('#in-clave')   
    let uPaises = document.querySelector('#ul-paises')
    let pError = document.querySelector('#p-error')
    
 
    // Asociación de manejadores de eventos
    //btnGuardar.onclick = onClickGuardar
    btnBuscar.addEventListener('select',onClickBuscarPais )
    inClave.addEventListener('change', onClickBuscarPais)

    // Funciones manejadoras de eventos

    function buscarPais(ev) {
        console.log('buscarPais')
        if (!inClave.value) {
            return
        }
        let url = 'https://restcountries.eu/rest/v2/' + inClave.value //paises
        inClave.value = '' 
        fetch(url)
        .then(response => {
            if(response.status == 200) {
                return response.json()
            } 
            throw(new Error(response.status))
        })
        .then( (data) => {
            data = data.name
            data = data.map(name => { return {region } 
            }) 
            console.log(data)
            renderData(data)
        })
        .catch( (error) => {
            renderError(error) 
        }) 
    }

    // ES2017

    async function onClickBuscarPais() {
        console.log('onClickBuscarPais')
        if (!inClave.value) {
            return
        }
        let url = paises1 + inClave.value 
        try {
            let response = await fetch(url)
            if(response.status == 200) {
                let data = await response.json()
                data = data.name
                data = data.map(item => { return {paises1: item.name,
                                              } 
                }) 
                console.log(data)
                renderData(data)
            } else {
                throw(new Error(response.status))
            }    
        } catch (error) {
            renderError(error)
        }
    }

    function renderData(data) {
        let html = ''
        data.forEach(item => html += `
        <li>
            <span class="nombre">${item.name}</span> |
            <span class="region">${item.region}</span>
        </li>` );
        uPaises.innerHTML = html

    } 

    function renderError(error) {
        pError.innerHTML = 'error de conexión: ' + error
    }
    
}