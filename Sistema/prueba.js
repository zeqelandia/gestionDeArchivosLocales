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
    mainPath,
    preFiles,
    preplanningFiles;

function crear(){
    input = document.getElementById("fileURL");
    output = document.getElementById("fileOutput");
    holder = document.getElementById("fileHolder");
    links = document.getElementById("links");
    filePaths = [];
    preFiles = [];
    preplanningFiles = [];
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
        //var url = mainPath;
        var url = "F:/Documentos/Trabajos/Gestión%20de%20documentos%20AFS/repo/gestionDeArchivosLocales/Documentos";
        url += files[i].webkitRelativePath;
        filePaths.push(url);
    }
    generarLinks();
    getSubPaths();
}

function generarLinks(){
    var str, str2;
    var preLinks = document.getElementById("preLinks");
    var preplanningLinks = document.getElementById("preplanningLinks");
    /*for(let i = 0;i<filePaths.length;i++){
        str = filePaths[i];
        str2 = str.replace(/\s/g,'%20');
        links.innerHTML += "<a href=" + str2 + ">Libro " + i +"</a><br>";
    }*/
    console.log(preFiles);
    for(let i = 0;i<preFiles.length;i++){
        str = preFiles[i];
        str2 = str.replace(/\s/g,'%20');
        preLinks.innerHTML += "<a href=" + str2 + ">Libro " + i +"</a><br>";
    }
    for(let i = 0;i<preplanningFiles.length;i++){
        str = preplanningFiles[i];
        str2 = str.replace(/\s/g,'%20');
        preplanningLinks.innerHTML += "<a href=" + str2 + ">Libro " + i +"</a><br>";
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

function getSubPaths(){
    var index;
    var str = "";
    for(let i = 0;i<filePaths.length;i++){
        index = filePaths[i].indexOf("PRE");
        if(index != -1){
            str = filePaths[i].toString();
            preFiles.push(str);
        }
        index = filePaths[i].indexOf("Preplanning");
        if(index != -1){
            preplanningFiles.push(filePaths[i]);
        }
    }
}