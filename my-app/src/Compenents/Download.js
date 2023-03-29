import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, list, getDownloadURL } from 'firebase/storage';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import './Download.css';
import Picture from '../Pictures/phosphor-logo-bold-1.svg';
const Download = () => {
    const navigate = useNavigate();
    const HandleBack = () => {
        navigate(-1);
    };
    const [files, setFiles] = useState([]);
    const fecthFiles = async () => {
        const storageRef = ref(storage, `documents-pdf`);
        const firstPage = list(storageRef, { maxResults: 10 } );
        firstPage.then((res) => {
            res.items.forEach((itemRef) => {
                setFiles(arr => [...arr, itemRef.fullPath]);
            });
        }).catch((error) => {
            alert(error);
        });
        if(firstPage.nextPageToken){
            const secondPage = list(storageRef, {
                maxResults: 10,
                pageToken: firstPage.nextPageToken,
            });
            console.log(secondPage.items);
            console.log(secondPage.prefixes);
        };
    };
    const downloadFiles = (file) => {
    const storageRef = ref(storage, file);
    getDownloadURL(storageRef)
    .then((url) => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
          const fileName = file.split('/').pop(); // Get the file name from the full path
          saveAs(blob, fileName); // Download the file using `saveAs` from `file-saver`
        })
    })
    .catch((error) => {
      // Handle any errors
        alert(error);
    });
};
return (
    <div className='main-content'>
        <section>
        <img src={Picture} alt='Logo'/>
        </section>
        <section>
        <section>
        <Button type='text' onClick={HandleBack}>Retour</Button>
        <Button type='text' onClick={fecthFiles}>Listes</Button>
        </section>
        <section>
        <h2>Listes des fichiers PDF</h2>
        </section>
        </section>
        
        <section>
        {files.map((file) => (
                    <p key={file.id} onClick={() => downloadFiles(file)}>
                        {file}
                    </p>
        ))}
        </section>
    </div>
)
}

export default Download;
