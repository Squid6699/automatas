export const variables = new Map();

export function variableExistente(id){
    return variables.has(id);
}

export function addVariable(variable){
    variables.set(variable.id, variable.contenido);
}

export function vaciarSet(){
    variables.clear();
}