
export function getTablaRegistros(registro){

    if (registro.endsWith(",")) {
        registro = registro.slice(0, -1); // Elimina el último carácter
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

export function widthRegistro(regsitro){
    if (regsitro in tablaWidth) {
        return tablaWidth[regsitro];
    }
}

export var tablaWidth = {
    "AX": "1",
    "EAX": "1",
    "AL": "0",
    "CX": "1"
}
