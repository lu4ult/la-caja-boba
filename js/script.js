let streamsUrls = ["dbteiGt_t_4","o8JBz0XFS_k","wHn1_QVoXGM","9KKwqJsMLDg","vACfnp27ZkQ","IOSVORAZnRY"];
let streamNames = ["c5n","a24","tn","diputados tv","senadores","ln+"];
let tvGrandeActivo = false;

let primerCarga = false;

let produccion = "https://fastidious-fairy-1f357e.netlify.app/" === window.location.href || "https://animated-biscochitos-fe56b0.netlify.app/" === window.location.href;
//produccion = true;
console.log("Produccion: " + produccion);

/*************************************************************************************************/

if(localStorage.getItem("la-caja-boba-encuesta_no-mostrar") === null) {
  Swal.fire({
      title: '¿Nos ayudarías contestando una breve encuesta sobre esta herramienta?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si! Vamos a la encuesta!',
      denyButtonText: `No volver a mostrar`,
      cancelButtonText: 'Quizás en un futuro...',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          window.open("https://forms.gle/3KWjrWKT4mLr73L27", '_blank').focus();
      } else if (result.isDenied) {
        localStorage.setItem("la-caja-boba-encuesta_no-mostrar",JSON.stringify(new Date()))
      }
    });
}

/*************************************************************************************************/
function reconstruirGrid() {
  if(produccion === false)
    console.log("Reconstruyendo Grid");
  let mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  for(let i = 1; i<=6;i++) {
    let monitor = `
    <div id="iframe${i}Container">
      <div id="monitor${i}" draggable="true" class="svg-container"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg></div>
      <iframe id="iframe${i}" src="https://www.youtube.com/embed/${streamsUrls[i-1]}" title="${streamNames[i-1].toUpperCase()}" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    `;
    mainContainer.innerHTML += monitor;
  }

  //Tiene que estar acá porque sino como que "se pierden" los listeners
  let monitores = [];
  monitores = document.querySelectorAll(".svg-container");
  //console.log(...monitores);
  monitores.forEach(e => {
    e.addEventListener("dragstart", f => {
      f.dataTransfer.setData("id",f.target.id);
      console.log(f.target.id)
      if(tvGrandeActivo === true) {                           //Si se empieza a desplazar una pantallita pero el tv grande está en uso limpiamos todo
        //console.log("tv grande activo");
        document.getElementById("tvGrande").innerHTML = "";
        //document.getElementById("tvGrande").classList.remove("dragDropped");
        document.getElementById("tvGrande").classList.add("dragHover");
      }
    });
  });
}

reconstruirGrid();

/*************************************************************************************************/

async function buscar(buscado) {
  const response = await fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAD6_lw_djitCmUxEI8WyNyjvonlUTT57E&q='+buscado+' en vivo', {});
  //console.log('response.status: ', response.status); //
  if(response.status === 403) {
    console.log("sin couta para la api");
  }
  const data = await response.json();
  for(let i=0;i<5;i++) {
    let tipo = data['items'][i]['id']['kind'];
    let id = data['items'][i]['id']['videoId'];
    //console.log(tipo + " - " + id);
    if(tipo === "youtube#video") {
      //console.log("bien: " + id)
      return id;
    }
  }
  //console.log("ups no")
  return "nada";

 // return json.first_name.concat(' ').concat(json.last_name);
  //return "retornando";
}




// buscar("c5n").then(rtta => {
//   console.log("a24: " + rtta)
//   document.getElementById("iframe1").src = "https://youtube.com/embed/"+ rtta;
// });

// buscar("a24").then(rtta => {
//   console.log("a24: " + rtta)
//   document.getElementById("iframe2").src = "https://youtube.com/embed/"+ rtta;
// });

// buscar("tn").then(rtta => {
//   console.log("tn: " + rtta)
//   document.getElementById("iframe3").src = "https://youtube.com/embed/"+ rtta;
// });

// buscar("diputados tv").then(rtta => {
//   document.getElementById("iframe4").src = "https://youtube.com/embed/"+ rtta;
// });

if(produccion) {
  let indice = 5;
  //console.log("buscando: " + streamNames[indice-1])
  buscar(streamNames[indice-1]).then(rtta => {
    document.getElementById("iframe"+indice).src = "https://youtube.com/embed/"+ rtta;
    //console.log(streamsUrls);
    streamsUrls[indice-1] = rtta;
    //console.log(streamsUrls);
  });
}


// buscar("ln+").then(rtta => {
//   document.getElementById("iframe6").src = "https://youtube.com/embed/"+ rtta;
// });

/*************************************************************************************************/

if(produccion) {
  getDolar().then(updateValues);
}

/*************************************************************************************************/

// let monitor1 = document.getElementById("monitor1");
// monitor1.addEventListener("dragstart", e => {
//   e.dataTransfer.setData("id",e.target.id);
//  console.log("enviando: " + e.target.id);
// });




let tvGrande = document.getElementById("tvGrande");
tvGrande.addEventListener("dragenter", (e) => {
  console.log("drag enter")
});

tvGrande.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.classList.add("dragHover");
});

tvGrande.addEventListener("dragleave", (e) => {
  console.log("drag leave");
  e.target.classList.remove("dragHover");

});

tvGrande.addEventListener("drop", (e) => {
  e.target.classList.remove("dragHover");
  e.target.classList.add("dragDropped");

  //Reconstruimos el main-container para que si no es el primer monitor que se desplaza no quede más de un agujero.
  reconstruirGrid();

  let idRecibido = e.dataTransfer.getData("id");
  let idIframe = idRecibido.replace("monitor","iframe");
  let idContainer = idIframe + "Container";

  //console.log("ID SVG: " + idRecibido);
  console.log("ID Ifr: " + idIframe);
  console.log("ID Tod: " + idContainer);

  let iframeAMover = document.getElementById(idIframe);
  let contenedorAEliminar = document.getElementById(idContainer);

  document.getElementById("tvGrande").innerHTML = "";                 //Para limpiear el mensaje al inicio.
  document.getElementById("tvGrande").appendChild(iframeAMover);

  contenedorAEliminar.innerHTML = "";       //Eliminamos todo el contenido directamente.
  tvGrandeActivo = true;                    //Para las clases de Tv grande

  tvGrande.scrollIntoView(top);

});