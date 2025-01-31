import { TASK_DUMMY_DATA } from "./taskData.js"
import {CONTACT_DUMMY_DATA} from "./ContactData.js"


//btn 
const addressBtn = document.getElementById("Address");
const taskBtn = document.getElementById('Task');
addressBtn.addEventListener('click',getData.bind(null,true));
taskBtn.addEventListener('click',getData.bind(null,false));

function getData(value)
{

    
    //document.getElementById('data-table').remove();
    document.getElementById("data").replaceChildren();
    const data_container = document.getElementById("data");
    const table = document.createElement("table");
    table.id = "data-table";
    table.style.border = "2px solid black";
    table.rules = "all";
    data_container.append(table);
    

    if(value)
    {
    let keys = Object.keys(TASK_DUMMY_DATA[0]);
    let row = document.createElement("tr");
    let cell = document.createElement("th");
    cell.innerText = "checkbox";
    row.appendChild(cell);

    for(let i = 0; i < 18; i++)
        {
            let cell = document.createElement("th");
            cell.innerText = keys[i];
            row.appendChild(cell);
        }
        table.appendChild(row);

        TASK_DUMMY_DATA.forEach((element)=>{
            row = document.createElement("tr");
            let length = Object.keys(element).length;
            let values = Object.values(element);
            createCheckBox(element.assigneedId);
            for(let i = 0; i < length; i++)     createCell(values[i]);
            table.append(row);
            function createCell(data) {
                let cell = document.createElement("td");
                cell.innerText = data;
                row.appendChild(cell);
            }
                function createCheckBox(id)
                {
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.id = id;
                    checkbox.checked = true; 
                    let cell = document.createElement("td");
                    cell.appendChild(checkbox);
                    row.appendChild(cell);
                }
        })

    }


    else
    {
//console.log("false");
    let id_set = new Set(TASK_DUMMY_DATA.map(({assigneedId}) => assigneedId ));
    let keys = Object.keys(CONTACT_DUMMY_DATA[0]);
    let row = document.createElement("tr");
    let cell = document.createElement("th");
    cell.innerText = "checkbox";
    row.appendChild(cell);

    for(let i = 0; i < 12; i++)
        {
            let cell = document.createElement("th");
            cell.innerText = keys[i];
            row.appendChild(cell);
        }
        table.appendChild(row);

        CONTACT_DUMMY_DATA.forEach((element)=>{
            row = document.createElement("tr");
            let length = Object.keys(element).length;
            let values = Object.values(element);
            createCheckBox(element.contactId);
            for(let i = 0; i < length; i++)     createCell(values[i]);
            table.append(row);
            

    
            function createCell(data) {
                let cell = document.createElement("td");
                cell.innerText = data;
                row.appendChild(cell);
                }

        function createCheckBox(element_id)
            {
                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                if(id_set.has(element_id))
                {   
                    checkbox.id = element_id;
                    checkbox.checked = true; 
                    checkbox.disabled = true;
                }
                else
                {
                    checkbox.checked = false;
                }
                let cell = document.createElement("td");
                cell.appendChild(checkbox);
                row.appendChild(cell);
            }
        })

    }
}



/*
relations : [
    {
        type : "in_same_route",
        steps : [
            {
                type : "job",
                id : taskId
            }
        ],
        vehicle : contactId
    },
    {
        type : "in_same_route",
        steps : [
            {
                type : "job",
                id : taskId
            }
        ],
        vehicle : contactId
    }
]
    */

let contact_id_array = CONTACT_DUMMY_DATA.map((contactId)=>{return contactId});
//console.log(contact_id_array);                                                                                                                                                                                                                                                

let relation_array = [];

let id_length = contact_id_array.length;

let assigneedId_array = TASK_DUMMY_DATA.map((assigneedId)=> assigneedId);
//console.log("assign :",assigneedId_array);
//console.log(assigneedId_array);


for(let i = 0; i < id_length; i++) {
    let obj = {
        type : "in_same_route",
        steps : getIds(contact_id_array[i]?.contactId),
        vehicle : contact_id_array[i]?.contactId
    }
    relation_array.push(obj);
}

console.log(relation_array);

function getIds(contact_id) 
{
    let steps_array = [];
    TASK_DUMMY_DATA.forEach((element)=>{

        if(element.assigneedId == contact_id)
        {
            let obj = {
                type : "job",
                id : element.observationTaskId
            }
            steps_array.push(obj);
        }

    })
        
    return steps_array;

}