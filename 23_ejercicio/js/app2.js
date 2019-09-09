
export function app() {
    console.log('Cargada app') 





    const aAfrica = [
        {code: "HTML-01", pais: 'Africa'},
        {code: "CSS-02", titulo: 'CSS3'},
        {code: "JS-03", titulo: 'JavaScript'}
    ]

    const aAmerica = [
        {code: "Node-04", pais: 'Node JS'},
        {code: "PHP-05", titulo: 'PHP'}
    ]

    const aSelects = document.querySelectorAll('select')
    aSelects[0].addEventListener('change', onSelectTech)
    aSelects[1].addEventListener('change', onSelectCurso)


    function onSelectTech(ev) {
        let aCursos
        switch (ev.target.value) {
            case 'A':
                aCursos = aAfrica
                break;
            case 'AM':
                aCursos = aAmerica
                break;
        }
        let html = '<option value="">Elige un curso</option>'
        aCursos.forEach(item => {
            html += `
            <option value="${item.code}">${item.pais}
            </option>
            `
        })
        aSelects[1].innerHTML = html
        aSelects[1].disabled = false 
    }


    function onSelectCurso(ev) {
        console.log('Elegido el curso', ev.target.value )

    }
 }

//*

import { LBGOOGLE } from './api.js'
export function app() {
    console.log('Cargada app')

    // Nodos del DOM
    let btnBuscar = document.querySelector('#btn-buscar')
    let inClave = document.querySelector('#in-clave')   
    let ulLibros = document.querySelector('#ul-libros')
    let pError = document.querySelector('#p-error')
    
 
    // Asociación de manejadores de eventos
    //btnGuardar.onclick = onClickGuardar
    btnBuscar.addEventListener('click', onClickBuscar2017)
    inClave.addEventListener('change', onClickBuscar2017)

    // Funciones manejadoras de eventos

    function onClickBuscar(ev) {
        console.log('onClickBuscar')
        if (!inClave.value) {
            return
        }
        let url = LBGOOGLE + '/' + inClave.value
        inClave.value = '' 
        fetch(url)
        .then(response => {
            if(response.status == 200) {
                return response.json()
            } 
            throw(new Error(response.status))
        })
        .then( (data) => {
            data = data.items
            data = data.map(item => { return {title: item.volumeInfo.title,
                                              authors: item.volumeInfo.authors  } 
            }) 
            console.log(data)
            renderData(data)
        })
        .catch( (error) => {
            renderError(error) 
        }) 
    }

    // ES2017

    async function onClickBuscar2017() {
        console.log('onClickBuscar2017')
        if (!inClave.value) {
            return
        }
        let url = LBGOOGLE + '/' + inClave.value 
        try {
            let response = await fetch(url)
            if(response.status == 200) {
                let data = await response.json()
                data = data.items
                data = data.map(item => { return {title: item.volumeInfo.title,
                                              authors: item.volumeInfo.authors  } 
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
            <span class="title">${item.title}</span> |
            <span class="autor">${item.authors}</span>
        </li>` );
        ulLibros.innerHTML = html

    } 

    function renderError(error) {
        pError.innerHTML = 'error de conexión: ' + error
    }
    
}
*//