import { variables } from "./Variables";

export function obtenerCodigoIntermedio(){
    var data = "\t.DATA \n\n";

    variables.map((item) => {
        var numero = parseInt(item.contenido);

        if (item.contenido === "" || isNaN(item.contenido)){
            data = data + item.id.toUpperCase() + "\t" + "DW" + "\t" + "?" + "\n"
            return;
        }

        if (numero >= 0 && numero <= 255 || numero >= -127 && numero <= 127){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "\t" + item.contenido.trim() + "\n"
            return;
        }

        if (numero >= 0 && numero <= 65535 || numero >= -32768 && numero <= 32767){
            data = data + item.id.toUpperCase() + "\t" + "DW" + "\t" + item.contenido.trim() + "\n"
            return;
        }

        if (numero >= 0 && numero <= 4294967295 || numero >= -2147483648 && numero <= 2147483647){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + item.contenido.trim() + "\n"
            return;
        }
        
    })

    return data;
}