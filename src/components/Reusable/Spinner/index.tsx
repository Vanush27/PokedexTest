import React from "react";
import {Spin} from 'antd';


const Spinner: React.FC = () => (
    <Spin
        size='large'
        tip="Loading..." />
);

export default Spinner;