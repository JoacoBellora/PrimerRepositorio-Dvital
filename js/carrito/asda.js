const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProductos = async () =>{
    const response = await fetch("../data.json");
    const data = await response.json();
    
    console.log(data);


    data.forEach((product)=> {
        let content = document.createElement("div");
        content.className = "botonCompra";
        content.innerHTML = `
            
                <img src="${product.Img}" class="productos">
                <div class="divBoton">
                    <span>
                        <h2>${product.Nombre}</h2>
                        ${product.caracteristicas}
                        <p>${product.precio}$</p>
                    </span>
                    
                </div>
                `;
                
                shopContent.append(content)
    
            
            let comprar = document.createElement("button");
            comprar.innerText = "Agregar al Carrito";
            comprar.className = "agregarCarrito";
    
            content.append(comprar);
    
            comprar.addEventListener("click", () =>{
                const repeat = carrito.some((repeatProduct) => repeatProduct.Id === product.Id);
    
                if(repeat){
                    carrito.map((prod) =>{
                        if(prod.Id === product.Id){
                            prod.cantidad++;
                        }
                    });
                }else{
                    carrito.push({
                    Id: product.Id,
                    Img: product.Img,
                    Nombre: product.Nombre,
                    precio: product.precio,
                    cantidad: product.cantidad,
                });
                saveLocal();
            };
            });
            
    });
}

getProductos();


const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



const pintarCarrito = () =>{
    modalContainer.style.display = "flex";
    modalContainer.innerHTML = "";
    const modalHead = document.createElement("div");
    modalHead.className = "modalHeader";
    modalHead.innerHTML = `
    <p class="modalHeaderTitle">Tu Carrito</p>
    `;
    modalContainer.append(modalHead);

    const modalButton = document.createElement("p");
    modalButton.innerText = "x";
    modalButton.className = "modalHeaderButton";
    modalHead.append(modalButton);

    modalButton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });

    carrito.forEach((productos) => {
    let carritoContent = document.createElement("div")
    carritoContent.className = "modal-content"
    carritoContent.innerHTML = `
    <img src="${productos.Img}">
    <div class="carritoPrecioContent">
        <h3>${productos.Nombre}</h3>
        <p>${productos.precio} $</p>
        <div style="display: flex; align-items:center; gap: 0.3rem">
            <span class="restar" style="cursor: pointer";> - </span>
            <p>Cantidad: ${productos.cantidad}</p>
            <span class="sumar" style="cursor: pointer";> + </span>
        </div>
        <p>Total: ${productos.cantidad * productos.precio} </p>
    </div>
    `;
    modalContainer.append(carritoContent);

    let restar= carritoContent.querySelector(".restar");
    restar.addEventListener("click", () =>{
        if(productos.cantidad !== 1){
            productos.cantidad--;
        }
        saveLocal();
        pintarCarrito();

        if(productos.cantidad === 0){
            carrito = carrito.filter((carritoId) =>{
                return carritoId !== productos.Id;
            });
            saveLocal();
            pintarCarrito();
        };
    });

    let sumar= carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () =>{
        if(productos.cantidad){
            productos.cantidad++;
        }
        saveLocal();
        pintarCarrito();
    });

    let eliminar = document.createElement("span");
    
    eliminar.innerText = "❌";
    eliminar.className = "deleteProduct";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto);
});
const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

const totalBuying = document.createElement("div")
totalBuying.className = "total-content"
totalBuying.innerHTML = `Total a pagar: ${total}$
`
modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = () =>{
    const foundId = carrito.find((element) => element.Id);

    carrito = carrito.filter((carritoId) =>{
        return carritoId !== foundId;
    });
    saveLocal();
    pintarCarrito();
};
