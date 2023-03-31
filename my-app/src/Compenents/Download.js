import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase';
import { ref, list, getDownloadURL } from 'firebase/storage';
import { Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import { Scrollbars } from 'react-custom-scrollbars';
import './Download.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Picture from '../Pictures/phosphor-logo-bold-1.svg';
const Download = () => {
    const navigate = useNavigate();
    const HandleBack = () => {
        navigate(-1);
    };
    const [files, setFiles] = useState([]);
    const fecthFiles = async () => {
        const storageRef = ref(storage, `documents-pdf/${files}`);
        const firstPage = list(storageRef);
        firstPage.then((res) => {
            res.items.forEach((itemRef) => {
                setFiles(arr => [...arr, itemRef.name]);
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
    const storageDown = ref(storage, `documents-pdf/${file}`)
            getDownloadURL(storageDown)
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
    /*const starsRef = ref(storage, 'gs://expen-e8cdc.appspot.com/documents-pdf');
    getDownloadURL(starsRef)
    .then((url) => {})*/
return (
    <Scrollbars style={{ height: '100vh' }}>
        <div className='main-content'>
            <section className='content-image-navbar'>
                <section className='image-content'>
                    <div className='logo-content'>
                        <img src={Picture} alt='Logo'/>
                    </div>
                </section>
                <section className='content-pdf'>
                    <section className='navbar-content'>
                        <Button type='text' onClick={fecthFiles}>Listes</Button>
                        <Button type='text' onClick={HandleBack}>Retour</Button>
                    </section>
                    <section className='title-file-content bg-light'>
                        <section className='py-3 px-5 fs-1 fw-bolder'>
                            <h2>Listes des fichiers PDF</h2>
                        </section>
                        <section className='border content-list'>
                            {files.map((file) => (
                                <p key={file.id} className='fw-lighter border'>
                                    {file}
                                    <VerticalAlignBottomOutlined onClick={() => downloadFiles(file)}  style={{marginBlockStart: '0.4em'}}/>
                                </p>
                            ))}
                        </section>
                    </section>
                    </section>
            </section>
    </div>
    </Scrollbars>
)
}

export default Download;
