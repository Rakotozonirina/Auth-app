import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, list } from 'firebase/storage';
import { BarsOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const FileView = () => {
    const [files, setFiles] = useState([]);
    const fecthFiles = async () => {
        const storageRef = ref(storage, `documents-pdf`);
        const firstPage = list(storageRef, {maxResults: 5});
        firstPage.then((res) => {
            res.items.forEach((itemRef) => {
            // All the items under listRef.
            setFiles(arr => [...arr, itemRef.name]);
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
            alert(error);
        });
        if(firstPage.nextPageToken){
            const secondPage = list(storageRef, {
                maxResults: 5,
                pageToken: firstPage.nextPageToken,
            });
            console.log(secondPage.items);
            console.log(secondPage.prefixes);
        }
    }
    const StorageDate = () => {
        const storageDat = ref(storage);
        const postDate = storageDat.name;
        return(
            <p>{postDate}</p>
        )
    }
return (
    <div>
        <Button type='text' style={{color: '#F0EB8D', display: 'flex', justifyContent:'center'}} onClick={fecthFiles}>Regarder les listes<BarsOutlined style={{marginBlockStart: '0.4em'}}/></Button>
        {files.map((file) => (
                <p key={file.id} style={{color: '#F0EB8D'}}>{file}<StorageDate/></p>
        ))}
    </div>
)
}

export default FileView;
