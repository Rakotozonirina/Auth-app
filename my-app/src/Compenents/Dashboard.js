import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { auth, logout } from '../firebase';
import { getAuth } from 'firebase/auth';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Space } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import Picture from '../Pictures/phosphor-logo-bold-1.svg';
import './dashboard.css';
const style = {
    background: '#2D2727',
    padding: '1.5rem 3rem',
    color: '#F0EB8D',
}
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
                    <Button type='text' style={{color: '#F0EB8D'}} onClick={logout} >Deconnexion</Button>
                </Space>
            </Col>
        </Row>
    </header>
    <main>
        <div className='hero-dashboard'>
            <div className='hero-content'>

            </div>
        </div>
    </main>
    </Scrollbars>
    
)
}

export default Dashboard;
