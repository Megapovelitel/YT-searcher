import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import VideoContext from '../context/video-context'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  
  const context = useContext(VideoContext);
  useEffect(() => {
   return localStorage.getItem('currentUser') !== null ? context.setUser(localStorage.getItem('currentUser')) && context.setIsAuth(true) : null
  }, [])
  
  const onFinish = (values) => {
    axios.get("data.json").then((res) => {
      
        res.data.map((item) => {
          if (item.username === values.username && item.password === values.password) {
            localStorage.setItem('currentUser', values.username)
            context.setIsAuth(true);
            context.setUser(values.username);
          } 
        })
      
      
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        {...layout}
        style={{ alignSelf: "center", marginTop: "250px" }}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
