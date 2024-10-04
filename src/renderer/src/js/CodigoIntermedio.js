import { variables } from "./Set";

export function obtenerCodigoIntermedio(){
    var data = "\t\t .DATA \n\n";

    variables.forEach((contenido, id) => {
        var numero = parseInt(contenido);
        
        if (contenido === "" || isNaN(contenido)){
            data = data + id.toUpperCase() + "\t" + "DW" + "\t" + "?" + "\n"
            return;
        }

        if (numero >= 0 && numero <= 255 || numero >= -127 && numero <= 127){
            data = data + id.toUpperCase() + "\t" + "DB" + "\t" + contenido + "\n"
            return;
        }

        if (numero >= 0 && numero <= 65535 || numero >= -32768 && numero <= 32767){
            data = data + id.toUpperCase() + "\t" + "DW" + "\t" + contenido + "\n"
            return;
        }

        if (numero >= 0 && numero <= 4294967295 || numero >= -2147483648 && numero <= 2147483647){
            data = data + id.toUpperCase() + "\t" + "DD" + "\t" + contenido + "\n"
            return;
        }

    });
    return data;
}