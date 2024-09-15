import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Consola({consola}){
    return(
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="outlined-multiline-static"
                label="CONSOLA"
                multiline
                value={consola}
                />
            </div>
            </Box>
        </>
    );
}

export default Consola;