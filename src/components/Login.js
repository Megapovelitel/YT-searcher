
import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const onFinish = values => {
    axios.get('data.json') 
    .then(res => {console.log(res.data);
    if (res.data[0].username == values.username && res.data[0].password == values.password) {
            localStorage.setItem(values.username, uuidv4());
            window.location = '/search'
     }
    }
    )
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  
  return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Form

      {...layout}
      style={{alignSelf: 'center', marginTop: '250px'}}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
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

export default Login