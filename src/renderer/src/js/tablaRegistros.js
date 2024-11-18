import { obtenerCodigoIntermedioCode } from "./Variables";

export function getTablaRegistros(registro){

    if (registro.endsWith(",")) {
        registro = registro.slice(0, -1);
    }

    if (registro in tablaRegistros) {
        return tablaRegistros[registro];
    }

    return "";
}

var tablaRegistros = {
    "AX": "AX",
    "BX": "BX",
    "CX": "CX",
    "AL": "AL",
    "AH": "AH",
    "DL": "DL",
    "DX": "DX",
    "ADD": "ADD",
    "SUB": "SUB",
    "MOV": "MOV",
    "DIV": "DIV",
    "EAX": "EAX"
};

export function getDireccion(etiq){
    if (etiq.endsWith(",")) {
        etiq = etiq.slice(0, -1);
    }

    if (etiq in tablaDirecciones) {
        return tablaDirecciones[etiq];
    }

    return "";
}

export function addDireccion(direccion, etiqueta){
    tablaDirecciones[etiqueta] = direccion;
}

var tablaDirecciones = {};

export function widthRegistro(registro){
    if (registro in tablaWidth) {
        return tablaWidth[registro];
    }
}

export var tablaWidth = {
    "AX": "1",
    "EAX": "1",
    "AL": "0",
    "AH": "0",
    "CX": "1",
    "BX": "1",
    "DX": "1",
    "DL": "0"
}

export function getReg(registro){
    if (registro in tablaReg) {
        return tablaReg[registro];
    }
}

var tablaReg = {
    "AL": "000",
    "AX": "000",
    "CL": "001",
    "CX": "001",
    "DL": "010",
    "DX": "010",
    "BL": "011",
    "BX": "011",
    "AH": "100",
    "SP": "100",
    "CH": "101",
    "BP": "101",
    "DH": "110",
    "SI": "110",
    "BH": "111",
    "DI": "111"
}

export function getWidthInmediato(numero){
    if (numero >= 0 && numero <= 255) {
        return "0";
    } else if (numero <= 65535) {
        return "1";
    } else if (numero <= 4294967295) {
        return "1";
    } else {
        return null;
    }
}

export function getNumSaltos(etiquetaDestino, posAct) {
    const direcciones = obtenerCodigoIntermedioCode().split("\n");
    let saltos = 0;

    for (const linea of direcciones.slice(Number(posAct))) {
        const lineaTrimmed = linea.trim();
        
        if (lineaTrimmed === "") {
            // Ignorar líneas vacías o compuestas solo por espacios
            continue;
        }

        if (lineaTrimmed.split(" ").length <= 1) {
            // Ignorar etiquetas
            continue;
        }

        if (lineaTrimmed.includes(`${etiquetaDestino}:`)) {
            console.log(`Etiqueta encontrada: "${lineaTrimmed}", Saltos necesarios: ${saltos}`);
            return saltos;
        }
        saltos++;
    }

    return saltos;
}

export function jCondiciones(condicion){
    if (condicion in tablaJCondicion) {
        return tablaJCondicion[condicion];
    }
}

export var tablaJCondicion = {
    "JO": "0000",
    "JNO": "0001",
    "JB": "0010",
    "NAE": "0010",
    "JAE": "0011",
    "JNB": "0011",
    "JE": "0100",
    "JZ": "0100",
    "JNE": "0101",
    "JNZ": "0101",
    "JBE": "0110",
    "JNA": "0110",
    "JA": "0111",
    "JNBE": "0111",
    "JS": "1000",
    "JNS": "1001",
    "JP": "1010",
    "JPE": "1010",
    "JNP": "1011",
    "JPO": "1011",
    "JL": "1100",
    "JNGE": "1100",
    "JGE": "1101",
    "JNL": "1101",
    "JLE": "1110",
    "JNG": "1110",
    "JG": "1111",
    "JNLE": "1111"
};