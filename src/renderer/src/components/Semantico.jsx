import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Semantico({semantico}){
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
                label="SEMANTICO"
                multiline
                rows={1}
                value={semantico}
                sx={{
                    "& .MuiInputBase-input": {
                        color: semantico === "SEMANTICO OK" ? "green" : "red"
                    }
                }}
                />
            </div>
            </Box>
        </>
    );
}

export default Semantico;