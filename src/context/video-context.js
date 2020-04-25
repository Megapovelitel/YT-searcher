import React from 'react'

export default React.createContext({
    queryFull:
    {
        key: '', 
        query: '',
        queryName: '',
        results: '',
        sortBy: ''
    },
    executeQuery: () => {}
});