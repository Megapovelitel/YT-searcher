import React, {useState, useEffect} from 'react'
import { Modal, Button, Input, Select, Slider } from 'antd';

const {Option} = Select;

const ModalWindow =({vis, query, unsaveQuery, queryFull}) =>  {
    const [visible, setVisible] = useState(false);
    const [queryName, setQueryName] = useState('');
    const [results, setResults] = useState(12);
    const [sortBy, setSortBy] = useState('relevance'); 
    const [key, setItemKey] = useState(0);
    const [queryValue, setQueryValue] = useState('');
    const [fullQuery, setFullQuery] = useState({key, queryValue, queryName, results, sortBy});
    const [fullQueries, setFullQueries] = useState([]);
    
   
    useEffect(() => {
        setVisible(vis);
       if  (queryFull === undefined)
       {  
         setQueryValue(query);

        } else {
          
          setQueryValue(queryFull.queryValue);
          setQueryName(queryFull.queryName);
          setSortBy(queryFull.sortBy);
          setResults(queryFull.results);
          setFullQuery({key: queryFull.key, 
            queryValue: queryFull.queryValue, 
            queryName: queryFull.queryName, 
            sortBy: queryFull.sortBy, 
            results : queryFull.results})
        }
                                                        
        localStorage.getItem('rap-game') !== null ? 
        setFullQueries(JSON.parse(localStorage.getItem('rap-game'))) : setFullQueries([]);
        if (queryFull === undefined) {
          setItemKey(fullQueries.length+1); 
        }  
    }, [vis]);

    useEffect(() => {
      setFullQuery({key, queryValue, queryName, results, sortBy}) 
      

      console.log(fullQuery)
      console.log(queryName)

    }, [key, queryValue, queryName, results, sortBy])
    
     const onOk = (e) => {   
        setVisible(false)
        queryFull === undefined ? fullQueries.push(fullQuery) : fullQueries.splice(queryFull.key-1, 1, fullQuery);
        localStorage.setItem('rap-game', JSON.stringify(fullQueries));
        window.location='/queries'
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

    const onChangeQuery = (e) => {
     setQueryValue(e)
    }
 
    return (
      <div>
        <Modal
          title="Сохранить запрос"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        > 
          <Input style={{marginBottom: '10px'}} onChange={(e) => onChangeQuery(e.target.value)} value={queryValue} 
          disabled={queryFull === undefined ? true : false}  required/>
          <Input onChange={(e) => onChange(e.target.value)} value={queryName}
            defaultValue={queryName} placeholder="имя запроса" />
          <h1 style={{fontSize: '16px'}}>Сортировать по:</h1>
          <Select defaultValue={"relevance"} value={sortBy} style={{ width: '200px' }} onChange={handleChange}>
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
