let articulos = [];
let carrito = [];
let contenedorCarrito = document.getElementById(`listcar`)
let vaciarCarrito = document.getElementById(`vaciar`)
let contadorCarrito = document.getElementById("contador")
let precioTotal = document.getElementById(`preciototal`)
let compra = 0;



document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        subCarrito()
    }
})


class productos {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }

    // Se agrego secion de articulos al html //Libreria Toastigy Agregar productos
    listaArticulos() {
        const lista = `
        <div id="tienda" class="card col-md">
            <img src=${this.img} class='img__art' alt="">
                
                    <h2 class="product__price fw-regular">
                        $${this.precio}
                    </h2>
                    <p class="div__p">
                        <a href="#!" class="text-dark">${this.nombre}</a>
                    </p>
                    <div class="div__start">
                        <i class="fa-solid fa-star filed-star"></i>
                        <i class="fa-solid fa-star filed-star"></i>
                        <i class="fa-solid fa-star filed-star"></i>
                        <i class="fa-solid fa-star filed-star"></i>
                    </div>
                    <div id="carrito">
                        <i class="fa-solid fa-cart-shopping"></i>
                        <button id=${this.id} class="add btn btn-primary">Agregar al carrito</button>
                    </div>
                
            </div>  
        `

        const conteiner = document.getElementById(`list__art`);
        conteiner.innerHTML += lista



    }

    agregarEvento() {
        const btnCarrito = document.getElementById(this.id);

        const prodAgregar = articulos.find(prod => prod.id == this.id)
        btnCarrito.addEventListener('click', () => agregarAlCarrito(prodAgregar))


    }

}


//Libreria Toastigy Agregar productos
let botonAgregar = document.querySelector("#list__art")
botonAgregar.onclick = eventoUno
function eventoUno() {
    Toastify({
        text: "Se a Agregado al carrito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00c399, #96c93d)",
        },
    }).showToast();
}


let espPro = new productos(`1`, "Espirales Progresivos <br> x 4", 18000, `./img/espiralesProgre.jpg`);
let susFija = new productos(`2`, "Suspension Fija <br> Rally", 35000, `./img/suspFija.jpg`);
let susRegC = new productos(`3`, "Suspension Regulable completa", 75000, `./img/suspRegcompleta.jpg`);
let susRegD = new productos(`4`, "Suspension Regulable delantera", 35000, `./img/suspRegDel.jpg`);
let susNeu68 = new productos(`5`, "Suspension Neumatica 6.0 8mm", 225000, `./img/airRideBlack10-6.0.jpg`);
let susNeu610 = new productos(`6`, "Suspension Neumatica 6.0 10mm", 255000, `./img/airRideBlack8-6.0.jpg`);
let susNeu78 = new productos(`7`, "Suspension Neumatica 7.0 8mm", 300000, `./img/airRideBlack8-7.0.jpg`);
let susNeu710 = new productos(`8`, "Suspension Neumatica 7.0 10mm", 360000, `./img/airRideBlack10-7.0.jpg`);

articulos.push(espPro, susFija, susRegC, susRegD, susNeu68, susNeu610, susNeu78, susNeu710);


//se hizo foreach para recorrer el array de articulos para interactuar mediante dom a cada producto creado y realizado por class 
articulos.forEach(e => { e.listaArticulos() })

articulos.forEach(e => { e.agregarEvento() })


//funcion de agregar los productos para que aparezca en menu desplegable
function agregarAlCarrito(productos) {

    let enCarrito = carrito.find(prod => prod.id == productos.id);
    //condicional para no repetir productos y sumar en si mismo
    if (!enCarrito) {
        carrito.push({ ...productos, cantidad: 1 })
    } else {
        let carritoFiltrado = carrito.filter(prod => prod.id != productos.id)
        carrito = [
            ...carritoFiltrado,
            { ...enCarrito, cantidad: enCarrito.cantidad + 1 }
        ]
    }
    subCarrito()
}

const subCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement(`div`)
        div.className = (`menu__carrito`)
        div.innerHTML = `
        <img src=${prod.img} class='img__art1' alt="">
    
              <p>
               ${prod.nombre}
             </p>
            
              <p>
                Precio: ${prod.precio}
              </p>
            
              <p>
                Cantidad: <span>${prod.cantidad}</span>
              </p>
            
              <button onclick="eliminarDelCarrito(${prod.id})" class="boton__eliminar"><i class="fa fa-trash-alt"></button>
        `
        contenedorCarrito.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    //contador carrito
    contadorCarrito.innerText = carrito.length

    cantidadtotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    //contador carrito cantidad total de productos que hay en la compra

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.

    //Evento libreria finalizar sweetalert
    let botonFin = document.getElementById(`fin`)
    botonFin.onclick = eventoDos

    function eventoDos() {
        Swal.fire({
            icon: 'success',
            title: 'Finalizo su Compra',
            text: 'Proceder al Pago',
            footer: '<a href="">Necesitas Ayuda?</a>'
        })
    }

}


eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    subCarrito()
}

//vaciar con evento sweetAlert
let vaciar = document.getElementById(`vaciar`)
vaciar.onclick = eventoTres
function eventoTres() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Estas seguro de Eliminar los productos?',
        text: "¡No podrás revertir esto!",
        icon: 'Cuidado',
        showCancelButton: true,
        confirmButtonText: '¡Sí, Eliminar!',
        cancelButtonText: 'No, Eliminar!',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            subCarrito()
            swalWithBootstrapButtons.fire(
                'Eliminar!',
                'Su productos se han eliminado del carrito.',
                'Con Exito'
            )
        }


        else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tus Productos Estan Guardado! :)',
                ''
            )
        }
    })
}










