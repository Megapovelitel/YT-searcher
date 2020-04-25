import React from "react";
import { Input } from "antd";
import { Button} from "antd";
import HeartOutlined from "@ant-design/icons/HeartOutlined.js";
import './Videos.css'
const Search = ({handleQuery, saveQuery, handleChange}) => {

  return (
      <div className = 'qwe' >
    <Input.Search style={{ height:'25px', marginTop: '25px', display: 'flex', alignItems: 'center', width: '50%'}}
    className='search'
    size="large"
      suffix={
        <Button
          className='btn'
          onClick={saveQuery}
          shape="circle"
          style={{ width: "100%", minHeight: "100%", marginBottom: '5px'}}
          icon={<HeartOutlined />}
        ></Button>
      }
      placeholder="Введите запрос"
      onSearch={e => handleQuery(e)}
      onChange={e => handleChange(e.target.value)}
      enterButton
      
    />
    </div>
  );
};

export default Search;
