import { decimalToBinaryOrHex } from './DecimalToBinario'
import { addDireccion, getDireccion, getReg, getTablaRegistros, getWidthInmediato, widthRegistro } from './tablaRegistros';
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
            data = data + direccionCompletaData + "  " + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 1) + "\n";
            addDireccion(direccionActualData.toString(16).toUpperCase().padStart(4, '0'), instruccionData[0]);
            direccionActualData += 1;
        }

        if (instruccionData[1] === 'DW') {
            if (instruccionData[2] === '?'){
                data = data + direccionCompletaData + "  " + decimalToBinaryOrHex(0, 'binary', 2) + "\n";
                addDireccion(direccionActualData.toString(16).toUpperCase().padStart(4, '0'), instruccionData[0]);
            }else{
                data = data + direccionCompletaData + "  " + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 2) + "\n";
                addDireccion(direccionActualData.toString(16).toUpperCase().padStart(4, '0'), instruccionData[0]);
            }
            direccionActualData += 2;
        }

        if (instruccionData[1] === 'DD') {
            if (instruccionData[2] === '?'){
                data = data + direccionCompletaData + "  " + decimalToBinaryOrHex(0, 'binary', 4) + "\n";
            }else{
                data = data + direccionCompletaData + "  " + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 4) + "\n";
            }
            direccionActualData += 4;
        }
    })
    
    data = data + "\n\n\t.CODE \n\n";

    puntoCode.map((item) => {
        const instruccionCode = item.split('\t');
        // console.log(instruccionCode);

        const direccionCompletaCode = `${segmentoCode.toString(16).toUpperCase().padStart(4, '0')}:${direccionActualCode.toString(16).toUpperCase().padStart(4, '0')}`;

        //===================================MOV===========================================
        //MOV INMEDIATO A REGISTRO
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) !== "" && parseInt(getTablaRegistros(instruccionCode[2].trim()))){
            console.log("MOV REGISTRO INMEDIATO")
        }

        //MOV INMEDIATO A MEMORIA
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) === "" && !isNaN(instruccionCode[2])){
            const trad = "1100011" + getWidthInmediato(instruccionCode[2]);
            const mod = "00";
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2);
            const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
            data = data + direccionCompletaCode + "  " + trad + " " + mod + "000" + rm + " " + immediateData + " " + dir + "\n";
            direccionActualCode += 4 + (immediateData.split(" ").length);
        }

        //MOV MEMORIA A REGISTRO AX, X
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === ""){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
                const trad = "10100001";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2)
                const trad = "10100000";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) !== "AX" && getTablaRegistros(instruccionCode[1].trim()) !== "EAX" && getTablaRegistros(instruccionCode[1].trim()) !== "AL"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2)
                const trad = "1000101" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const mod = "00";
                const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
                const rm = "000";
                data = data + direccionCompletaCode + "  " + trad + " " + mod + reg + rm + " " + dir + "\n";
                direccionActualCode += 4;
            }

        }

        //MOV REGISTRO A MEMORIA X, AX
        if (instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){

            if (getTablaRegistros(instruccionCode[2].trim()) === "AX" || getTablaRegistros(instruccionCode[2].trim()) === "EAX"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2)
                const trad = "10100011";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
            }

            if (getTablaRegistros(instruccionCode[2].trim()) === "AL"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2)
                const trad = "10100010";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
            }

            if (getTablaRegistros(instruccionCode[2].trim()) !== "AX" && getTablaRegistros(instruccionCode[2].trim()) !== "EAX" && getTablaRegistros(instruccionCode[2].trim()) !== "AL"){
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2);
                const trad = "1000100" + widthRegistro(getTablaRegistros(instruccionCode[2].trim()));
                const mod = "00";
                const reg = getReg(getTablaRegistros(instruccionCode[2].trim()));
                const rm = "000";
                data = data + direccionCompletaCode + "  " + trad + " " + mod + reg + rm + " " + dir + "\n";
                direccionActualCode += 4;
            }
        }

        //=================================================================================

        //===================================ADD===========================================

        //INMEDIATO A REGISTRO AX, 5
        if (instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) !== "" && !isNaN(instruccionCode[2])){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX" || getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                const trad = "0000010" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + immediateData + "\n";
                direccionActualCode += 1 + (immediateData.split(" ").length);
            }

            if (getTablaRegistros(instruccionCode[1].trim()) !== "AX" && getTablaRegistros(instruccionCode[1].trim()) !== "EAX" && getTablaRegistros(instruccionCode[1].trim()) !== "AL"){
                const trad = "100000" + getWidthInmediato(instruccionCode[2].trim()) + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + "1100" + reg + " " + immediateData + "\n";
                direccionActualCode += 2 + (immediateData.split(" ").length);
            }
        }

        //INMEDIATO A MEMORIA X, 5
        if (instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) === "" && !isNaN(instruccionCode[2])){
            console.log("INMEDIATO A MEMORIA");
        }

        //REGISTRO A MEMORIA X, AX
        if (instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){
            console.log("REGISTRO A MEMORIA");
        }

        //MEMORIA A REGISTRO AX,X
        if (instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === ""){
            const trad = "0000001" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const mod = "00";
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + mod  + reg + rm + " " + dir +"\n";
        }

        //===================================SUB===========================================
        
        //===================================CMP===========================================

        //===================================JP===========================================

        //===================================JMP===========================================

    });









    return data;
}
