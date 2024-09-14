import { esId, esNumero } from "./functions";

export function getTokenParser(token){
    token = token.toLowerCase();

    if (token in tablaParser) {
        return tablaParser[token]
    }

    if (esId(token)){
        return tablaParser["id"];
    }else if (!esId(token) && esNumero(token)){
        return tablaParser["d"];
    }

    return 0;
}

var tablaParser = {
    "b": 1,
    "{": 2,
    "}": 3,
    "$": 4,
    "id": 5,
    "d": 6,
    ";": 7,
    "+": 8,
    "-": 9,
    "*": 10,
    "/": 11,
    ">": 12,
    ">=": 13,
    "<": 14,
    "<=": 15,
    "<>": 16,
    "=": 17,
    "===": 18,
    "out": 19,
    "(": 20,
    ")": 21,
    "leer": 22,
    "si": 23,
    ":": 24,
    "sino": 25,
    "finsi": 26
};