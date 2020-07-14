/*
by Addy Osmani
based on the original webkitdirectory POC
by Ryan Seddon
*/

var files, 
    file, 
    extension, 
    input,
    output,
    holder,
    links,
    filePaths,
    rutaPrincipal,
    startOfPath,
    mainPath;

function crear(){
    input = document.getElementById("fileURL");
    output = document.getElementById("fileOutput");
    holder = document.getElementById("fileHolder");
    links = document.getElementById("links");
    filePaths = [];
    rutaPrincipal = window.location.href;
    getMainPathEndChar();
    mainPath = rutaPrincipal.substring(0,(startOfPath+1));
}


function cargar(){

input.addEventListener("change", function (e) {
    files = e.target.files;
    output.innerHTML = "";

    for (var i = 0, len = files.length; i < len; i++) {
        file = files[i];
        extension = file.name.split(".").pop();
        output.innerHTML += "<li class='type-" + extension + "'>" + file.name + " (" +  Math.floor(file.size/1024 * 100)/100 + "KB)</li>";
    }
}, false);



// This event is fired as the mouse is moved over an element when a drag is occuring
input.addEventListener("dragover", function (e) {
    holder.classList.add("highlightOver");
});

// This event is fired when the mouse leaves an element while a drag is occuring
input.addEventListener("dragleave", function (e) {
    holder.classList.remove("highlightOver");
});

// Fires when the user releases the mouse button while dragging an object.
input.addEventListener("dragend", function (e) {
    holder.classList.remove("highlightOver");
});

// The drop event is fired on the element where the drop was occured at the end of the drag operation
input.addEventListener("drop", function (e) {
    holder.classList.remove("highlightOver");
});

}

function mostrar(){
    for(let i = 0;i<files.length;i++){
        var url = mainPath;
        //var url = "file:///E:/Libros/";
        url += files[i].webkitRelativePath;
        filePaths.push(url);
    }
    generarLinks();
}

function generarLinks(){
    var str, str2;
    for(let i = 0;i<filePaths.length;i++){
        str = filePaths[i];
        str2 = str.replace(/\s/g,'%20');
        links.innerHTML += "<a href=" + str2 + ">Libro " + i +"</a><br>";
    }
}

function getMainPathEndChar(){
    var dim = rutaPrincipal;
    for(let i = 11;i<1000;i++){
        if(rutaPrincipal[i] === '/'){
            startOfPath = i;
            break;
        }
    }
}

/*function mostrar(){
    const reader = new FileReader();
    //window.open(files[0], "_blank");
    reader.addEventListener('load', (event) => {
        const resultado = event.target.result;
        alert(resultado);
        //window.open(event.target.result, "_blank");
    });
    reader.readAsDataURL(file);
}*/