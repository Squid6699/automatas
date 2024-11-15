import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Binario({codigoBinario}) {
    return (
        <>
            <Box component="form" noValidate autoComplete="off">
                <div>
                    <TextField
                        id="codigoBinario"
                        label="CODIGO BINARIO"
                        multiline
                        value={codigoBinario}
                        InputProps={{
                            style: { fontFamily: 'Courier, Courier New, monospace' } // Aquí aplicamos la fuente monoespaciada
                        }}
                    />
                </div>
            </Box>
        </>
    )
}

export default Binario;
