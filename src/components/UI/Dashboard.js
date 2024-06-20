import React, {useContext, useEffect} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import TodoList from './TodoList';
import {fetchData} from "../tools/requests";
import {UserIdContext} from '../../UserIdContext';

function Dashboard({onLogout, successMessage}) {
    const {getAccessTokenSilently, user, isLoading} = useAuth0();
    const { setUserId } = useContext(UserIdContext);

    const fetchUserId = async () => {
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        await fetchData('/api/auth/userId', setUserId, token);
    }

    useEffect(() => {
        fetchUserId();
    }, [getAccessTokenSilently]);

    if (isLoading) return <div>Loading</div>

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user.name}</p>
            <button onClick={onLogout}>Logout</button>
            <TodoList/>
        </div>
    );
}

export default Dashboard;