function aviso(){
    alert("Bienvenido al mundo JS.");
}

function confirmacion(){
    let confirmacion = confirm("¿Desea salir de la sesión?");
    alert('valor seleccionado ${confirmacion}' );
}

function capturarDatos() {
    let nombre= prompt("¿Cual es su nombre?");
    let edad= prompt("¿Cual es su edad?");
    alert(`Hola ${nombre}, tienes ${edad} años.`);
}

function dibujarParrafo(){
    let parrafo = prompt("Escriba la informacion que desea visualizar en el parrafo");
    const p= document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}
