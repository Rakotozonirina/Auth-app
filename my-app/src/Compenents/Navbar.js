import React from 'react';
import { Row, Col } from 'antd';
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
            <Col span={12} style={style} className='gutter-row'>
                <img src={Picture} alt='The Logo'/>
            </Col>
            <Col span={6} style={style} className='gutter-row'>Name</Col>
            <Col span={6} style={style} className='gutter-row'>Name</Col>
        </Row>
    </header>
)
}

export default Navbar;
