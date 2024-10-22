export var variables = [];
export var instrucciones = [];

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

export function addInstruccion(instruccion){
    if (instruccion.valor === ""){
        return;
    }

    if (instruccion.id === ""){
        instrucciones.push(instruccion);
        return;
    }
    const index = instrucciones.findIndex(item => item.id === instruccion.id);
    if (index === -1) {
        instrucciones.push(instruccion);
    }else{
        instrucciones[index].valor = instruccion.valor;
    }
}

// export function cambiarValorVariable(variable, nuevoValor) {
//     const index = instrucciones.findIndex(item => item.id === variable);
//     variables[index].valor = nuevoValor;
// }

export function vaciarInstrucciones(){
    instrucciones = [];
}

export function getIntrucciones(){
    console.log(instrucciones);
}