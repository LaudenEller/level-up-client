import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents } from "./EventManager"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

const history = useHistory()

const DeleteEvent = (id) => {
    deleteEvent(id).then(() => Update())
}

const Update = () => {
    getEvents().then(data => setEvents(data))
}

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        history.push({ pathname: "/events/new" })
    }}
>Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <>
                    <Link to={`/events/${event.id}`} key={`event--${event.id}`} className="event">
                        <div className="event__title">A game of {event.game.title}</div>
                        <div className="event__date">was played on {event.date} at {event.time}</div>
                    </Link>
                    <button className="gameList-button" onClick={() => {DeleteEvent(game.id)}}>Delete</button>
                    </>
                })
            }
        </article>
        </>
    )
}