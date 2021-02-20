import React, { useState, useEffect, useContext } from "react";
import { Modal, Input, Select, Slider, Form } from "antd";
import VideoContext from "../context/video-context";

const ModalWindow = ({ vis, query, unsaveQuery, queryFull }) => {
  
  
  const [visible, setVisible] = useState(false);
  const [key, setItemKey] = useState(0);
  const [form] = Form.useForm();
  const orderVariants = ["relevance", "date", "rating", "title"];
  const [fullQuery, setFullQuery] = useState({
    key: "",
    q: "",
    queryName: "",
    order: "",
    maxResults: "",
  });
  

  const context = useContext(VideoContext);
 
  const [fullQueries, setFullQueries] = useState([]);

  useEffect(() => {
    setVisible(vis);
    if (queryFull === undefined) {
      //opened from Videos component
      setFullQuery({ ...fullQuery, q: query });
      form.setFieldsValue({ ...fullQuery, q: query });
    } else {
      //opened from Queries component
      setFullQuery({ ...queryFull });
      form.setFieldsValue({ ...queryFull });
    }

    localStorage.getItem(`${context.user.username}.queries`) !== null
      ? setFullQueries(JSON.parse(localStorage.getItem(`${context.user.username}.queries`)))
      : setFullQueries([]);

    if (queryFull === undefined && fullQueries.length === 0) {
      setItemKey(0);
    } else if (queryFull === undefined) {
      setItemKey(fullQueries.length);
    }
  }, [vis]);


  const handleSubmit = () => {
    setVisible(false);
    if (queryFull === undefined) {
      fullQueries.push({...fullQuery, key: key})
    }
    else {
      fullQueries.splice(queryFull.key, 1, fullQuery);
    }
    localStorage.setItem(
      `${context.user.username}.queries`,
      JSON.stringify(fullQueries)
    );

    
    window.location = "/queries";
  };

  const onCancel = (e) => {
    unsaveQuery(e);
  };

  const handleDataChange = (currentField) => {
    setFullQuery({ ...fullQuery, ...currentField });
  };

  const capitalize = (s) => {
    return s[0].toUpperCase() + s.slice(1);
  };

  return (
    <div>
      <Modal
        title="Сохранить запрос"
        visible={visible}
        onOk={form.submit}
        onCancel={onCancel}
        getContainer={false}
      >
        <Form
          name="query-form"
          form={form}
          onValuesChange={(currentField) => handleDataChange(currentField)}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Query"
            name="q"
            rules={[{ required: true, message: "Please, enter query" }]}
          >
            <Input disabled={query ? true : false} />
          </Form.Item>
          <Form.Item label="Query name" name="queryName">
            <Input />
          </Form.Item>
          <Form.Item defaultValue="relevance" label="Order by" name="order">
            <Select>
              {orderVariants.map((item, idx) => {
                return (
                  <Select.Option key={idx} value={item}>
                    {capitalize(item)}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Results" name="maxResults">
            <Slider max={50} min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalWindow;
