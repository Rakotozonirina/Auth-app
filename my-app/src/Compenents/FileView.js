import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, listAll } from 'firebase/storage';
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
        <button onClick={fecthFiles}>Show the list</button>
        {files.map((val) => (
            <p>{val}</p>
        ))}
    </div>
)
}

export default FileView;
