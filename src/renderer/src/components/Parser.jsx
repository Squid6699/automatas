import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react'

function Parser({parser}){

    var errorParser = "";

    if (parser === true){
        errorParser = "PROGRAMA OK";
    }else if (parser === false){
        errorParser = "SINTAX ERROR";
    }

    
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
                value={errorParser}
                sx={{
                    "& .MuiInputBase-input": {
                        color: parser ? "green" : "red"
                    }
                }}
                />
            </div>
            </Box>
        </>
    );
}

export default Parser;