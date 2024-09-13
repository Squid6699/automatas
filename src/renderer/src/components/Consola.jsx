import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Consola(){
    return(
        <>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '150ch' } }}
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="outlined-multiline-static"
                label="CONSOLA"
                multiline
                rows={5}
                disabled
                />
            </div>
            </Box>
        </>
    );
}

export default Consola;