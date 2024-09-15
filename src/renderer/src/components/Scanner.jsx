import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Scanner({listaTokens}){
    return(
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="salidaTokens"
                label="SCANNER"
                multiline
                //rows={18}
                value={listaTokens}
                />
            </div>
            </Box>
        </>
    );
}

export default Scanner;