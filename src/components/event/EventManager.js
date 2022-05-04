export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}
export const getEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, { 
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(r => r.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(event)
     })
        .then(r => r.json())
}

export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      },
      body: JSON.stringify(event)
    })
  };