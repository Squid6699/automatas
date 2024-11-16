
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
    "21H": "21H",
    "ADD": "ADD",
    "SUB": "SUB",
    "MOV": "MOV",
    "DIV": "DIV",
    "LEA": "LEA"
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
    "CX": "1"
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