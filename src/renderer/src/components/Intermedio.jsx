import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Intermedio({codigoIntermedio}){
    return(
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="codigoIntermedio"
                label="CODIGO INTERMEDIO"
                multiline
                value={codigoIntermedio}
                />
            </div>
            </Box>
        </>
    );
}

export default Intermedio;