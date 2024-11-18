import { decimalToBinaryOrHex } from './DecimalToBinario'
import { addDireccion, getDireccion, getNumSaltos, getReg, getTablaRegistros, getWidthInmediato, widthRegistro } from './tablaRegistros';
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

    puntoCode.map((item, index) => {
        const instruccionCode = item.split('\t');
        // console.log(instruccionCode);

        //Ignorar linea en blanco
        if (instruccionCode[0].trim() === "" && instruccionCode[0].trim() === "" && instruccionCode[0].trim() === ""){
            return;
        }

        const direccionCompletaCode = `${segmentoCode.toString(16).toUpperCase().padStart(4, '0')}:${direccionActualCode.toString(16).toUpperCase().padStart(4, '0')}`;

        //===================================INT===========================================
        //INT 21H
        if (instruccionCode.length === 2 && instruccionCode[0].trim() === "INT" && !isNaN(parseInt(instruccionCode[1].trim()))){
            console.log("INT 21H");
            const trad = "11001101";
            const type = decimalToBinaryOrHex(instruccionCode[1].trim(), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + type + "\n";
            return;
        }

        //===================================LEA===========================================
        // LEA DX, X
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "LEA" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === "" && isNaN(parseInt(instruccionCode[2].trim()))){
            console.log("LEA MEMORIA A REGISTRO");
            const trad = "10001101"
            const mod = "00";
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + mod + reg + rm + " " + dir + "\n";
            direccionActualCode += 4;
            return;
        }



        //===================================MOV===========================================

        //MOV INMEDIATO A REGISTRO MOV AX, 2
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "MOV" && (getTablaRegistros(instruccionCode[1].trim()) !== "" && (!isNaN(parseInt(instruccionCode[2].trim())) || instruccionCode[2].trim().endsWith("H")))) {
            console.log("MOV INMEDIATO A REGISTRO");
            var immediateData;
            const trad = "1100011" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
            if (instruccionCode[2].trim().endsWith("H")){
                immediateData = decimalToBinaryOrHex(instruccionCode[2].trim(), "hexToBinary", 2);
            }
            data = data + direccionCompletaCode + "  " + trad + " " + "11000" + reg + " " + immediateData + "\n";
            direccionActualCode += 2 + (immediateData.split(" ").length);
            return;
        }

        // //MOV INMEDIATO A MEMORIA
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) === "" && !isNaN(instruccionCode[2].trim())){
            console.log("MOV INMEDIATO A MEMORIA")
            const trad = "1100011" + getWidthInmediato(instruccionCode[2]);
            const mod = "00";
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2);
            const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
            data = data + direccionCompletaCode + "  " + trad + " " + mod + "000" + rm + " " + immediateData + " " + dir + "\n";
            direccionActualCode += 4 + (immediateData.split(" ").length);
            return;
        }

        //MOV MEMORIA A REGISTRO AX, X
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === "" && isNaN(instruccionCode[2].trim())){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX"){
                console.log("MOV MEMORIA A REGISTRO");
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
                const trad = "10100001";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
                return;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                console.log("MOV MEMORIA A REGISTRO");
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2)
                const trad = "10100000";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
                return;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) !== "AX" && getTablaRegistros(instruccionCode[1].trim()) !== "EAX" && getTablaRegistros(instruccionCode[1].trim()) !== "AL" && isNaN(parseInt(instruccionCode[2].trim()))){
                console.log("MOV MEMORIA A REGISTRO");
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2)
                const trad = "1000101" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const mod = "00";
                const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
                const rm = "000";
                data = data + direccionCompletaCode + "  " + trad + " " + mod + reg + rm + " " + dir + "\n";
                direccionActualCode += 4;
                return;
            }

        }
        
        //MOV REGISTRO A MEMORIA X, AX
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "MOV" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){
            if (getTablaRegistros(instruccionCode[2].trim()) === "AX" || getTablaRegistros(instruccionCode[2].trim()) === "EAX"){
                console.log("MOV REGISTRO A MEMORIA");
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2)
                const trad = "10100011";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
                return;
            }

            if (getTablaRegistros(instruccionCode[2].trim()) === "AL"){
                console.log("MOV REGISTRO A MEMORIA");
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2)
                const trad = "10100010";
                data = data + direccionCompletaCode + "  " + trad + " " + dir + "\n";
                direccionActualCode += 3;
                return;
            }

            if (getTablaRegistros(instruccionCode[2].trim()) !== "AX" && getTablaRegistros(instruccionCode[2].trim()) !== "EAX" && getTablaRegistros(instruccionCode[2].trim()) !== "AL"){
                console.log("MOV REGISTRO A MEMORIA");
                const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2);
                const trad = "1000100" + widthRegistro(getTablaRegistros(instruccionCode[2].trim()));
                const mod = "00";
                const reg = getReg(getTablaRegistros(instruccionCode[2].trim()));
                const rm = "000";
                data = data + direccionCompletaCode + "  " + trad + " " + mod + reg + rm + " " + dir + "\n";
                direccionActualCode += 4;
                return;
            }
        }

        //===================================ADD===========================================

        //INMEDIATO A REGISTRO AX, 5
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) !== "" && !isNaN(instruccionCode[2])){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX" || getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                const trad = "0000010" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + immediateData + "\n";
                direccionActualCode += 1 + (immediateData.split(" ").length);
                return;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) !== "AX" && getTablaRegistros(instruccionCode[1].trim()) !== "EAX" && getTablaRegistros(instruccionCode[1].trim()) !== "AL"){
                const trad = "100000" + getWidthInmediato(instruccionCode[2].trim()) + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + "1100" + reg + " " + immediateData + "\n";
                direccionActualCode += 2 + (immediateData.split(" ").length);
                return;
            }
        }

        // //INMEDIATO A MEMORIA X, 5
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) === "" && !isNaN(instruccionCode[2])){
            console.log("ADD INMEDIATO A MEMORIA");
            return;
        }

        //REGISTRO A MEMORIA X, AX
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){
            console.log("ADD REGISTRO A MEMORIA");
            return;
        }

        // //MEMORIA A REGISTRO AX,X
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "ADD" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === "" && isNaN(instruccionCode[2])){
            const trad = "0000001" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const mod = "00";
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + mod  + reg + rm + " " + dir +"\n";
            direccionActualCode += 4;
            return;
        }

        //===================================SUB===========================================

        //INMEDIATO A REGISTRO AX, 5
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "SUB" && getTablaRegistros(instruccionCode[1].trim()) !== "" && !isNaN(instruccionCode[2])){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX" || getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                const trad = "0010110" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + immediateData + "\n";
                direccionActualCode += 1 + (immediateData.split(" ").length);
                return;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) !== "AX" && getTablaRegistros(instruccionCode[1].trim()) !== "EAX" && getTablaRegistros(instruccionCode[1].trim()) !== "AL"){
                const trad = "100000" + getWidthInmediato(instruccionCode[2].trim()) + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + "11101" + reg + " " + immediateData + "\n";
                direccionActualCode += 2 + (immediateData.split(" ").length);
                return;
            }
        }

        //INMEDIATO A MEMORIA X, 5
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "SUB" && getTablaRegistros(instruccionCode[1].trim()) === "" && !isNaN(instruccionCode[2])){
            console.log("SUB INMEDIATO A MEMORIA");
            return;
        }

        //REGISTRO A MEMORIA X, AX
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "SUB" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){
            console.log("SUB REGISTRO A MEMORIA");
            return;
        }

        //MEMORIA A REGISTRO AX,X
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "SUB" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === ""){
            const trad = "0010101" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const mod = "00";
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + mod  + reg + rm + " " + dir +"\n";
            direccionActualCode += 4;
            return;
        }

        //===================================CMP===========================================

        // REGISTRO CON INMEDIATO CMP AX, 5
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "CMP" && getTablaRegistros(instruccionCode[1].trim()) !== "" && !isNaN(instruccionCode[2])){
            if (getTablaRegistros(instruccionCode[1].trim()) === "AX" || getTablaRegistros(instruccionCode[1].trim()) === "EAX" || getTablaRegistros(instruccionCode[1].trim()) === "AL"){
                const trad = "0011110" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + immediateData + "\n";
                direccionActualCode += 1 + (immediateData.split(" ").length);
                return;
            }

            if (getTablaRegistros(instruccionCode[1].trim()) !== "AX" && getTablaRegistros(instruccionCode[1].trim()) !== "EAX" && getTablaRegistros(instruccionCode[1].trim()) !== "AL"){
                const trad = "100000" + getWidthInmediato(instruccionCode[2].trim()) + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
                const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
                const immediateData = decimalToBinaryOrHex(parseInt(instruccionCode[2].trim()), "binary");
                data = data + direccionCompletaCode + "  " + trad + " " + "11111" + reg + " " + immediateData + "\n";
                direccionActualCode += 2 + (immediateData.split(" ").length);
                return;
            }
        }

        //INMEDIATO CON MEMORIA CPM 50, X
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "CMP" && !isNaN(instruccionCode[1].trim()) && getTablaRegistros(instruccionCode[2].trim()) === ""){
            console.log("CMP INMEDIATO CON MEMORIA");
            return;
        }

        //REGISTRO CON MEMORIA CPM AX, X
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "CMP" && getTablaRegistros(instruccionCode[1].trim()) !== "" && getTablaRegistros(instruccionCode[2].trim()) === "" && isNaN(instruccionCode[2].trim())){
            const trad = "0011101" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const mod = "00";
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            const rm = "110";
            console.log(instruccionCode[2].trim())
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[2].trim()), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + mod  + reg + rm + " " + dir +"\n";
            direccionActualCode += 4;
            return;
        }

        //MEMORIA CON REGISTRO CPM X, AX
        if (instruccionCode.length === 3 && instruccionCode[0].trim() === "CMP" && getTablaRegistros(instruccionCode[1].trim()) === "" && getTablaRegistros(instruccionCode[2].trim()) !== ""){
            const trad = "0011100" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const mod = "00";
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            const rm = "110";
            const dir = decimalToBinaryOrHex(getDireccion(instruccionCode[1].trim()), "hexToBinary", 2);
            data = data + direccionCompletaCode + "  " + trad + " " + mod  + reg + rm + " " + dir +"\n";
            direccionActualCode += 4;
            return;
        }

        //===================================JCondicion===========================================
        // JCondicion Etiqueta
        if (instruccionCode.length === 2 && instruccionCode[0].trim() === "JP" && getTablaRegistros(instruccionCode[1].trim()) === ""){
            
        }
        
        //===================================JP===================================================
        if (instruccionCode.length === 2 && instruccionCode[0].trim() === "JP" && getTablaRegistros(instruccionCode[1].trim()) === ""){
            const trad = "11101011";
            const nSaltos = decimalToBinaryOrHex(getNumSaltos(instruccionCode[1].trim(), index), "binary");
            data = data + direccionCompletaCode + "  " + trad + " " + nSaltos +"\n";
            direccionActualCode += 1 + (nSaltos.split(" ").length);
            return;
        }
        //===================================MUL===========================================

        if (instruccionCode.length === 2 && instruccionCode[0].trim() === "MUL" && getTablaRegistros(instruccionCode[1].trim()) !== ""){
            console.log("MUL "+instruccionCode[1].trim());
            const trad = "1111011" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            data = data + direccionCompletaCode + "  " + trad + " " + "11100"  + reg +"\n";
            direccionActualCode += 2;
            return;
        }
        //===================================DIV===========================================
        if (instruccionCode.length === 2 && instruccionCode[0].trim() === "DIV" && getTablaRegistros(instruccionCode[1].trim()) !== ""){
            console.log("DIV "+instruccionCode[1].trim());
            const trad = "1111011" + widthRegistro(getTablaRegistros(instruccionCode[1].trim()));
            const reg = getReg(getTablaRegistros(instruccionCode[1].trim()));
            data = data + direccionCompletaCode + "  " + trad + " " + "11110"  + reg +"\n";
            direccionActualCode += 2;
            return;
        }
    });




    return data;
}
