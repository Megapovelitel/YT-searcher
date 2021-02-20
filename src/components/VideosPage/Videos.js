import React, { useState, useEffect, useContext } from "react";
import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import "./Videos.css";
import Search from "./Search";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined.js";
import TableOutlined from "@ant-design/icons/TableOutlined.js";
import NavBar from "../Navbar/NavBar";
import ModalWindow from "../Modal";
import Loader from "../Loader/Loader"
import VideoContext from "../../context/video-context";
import VideoComponent from "./VideoComponent";
import YoutubeService from "../../services/youtube.service";

const Videos = () => {
  const context = useContext(VideoContext);
  const [videos, setVideo] = useState([]);
  const [amount, setAmount] = useState("");
  const [listed, setListed] = useState(true);
  const [query, setQuery] = useState("");
  const [vis, setVis] = useState(false);
  const [isLoading, setLoaded] = useState(null);

  useEffect(() => {
    if (context.fullQuery.key !== "") {
      YoutubeService.getVideosUserQuery({
        q: context.fullQuery.q,
        order: context.fullQuery.order,
        maxResults: context.fullQuery.maxResults,
      }).then((res) => {
        setLoaded(true);
        setVideo(res.data.items);
        setAmount(res.data.pageInfo.totalResults);
        setTimeout(() => {
          setLoaded(false);
        }, 1500);
      });
    }
  }, [context]);

  const ListSorted = (e) => {
    e.preventDefault();
    setListed(true);
  };

  const GridSorted = (e) => {
    e.preventDefault();
    setListed(false);
  };

  const handleQuery = () => {
    if (query !== "")
      YoutubeService.getVideosDefaultQuery(query).then((res) => {
        console.log(res.data.items)
        setLoaded(true);
        setVideo(res.data.items);
        setAmount(res.data.pageInfo.totalResults);
        setTimeout(() => {
          setLoaded(false);
        }, 1500);
      })
  };

  const handleChange = (e) => {
    setQuery(e);
  };

  function saveQuery(e) {
    e.preventDefault();
    if (query !== "") setVis(true);
  }

  function unsaveQuery(e) {
    e.preventDefault();
    setVis(false);
  }

  return (
    <div className="bg">
      <div className="main">
        <NavBar />
        <Search
          saveQuery={saveQuery}
          handleQuery={handleQuery}
          handleChange={handleChange}
        />

        <ModalWindow query={query} vis={vis} unsaveQuery={unsaveQuery} />

        {query !== null || context !== null ? (
          <div className="header-videos">
            Видео по запросу:{" "}
            {context.fullQuery.q === ""
              ? query
              : context.fullQuery.q}{" "}
            , {amount} результатов
            <Tooltip title="Отсортировать видео в виде списка">
              <Button
                onClick={ListSorted}
                shape="square"
                icon={<UnorderedListOutlined />}
                className="btn-sort"
              />
            </Tooltip>
            <Tooltip title="Отсортировать видео в виде сетки">
              <Button
                onClick={GridSorted}
                shape="square"
                icon={<TableOutlined />}
                className="btn-sort"
              />
            </Tooltip>
          </div>
        ) : null}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <VideoComponent listed={listed} videos={videos} />
      )}
    </div>
  );
};

export default Videos;
