import React from 'react'

export default React.createContext({
    queryFull:
    {
        key: '', 
        q: '',
        queryName: '',
        maxResults: '',
        order: ''
    },
    
    user: {
       username: "",
       token: ""
    },
    executeQuery: () => {}
});