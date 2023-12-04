const COHORT = "2310-fsa-et-web-pt-sf-b-john";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/`;

const state = {
    events: [],
};

const eventList = document.querySelector("#events")

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

