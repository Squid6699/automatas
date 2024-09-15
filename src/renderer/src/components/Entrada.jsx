import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Entrada({onChange, txt}){
    return(
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="entradaTokens"
                label="PROGRAMA"
                multiline
                //rows={18}
                value={txt}
                onChange={(e) => onChange(e)}
                />
            </div>
            </Box>
        </>
    );
}

export default Entrada;