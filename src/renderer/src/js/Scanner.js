import { getToken } from "./tablaTokens";

export function obtenerTokens(palabras){
    var salidaTokens = [];
    

    if (palabras.length === 1 && palabras[0] === "") {
        document.getElementById("salidaTokens").value = "";
        return;
    }

    for (let i = 0; i < palabras.length; i++) {
        var contenido;
        if (palabras[i] == '"' && i + 1 < palabras.length){
            for (let j = i + 1; j < palabras.length; j++) {
                if (palabras[j] == '"' ){
                    break;
                }else{
                    contenido = contenido + " " + palabras[j];
                }
            }
            i+= contenido.split(" ").length
        }
        

        var tokenType = getToken(palabras[i]);
        if (tokenType != null) {
            salidaTokens.push(tokenType);
        }else{
            salidaTokens.push(palabras[i]+", ERROR");
        }
    }

    var cadenaFinal = "";

    salidaTokens.forEach(token => {
        cadenaFinal = cadenaFinal + token + "\n";
    });

    return cadenaFinal;

}

