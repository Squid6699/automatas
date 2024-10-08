export var variables = [];

export function variableExistente(variable){
    const has = variables.some((item) => item.id === variable);
    return has;
}

export function addVariable(variable){
    variables.push(variable);
}

export function vaciarVariables(){
    variables = [];
}

export function getVariables(){
    console.log(variables);
}