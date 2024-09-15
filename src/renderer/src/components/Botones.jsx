import React, { useRef, useState } from 'react'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import PermScanWifiRoundedIcon from '@mui/icons-material/PermScanWifiRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

function Botones({clickScan, clickParser, clickSemantico, clickBorrar, txt, setTxt}){

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const fileInputRef = useRef(null);

    const handleClickAbrir = () => {
        fileInputRef.current.click();
    };

    // ABRIR ARCHIVO
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'text/plain') {
                const reader = new FileReader();
        
                reader.onload = (e) => {
                    const fileContent = e.target.result;
                    setTxt(fileContent);
                };
                reader.readAsText(file);
                handleClose();
            }
        }
    };

    //GUARDAR COMO...
    const handleSaveAs = async () => {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: 'mi_archivo.txt',
                types: [
                    {
                        description: 'Text Files',
                        accept: { 'text/plain': ['.txt'] },
                    },
                ],
            });
    
            const writableStream = await fileHandle.createWritable();
    
            const content = txt; // Contenido del archivo
            await writableStream.write(content);
    
            await writableStream.close();
          
        } catch (error) {
            console.error('Error al guardar el archivo:', error);
        }
    };
    

    return(
        <>

            <Button id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                ARCHIVO
            </Button>

            <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button', }} anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade} >
                <MenuItem onClick={clickBorrar}>NUEVO</MenuItem>
                <MenuItem onClick={handleClickAbrir}>ABRIR...</MenuItem>
                <MenuItem onClick={handleClose}>GUARDAR</MenuItem>
                <MenuItem onClick={handleSaveAs}>GUARDAR COMO...</MenuItem>
                <MenuItem onClick={handleClose}>CERRAR</MenuItem>

            </Menu>

            <Button variant="outlined" startIcon={<PermScanWifiRoundedIcon />} onClick={() => clickScan()}>
                SCAN
            </Button>

            <Button variant="outlined" startIcon={<CheckBoxRoundedIcon /> } onClick={() => clickParser()}>
                PARSER
            </Button>

            <Button variant="outlined" startIcon={<ContentPasteSearchRoundedIcon />}  onClick={() => clickSemantico()}>
                SEMANTICO
            </Button>

            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => clickBorrar()}>
                BORRAR
            </Button>

            <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </>
    )
}

export default Botones;