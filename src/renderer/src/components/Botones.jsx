import React from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PermScanWifiRoundedIcon from '@mui/icons-material/PermScanWifiRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';

function Botones({clickScan, clickParser}){
    return(
        <>
            <Button variant="outlined" startIcon={<PermScanWifiRoundedIcon />} onClick={() => clickScan()}>
                SCAN
            </Button>

            <Button variant="outlined" startIcon={<CheckBoxRoundedIcon /> } onClick={() => clickParser()}>
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