import { decimalToBinaryOrHex } from './DecimalToBinario'
import { obtenerCodigoIntermedioData } from './Variables'

export function obtenerCodigoBinario() {
    var data = "\t.DATA \n\n";

    let direccionActual = 0x0000;
    const segmento = 0x0000;

    const puntoData = obtenerCodigoIntermedioData().split('\n')

    puntoData.slice(2).map((item) => {
        const instruccionData = item.split('\t');

        const direccionCompleta = `${segmento.toString(16).toUpperCase().padStart(4, '0')}:${direccionActual.toString(16).toUpperCase().padStart(4, '0')}`;

        if (instruccionData[1] === 'DB') {
            data = data + direccionCompleta + "\t" + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 1) + "\n";
            direccionActual += 1;
        }

        if (instruccionData[1] === 'DW') {
            if (instruccionData[2] === '?'){
                data = data + direccionCompleta + "\t" + decimalToBinaryOrHex(0, 'binary', 2) + "\n";
            }else{
                data = data + direccionCompleta + "\t" + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 2) + "\n";
            }
            direccionActual += 2;
        }

        if (instruccionData[1] === 'DD') {
            if (instruccionData[2] === '?'){
                data = data + direccionCompleta + "\t" + decimalToBinaryOrHex(0, 'binary', 4) + "\n";
            }else{
                data = data + direccionCompleta + "\t" + decimalToBinaryOrHex(parseInt(instruccionData[2]), 'binary', 4) + "\n";
            }
            direccionActual += 4;
        }
    })

    return data;
}
