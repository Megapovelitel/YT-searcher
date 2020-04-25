import React, {useState, useEffect} from 'react'
import { Modal, Button, Input, Select, Slider } from 'antd';

const {Option} = Select;

const ModalWindow =({vis, query, unsaveQuery}) =>  {
    const [visible, setVisible] = useState(false);
    const [queryName, setQueryName] = useState('default_query_name');
    const [results, setResults] = useState(12);
    const [sortBy, setSortBy] = useState('relevance'); 
    const [key, setItemKey] = useState(0);
    const [fullQuery, setFullQuery] = useState({key, query, queryName, results, sortBy});
    const [fullQueries, setFullQueries] = useState([]);
   
    useEffect(() => {
        setVisible(vis);

        localStorage.getItem('rap-game') !== null ? 
        setFullQueries(JSON.parse(localStorage.getItem('rap-game'))) : setFullQueries([]);
        setItemKey(fullQueries.length+1)
        console.log(key)
    }, [vis]);

    useEffect(() => {
      setFullQuery({key, query, queryName, results, sortBy});
    }, [key, query, queryName, results, sortBy])
     const onOk = (e) =>{   
        setVisible(false)
        fullQueries.push(fullQuery)
        localStorage.setItem('rap-game', JSON.stringify(fullQueries));

    }
    const onCancel = (e) => {
      unsaveQuery(e);
    }

    function handleChange(value) {
      setSortBy(value);
    }

    const onChange = (e) => {
      setQueryName(e);
    }

    const onChangeResults =(e) => {
      setResults(e);
      
    }
 
    return (
      <div>
        <Modal
          title="Сохранить запрос"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        > 
          <Input style={{marginBottom: '10px'}} disabled='true' defaultValue={query} required/>
          <Input onChange={(e) => onChange(e.target.value)} placeholder="имя запроса" />
          <h1 style={{fontSize: '16px'}}>Сортировать по:</h1>
          <Select defaultValue={"relevance"} style={{ width: '200px' }} onChange={handleChange}>
      <Option value="date">Дате</Option>
      <Option value="relevance">Релевантности</Option>
      <Option value="rating">Рейтингу</Option>
      <Option value="title">Названию</Option>
    </Select>
    <h1 style={{fontSize: '16px'}}>Количество результатов запроса (1 - 50)</h1>
    <Slider onChange={(e) => onChangeResults(e)} value={results} min={1} max={50} tooltipVisible={visible ? true : false} tooltipPlacement='bottom' />
        </Modal>
      </div>
    );
  }

export default ModalWindow
