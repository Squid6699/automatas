import { variables } from "./Variables";

export function obtenerCodigoIntermedio(){
    var data = "\t.DATA \n\n";

    variables.map((item) => {
        // var numero = parseInt(item.valorInicial);

        if (item.tipo === "$" && item.valorInicial === ""){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + "?" + "\n";
            return;
        }

        if (item.tipo === "$" && item.valorInicial !== ""){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + item.valorInicial.trim() + "\n";
            return;
        }

        if (item.tipo === "#" && item.valorInicial === ""){
            data = data + item.id.toUpperCase() + "\t" + "DW" + "\t" + "?" + "\n";
            return;
        }

        if (item.tipo === "#" && item.valorInicial >= 0 && item.valorInicial <= 255 || item.valorInicial >= -127 && item.valorInicial <= 127){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "\t" + item.valorInicial.trim() + "\n"
            return;
        }

        if (item.tipo === "#" && item.valorInicial >= 0 && item.valorInicial <= 65535 || item.valorInicial >= -32768 && item.valorInicial <= 32767){
            data = data + item.id.toUpperCase() + "\t" + "DW" + "\t" + item.valorInicial.trim() + "\n"
            return;
        }

        if (item.tipo === "#" && item.valorInicial >= 0 && item.valorInicial <= 4294967295 || item.valorInicial >= -2147483648 && item.valorInicial <= 2147483647){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + item.valorInicial.trim() + "\n"
            return;
        }
        
    })

    return data;
}