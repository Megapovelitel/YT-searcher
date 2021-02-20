import React from "react";
import { Input } from "antd";
import { Button } from "antd";
import HeartOutlined from "@ant-design/icons/HeartOutlined.js";
import "./Videos.css";

const Search = ({ handleQuery, saveQuery, handleChange }) => {
  return (
    <div className="search-container">
      <Input.Search
        className="search"
        size="large"
        suffix={
          <Button
            onClick={saveQuery}
            shape="circle"
            icon={<HeartOutlined />}
          ></Button>
        }
        placeholder="Введите запрос"
        onSearch={(e) => handleQuery(e)}
        onChange={(e) => handleChange(e.target.value)}
        enterButton="Search"
      />
    </div>
  );
};

export default Search;
