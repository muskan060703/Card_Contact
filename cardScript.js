import { TASK_DUMMY_DATA } from "./taskData.js";
import { CONTACT_DUMMY_DATA } from "./ContactData.js";

let relation_array = CONTACT_DUMMY_DATA.map(({ contactId }) => {
    return {
        type: "in_same_route",
        fullname: getFullName(contactId),
        city: getCity(contactId),
        steps: getIds(contactId),
        vehicle: contactId
    };
});

function getIds(contact_id) {
    return TASK_DUMMY_DATA.filter(element => element.assigneedId == contact_id)
        .map(element => ({ type: "job", id: element.observationTaskId }));
}

function getFullName(id) {
    let value = CONTACT_DUMMY_DATA.find(element => id == element.contactId);
    return value ? `${value.firstName} ${value.lastName}` : null;
}

function getCity(id) {
    let value = CONTACT_DUMMY_DATA.find(element => id == element.contactId);
    return value ? value.city : null;
}

const container = document.getElementById('card-container');
relation_array.forEach(element => createCard(element));

function createCard(element) {
    let card = document.createElement('div');
    card.id = element.vehicle;
    card.className = "card";

    let head = document.createElement('div');
    head.className = "card-head";

    createLabel("Contact-id: ", element.vehicle, head);
    createLabel("Full Name: ", element.fullname, head);
    createLabel("City: ", element.city, head);

    let viewBtn = document.createElement("button");
    viewBtn.innerText = "View More";
    viewBtn.className = "view-btn";
    viewBtn.id = element.vehicle;
    head.appendChild(viewBtn);

    let info = document.createElement('div');
    info.id = `${element.vehicle}-hidden`;
    info.className = "hidden-section";

    card.appendChild(head);
    card.appendChild(info);
    container.appendChild(card);
}

function createLabel(title, data, parent) {
    let label = document.createElement('label');
    label.innerHTML = `<strong>${title}</strong> ${data} <br>`;
    parent.appendChild(label);
}

container.addEventListener('click', (event) => {
    const isButtonElement = event.target.tagName === 'BUTTON';
    const isSectionElement = event.target.tagName === "SECTION";
    let { id } = event.target;

    if (isButtonElement) {
        let hiddenSection = document.getElementById(`${id}-hidden`);
        let cardDiv = document.getElementById(id);
        let btn = cardDiv.querySelector(".view-btn");
        
        if (hiddenSection.style.height === "145px") {
            hiddenSection.style.height = "0px";
            btn.innerText = "View More";
            hiddenSection.innerHTML = "";
        } else {
            btn.innerText = "View Less";
            hiddenSection.style.height = "145px";
            
            relation_array.filter(element => id === element.vehicle)
                .forEach(data => {
                    data.steps.forEach(element => {
                        let section = document.createElement("section");
                        section.id = element.id;
                        section.className = "task-section";

                        createLabel("Type: ", element.type, section);
                        createLabel("ID: ", element.id, section);
                        hiddenSection.appendChild(section);
                    });
                });
        }
    }

    if (isSectionElement) {
        let taskSection = document.getElementById(id);
        let existingTaskDiv = taskSection.querySelector(".task-div");
        
        if (existingTaskDiv) {
            existingTaskDiv.remove();
        } else {
            let taskDetails = TASK_DUMMY_DATA.find(({ observationTaskId }) => observationTaskId === parseInt(id));
            if (taskDetails) {
                let taskDiv = document.createElement("div");
                taskDiv.className = "task-div";
                
                Object.entries(taskDetails).forEach(([key, value]) => {
                    createLabel(`${key}: `, value, taskDiv);
                });
                
                taskSection.appendChild(taskDiv);
            }
        }
    }
});
