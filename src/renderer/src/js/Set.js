const variables = new Set();

export function variableExistente(id){
    return variables.has(id);
}

export function addVariable(id){
    variables.add(id);
}

export function vaciarSet(){
    variables.clear();
}