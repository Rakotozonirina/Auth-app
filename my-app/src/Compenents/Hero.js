import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';
import { SyncOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import { Typography } from 'antd';
const {Title} = Typography;

const Hero = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if(loading){
            // maybe trigger a loading screen
            return;
        }
        if(user) navigate("/dashboard");
    }, [user, loading]);
return (
    <main>
        <div className='hero-image'>
            <div className='hero-content'>
                <Title level={3} style={{color:'#F0EB8D'}}>Welcome to Transfer Data!</Title>
                <Title level={5} style={{color:'#F0EB8D'}}>Add, view, edit, and delete data (données) </Title>
                <Space wrap> <Button type='text' style={{color:'#F0EB8D'}} onClick={signInWithGoogle} >CONNEXION<SyncOutlined spin style={{fontSize:'1rem'}} /></Button></Space>
            </div>
        </div>
    </main>
)
}

export default Hero;
