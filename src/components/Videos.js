import React, { useState, useEffect, useContext} from "react";
import axios from "axios";
import youtube from "../youtube";
import "antd/dist/antd.css";
import { Button, Tooltip } from "antd";
import "./Videos.css";
import Search from "./Search";
import UnorderedListOutlined from "@ant-design/icons/UnorderedListOutlined.js";
import TableOutlined from "@ant-design/icons/TableOutlined.js";
import NavBar from "./NavBar";
import ModalWindow from "./Modal";
import Loader from './Loader/Loader'
import VideoContext from '../context/video-context'
import VideoComponent from './VideoComponent'

const KEY = process.env.REACT_APP_API_KEY;

const Videos = (props) => {
  const context = useContext(VideoContext);
  const [videos, setVideo] = useState([]);
  const [amount, setAmount] = useState("");
  const [listed, setListed] = useState(true);
  const [query, setQuery] = useState("");
  const [vis, setVis] = useState(false);
  const [isLoading, setLoaded] = useState(null);
  const [searchNow, setSearch] = useState(false);

  useEffect(() => {
    return localStorage.getItem('currentUser') !== null ? context.setUser(localStorage.getItem('currentUser')) && context.setIsAuth(true) : null
   }, [])
     
      useEffect(() =>  {
    if (query !== '' && searchNow !== false) {
          youtube.get("/search", {
          params: {
            key: KEY,
            part: "snippet",
            maxResults: 12,
            q: query,
            videoId: !null,
          },
        })
        .then((res) => {
          setLoaded(true);
          console.log(context)
          setVideo(res.data.items);
          setAmount(res.data.pageInfo.totalResults);
          setTimeout(() => {
            setLoaded(false);
          }, 1500);
        });
    }
  }, [query, searchNow]);

  useEffect(() => {
    if (context.fullQuery.key !== '')
     {  youtube
        .get("/search", {
          params: {
            key: KEY,
            part: "snippet",
            maxResults: context.fullQuery.results,
            q: context.fullQuery.queryValue,
            videoId: !null,
            order: context.fullQuery.sortBy
          },
        })
        .then((res) => {
          setLoaded(true);
          console.log(context)
          setVideo(res.data.items);
          setAmount(res.data.pageInfo.totalResults);
          setTimeout(() => {
            setLoaded(false);
          }, 1500);
        });}
    
  }, [context]);

  useEffect(() => {
    return () => {
      context.setFullQuery({key: ''});
    }
  }, []);

  function ListSorted(e) {
    e.preventDefault();
    setListed(true);
  }

  function GridSorted(e) {
    e.preventDefault();
    setListed(false);
  }

  function handleQuery() {
    setSearch(true);
  };
  const handleChange = (e) =>{
    setQuery(e);
    console.log(query)
  }
  function saveQuery(e) {
    e.preventDefault();

    setVis(true);
  }

  function unsaveQuery(e) {
    e.preventDefault();
    setVis(false);
  }


  return (
    <div className="bg">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      > 
        <NavBar />
        <Search saveQuery={saveQuery} handleQuery={handleQuery} handleChange={handleChange} />
        
        <ModalWindow query={query} vis={vis} unsaveQuery={unsaveQuery} />
      
        {query !== null || context !== null ? (
          <div
            style={{
              display: "flex",
              margin: "10px",
              justifyContent: "center",
              fontSize: "16px",
              color: "black",
            }}
          >
            Видео по запросу: {context.fullQuery.queryValue == '' ? query : context.fullQuery.queryValue} , {amount} результатов
            <Tooltip title="Отсортировать видео в виде списка">
              <Button
                style={{ marginLeft: "10px" }}
                onClick={ListSorted}
                shape="square"
                icon={<UnorderedListOutlined />}
              />
            </Tooltip>
            <Tooltip title="Отсортировать видео в виде сетки">
              <Button
                style={{ marginLeft: "10px" }}
                onClick={GridSorted}
                shape="square"
                icon={<TableOutlined />}
              />
            </Tooltip>
          </div>
        ) : null}
      </div>
      { isLoading ? <Loader /> : 
        
          <VideoComponent listed={listed} videos={videos}/>
       
      }
    </div>
  );
};

export default Videos;
