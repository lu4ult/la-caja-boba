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
