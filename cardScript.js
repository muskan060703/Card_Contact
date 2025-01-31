import { TASK_DUMMY_DATA } from "./taskData.js"
import { CONTACT_DUMMY_DATA } from "./ContactData.js"

let relation_array = [];

let contact_id_array = CONTACT_DUMMY_DATA.map((contactId) => contactId);
let id_length = contact_id_array.length;

let assigneedId_array = TASK_DUMMY_DATA.map((assigneedId) => assigneedId);

//adding items to relation array 
// for (let i = 0; i < id_length; i++) {
//     let obj = {
//         type: "in_same_route",
//         fullname: getFullName(contact_id_array[i]?.contactId),
//         city: getCity(contact_id_array[i]?.contactId),
//         steps: getIds(contact_id_array[i]?.contactId),
//         vehicle: contact_id_array[i]?.contactId
//     }
//     relation_array.push(obj);
// }

relation_array = contact_id_array.map(({ contactId }) => {
    return {
        type: "in_same_route",
        fullname: getFullName(contactId),
        city: getCity(contactId),
        steps: getIds(contactId),
        vehicle: contactId
    }
})


//get Task ids ---> USE MAP() METHOD
function getIds(contact_id) {
    let steps_array = [];
    TASK_DUMMY_DATA.forEach((element) => {

        if (element.assigneedId == contact_id) {
            let obj = {
                type: "job",
                id: element.observationTaskId
            }
            steps_array.push(obj);
        }
    })
    return steps_array;
}


//getFullName ---> USE FIND() METHOD
function getFullName(id) {

    // let value = CONTACT_DUMMY_DATA.filter((element) => (id == element.contactId) )
    // .map((data) => { return data.firstName + " " + data.lastName });
    // return value;
    let value = CONTACT_DUMMY_DATA.find((element) => (id == element.contactId));
    return value ? value.firstName + " " + value.lastName : null;
}


//getCity ---> USE FIND() METHOD
function getCity(id) {
    // let value = CONTACT_DUMMY_DATA.filter((element) => {
    //     if (id == element.contactId) {
    //         const name = element.firstName + " " + element.lastName;
    //         return name;

    //     }
    // }).map((data) => { return data.city });

    let value = CONTACT_DUMMY_DATA.find((element) => (id == element.contactId));
    return value.city;
}




//creating cards 
const container = document.getElementById('card-container');

relation_array.forEach((element) => createCard(element))

function createCard(element) {
    let card = document.createElement('div');   //card container
    card.id = element.vehicle;
    card.style.width = "400px";
    card.style.height = "130px";
    card.style.background = "green";
    card.style.margin = "90px 10px";
    //card.style.display = "flex";
    //card.style.flexDirection = "column";


    //head 
    let head = document.createElement('div');
    head.id = element.vehicle;

    card.appendChild(head);
    head.style.position = "relative";
    head.style.width = "100%";
    head.style.height = "130px";
    head.style.background = "pink";
    head.style.textAlign = "center";

    //contact-id
    createHeadingLabel("Contact-id:", true);
    createLabel(element.vehicle, true);

    //full-name 
    createHeadingLabel("Full Name : ", true);
    createLabel(element.fullname, true);

    //city 
    createHeadingLabel("City : ", true);
    createLabel(element.city, true);


    //hidden-div 
    let info = document.createElement('div');
    info.id = `${element.vehicle}hidden`;
    card.appendChild(info);
    info.style.position = "relative";
    info.style.width = "100%";
    info.style.height = "0px";
    info.style.background = "plum";
    info.style.bottom = "0";

    //create heading 
    function createHeadingLabel(data, ishead) {
        let label = document.createElement('label');
        label.innerText = data;
        label.style.font = "sans-serif";
        label.style.fontSize = "25px";
        label.style.margin = "5px";
        label.style.width = "30%";
        label.style.alignItems = "center";
        if (ishead)
            head.appendChild(label);
        else
            info.appendChild(label);
    }
    //create data 
    function createLabel(data, ishead) {
        let label = document.createElement('label');
        label.innerHTML = `${data} <br>`;
        label.style.font = "sans-serif";
        label.style.fontSize = "25px";
        label.style.margin = "5px";
        label.style.width = "70%";
        label.style.alignItems = "center";
        if (ishead)
            head.appendChild(label);
        else
            info.appendChild(label);
    }

    //button
    let viewBtn = document.createElement("button");
    viewBtn.innerText = "View More";
    viewBtn.style.padding = "10px";
    viewBtn.style.border = "2px";
    viewBtn.style.borderRadius = "30px";
    viewBtn.style.font = "sans-serif";
    viewBtn.style.background = "black";
    viewBtn.style.color = "white";
    viewBtn.id = element.vehicle;
    viewBtn.style.cursor = "pointer";
    head.appendChild(viewBtn);

    container.appendChild(card);
}

let btn_clicked = true;
let section_clicked = true;

container.addEventListener('click', (event) => {
    const isButtonElement = event.target.tagName == 'BUTTON'
    const isSectionElement = event.target.tagName == "SECTION"
    let { id } = event.target;

    if (isButtonElement && !btn_clicked) {
        btn_clicked = true;

        const card_div = document.getElementById(id);
        const btn = card_div.querySelector("button");
        btn.innerText = "View More";

        let container = document.getElementById(`${id}hidden`);
        container.style.height = "0px";
        container.style.transition = "height 1s ease-in-out";
        container.style.scrollBehavior = "smooth";
    }

    else if (isButtonElement) {
        btn_clicked = false;
        //change text 
        const card_div = document.getElementById(id);
        const btn = card_div.querySelector("button");
        btn.innerText = "View Less";

        const taskDetails = relation_array
            .filter((element) => id == element.vehicle)
            .map((data) => data.steps);
        let container = document.getElementById(`${id}hidden`);
        container.style.height = "145px";
        container.style.transition = "height 1s ease-in-out";
        container.style.scrollBehavior = "smooth";
        container.style.overflow = "hidden";
        container.style.overflowY = "Scroll";

        taskDetails.map((array) => {
            array.map((element) => {

                let section = document.createElement("section");
                section.id = element.id;
                // section.style.display = "flex";
                // section.style.alignItems = "start";
                createHeadingLabel([element.type]);
                createLabel(element.id);
                section.style.border = "2px solid black";
                section.style.borderRadius = "10px";
                section.style.margin = "3px";


                function createHeadingLabel(data) {
                    let label = document.createElement('label');
                    label.innerText = `${data} : `;
                    label.style.font = "sans-serif";
                    label.style.fontSize = "25px";
                    label.style.margin = "5px";
                    label.style.width = "30%";
                    label.style.alignItems = "center";
                    section.appendChild(label);
                    //console.log("section");

                }


                function createLabel(data) {
                    let label = document.createElement('label');
                    label.innerHTML = `${data} <br>`;
                    label.style.font = "sans-serif";
                    label.style.fontSize = "25px";
                    label.style.margin = "5px";
                    label.style.width = "70%";
                    label.style.alignItems = "center";
                    section.appendChild(label);
                }
                container.appendChild(section);
            })
        });
    }

    if (isSectionElement && section_clicked ) {
        section_clicked = false;
        let values = TASK_DUMMY_DATA.filter(({observationTaskId}) => observationTaskId === parseInt(id));
        //console.log("isSectionElement", values);

        let display_data = values.map(({ observationTaskId, taskName, siteName, unitName }) => ({
            observationTaskId,
            taskName,
            siteName,
            unitName
        }));

        let display_keys = Object.keys(display_data[0]);
        let dispay_values = Object.values(display_data[0]);

        let display_length = dispay_values.length;

        for (let i = 0; i < display_length; i++) {
            let task_section = document.getElementById(id);
            //console.log(task_section);
            
            let task_div = document.createElement("div");
            task_div.id = "task-div";
            createHeadingLabel(display_keys[i]);
            createLabel(dispay_values[i]);

            function createHeadingLabel(data) {
                let label = document.createElement('label');
                label.innerText = `${data} : `;
                label.style.font = "sans-serif";
                label.style.fontSize = "25px";
                label.style.margin = "5px";
                label.style.width = "30%";
                label.style.alignItems = "center";
                task_div.appendChild(label);
            }
            function createLabel(data) {
                let label = document.createElement('label');
                label.innerHTML = `${data} <br>`;
                label.style.font = "sans-serif";
                label.style.fontSize = "25px";
                label.style.margin = "5px";
                label.style.width = "70%";
                label.style.alignItems = "center";
                task_div.appendChild(label);
                
            }
            task_section.appendChild(task_div);
            //task_section.style.pointerEvents = "none";
            task_section.style.ariaDisabled = "true";
        }
    }
    else if(!section_clicked && isSectionElement) {
        section_clicked = false;
    }
    else if(!section_clicked) {
        section_clicked = true;
        let task_section = document.getElementById(id);
    
        // Select and remove only dynamically added elements (those with `id="task-div"`)
        let addedElements = task_section.querySelectorAll("#task-div");
        addedElements.forEach(element => element.remove());
    
        // Re-enable interactions
        task_section.style.pointerEvents = "auto";
        task_section.style.ariaDisabled = "false";
        
            
        // task_section.style.pointerEvents = "auto";
        // task_section.style.height = "30px";
        // task_section.style.transition = "height 1s ease-in-out"
        //task_section.replaceChildren("");
    }

})
