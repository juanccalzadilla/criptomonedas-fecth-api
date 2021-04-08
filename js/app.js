const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const form = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const objBusqueda = {

    moneda:'',
    criptomoneda:''
}





// Crear un promises

const obtenerCriptomonedas = criptomonedas => new Promise(resolve =>{

    resolve(criptomonedas);
});



document.addEventListener('DOMContentLoaded', ()=>{

    form.addEventListener('submit', submitForm)

    criptomonedasSelect.addEventListener('change', leerValor)
    monedaSelect.addEventListener('change', leerValor)
})

window.addEventListener('load', ()=>{
    consultarCriptomonedas();
})


function consultarCriptomonedas(){

    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD';

    
    fetch(url)
        .then(response => response.json())
        .then(result => obtenerCriptomonedas(result.Data))
        .then(criptomonedas =>selectFill(criptomonedas))
        // mostrarSpinner();
}


function selectFill(criptomonedas){

    criptomonedas.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo;
        const option = document.createElement('option');

        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option)


    });    
}

function leerValor(e){
        objBusqueda[e.target.name] = e.target.value;
    
}

function submitForm (e){

    e.preventDefault();

    // Validar


    const {moneda, criptomoneda} = objBusqueda;

    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');

    }
    mostrarSpinner();
    consultarAPI();


}

function mostrarAlerta(msg){
    const existeAlerta = document.querySelector('.error')
    if (!existeAlerta) {
        const alerta = document.createElement('p');
        alerta.classList.add('error')
        alerta.innerHTML = msg;
        form.appendChild(alerta)
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }

}

function consultarAPI(){

    const {moneda, criptomoneda} = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        fetch(url)
        .then(response => response.json())
        .then(result => showHTML(result.DISPLAY[criptomoneda][moneda]))
}


function showHTML(cotizacion){
    limpiarHTML();
   
    
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCTHOUR, LASTUPDATE} = cotizacion;
        
    
        const precio = document.createElement('p');
        precio.classList.add('precio')
        precio.innerHTML = `El precio es: <span>${PRICE}</span>`;
        const altoDia = document.createElement('p')
        altoDia.innerHTML = `El precio mas alto hoy : <span>${HIGHDAY}</span>`;
        const bajoDia = document.createElement('p')
        bajoDia.innerHTML = `El precio mas bajo hoy : <span>${LOWDAY}</span>`;
        const change = document.createElement('p')
        change.innerHTML = `Ha cambiado: <span>${CHANGEPCTHOUR}%</span>`;
        const lastupdate = document.createElement('p');
        lastupdate.innerHTML = `Ultima actualizacion : <span>${LASTUPDATE}</span>`;
        
    
    
        resultado.appendChild(precio)
        resultado.appendChild(bajoDia)
        resultado.appendChild(altoDia)
        resultado.appendChild(change)
        resultado.appendChild(lastupdate)
}

    



function limpiarHTML(){
while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
}
}

function mostrarSpinner(){
    limpiarHTML();
    const existe = document.querySelector('spinner');
    if (!existe) {
        
    
        
        const spinner = document.createElement('div');
    
        spinner.classList.add('spinner');
    
        spinner.innerHTML = `
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>   
        `
    
        resultado.appendChild(spinner)
    }
   

}