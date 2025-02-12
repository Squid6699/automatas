import { getContenidoVariable } from "./functions";
import { addCodigoIntermedioCode, addCodigoIntermedioData, instrucciones, variables } from "./Variables";

export function obtenerCodigoIntermedio(){
    var data = "\t.DATA \n\n";

    variables.map((item) => {

        if (item.tipo === "str" && item.valorInicial === ""){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "   " + "80 dup(“$”)" + "\n";
            return;
        }

        if (item.tipo === "str" && item.valorInicial !== ""){
            data = data + item.id.toUpperCase() + "\t" + "DB" + "   " + '"' + item.valorInicial.replace(/["']/g, "").trim() + " $" + '"' + "\n";
            return;
        }

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

    addCodigoIntermedioData(data);

    data = data + "\n\n\t.CODE \n\n";

    data = data + puntoCode(instrucciones);

    return data;
}

function puntoCode(items){
    var data = "";
    items.map((item) => {
        if (item.valor.split(" ").length === 1){
            data = data + asignacion(item) + "\n";
        }

        if (item.valor.includes("OUT")){
            // if (!out(item) === "undefined"){
            //     data = data + out(item) + "\n";
            // }else{
            //     data = data;
            // }
            data = data + out(item) + "\n";

        }

        if (item.valor.includes("LEER")){
            // if (!leer(item) === "undefined"){
            //     data = data + leer(item) + "\n";
            // }else{
            //     data = data;
            // }
            data = data + leer(item) + "\n"
        }

        if (item.valor.includes("si")){
            data = data + clausulaSi(item);
        }

        if (item.valor.includes("/")){
            // if (!division(item) === "undefined"){
            //     data = data + division(item) + "\n";
            // }else{
            //     data = data;
            // }
            data = data + division(item) + "\n";
        }

        if (item.valor.includes("*")){
            // if (!multiplicacion(item) === "undefined"){
            //     data = data + multiplicacion(item) + "\n";
            // }else{
            //     data = data;
            // }
            data = data + multiplicacion(item) + "\n";
        }

        if (item.valor.includes("+")){
            // if (!suma(item) === ""){
            //     data = data + suma(item) + "\n";
            // }else{
            //     data = data;
            // }
            data = data + suma(item) + "\n";
        }

        if (item.valor.includes("-")){
            // if (!resta(item) === ""){
            //     data = data + resta(item) + "\n";
            // }else{
            //     data = data;
            // }
            data = data + resta(item) + "\n";
        }

    })

    data = data.replace(/undefined/g, '').trim();
    addCodigoIntermedioCode(data);

    return data
}

export function asignacion(instruccion){
    var cadena = "";
    cadena = cadena + "MOV \t"+instruccion.id.toUpperCase() + ", \t"+instruccion.valor + "\n";
    return cadena;
}

export function division(instruccion){
    if (instruccion.valor.includes("si")){
        return;
    }
    var cadena = "";
    const operacion = instruccion.valor.split("/");
    cadena = cadena + "MOV \t" + "AX, \t"+operacion[0].trim().toUpperCase() + "\n";
    cadena = cadena + "MOV \t" + "BX, \t"+operacion[1].trim().toUpperCase() + "\n";
    cadena = cadena + "DIV \tBX" + "\n";
    cadena = cadena + "MOV \t"+instruccion.id.toUpperCase() + ", " + "\tAL"  + "\n";
    return cadena;
}

export function multiplicacion(instruccion){
    if (instruccion.valor.includes("si")){
        return;
    }
    var cadena = "";
    const operacion = instruccion.valor.split("*");
    cadena = cadena + "MOV \tAX, \t"+operacion[0].trim().toUpperCase() + "\n";
    cadena = cadena + "MOV \tBX, \t"+operacion[1].trim().toUpperCase() + "\n";
    cadena = cadena + "MUL \tBX" + "\n";
    cadena = cadena + "MOV \t"+instruccion.id.toUpperCase() + ", " + "\tEAX" + "\n";
    return cadena;
}

export function suma(instruccion){
    if (instruccion.valor.includes("si")){
        return;
    }
    var cadena = "";
    const operacion = instruccion.valor.split("+");

    cadena = cadena + "MOV "+ "\t" + "AX, \t "+operacion[0].trim().toUpperCase() + "\n";
    cadena = cadena + "ADD "+ "\t" + "AX, \t "+operacion[1].trim().toUpperCase() + "\n";
    cadena = cadena + "MOV "+ "\t" +instruccion.id.toUpperCase() + ", \t" + "AX" + "\n";
    return cadena;
}

export function resta(instruccion){
    if (instruccion.valor.includes("si")){
        return;
    }
    var cadena = "";
    const operacion = instruccion.valor.split("-");
    cadena = cadena + "MOV "+ "\t" + "AX, \t "+operacion[0].trim().toUpperCase() + "\n";
    cadena = cadena + "SUB "+ "\t" + "AX, \t "+operacion[1].trim().toUpperCase() + "\n";
    cadena = cadena + "MOV "+ "\t" +instruccion.id.toUpperCase() + ", \t" + "AX" + "\n";
    return cadena;
}

export function out(instruccion){
    if (instruccion.valor.includes("si")){
        return;
    }
    var cadena = "";
    const operacion = instruccion.valor.split(" ");
    cadena = cadena + "MOV \t" + "BX, \t0001H"+ "\n";
    cadena = cadena + "MOV \t" + "DX, \t" + operacion[2].toUpperCase() + "\n";
    cadena = cadena + "MOV \t" + "AH, \t" + "02H" + "\n";
    cadena = cadena + "INT \t21H" + "\n";
    return cadena;
}

export function leer(instruccion){
    if (instruccion.valor.includes("si")){
        return;
    }
    var cadena = "";
    const operacion = instruccion.valor.split(" ");
    cadena = cadena + "MOV \t" + "BX, \t0000H"+ "\n";
    cadena = cadena + "LEA \t" + "DX, \t" + operacion[2].toUpperCase() + "\n";
    cadena = cadena + "MOV \t" + "AH, \t" + "0AH" + "\n";
    cadena = cadena + "INT \t21H" + "\n\n";
    cadena = cadena + "MOV \tDL, \t0DH" + "\n";
    cadena = cadena + "MOV \t" + "AH, \t" + "02H" + "\n";
    cadena = cadena + "INT \t21H" + "\n\n";
    cadena = cadena + "MOV \t" + "DL, \t" + "0AH" + "\n";
    cadena = cadena + "MOV \t" + "AH, \t" + "02H" + "\n";
    cadena = cadena + "INT \t21H" + "\n\n";
    return cadena;
}


export function clausulaSi(instruccion){
    var nEtiquetas = 0;
    var nEtiquetasJMP = 0;
    var auxSaltos = 0;
    var cadena = "";
    var instruccionSi = instruccion.valor.split(" ");
    var cadenaSi = [];
    var cadenaSino = [];

    cadena = cadena + "MOV\tAX,\t"+instruccionSi[4].toUpperCase() + "\n";

    cadena = cadena + "CMP\tAX,\t"+instruccionSi[2].toUpperCase() + "\n";

    // cadena = cadena + "CMP\t"+instruccionSi[2].toUpperCase() +", \tAX \n";

    if (instruccionSi[3] === ">"){
        nEtiquetas++;
        cadena = cadena + "JG" + "\tEtiq"+nEtiquetas + "\n";
    }else if (instruccionSi[3] === "<"){
        nEtiquetas++;
        cadena = cadena + "JL" + "\tEtiq"+nEtiquetas + "\n";
    }else if (instruccionSi[3] === ">="){
        nEtiquetas++;
        cadena = cadena + "JGE" + "\tEtiq"+nEtiquetas + "\n";
    }else if (instruccionSi[3] === "<="){
        nEtiquetas++;
        cadena = cadena + "JLE" + "\tEtiq"+nEtiquetas + "\n";
    }else if (instruccionSi[3] === "<>"){
        nEtiquetas++;
        cadena = cadena + "JNE" + "\tEtiq"+nEtiquetas + "\n";
    }else if (instruccionSi[3] === "==="){
        nEtiquetas++;
        cadena = cadena + "JE" + "\tEtiq"+nEtiquetas + "\n";
    }



    let idAux = "";
    let cadenaAux = "";
    for (let i = 7; i < instruccionSi.length; i++) {
        if (instruccionSi[i] === "sino") {
            auxSaltos = i;
            break;
        }else if(instruccionSi[i] === "="){
            idAux = instruccionSi[i-1];
            var contenido = getContenidoVariable(instruccionSi, i);
            cadenaSi.push({"id": idAux, "valor": contenido.contenido.trim()});
            idAux = "";
            i = contenido.finalPos;
        }else if (instruccionSi[i] == "out" || instruccionSi[i] == "leer"){
            cadenaAux = instruccionSi[i].toUpperCase() + " " + instruccionSi[i+1] + " " + instruccionSi[i+2] + " " + instruccionSi[i+3];
            cadenaSi.push({"id": "", "valor": cadenaAux});
            cadenaAux = "";
            
        }
    }

    for (let i = auxSaltos+1; i < instruccionSi.length; i++) {
        if (instruccionSi[i] === "finsi") {
            auxSaltos = i;
            break;
        }else if(instruccionSi[i] === "="){
            idAux = instruccionSi[i-1];
            var contenido = getContenidoVariable(instruccionSi, i);
            cadenaSino.push({"id": idAux, "valor": contenido.contenido.trim()});
            idAux = "";
            i = contenido.finalPos;
        }else if (instruccionSi[i] == "out" || instruccionSi[i] == "leer"){
            cadenaAux = instruccionSi[i].toUpperCase() + " " + instruccionSi[i+1] + " " + instruccionSi[i+2] + " " + instruccionSi[i+3];
            cadenaSino.push({"id": "", "valor": cadenaAux});
            cadenaAux = "";
            
        }
    }

    cadena = cadena + puntoCode(cadenaSino);

    nEtiquetasJMP++;
    cadena = cadena + "JP" + "\tEtiqJMP"+nEtiquetasJMP + "\n";

    cadena = cadena + "Etiq"+nEtiquetas+": " + "\n";
    cadena = cadena + puntoCode(cadenaSi) + "\n";

    cadena = cadena + "EtiqJMP"+nEtiquetasJMP+": " + "\n";

    return cadena;
}