var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
    
recognition.continuous = true;      //oir continuamente
recognition.interimResults = false; //muestra alternativas
recognition.lang = 'es-ES';         //lenguaje a escuchar
recognition.maxAlternatives = 1;        //numero de alternativas

recognition.onresult =  (e) => {
    let mensaje = '';
    //tomamos el ultimo mensaje
    let ultimaRespuesta = e.resultIndex
    const result = e.results[ultimaRespuesta];

    let confianza  = e.results[0].confidence;
    mensaje += result[0].transcript;

    
    mensaje =  mensaje.trim()
    if(mensaje == "detener")
        recognition.stop()
    else{
        let file = "imagenes/" + mensaje + ".jpg" 
    
        imagen.src =  file
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
    //textoMensaje.value = "";
    //imagen.src = "./imagenes/intro.webp"

    btnEscuchar.disabled = false;
    btnDetener.disabled = true

    //texoAVoz("He dejado de oír")
}

recognition.onstart = ()=>{
    btnEscuchar.disabled = true;
    btnDetener.disabled = false

    texoAVoz()
}

//texto a voz
function texoAVoz(mensaje = "Estoy escuchando") {
     var speech = new SpeechSynthesisUtterance();
     speech.text = mensaje;
     speech.volume = 1;
     speech.rate = 1;
     speech.pitch = 1;
     speech.lang = "es-ES"
 
     window.speechSynthesis.speak(speech);
}