import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { auth, logout } from '../firebase';
import { getAuth } from 'firebase/auth';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Space, Divider } from 'antd';
import { Typography } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { LogoutOutlined , HeartTwoTone, SmileTwoTone, CheckCircleTwoTone  } from '@ant-design/icons'
import Picture from '../Pictures/phosphor-logo-bold-1.svg';
import './dashboard.css';
const style = {
    background: '#2D2727',
    padding: '1.5rem 3rem',
    color: '#F0EB8D',
}
const {Title} = Typography;
const Dashboard = () => {
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
return (
    <Scrollbars style={{ height: '100vh' }}>
    <header>
        <Row>
            <Col xs={9} sm={12} md={12} lg={12} xl={14} style={style} className='gutter-row'>
                <Space wrap>
                    <img src={Picture} style={{marginBlockStart:'0.6em'}} alt='The Logo'/>
                </Space>
            </Col>
            <Col xs={6} sm={6} md={6} lg={8} xl={6} style={style} className='gutter-row'> <Space wrap>{otherUser && <Button type='text' style={{color: '#F0EB8D'}}>{otherUser.email}</Button>}</Space></Col>
            <Col xs={9} sm={6} md={6} lg={4} xl={4} style={style} className='gutter-row'>
                <Space wrap>
                    <Button type='text' style={{color: '#F0EB8D'}} onClick={logout} >Deconnexion <LogoutOutlined /></Button>
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
            </div>
        </div>
    </main>
    </Scrollbars>
    
)
}

export default Dashboard;
