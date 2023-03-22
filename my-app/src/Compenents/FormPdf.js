import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'antd';
import { Button, Space, Badge, Avatar, Input, message, Upload } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import Picture from '../Pictures/phosphor-logo-bold-1.svg';
import { getAuth } from 'firebase/auth';
import { Scrollbars } from 'react-custom-scrollbars';
import './FormPdf.css';
const style = {
    background: '#2D2727',
    padding: '1.5rem 3rem',
    color: '#F0EB8D',
}
const { TextArea } = Input;
const { Dragger } = Upload;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-pdf',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const FormPdf = () => {
    const otherAuth = getAuth();
    const otherUser = otherAuth.currentUser;
    const navigate = useNavigate();
    const HandleBack = () => {
        navigate(-1);
    };
    const [value, setValue] = useState('');
return (
    <Scrollbars style={{ height: '100vh' }}>
        <header>
        <Row>
                <Col xs={9} sm={12} md={12} lg={12} xl={12} style={style} className='gutter-row'>
                    <Space wrap>
                        <img src={Picture} style={{marginBlockStart:'0.6em'}} alt='The Logo'/>
                    </Space>
                </Col>
                <Col xs={7} sm={6} md={8} lg={9} xl={8} style={style} className='gutter-row'>
                <Space wrap>{otherUser && <Button type='text' style={{color: '#F0EB8D'}}>{otherUser.email} <Space wrap><Badge status="success" dot><Avatar style={{backgroundColor: "transparent", marginBlockEnd: "0.5em"}} size={24} gap={4}  shape="circle" icon={<UserOutlined style={{color:"#F0EB8D"}}/>}/></Badge></Space> </Button>}</Space>
                </Col>
                <Col xs={8} sm={6} md={4} lg={3} xl={4} style={style} className='gutter-row'>
                <Space wrap>
                    <Button type='text' style={{color: '#F0EB8D'}} onClick={HandleBack}>Retour</Button>
                </Space>
                </Col>
        </Row>
    </header>
    <main>
        <div className='hero-form-pdf'>
            <div className='hero-content-form-pdf'>
                <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='Déscription du fichier'
                />
                <Dragger accept=".pdf" {...props} style={{color:'#777', backgroundColor:'#fff',padding: '0 0.3em', height: '1em'}}>
                <UploadOutlined/>
                    Ajouter le fichier format PDF
                </Dragger>
            </div>
        </div>
    </main>
    </Scrollbars>
    
)
}

export default FormPdf;
