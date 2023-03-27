import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, list, getDownloadURL, getStorage } from 'firebase/storage';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
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
                setFiles(arr => [...arr, itemRef.fullPath]);
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
    };
    /*const downloadFiles = () => {
        //const storageRefference = ref(storage, 'gs://expen-e8cdc.appspot.com/documents-pdf');
        //getDownloadURL(ref(storageRefference))
        const storage = getStorage();
        getDownloadURL(ref(storage, 'gs://expen-e8cdc.appspot.com/documents-pdf'))
        .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            console.log(url);
        })
        .catch((error) => {
            // Handle any errors
            alert(error);
        });
    }*/
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
    <div>
        <h2>Listes des fichiers PDF</h2>
        <Button type='text' onClick={HandleBack}>Retour</Button>
        <Button type='text' onClick={fecthFiles}>Listes</Button>
                {files.map((file) => (
                    <p key={file.id} onClick={() => downloadFiles(file)}>
                        {file}
                    </p>
                ))}
    </div>
)
}

export default Download;
