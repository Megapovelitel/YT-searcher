import React, { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import VideoContext from "../../context/video-context";
import "./Login.css";
import AuthService from "../../services/auth.service";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const context = useContext(VideoContext);
  const [err, setErr] = useState("");

  const onFinish = (values) => {
    axios.get("data.json").then((res) => {
      const loginData = res.data.find(
        (item) =>
          item.username === values.username.toLowerCase() &&
          item.password === values.password.toLowerCase()
      );
      if (loginData) {
        let promise = new Promise((res, rej) => {
          AuthService.signIn(values.username);
          res();
        });
        promise.then(context.setUser(AuthService.getCurrentUser()));
      } else {
        setErr("Wrong combination of password and username");
        setTimeout(() => {
          setErr("");
        }, 2500);
      }
    });
  };

  return (
    <div className="form-container">
      <Form
        {...layout}
        className="form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h2 className="err-message">{err}</h2>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please, enter your password" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please, enter your password" }]}
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
