import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getEvent } from "./EventManager"

export const Event = () => {
    const [event, setEvent] = useState({})
    const { eventId } = useParams()

    useEffect(() => {
        getEvent(eventId)
            .then((data) => {
                setEvent(data)
            })
    },
        [eventId])

    const history = useHistory()

    return (
        <>
            <section className="event-container">
                <div className="event__title">A game of {event?.game?.title}</div>
                <div className="event__date">was played on {event?.date} at {event?.time}</div>
                <div className="event__organizer">and was organized by {event?.organizer?.user?.first_name} {event?.organizer?.user?.last_name}</div>
            </section>
            <button onClick={() => history.push({ pathname: `./new/${eventId}` })}>Update event</button>
        </>)
}

