import React from 'react'

export default React.createContext({
    queryFull:
    {
        key: '', 
        queryValue: '',
        queryName: '',
        results: '',
        sortBy: ''
    },
    isAuth: {

    },
    user: {
       
    },
    logOut: () => {},
    executeQuery: () => {}
});