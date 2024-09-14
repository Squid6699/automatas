import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Consola(){
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
                rows={5}
                InputProps={{
                    readOnly: true,
                }}
                />
            </div>
            </Box>
        </>
    );
}

export default Consola;