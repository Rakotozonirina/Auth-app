import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const FormPdf = () => {
    const navigate = useNavigate();
    const HandleBack = () => {
        navigate(-1);
    };
return (
    <div>
        Welcome!!
        <Button onClick={HandleBack}>Retour</Button>
    </div>
)
}

export default FormPdf;
