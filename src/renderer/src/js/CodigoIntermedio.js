import { variables } from "./Variables";

export function obtenerCodigoIntermedio(){
    var data = "\t.DATA \n\n";

    variables.map((item) => {

        if (item.tipo === "str" && item.valor === ""){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "   " + "80 dup(“$”)" + "\n";
            return;
        }

        if (item.tipo === "str" && item.valor !== ""){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "   " + '"' + item.valor.replace(/["']/g, "").trim() + " $" + '"' + "\n";
            return;
        }

        if (item.tipo === "$" && item.valor === ""){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + "?" + "\n";
            return;
        }

        if (item.tipo === "$" && item.valor !== ""){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + item.valor.trim() + "\n";
            return;
        }

        if (item.tipo === "#" && item.valor === ""){
            data = data + item.id.toUpperCase() + "\t" + "DW" + "\t" + "?" + "\n";
            return;
        }

        if (item.tipo === "#" && item.valor >= 0 && item.valor <= 255 || item.valor >= -127 && item.valor <= 127){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "\t" + item.valor.trim() + "\n"
            return;
        }

        if (item.tipo === "#" && item.valor >= 0 && item.valor <= 65535 || item.valor >= -32768 && item.valor <= 32767){
            data = data + item.id.toUpperCase() + "\t" + "DW" + "\t" + item.valor.trim() + "\n"
            return;
        }

        if (item.tipo === "#" && item.valor >= 0 && item.valor <= 4294967295 || item.valor >= -2147483648 && item.valor <= 2147483647){
            data = data + item.id.toUpperCase() + "\t" + "DD" + "\t" + item.valor.trim() + "\n"
            return;
        }
        
    })

    return data;
}