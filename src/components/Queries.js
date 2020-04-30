import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import { Table, Tag } from 'antd';
import './Videos.css'
import ModalWindow from './Modal'
import VideoContext from '../context/video-context'
import EditOutlined from '@ant-design/icons/EditOutlined'
import {Link} from 'react-router-dom'

export default function Queries() {
const [queryArr, setQueryArr] = useState([]);
const [queryFull, setQueryFull] = useState();
const [vis, setVis] = useState(false);
var array = [];
useEffect(() => {
setQueryArr(JSON.parse(localStorage.getItem('rap-game')));
console.log(queryArr);
}, [])
const columns = [
  {
    title: 'Запрос',
    dataIndex: 'queryValue',
    key: 'queryValue',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Название',
    dataIndex: 'queryName',
    key: 'queryName',
  },
  {
      title: 'Количество',
      dataIndex: 'results',
      key: 'results'
  },
  {
    title: 'Сортировка',
    dataIndex: 'sortBy',
    key: 'sortBy',
  },
  
  {
    title: 'Действия',
    key: 'action',
    render: (text, record) => (
      <VideoContext.Consumer>
      {context => (<span>
       <EditOutlined value={record.key} onClick={e => onClick(record.key)}style={{ marginRight: 16 }}/>
        <Link to='/search'><a value={record.key} onClick={e => context.executeQuery(record.key)}>Выполнить</a></Link>
      </span>)}
      </VideoContext.Consumer>
    ),
  },
];


    function onClick(e)  {
  setQueryFull(queryArr[e-1])
  setVis(true);

}
function executeQuery(e){

  console.log(queryArr[e-1]);
 
  
}
function unsaveQuery(e) {
  e.preventDefault();
  setVis(false);
}

    return (
      <div className='bg'>
        <div style={{display: 'flex', justifyContent : 'center', flexDirection: 'column', alignItems: 'center'}}>
             <NavBar />
             <ModalWindow vis={vis} queryFull={queryFull} unsaveQuery={unsaveQuery}/>
             <Table style={{width: '800px', alignSelf: 'center', outline: '2px lightgrey solid', marginTop: '20px'}} columns={columns} pagination={false}  dataSource={queryArr} />
        </div>
        </div>
    )
}
