import React from "react";
import {Alert, Spin} from 'antd';


const Spinner: React.FC = () => (
    <Spin
        size='large'
        tip="Loading..." />
);

export default Spinner;