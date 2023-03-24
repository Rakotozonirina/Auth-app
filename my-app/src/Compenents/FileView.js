import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll } from 'firebase/storage';
import { Button } from 'antd';
const FileView = () => {
    const [files, setFiles] = useState([]);
    const fecthFiles = async () => {
        const storageRef = ref(storage, `documents-pdf`);
        listAll(storageRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
            // All the items under listRef.
            setFiles(arr => [...arr, itemRef.name]);
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            alert(error);
        });
    }
return (
    <div>
        <Button type='text' style={{color: '#F0EB8D'}} onClick={fecthFiles}>Regarder les listes</Button>
        {files.map((val) => (
            <p>{val}</p>
        ))}
    </div>
)
}

export default FileView;
