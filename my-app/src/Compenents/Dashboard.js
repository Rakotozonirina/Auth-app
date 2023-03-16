import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { auth, logout } from '../firebase';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Space } from 'antd';
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
    useEffect(() => {
        if(loading){
            return;
        }
        if(!user) return navigate("/");
    }, [user, loading]);
return (
    <div>
        <Row>
            <Col xs={9} sm={12} md={12} lg={12} xl={12} style={style} className='gutter-row'>
                <Space wrap>
                    <img src={Picture} style={{marginBlockStart:'0.6em'}} alt='The Logo'/>
                </Space>
            </Col>
            <Col xs={7} sm={6} md={8} lg={9} xl={9} style={style} className='gutter-row'></Col>
            <Col xs={8} sm={6} md={4} lg={3} xl={3} style={style} className='gutter-row'>
                <Space wrap>
                    <Button type='text' style={{color: '#F0EB8D'}} onClick={logout} >Log Out</Button>
                </Space>
            </Col>
        </Row>
    </div>
)
}

export default Dashboard;