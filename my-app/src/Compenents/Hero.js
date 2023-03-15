import React from 'react';
import './Hero.css';
import { SyncOutlined } from '@ant-design/icons';
import { Space, Button } from 'antd';
import { Typography } from 'antd';
const {Title} = Typography;

const Hero = () => {
return (
    <main>
        <div className='hero-image'>
            <div className='hero-content'>
                <Title level={3} style={{color:'#F0EB8D'}}>Welcome to Expense Tracker!</Title>
                <Title level={5} style={{color:'#F0EB8D'}}>Add, view, edit, and delete expenses</Title>
                <Space wrap> <Button type='text' style={{color:'#F0EB8D'}} >LOGIN/REGISTER<SyncOutlined spin style={{fontSize:'1rem'}} /></Button></Space>
            </div>
        </div>
    </main>
)
}

export default Hero;
