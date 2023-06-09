import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { auth, logout } from '../firebase';
import { getAuth } from 'firebase/auth';
import { Navigate, useNavigate, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Space, Divider, Modal, Select, message, Upload, Badge, Avatar } from 'antd';
import { Typography } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { UserOutlined, LogoutOutlined , HeartTwoTone, SmileTwoTone, PlusOutlined, LoadingOutlined, CheckCircleTwoTone, ArrowRightOutlined, UploadOutlined, DownloadOutlined, FolderViewOutlined, FilePdfOutlined, FilePptOutlined, FireOutlined, FileZipOutlined  } from '@ant-design/icons'
import Picture from '../Pictures/phosphor-logo-bold-1.svg';
import './dashboard.css';
const { Option } = Select;
const style = {
    background: '#2D2727',
    padding: '1.5rem 3rem',
    color: '#F0EB8D',
}
const {Title} = Typography;
const handleChange = (value) => {
    console.log(`selected ${value}`);
}
const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [ modalAjout, setModalAjout ] = useState(false);
    const [ modalTelecharger, setModalTelecharger ] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const otherAuth = getAuth();
    const otherUser = otherAuth.currentUser;
    useEffect(() => {
        if(loading){
            return;
        }
        if (!user) {
            return navigate("/");
        }
        if (otherUser !== null && otherUser !== undefined) {
            // do something with otherUser
            console.log("One user is loggin");
        } else {
            // handle the case where otherUser is null or undefined
            console.log("null variable");
        }
    }, [user, loading, navigate]);
    const enter = useNavigate();
    const HandleLetgo = () => {
        enter("/formpdf");
    };
    const enterToDownload = useNavigate();
    const HandleDownload = () => {
        enterToDownload("/download");
    };
return (
    <Scrollbars style={{ height: '100vh' }}>
    <header>
        <Row>
            <Col xs={9} sm={12} md={12} lg={12} xl={12} style={style} className='gutter-row'>
                <Space wrap>
                    <img src={Picture} style={{marginBlockStart:'0.6em'}} alt='The Logo'/>
                </Space>
            </Col>
            <Col xs={7} sm={6} md={8} lg={9} xl={8} style={style} className='gutter-row'> <Space wrap>{otherUser && <Button type='text' style={{color: '#F0EB8D', display: 'flex', justifyContent: 'center'}}>{otherUser.email} <Space wrap><Badge status="success" dot><Avatar style={{backgroundColor: "transparent", marginBlockStart: "-1em"}} size={24} gap={4}  shape="circle" icon={<UserOutlined style={{color:"#F0EB8D"}}/>}/></Badge></Space> </Button>}</Space></Col>
            <Col xs={8} sm={6} md={4} lg={3} xl={4} style={style} className='gutter-row'>
                <Space wrap>
                    <Button type='text' style={{color: '#F0EB8D', display: 'flex', justifyContent: 'center'}} onClick={logout} >Deconnexion <LogoutOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                </Space>
            </Col>
        </Row>
    </header>
    <main>
        <div className='hero-dashboard'>
            <div className='hero-content'>
                <Divider style={{color: '#F0EB8D'}}> <SmileTwoTone twoToneColor="#eb2f96" /> BIENVENUS <HeartTwoTone twoToneColor="#eb2f96" /> </Divider>
                <Divider style={{color: '#F0EB8D'}}><Space wrap>{otherUser && <Button type='text' style={{color: '#F0EB8D'}}>{otherUser.displayName}</Button>}</Space> <CheckCircleTwoTone twoToneColor="#52c41a" /> </Divider>
                <Title level={5} style={{color:'#F0EB8D'}}>Cette application est crée pour facilité les transfères <br></br> <br></br> de données aux sein de l'Etablissement <br></br> <br></br> de l'Institu Universitaire de Gestion et de Management</Title>
                <br></br> <br></br>
                <Space wrap> <Button type='text' style={{color:'#F0EB8D', display: 'flex', justifyContent: 'center'}} onClick={() => setModalOpen(true)}>Cliquez Ici <ArrowRightOutlined spin style={{marginBlockStart: '0.4em'}}/> </Button> </Space>
                <Modal title="Choisissez votre action" centered open={modalOpen} onOk={() => setModalOpen(false)} onCancel={() => setModalOpen(false)}>
                    <div className='modal-style'>
                        <button className='btn' style={{display: 'flex', justifyContent: 'center'}} onClick={() => setModalAjout(true)}>Ajouter <UploadOutlined style={{marginBlockStart: '0.3em', marginInlineStart: '0.4em'}}/> </button>
                        <button className='btn' style={{display: 'flex', justifyContent: 'center'}} onClick={() => setModalTelecharger(true)}>Télecharger <DownloadOutlined style={{marginBlockStart: '0.3em', marginInlineStart: '0.4em'}}/> </button>
                        <button className='btn' style={{display: 'flex', justifyContent: 'center'}}>Régarder <FolderViewOutlined style={{marginBlockStart: '0.3em', marginInlineStart: '0.4em'}}/></button>
                    </div>
                    <Modal title="Choisir le type du fichier" centered open={modalAjout} onOk={() => setModalAjout(false)} onCancel={() => setModalAjout(false)}>
                        <Space wrap style={{display: 'flex',justifyContent: 'flex-start',flexDirection: 'column'}}>
                            <Button style={{display: 'flex', justifyContent: 'center'}} onClick={HandleLetgo}>Documents/pdf <FilePdfOutlined twoToneColor="#eb2f96" style={{marginBlockStart: '0.4em'}}/></Button>
                            <Button style={{display: 'flex', justifyContent: 'center'}} danger>Documents/point <FilePptOutlined twoToneColor="#FFD966" style={{marginBlockStart: '0.4em'}}/></Button>
                            <Button style={{display: 'flex', justifyContent: 'center'}}>Documents/zip <FileZipOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                            <Button style={{display: 'flex', justifyContent: 'center'}} danger>Video <FireOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                        </Space>
                    </Modal>
                    <Modal title="Télécharger les fichiers" centered open={modalTelecharger} onOk={() => setModalTelecharger(false)} onCancel={() => setModalTelecharger(false)}>
                    <Space wrap style={{display: 'flex',justifyContent: 'flex-start',flexDirection: 'column'}}>
                            <Button style={{display: 'flex', justifyContent: 'center', color: '#FE6244'}} onClick={HandleDownload}>Documents/pdf <FilePdfOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                            <Button style={{display: 'flex', justifyContent: 'center', color: '#9E4784'}}>Documents/point <FilePptOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                            <Button style={{display: 'flex', justifyContent: 'center', color: '#FE6244'}}>Documents/zip <FileZipOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                            <Button style={{display: 'flex', justifyContent: 'center', color: '#9E4784'}}>Video <FireOutlined style={{marginBlockStart: '0.4em'}}/></Button>
                        </Space>
                    </Modal>
                </Modal>
            </div>
        </div>
    </main>
    </Scrollbars>
    
)
}

export default Dashboard;
