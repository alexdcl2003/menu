var platos = [{
    cantidad: 0,
    precio: 2
}];

function agregarPlato(index) {
    platos[index].cantidad++;
    actualizarTotal();
}

function quitarPlato(index) {
    if (platos[index].cantidad > 0) {
        platos[index].cantidad--;
        actualizarTotal();
    }
}

function agregarPlatoDiferente() {
    var newIndex = platos.length;
    platos.push({
        cantidad: 0,
        precio: 2
    });

    var ordersDiv = document.getElementById("orders");
    var orderItemDiv = document.createElement("div");
    orderItemDiv.className = "order-item";
    orderItemDiv.setAttribute("data-index", newIndex);
    orderItemDiv.innerHTML = 
    '<label for="plato">Plato:</label>' +
        '<select id="plato">' +
        '<option value="Arroz con Pollo">Arroz con Pollo</option>' +
        '<option value="Arroz con Menestra">Arroz con Menestra</option>' +
        '<option value="Pollo al Jugo">Pollo al Jugo</option>' +
        '<option value="Pollito a la brasa">Pollito al la brasa</option>' +
        '<option value="Guatita">Guatita</option>' +
        '<option value="Encebollado">Encebollado</option>' +
        '<option value="Ceviche">Ceviche</option>' +
        '</select>' +
        '<button onclick="agregarPlato(' + newIndex + ')">+</button>' +
        '<span class="cantidad-platos">1</span>' +
        '<button onclick="quitarPlato(' + newIndex + ')">-</button>' +
        '<button onclick="eliminarPlato(' + newIndex + ')">Quitar Plato</button>';
    ordersDiv.appendChild(orderItemDiv);
    actualizarTotal();
}

function eliminarPlato(index) {
    var orderItemDiv = document.querySelector('[data-index="' + index + '"]');
    orderItemDiv.parentNode.removeChild(orderItemDiv);
    platos.splice(index, 1);
    actualizarTotal();
}

function agregarPropina(porcentaje) {
    const totalSinIva = parseFloat(document.getElementById("total-amount").textContent);
    const propina = (totalSinIva * porcentaje) / 100;
    mostrarPropinaYTotal(propina);
}
function mostrarInputPersonalizado() {
    var personalizadaContainer = document.getElementById("personalizada-container");
    personalizadaContainer.style.display = "block";
}

function propinaPersonalizada() {
    const porcentajePersonalizado = parseFloat(document.getElementById("propina-personalizada").value);
    const totalSinIva = parseFloat(document.getElementById("total-amount").textContent);
    const propina = (totalSinIva * porcentajePersonalizado) / 100;
    mostrarPropinaYTotal(propina);
}

function mostrarPropinaYTotal(propina) {
    const propinaAmountSpan = document.getElementById("propina-amount");
    propinaAmountSpan.textContent = propina.toFixed(2);
    
}

function actualizarTotal() {
    var total = 0;
    platos.forEach(function(plato) {
        total += plato.cantidad * plato.precio;
    });

    var cantidadPlatosSpans = document.querySelectorAll(".cantidad-platos");
    cantidadPlatosSpans.forEach(function(span, index) {
        span.textContent = platos[index].cantidad;
    });

    var totalAmountSinIVA = document.getElementById("total-amount");
    var totalSinIVA = total.toFixed(2);
    totalAmountSinIVA.textContent = totalSinIVA;

    var iva = total * 0.12;
    var totalConIVA = total + iva;

    var totalAmountConIVA = document.getElementById("total-con-iva");
    totalAmountConIVA.textContent = totalConIVA.toFixed(2);
}


var datosContainer = document.getElementById("datos-container");
var consumidorFinalBtn = document.getElementById("consumidor-final");
var datosBtn = document.getElementById("datos");
var completarBtn = document.getElementById("completar");


datosBtn.addEventListener("click", function() {
    datosContainer.classList.remove("oculto");
});

// Ocultar el contenedor de datos al hacer clic en el botón "Consumidor final"
consumidorFinalBtn.addEventListener("click", function() {
    datosContainer.classList.add("oculto");
});

// Lógica para generar la factura cuando se hace clic en "Completar"
completarBtn.addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var cedula = document.getElementById("cedula").value;

    // Validar que se haya ingresado nombre y cédula antes de generar la factura
    if (nombre && cedula) {
        var clienteInfo = "Nombre: " + nombre + "<br>Número de cédula: " + cedula;
        generarFactura(clienteInfo);
    } else {
        alert("Por favor, ingrese el nombre y la cédula del cliente.");
    }
});


function generarFactura(clienteInfo, tipoFactura) {
    var facturaDiv = document.getElementById("factura");
    facturaDiv.innerHTML = ""; // Limpiar el contenido anterior de la factura

    // Lógica para generar la factura según el tipo seleccionado
    if (tipoFactura === "datos") {
        facturaDiv.innerHTML = clienteInfo + "<br><br>";
    }

    // Agregar platos y precios
    platos.forEach(function(plato, index) {
        if (plato.cantidad > 0) {
            var nombrePlato = document.getElementById("plato").options[index].text;
            facturaDiv.innerHTML += nombrePlato + ": $" + (plato.precio * plato.cantidad).toFixed(2) + "<br>";
        }
    });

    // Obtener y mostrar el total con IVA
    var totalConIVA = parseFloat(document.getElementById("total-con-iva").textContent);
    facturaDiv.innerHTML += "Total con IVA : $" + totalConIVA.toFixed(2) + "<br>";

    // Obtener y mostrar la propina
    var propina = parseFloat(document.getElementById("propina-amount").textContent);
    facturaDiv.innerHTML += "Propina: $" + propina.toFixed(2) + "<br>";

    // Calcular y mostrar el total a pagar (con IVA y propina)
    var totalPagar = totalConIVA + propina;
    facturaDiv.innerHTML += "Total a pagar: $" + totalPagar.toFixed(2);

    // Mostrar el contenedor de la factura
    var facturaContainer = document.getElementById("factura-container");
    facturaContainer.classList.remove("oculto");
}
completarBtn.addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var cedula = document.getElementById("cedula").value;

    // Validar que se haya ingresado nombre y cédula antes de generar la factura
    if (nombre && cedula) {
        var clienteInfo = "Nombre: " + nombre + "<br>Número de cédula: " + cedula;

        // Determinar el tipo de factura seleccionado
        var tipoFactura;
        if (!datosContainer.classList.contains("oculto")) {
            tipoFactura = "datos";
        } else {
            tipoFactura = "consumidorFinal";
        }

        generarFactura(clienteInfo, tipoFactura);
    } else {
        alert("Por favor, ingrese el nombre y la cédula del cliente.");
    }
});
// Ocultar el contenedor de datos al hacer clic en el botón "Consumidor final"
consumidorFinalBtn.addEventListener("click", function() {
    datosContainer.classList.add("oculto");

    // Generar factura para consumidor final sin necesidad de ingresar datos
    var clienteInfo = "Cliente: Consumidor Final (Sin datos)";
    var tipoFactura = "consumidorFinal";
    generarFactura(clienteInfo, tipoFactura);
});

// Lógica para generar la factura cuando se hace clic en "Completar"
completarBtn.addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var cedula = document.getElementById("cedula").value;

    // Validar que se haya ingresado nombre y cédula antes de generar la factura
    if (nombre && cedula) {
        var clienteInfo = "Nombre: " + nombre + "<br>Número de cédula: " + cedula;

        // Determinar el tipo de factura seleccionado
        var tipoFactura;
        if (!datosContainer.classList.contains("oculto")) {
            tipoFactura = "datos";
        } else {
            tipoFactura = "consumidorFinal";
        }

        generarFactura(clienteInfo, tipoFactura);
    } else {
        alert("Por favor, ingrese el nombre y la cédula del cliente.");
    }
});