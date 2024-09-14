import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Parser({parser}){
    return(
        <>
            <Box
                component="form"
                noValidate
                autoComplete="off"
            >
            <div>
                <TextField
                id="salidaParser"
                label="PARSER"
                multiline
                rows={1}
                value={parser}
                sx={{
                    "& .MuiInputBase-input": {
                        color: parser === "PROGRAMA OK" ? "green" : "red"
                    }
                }}
                />
            </div>
            </Box>
        </>
    );
}

export default Parser;