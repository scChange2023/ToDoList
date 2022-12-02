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
        createChildElement("button", nav, "navButton", "Today", "today")
        createChildElement("button", nav, "navButton", "Week", "week")
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


//Object Array
let orderGroceries = new CreateObject("Order Groceries", "2022-12-02", "high")

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
        // body.innerHTML = ""
        itemList.innerHTML = ""
        
        //Loop through Object Array to display Objects
        for (let i = 0; i < objectArray.length; i++) {
            createChildElement("button", itemList, "item", undefined, `${objectArray[i].title}`)
            this.createItem(document.getElementById(`${objectArray[i].title}`),`${objectArray[i].title}`, `${objectArray[i].date}`)
            
        }
        
        //If Add Button does not exist and submission form is not appearing- recreate add button
        if (!document.querySelector(".addNewItem") && !document.querySelector(".titleDiv")) {
            //Create Button
            createChildElement("button", body, "addNewItem", "+ Add Task")
            this.newSubmission()
        }
        
        //Button Listeners
        buttonLogic.deleteItem()
        buttonLogic.todaylist()
        buttonLogic.inboxList()
        
    },
    
    newSubmission() {
        let addButton = document.querySelector(".addNewItem")
        addButton.addEventListener("click", () => {
            // addButton.style.visibility = "collapse"
            addButton.parentNode.removeChild(addButton);
            //Event Listeners
            this.createInput()
            
        })
    },
    
    createInput() {
        let body = document.querySelector('.content')
        let submissionDiv = document.createElement("div")
        submissionDiv.classList.add("submissionDiv")
        body.appendChild(submissionDiv)
        
        
        //Title Div
        let titleDiv = document.createElement("div")
        titleDiv.classList.add("titleDiv")
        submissionDiv.appendChild(titleDiv)
        //Create Label
        
        let nameLabel = document.createElement("Label")
        nameLabel.innerHTML = "Title:"
        nameLabel.classList.add("label")
        titleDiv.appendChild(nameLabel)
        //Create Input
        let nameInput = document.createElement("INPUT");
        nameInput.setAttribute("type", "text");
        nameInput.classList.add("input")
        nameInput.setAttribute('required', '')
        titleDiv.appendChild(nameInput)
        
        
        //Date Div
        let dateDiv = document.createElement("div")
        dateDiv.classList.add("dateDiv")
        submissionDiv.appendChild(dateDiv)
        //Create Label
        
        let dateLabel = document.createElement("Label")
        dateLabel.innerHTML = "Date:"
        dateLabel.classList.add("label")
        dateDiv.appendChild(dateLabel)
        //Create Input
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
        
        // document.querySelector(".addButton").setAttribute("type", "submit")
        createChildElement("button", buttonDiv, "cancelButton", "Cancel")
        
        //Event Listeners for submission buttons
        this.addItem()
        this.cancelSubmission()
    },
    
    addItem() {
        let addButton = document.querySelector(".addButton")
        addButton.addEventListener("click", () => {
            

            //If input fileds are present
            if ((document.querySelector(".input").value) && (document.querySelector(".dateInput").value)) {
                let newItem = new CreateObject(document.querySelector(".input").value, document.querySelector(".dateInput").value)
                objectArray.push(newItem)
                console.log(objectArray)
                
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
        // this.newSubmission()
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
                
                console.log(indexOfObject)
                objectArray.splice(indexOfObject,1)
                console.log(objectArray)
                
                listLogic.displayList()
            });
        });
    },
    
    updateDate() {
        let dates = document.querySelectorAll('.date');
        
        dates.forEach(function (e) {
            e.addEventListener('change', function() {
                //Object Title/ID
                let item = e.parentNode.id
                
                
                let indexOfObject = objectArray.findIndex(object => {
                    return object.title == item;
                })
                
                
                console.log(item)
                console.log(e.parentNode)
                
                
                ////Update Object
                
                console.log(indexOfObject)
                objectArray[indexOfObject].date = document.querySelector(`.date`).value
                
                let date = objectArray[indexOfObject].date
                console.log(date)
                
                
                console.log(objectArray)
                
                listLogic.displayList()
            });
        })
    },

    todaylist() {
        let today = document.getElementById("today")
        let bodyHeader = document.querySelector(".bodyHeader")
        let itemList = document.querySelector(".itemList")

        let dateToday = dateConvertor(new Date())

        today.addEventListener("click", () => {

            //Update Content
            bodyHeader.textContent = today.textContent
            itemList.innerHTML = ""

            if (document.querySelector(".addNewItem")) {
                document.querySelector(".addNewItem").parentNode.removeChild(document.querySelector(".addNewItem"))
            }    
            if (document.querySelector(".submissionDiv")) {
                document.querySelector(".submissionDiv").parentNode.removeChild(document.querySelector(".submissionDiv"))
            }   


            
            let filteredArray = objectArray.filter(obj => {
                return obj.date === dateToday
            })
            console.log(dateToday)
            console.log(filteredArray)
            //Filter Through Object Array
            for (let i = 0; i < filteredArray.length; i++) {

                    createChildElement("button", itemList, "item", undefined, `${[i]}`)
                    listLogic.createItem(document.getElementById(`${[i]}`),`${filteredArray[i].title}`, `${filteredArray[i].date}`)
                
            }
            buttonLogic.deleteItem()
        })
    },

    inboxList() {
        let inbox = document.getElementById("inbox")
        let bodyHeader = document.querySelector(".bodyHeader")
    
        inbox.addEventListener("click", () => {

            bodyHeader.textContent = inbox.textContent
            console.log("Hello")
            listLogic.displayList()
        })
    }
}

function dateConvertor(dateEntry) {

    let month =  (dateEntry.getMonth() + 1).toString().padStart(2, "0")
    let day = dateEntry.getDate().toString().padStart(2, "0"); 
    let year = dateEntry.getFullYear()
    
    let newDate = `${year}-${month}-${day}`
    console.log(newDate)

    return newDate

}
// let today = dateConvertor(new Date())
// console.log(today)
// dateConvertor(today)

//ToDo List Logic
listLogic.loadLayout()
listLogic.displayList()

//Button Listeners
// buttonLogic.deleteItem()











///






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