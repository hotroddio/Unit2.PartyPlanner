const COHORT = "2310-fsa-et-web-pt-sf-b-john";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
};

const eventList = document.querySelector("#events")


const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);


async function render() {
    await getEvents();
    renderEvents();
}
render();

async function getEvents (){
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(json);
        state.events = json.data;
        console.log(state);
    }   catch (error) {
        console.error(error);
    }
}

async function renderEvents () {
    if(!state.events.length) {
        eventList.innerHTML = "<li>No events.</li>";
        return;
    }
    const eventCards = state.events.map((event) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h2>${event.name}</h2>
        <li>${event.description}</li>
        <li>${event.date}</li>
        <li>${event.location}</li>
        <button id=${event.id}>Delete Event</button>`;
        eventList.appendChild(li);
        document.getElementById(event.id).addEventListener("click", () => deleteEvent(event.id));
        return li;
    });
    eventList.replaceChildren(...eventCards);
}

async function addEvent(event) {
    event.preventDefault();

    try {
        const response = await fetch(API_URL, {
            method: "POST", 
            headers: {"Content-Type": "application/json"
        }, 
            body: JSON.stringify({
                name: addEventForm.name.value,
                description: addEventForm.description.value,
                date: new Date(addEventForm.date.value).toISOString(),
                location: addEventForm.location.value,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create event");
        }
        render();
    }catch (error) {
        console.error(error);
    }
}

async function deleteEvent(id) {

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete event");
        }
        render();
    }catch (error) {
        console.error(error);
    }
}