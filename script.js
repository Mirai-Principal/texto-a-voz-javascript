var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
    
recognition.continuous = true;      //oir continuamente
recognition.interimResults = false; //muestra alternativas
recognition.lang = 'es-ES';         //lenguaje a escuchar
recognition.maxAlternatives = 1;        //numero de alternativas

recognition.onresult = async (e) => {
    let mensaje = '';
    //tomamos el ultimo mensaje
    for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        if (result.isFinal) {
            mensaje += result[0].transcript
            break
        }
         else {
            mensaje += result[0].transcript;
        }
            
        //valor de confianza del resultado
        let confianza = e.results[0].confidence;
    }

    mensaje =  mensaje.trim()
    if(mensaje == "detener")
        recognition.stop()
    else{
        let file = "imagenes/" + mensaje + ".jpg" 
    
        imagen.src = await file
        imagen.onload = ()=>{
            console.log("carga correcta")
        }

        //verificacion de existencia del archivo
        //var isLoaded = imagen.complete && imagen.naturalHeight !== 0;
        imagen.onerror = ()=>{
            imagen.src = "./imagenes/nofound.png"
        }
        textoMensaje.value = mensaje;
    }
};
    
btnEscuchar.onclick = ()=>{
    recognition.start()

}

btnDetener.onclick = ()=>{
    recognition.stop()
}

recognition.onspeechstart = ()=>{
    escuchando.style.display = "block"
}

recognition.onend = ()=>{
    escuchando.style.display = "none"
    textoMensaje.value = "";
    imagen.src = "./imagenes/intro.webp"

}