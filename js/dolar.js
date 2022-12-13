/*
async function getDolar()  {
  console.log("llamando dolar...")
const respuesta = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
const nombre = respuesta.json();

return nombre;
}

function updateValues(n) {
  document.getElementById("oficial-compra").innerHTML = n[0]['casa']['compra'];
  document.getElementById("oficial-venta").innerHTML = n[0]['casa']['venta'];
  document.getElementById("blue-compra").innerHTML = n[1]['casa']['compra'];
  document.getElementById("blue-venta").innerHTML = n[1]['casa']['venta'];
}
*/

function getDolar()  {
  fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
  .then(response => response.json())
  .then(n => {
    console.log("update")
    document.getElementById("oficial-compra").innerHTML = n[0]['casa']['compra'];
    document.getElementById("oficial-venta").innerHTML = n[0]['casa']['venta'];
    document.getElementById("blue-compra").innerHTML = n[1]['casa']['compra'];
    document.getElementById("blue-venta").innerHTML = n[1]['casa']['venta'];
  });
}