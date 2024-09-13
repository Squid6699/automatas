import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Scanner(){
    return(
        <>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '70ch' } }}
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="outlined-multiline-static"
                label="SCANNER"
                multiline
                rows={18}
                disabled
                />
            </div>
            </Box>
        </>
    );
}

export default Scanner;