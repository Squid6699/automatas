export function esId(token){
    var regex = /^[a-zA-Z][a-zA-Z0-9]*$/;
    return regex.test(token);
}

export function esNumero(token){
    var regex = /^-?\d+(\.\d+)?$/;
    return regex.test(token);
}