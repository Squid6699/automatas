import { decimalToBinaryOrHex } from './DecimalToBinario'
import { addDireccion, getDireccion, getTablaRegistros, widthRegistro } from './tablaRegistros';
import { obtenerCodigoIntermedioCode, obtenerCodigoIntermedioData } from './Variables'

export function obtenerCodigoBinario() {
    
    var data = "\t.DATA \n\n";

    let direccionActualData = 0x0000;
    const segmentoData = 0x0000;

    let direccionActualCode = 0x0000;
    const segmentoCode = 0x00A0

    const puntoData = obtenerCodigoIntermedioData().split('\n');
    const puntoCode = obtenerCodigoIntermedioCode().split("\n");

    puntoData.slice(2).map((item) => {
        const instruccionData = item.split('\t');

        const direccionCompletaData = `${segmentoData.toString(16).toUpperCase().padStart(4, '0')}:${direccionActualData.toString(16).toUpperCase().padStart(4, '0')}`;

        if (instruccionData[1] === 'DB') {
            data = data + direccionCompletaData + "\t" + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 1) + "\n";
            addDireccion(direccionActualData.toString(16).toUpperCase().padStart(4, '0'), instruccionData[0]);
            direccionActualData += 1;
        }

        if (instruccionData[1] === 'DW') {
            if (instruccionData[2] === '?'){
                data = data + direccionCompletaData + "\t" + decimalToBinaryOrHex(0, 'binary', 2) + "\n";
                addDireccion(direccionActualData.toString(16).toUpperCase().padStart(4, '0'), instruccionData[0]);
            }else{
                data = data + direccionCompletaData + "\t" + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 2) + "\n";
                addDireccion(direccionActualData.toString(16).toUpperCase().padStart(4, '0'), instruccionData[0]);
            }
            direccionActualData += 2;
        }

        if (instruccionData[1] === 'DD') {
            if (instruccionData[2] === '?'){
                data = data + direccionCompletaData + "\t" + decimalToBinaryOrHex(0, 'binary', 4) + "\n";
            }else{
                data = data + direccionCompletaData + "\t" + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 4) + "\n";
            }
            direccionActualData += 4;
        }
    })
    
    data = data + "\n\n\t.CODE \n\n";

    puntoCode.map((item) => {
        const instruccionCode = item.split('\t');
        // console.log(instruccionCode);

        const direccionCompletaCode = `${segmentoCode.toString(16).toUpperCase().padStart(4, '0')}:${direccionActualCode.toString(16).toUpperCase().padStart(4, '0')}`;

        //MOV REGISTRO INMEDIATO
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) !== "" && parseInt(getTablaRegistros(instruccionCode[2].trim()))){
            console.log("MOV REGISTRO INMEDIATO")
        }

        //MOV MEMORIA A REGISTRO
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === ""){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2)
                const trad = "10100001";
                data = data + direccionCompletaCode + "\t" + trad + " " + dir + "\n";
                direccionActualCode += 3;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "binary", 2)
                const trad = "10100000";
                data = data + direccionCompletaCode + "\t" + trad + " " + dir + "\n";
                direccionActualCode += 3;
            }
        }

        //MOV REGISTRO A MEMORIA
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2);
            const trad = "1000100" + widthRegistro(getTablaRegistros(instruccionCode[2].trim()));
            data = data + direccionCompletaCode + "\t" + trad + "MOD REG R/M" + dir + "\n";
            direccionActualCode += 4;
        }

    });









    return data;
}
