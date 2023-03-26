import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, list } from 'firebase/storage';
import { Button } from 'antd';

const Download = () => {
    const navigate = useNavigate();
    const HandleBack = () => {
        navigate(-1);
    };
    const [files, setFiles] = useState([]);
    const fecthFiles = async () => {
        const storageRef = ref(storage, `documents-pdf`);
        const firstPage = list(storageRef, { maxResults: 5 } );
        firstPage.then((res) => {
            res.items.forEach((itemRef) => {
                setFiles(arr => [...arr, itemRef.name]);
            });
        }).catch((error) => {
            alert(error);
        });
        if(firstPage.nextPageToken){
            const secondPage = list(storageRef, {
                maxResults: 5,
                pageToken: firstPage.nextPageToken,
            });
            console.log(secondPage.items);
            console.log(secondPage.prefixes);
        };
    }
return (
    <div>
        <h2>Listes des fichiers PDF</h2>
        <Button type='text' onClick={HandleBack}>Retour</Button>
        <Button type='text' onClick={fecthFiles}>Listes</Button>
                {files.map((file) => (
                    <p key={file.id}>
                        {file}
                    </p>
                ))}
    </div>
)
}

export default Download;
