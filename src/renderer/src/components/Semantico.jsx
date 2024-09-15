import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Semantico({semantico}){

    var errorSemantico = "";
    
    if (semantico === true){
        errorSemantico = "SEMANTICO OK";
    }else if (semantico === false){
        errorSemantico = "ERROR SEMANTICO";
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
                id="outlined-multiline-static"
                label="SEMANTICO"
                multiline
                rows={1}
                value={errorSemantico}
                sx={{
                    "& .MuiInputBase-input": {
                        color: semantico ? "green" : "red"
                    }
                }}
                />
            </div>
            </Box>
        </>
    );
}

export default Semantico;