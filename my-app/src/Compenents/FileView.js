import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, list } from 'firebase/storage';
import { BarsOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Button, Space, Modal } from 'antd';
const FileView = () => {
    const [files, setFiles] = useState([]);
    const fecthFiles = async () => {
        const storageRef = ref(storage, `documents-pdf/${files}`);
        const firstPage = list(storageRef);
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
    /*const StorageDate = () => {
        const storageDat = ref(storage, "documents-pdf");
        const postDate = storageDat.name;
        return(
            <p>{postDate}</p>
        )
    }*/
    const [isModalOpen, setModalOpen] = useState(false);
    const showModal = () => {setModalOpen(true);}; 
    const handleOk = () => {setModalOpen(false);};
    const handleCancel = () => {setModalOpen(false);};
    const listShow = files.map((file) => (
        <p key={file.id} style={{color: '#675D50', textAlign: 'center', padding: '0.3rem 0', cursor: 'pointer'}}> <Space wrap><FilePdfOutlined style={{marginBlockEnd: '0.4em'}}/> {file}</Space></p>
));
return (
    <div>
        <Button type='text' style={{color: '#F0EB8D', display: 'flex', justifyContent:'center'}} onClick={showModal}>Regarder les listes<BarsOutlined style={{marginBlockStart: '0.4em'}}/></Button>
        <Modal title="Regarder les listes" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} centered>
                <Button type='text' style={{color: '#FC2947', display: 'flex', justifyContent:'center'}} onClick={fecthFiles}>Regarder les listes<BarsOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                {listShow}
        </Modal>
    </div>
)
}

export default FileView;
