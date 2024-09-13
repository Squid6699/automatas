import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Parser(){
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
                label="PARSER"
                multiline
                rows={3}
                disabled
                />
            </div>
            </Box>
        </>
    );
}

export default Parser;