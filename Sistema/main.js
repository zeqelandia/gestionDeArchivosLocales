var pantalla1, pantalla2, pantalla3, pantallaActual;

function iniciarVariables(){
    pantalla1 = document.getElementById("pantalla1");
    pantalla2 = document.getElementById("pantalla2");
    pantalla3 = document.getElementById("pantalla3");
}

function cambiarPantalla(pantalla){
    if(pantalla == 1){
        visibilidad(pantalla1, "block");
        visibilidad(pantalla2, "none");
        visibilidad(pantalla3, "none");
    }else if(pantalla == 2){
        visibilidad(pantalla1, "none");
        visibilidad(pantalla2, "block");
        visibilidad(pantalla3, "none");
    }else if(pantalla == 3){
        visibilidad(pantalla1, "none");
        visibilidad(pantalla2, "none");
        visibilidad(pantalla3, "block");
    }
}

function visibilidad(pantalla, vis){
    pantalla.style.display = vis;
}