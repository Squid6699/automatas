import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PermScanWifiRoundedIcon from '@mui/icons-material/PermScanWifiRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';

function Botones(){
    return(
        <>
            <Button variant="outlined" startIcon={<PermScanWifiRoundedIcon />}>
                SCAN
            </Button>

            <Button variant="outlined" startIcon={<CheckBoxRoundedIcon />}>
                PARSER
            </Button>

            <Button variant="outlined" startIcon={<ContentPasteSearchRoundedIcon />}>
                SEMANTICO
            </Button>

            <Button variant="outlined" startIcon={<DeleteIcon />}>
                BORRAR
            </Button>
        </>
    )
}

export default Botones;