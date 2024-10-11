import { esId, esNumero } from "./functions";

export function getToken(token){
    token = token.toLowerCase();

    if (token in tablaTokens) {
        return tablaTokens[token];
    }

    if (esId(token)){
        return token +", ID";
    }else if (!esId(token) && esNumero(token)){
        return token +", D";
    }else if (!esId(token) && !esNumero(token)){
        return token +", CADENA";
    }
    return null;
}

var tablaTokens = {
    ">": ">, OPREL",
    ">=": ">=, OPREL",
    "<": "<, OPREL",
    "<=": "<=, OPREL",
    "<>": "<>, OPREL",
    "=": "=, ASIG",
    "==": "==, OPREL",

    '"': '", INCIO/FIN CADENA',
    
    "+": "+, OPARI",
    "-": "-, OPARI",
    "*": "*, OPARI",
    "/": "/, OPARI",
    
    "b": "B, PR",
    "si": "SI, PR",
    "leer": "LEER, PR",
    ":": ":, PR",
    "sino": "SINO, PR",
    "finsi": "FINSI, PR",
    "out": "OUT, PR",
    "(": "(, PARENTESIS APERTURA",
    ")": "), PARENTESIS CERRADO",
    "{": "{, LLAVES APERTURA",
    "}": "}, LLAVES CERRADO",
    "$": "$, DECLARACION FLOAT",
    "str": "STR, DECLARACION CADENA",
    "#": "#, DECLARACION ENTERO",
    ";": ";, FIN LINEA"
};