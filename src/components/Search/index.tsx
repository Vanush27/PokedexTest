import React, {useState} from 'react';
import {setSearchValue} from "../../store/slices/pokemonSlice";
import {useAppDispatch} from "../../hooks/hooks";
import {Input, Space} from "antd";

const Search: React.FC = () => {

    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');

    const onChangeInput = (event: any) => {
        setValue(event.currentTarget.value);
        dispatch(setSearchValue(event.currentTarget.value));
    }

    return (
        <Space direction="vertical">
            <Input
                value={value}
                onChange={onChangeInput}
                placeholder="Search pokemon... "
                allowClear={true}
                style={{
                    width: 300,
                }}
            />
        </Space>

    );
};

export default Search;