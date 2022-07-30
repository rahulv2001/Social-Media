import React, { useEffect, useState } from 'react'
import "./FollowersCard"
import "./FollowersCard.css"
import User from '../User/User'
import { useSelector } from 'react-redux'
import { getAllUser } from '../../api/UserRequest.js'

const FollowersCard = () => {

    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser();
            setPersons(data);
            // console.log(data);
        }
        fetchPersons();
    }, [])

    return (
        <div className='FollowersCard'>
            <h3>People you may know</h3>
            {persons.map((person, id) => {
                if (person._id !== user._id) {
                    return (<User person={person} key={id} />)
                }
                return ""
            })}
        </div>
    )
}

export default FollowersCard