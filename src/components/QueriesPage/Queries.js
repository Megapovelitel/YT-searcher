import React, { useEffect, useState, useContext } from "react";
import NavBar from "../Navbar/NavBar";
import { Table, Button } from "antd";
import "./Queries.css";
import ModalWindow from "../Modal";
import VideoContext from "../../context/video-context";
import EditOutlined from "@ant-design/icons/EditOutlined";
import { Link } from "react-router-dom";

export default function Queries() {
  const context = useContext(VideoContext);
  const [queryArr, setQueryArr] = useState([]);
  const [queryFull, setQueryFull] = useState();
  const [vis, setVis] = useState(false);

  useEffect(() => {
    setQueryArr(
      JSON.parse(localStorage.getItem(`${context.user.username}.queries`))
    );
  }, [context.user.username]);

  const columns = [
    {
      title: "Запрос",
      dataIndex: "q",
      key: "q",
      render: (text) => <p className="light-text">{text}</p>,
    },
    {
      title: "Название",
      dataIndex: "queryName",
      key: "queryName",
    },
    {
      title: "Количество",
      dataIndex: "maxResults",
      key: "maxResults",
    },
    {
      title: "Сортировка",
      dataIndex: "order",
      key: "order",
    },

    {
      title: "Действия",
      key: "action",
      render: (text, record) => (
        <VideoContext.Consumer>
          {(context) => (
            <span>
              <EditOutlined
                value={record.key}
                onClick={(e) => onClick(record.key)}
              />
              <Link to="/search">
                <Button value={record.key}
                  onClick={(e) => context.executeQuery(record.key)}>Выполнить</Button>
              </Link>
            </span>
          )}
        </VideoContext.Consumer>
      ),
    },
  ];

  const onClick = (e) => {
    setQueryFull(queryArr[e]);
    setVis(true);
  }

  const unsaveQuery = (e) => {
    e.preventDefault();
    setVis(false);
  }

  return (
    <div className="bg">
      <div>
        <NavBar />
        <ModalWindow
          vis={vis}
          queryFull={queryFull}
          unsaveQuery={unsaveQuery}
        />
        <Table
          className="table"
          columns={columns}
          pagination={false}
          dataSource={queryArr}
        />
        </div>
    </div>
  );
}
