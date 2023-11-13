const drop = document.getElementById("drop");
const cerrar = document.getElementById("cerrar");
const menu = document.getElementById("menu");


drop.addEventListener("click", () =>{
    drop.style.display = "none";
    menu.style.display = "flex";
    cerrar.style.display = "flex"; 
});

cerrar.addEventListener("click", () =>{
    drop.style.display = "flex";
    menu.style.display = "none";
    cerrar.style.display = "none";
});
