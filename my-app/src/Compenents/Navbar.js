import React from 'react';
import { Row, Col } from 'antd';
import { Button, Space } from 'antd';
import Picture from '../Pictures/phosphor-logo-bold-1.svg'
const style = {
    background: '#2D2727',
    padding: '1.5rem 3rem',
    color: '#F0EB8D',
}

const Navbar = () => {
return (
    <header>
        <Row>
            <Col xs={9} sm={12} md={12} lg={12} xl={12} style={style} className='gutter-row'>
                <Space wrap>
                    <img src={Picture} style={{marginBlockStart:'0.6em'}} alt='The Logo'/>
                </Space>
            </Col>
            <Col xs={7} sm={6} md={8} lg={9} xl={9} style={style} className='gutter-row'></Col>
            <Col xs={8} sm={6} md={4} lg={3} xl={3} style={style} className='gutter-row'>
                <Space wrap>
                    <Button type='text' style={{color: '#F0EB8D'}}>Login</Button>
                </Space>
            </Col>
        </Row>
    </header>
)
}

export default Navbar;
