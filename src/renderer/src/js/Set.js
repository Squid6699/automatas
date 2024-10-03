const variables = new Map();

export function variableExistente(id){
    return variables.has(id);
}

export function addVariable(variable){
    variables.set(variable.id, variable.contenido, variable.extra);
}

export function vaciarSet(){
    variables.clear();
}

export function getSetVarialbles(){
    console.log(variables);
}