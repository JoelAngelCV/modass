const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".elim_car_pro");
const botonVaciar = document.querySelector("#car_acc_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#car_acc_comprar");

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";
        
        productosEnCarrito.forEach(producto => {

            const div = document.createElement("div");
            div.classList.add("car_pro");
            div.innerHTML = `
                <img class="car_img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="tit_car_pro">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="cant_car_pro">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="pre_car_pro">
                    <small>Precio</small>
                    <p>S/. ${producto.precio}.00</p>
                </div>
                <div class="subt_car_pro">
                    <small>Subtotal</small>
                    <p>S/. ${producto.precio * producto.cantidad}.00</p>
                </div>
                <button class="elim_car_pro" id="${producto.id}" ><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        })

    } else {
        
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");

    }
    
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".elim_car_pro");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
    Toastify({
        text: "Producto Eliminado",
        duration: 3000,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom, hsla(224, 97%, 14%, 0.7), hsla(240, 100%, 3%, 0.774)), url(../img/pngtree-white-festive-seamless-pattern-image_263333.jpg)",
          borderRadius: "1rem",
          fontSize: "0.8rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '2.4rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id; 
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: "#08266D",
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerHTML = `S/. ${totalCalculado}.00`;
}


botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}