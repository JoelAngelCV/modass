let productos = [];

fetch("./js/productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    cargarProductos(productos);
});

const contenedorProductos = document.querySelector("#caja_prods");
const botonesCategorias = document.querySelectorAll(".btn_cat");
const tituloPrincipal = document.querySelector("#tit_principal");
let botonesAgregar = document.querySelectorAll(".pro_agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";
    
    productosElegidos.forEach(producto =>{

        const div = document.createElement("div");
        div.classList.add("un_pro");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="text_pro">
                <h3>${producto.titulo}</h3>
                <p>S/. ${producto.precio}.00</p>
                <button class="pro_agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e)=>{

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerHTML = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

        }
        else{
            tituloPrincipal.innerHTML = "Todos los Productos";
            cargarProductos(productos);
        }
        window.scrollTo(0, 0);
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".pro_agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlcarrito);
    });
}

let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));
if(productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();
} else{
    productosEnCarrito = [];
}

function agregarAlcarrito(e) {

    Toastify({
        text: "Producto Agregado",
        duration: 3000,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to bottom, hsla(224, 97%, 14%, 0.7), hsla(240, 100%, 3%, 0.774)), url(../img/pngtree-white-festive-seamless-pattern-image_263333.jpg)",
          borderRadius: '1rem',
          fontSize: '0.9rem'
        },
        offset: {
            x: '1.8rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '2.4rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();
    
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto)=> acc + producto.cantidad, 0);
    numerito.innerHTML = nuevoNumerito;
}
