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


let streamsUrls = [];
let streamNames = ["c5n","a24","tn","diputados tv","senadores","ln+"];


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

// buscar("camara senadores").then(rtta => {
//   document.getElementById("iframe5").src = "https://youtube.com/embed/"+ rtta;
// });

// buscar("ln+").then(rtta => {
//   document.getElementById("iframe6").src = "https://youtube.com/embed/"+ rtta;
// });





/*************************************************************************************************/

// let monitor1 = document.getElementById("monitor1");
// monitor1.addEventListener("dragstart", e => {
//   e.dataTransfer.setData("id",e.target.id);
//  console.log("enviando: " + e.target.id);
// });

let monitores = [];
monitores = document.querySelectorAll(".svg-container");
//console.log(...monitores);
monitores.forEach(e => {
  e.addEventListener("dragstart", f => {
    f.dataTransfer.setData("id",f.target.id);
  });
});

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


  let idRecibido = e.dataTransfer.getData("id");
  let idIframe = idRecibido.replace("monitor","iframe");

  console.log("ID SVG: " + idRecibido);
  console.log("ID Ifr: " + idIframe);

  let elementoMover = document.getElementById(idIframe);

  document.getElementById("tvGrande").innerHTML = "";                 //Para limpiear el mensaje al inicio.
  document.getElementById("tvGrande").appendChild(elementoMover);
  //document.getElementById(idIframe+"Container").appendChild("div");
  document.getElementById("main-container").removeChild(elementoMover);

});