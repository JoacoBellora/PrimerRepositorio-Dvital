const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");


let carrito = []

productos.forEach((product)=> {


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
            carrito.push({
                Id: product.Id,
                Img: product.Img,
                Nombre: product.Nombre,
                precio: product.precio,
            });
        });
        
        

});

verCarrito.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    modalContainer.innerHTML = "";
    const modalHead = document.createElement("div");
    modalHead.className = "modalHeader";
    modalHead.innerHTML = `
    <p class="modalHeaderTitle">Tu Carrito</p>
    `;
    modalContainer.append(modalHead);

    const modalButton = document.createElement("p");
    modalButton.innerText = "X";
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
    </div>
    `;
    modalContainer.append(carritoContent);
});

const total = carrito.reduce((acc, el) => acc + el.precio, 0);

const totalBuying = document.createElement("div")
totalBuying.className = "total-content"
totalBuying.innerHTML = `Total a pagar: ${total}$
`
modalContainer.append(totalBuying);



});
