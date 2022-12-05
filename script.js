"use strict"

//DOM Related

function createParentElement(type, parent, cls, text) {
    let element = document.createElement(type)
    element.textContent = text
    element.classList.add(cls)
    parent.appendChild(element)

    return element
}


function createChildElement(type, parent, cls, text, id) {
    let element = document.createElement(type)
    element.textContent = text
    element.classList.add(cls)
    element.setAttribute("id", id)
    parent.appendChild(element)
}


let createLayout = (()=> {

    //Header
    let createHeader = () =>    {
        let header = document.createElement("div")
        header.classList.add("header")
        header.textContent = "To Do List"

        return header
    }
    //MAin
    let createMain = () => {
        let main = document.createElement("div")
        main.classList.add("main")

        return main
    }

    let createNav = () => {
        let main = document.querySelector(".main")
        
        //Create Nav
        createParentElement("div",main, "nav", undefined)

        //Assing Nav to Varaible
        let nav = document.querySelector(".nav")

        //Create Nav Display
        createChildElement("button", nav, "navButton", "Inbox", "inbox")
        createChildElement("button", nav, "navButton", "Past Due", "pastDue")
        createChildElement("button", nav, "navButton", "Today", "today")
        createChildElement("button", nav, "navButton", "Month", "month")
        createChildElement("h2", nav, "projects", "Projects", "projects")
        createChildElement("button", nav, "navButton", "+ Add Project", "addProject")

        return main
    }
    
    let createBody = () => {
        let main = document.querySelector(".main")
    
        createChildElement("h2",createParentElement("div", main, "content"), "bodyHeader", "Inbox")

        createChildElement("div", document.querySelector(".content"), "itemList")

        return main
    }

    let createFooter = () => {

        let footer = document.createElement("div")
        footer.classList.add("footer")
        footer.textContent = "scChange2023 Ⓒ 2022"

        return footer
    }

    return {createHeader, createMain, createNav, createBody, createFooter}

})()


//Object Constructor
function CreateObject(title, date, priority) {
    this.title = title
    this.date = date
    this.priority = priority
}

//Constructor Example
let orderGroceries = new CreateObject("Order Groceries", "2022-12-02", "high")

//Object Array
let objectArray = [orderGroceries]


let listLogic = {
    //DOM
    loadLayout() {
        let body = document.querySelector('body')
        body.appendChild(createLayout.createHeader())
        body.appendChild(createLayout.createMain())
        body.appendChild(createLayout.createNav())
        body.appendChild(createLayout.createBody())
        body.appendChild(createLayout.createFooter())
    },
    
    createItem(parent, name, date) {
        
        let element = document.createElement("div")
        let dueDate = document.createElement("div")
        let cancel = document.createElement("button")
        
        
        element.textContent = name
        element.classList.add("name")
        
        dueDate.textContent = date
        dueDate.classList.add("date")
        
        cancel.textContent = "X"
        cancel.classList.add("deleteItemButton")
        
        parent.appendChild(element)
        parent.appendChild(dueDate)
        parent.appendChild(cancel)
        
        
    },
    
    displayList() {
        
        let body = document.querySelector('.content')
        let itemList = document.querySelector(".itemList")
        itemList.innerHTML = ""
        
        //Loop through Object Array to display Objects
        for (let i = 0; i < objectArray.length; i++) {
            createChildElement("button", itemList, "item", undefined, `${[i]}`)
            this.createItem(document.getElementById(`${[i]}`),`${objectArray[i].title}`, `${objectArray[i].date}`)
            
        }
        
        //If Add Button does not exist and submission form is not appearing- recreate add button
        if (!document.querySelector(".addNewItem") && !document.querySelector(".titleDiv")) {
            //Create Button
            createChildElement("button", body, "addNewItem", "+ Add Task")
            this.newSubmission()
        }
        
        console.log(objectArray)
        //Button Listeners
        buttonLogic.deleteItem()
        buttonLogic.todaylist()
        buttonLogic.inboxList()
        buttonLogic.pastDueList()
        buttonLogic.monthList()
        buttonLogic.newProject()
        
    },
    
    newSubmission() {
        let addButton = document.querySelector(".addNewItem")
        addButton.addEventListener("click", () => {
        
            addButton.parentNode.removeChild(addButton);
            //Event Listeners
            this.createInput()
            
        })
    },
    
    createInput() {
        //Submission Div
        let body = document.querySelector('.content')
        createChildElement("div", body, "submissionDiv")
        
        //Title Div
        let submissionDiv = document.querySelector(".submissionDiv")

        createChildElement("div", submissionDiv, "titleDiv")
       
        //Create Label
        createParentElement("Label", document.querySelector(".titleDiv"), "label").innerHTML = "Title:"
      
        //Create Input
        let nameInput = document.createElement("INPUT");
        nameInput.setAttribute("type", "text");
        nameInput.classList.add("input")
        nameInput.setAttribute('required', '')
        document.querySelector(".titleDiv").appendChild(nameInput)
        
        
        //Date Div
        createChildElement("div", submissionDiv, "dateDiv")
       
        
        let dateDiv = document.querySelector(".dateDiv")
        createChildElement("label", dateDiv, "label")
       

       
        let dateInput = document.createElement("INPUT")
        dateInput.setAttribute("type", "date");
        dateInput.classList.add("dateInput")
        dateInput.setAttribute('required', '')
        dateDiv.appendChild(dateInput)
        
        //Create Button Div and buttons
        createChildElement("div", body, "buttonDiv", undefined)
        let buttonDiv = document.querySelector(".buttonDiv")
        submissionDiv.appendChild(buttonDiv)
        createChildElement("button", buttonDiv, "addButton", "Add")
      
        createChildElement("button", buttonDiv, "cancelButton", "Cancel")
        
        //Event Listeners for submission buttons
        this.addItem()
        this.cancelSubmission()
    },
    
    addItem() {
        let addButton = document.querySelector(".addButton")
        addButton.addEventListener("click", () => {


            // for (let i = 0; i < objectArray.length; i++) {
            //     let title = objectArray[i].title
            //     if (document.querySelector(".input").value == title) {
            //         alert("Title can not be duplicated.") 
            //         break;
            //     }    
            // }
            //If input fileds are present
             if ((document.querySelector(".input").value) && (document.querySelector(".dateInput").value)) {

                let newItem = new CreateObject(document.querySelector(".input").value, document.querySelector(".dateInput").value)
                objectArray.push(newItem)
                this.removeSubmit()
             } else alert("Title and Date fields are required.")
            
        })
    },
    
    cancelSubmission() {
        let cancelButton = document.querySelector(".cancelButton")
        
        cancelButton.addEventListener("click", ()=> {
            let submissionDiv = document.querySelector(".submissionDiv")
            submissionDiv.parentNode.removeChild(submissionDiv);
            this.displayList()
            
        })
    },
    
    removeSubmit() {
        let submissionDiv = document.querySelector(".submissionDiv")    
        submissionDiv.parentNode.removeChild(submissionDiv);
        this.displayList()

    },

    updateList() {
        let itemList = document.querySelector(".itemList")
        itemList.innerHTML = ""

            if (document.querySelector(".addNewItem")) {
                document.querySelector(".addNewItem").parentNode.removeChild(document.querySelector(".addNewItem"))
            }    
            if (document.querySelector(".submissionDiv")) {
                document.querySelector(".submissionDiv").parentNode.removeChild(document.querySelector(".submissionDiv"))
            }   

    }
}



let buttonLogic = {
    
    deleteItem() {
        let btns = document.querySelectorAll('.deleteItemButton');
        
        btns.forEach(function (i) {
            i.addEventListener('click', function() {
                let index = i.parentNode.id
                
                let indexOfObject = objectArray.findIndex(object => {
                    return object.title == index;
                })   
                objectArray.splice(indexOfObject,1) 
                listLogic.displayList()
            });
        });
    },
    
    inboxList() {
        let inbox = document.getElementById("inbox")
    
        inbox.addEventListener("click", () => {
            document.querySelector(".bodyHeader").textContent = inbox.textContent
            listLogic.displayList()
        })
    },

    todaylist() {
        let itemList = document.querySelector(".itemList")
        let dateToday = dateConvertor(new Date())
    
        today.addEventListener("click", () => {
                    
            listLogic.updateList()   
            document.querySelector(".bodyHeader").textContent = document.getElementById("today").textContent
            
            let filteredArray = objectArray.filter(obj => {
                return obj.date <= dateToday 
            })
  
            for (let i = 0; i < filteredArray.length; i++) {
                    createChildElement("button", itemList, "item", undefined, `${[i]}`)
                    listLogic.createItem(document.getElementById(`${[i]}`),`${filteredArray[i].title}`, `${filteredArray[i].date}`)
            }
            buttonLogic.deleteItem()
        })
    },


    pastDueList() {
        let pastDue = document.getElementById("pastDue")
        let itemList = document.querySelector(".itemList")
        let bodyHeader = document.querySelector(".bodyHeader")
        let dateToday = dateConvertor(new Date())

        pastDue.addEventListener("click", () => {

            bodyHeader.textContent = pastDue.textContent

            listLogic.updateList()
            let filteredArray = objectArray.filter(obj => {
                return obj.date < dateToday
            })
            for (let i = 0; i < filteredArray.length; i++) {
                    createChildElement("button", itemList, "item", undefined, `${[i]}`)
                    listLogic.createItem(document.getElementById(`${[i]}`),`${filteredArray[i].title}`, `${filteredArray[i].date}`)         
            }
            buttonLogic.deleteItem()

        })

    },
    monthList() {
        let month = document.getElementById("month")
        let itemList = document.querySelector(".itemList")
        let bodyHeader = document.querySelector(".bodyHeader")
        let dateToday = dateConvertor(new Date())

        month.addEventListener("click", () => {

            bodyHeader.textContent = month.textContent
            listLogic.updateList()

            let filteredArray = []

           for (let i = 0; i < objectArray.length; i++) {
                let monthYear = monthYearSTR(objectArray[i].date)
                if (monthYear == monthYearSTR(dateToday)) {
                    filteredArray.push(objectArray[i])
                }  
           }
            for (let i = 0; i < filteredArray.length; i++) {
                    createChildElement("button", itemList, "item", undefined, `${[i]}`)
                    listLogic.createItem(document.getElementById(`${[i]}`),`${filteredArray[i].title}`, `${filteredArray[i].date}`)
            }
            buttonLogic.deleteItem()
        })
    },
    newProject() {
        let project = document.getElementById("addProject")
        let nav = document.querySelector(".nav")

        project.addEventListener("click", () => {
            createChildElement("button",nav, ".navButton")

        })
    }
}

let projectArray = []

function dateConvertor(dateEntry) {
    let month =  (dateEntry.getMonth() + 1).toString().padStart(2, "0")
    let day = dateEntry.getDate().toString().padStart(2, "0"); 
    let year = dateEntry.getFullYear()
    let newDate = `${year}-${month}-${day}`

    return newDate

}

function monthYearSTR(str) {
    let array = str.split("")
    array.splice(4, 1)
    array.splice(6, 3)
    return array.join("")
}


//ToDo List Logic
listLogic.loadLayout()
listLogic.displayList()



















//Create Todos dynamically
    //Title, Due Date Description, Priority

//Todos entered against default

//Create Projects to re-assign ToDos


//Seperate DOM and ToDo Logic


// Application
    // view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
    // expand a single todo to see/edit its details
    // delete a todo

//Save Locally
    // Set up a function that saves the projects (and todos) to localStorage every time a new project \
    // (or todo) is created, and another function that looks for that data in localStorage when your app is first loaded. 


    // Keep in mind you cannot store functions in JSON, so you’ll have to figure out how to add methods\
    //  back to your object properties once you fetch them. Good luck!