
export function getTablaRegistros(registro){

    if (registro in tablaRegistros) {
        return true
    }

    return false;
}

var tablaRegistros = {
    "AX": 1,
    "BX": 2,
    "CX": 3,
    "AL": 4,
    "AH": 5,
    "21H": 6,
    "ADD": 7,
    "SUB": 8,
    "MOV": 9,
    "DIV": 10,
    "LEA": 11
};