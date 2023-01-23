// import { ToDoList } from "./ToDoList";
var allToDoLists = [];
//#region The User Interface /// SACRED!!! ////
console.log('');
console.log('%cWelcome to TL6 To Do List.', 'background-color: yellow; color: green;');
console.log('%cGet it? T6.... Task 6... Todo List...', 'background-color: yellow; color: green;');
console.log('');
console.log('%cMoving on... Our app is very easy to use. There are some commands you can use to navigate the app. You can view a list of these commands by typing "info" or just go ahead and type a list item so a quick list will be created for you.', 'background-color: yellow; color: green;');
console.log('');

createDummyData('dummy1')
createDummyData('testList')
createDummyData('genesys')
createDummyData('learnable')
createDummyData('wahala')
createDummyData('task 7')
console.log()
for (var running = 1; running >= 1; running++) {

    // const prompt = require('prompt-sync')();
    var command = prompt("Enter Command: ");

    switch (command) {
        case 'close':
            running = -1;
            console.log('>>>>> Shutting down...');
            console.log('');
            break;
        case 'info':
            console.log("info:             View all commands and what they do");
            console.log('show-all-lists:   Display all lists created by you');
            console.log('show-list-items:  List all items inside a particular list');
            console.log('create-list:      Create a new todolist');
            console.log('new-list-item:    Add a list item to an open todo list');
            console.log('open-list:        Open a specified list and show all its items');
            console.log('update-list:      Edit a todo lists name or description');
            console.log('delete-list:      Delete a specified todo list and all its items');
            console.log('delete-list-item: Remove a list item from a todo list');
            console.log('clear-list:       Clear all list items from a list');
            console.log('close:            Close app.');
            console.log('');
            break;
        case 'show-all-lists':
            if (!allToDoLists) {
                console.log('No Todo List Created Yet.')
                console.log()
            } else {
                showAllLists()
            }
            //   
            break;
        case 'show-list-items':
            if (!ToDoList.openListName) {
                console.log('No List is open. Open a list first.')
                console.log()
            } else {
                let openListId = findList(ToDoList.openListName);
                if (openListId >= 0) {
                    showListItems(!ToDoList.openListName)
                } else {
                    console.log('Open List not found')
                }
            }
            console.log()
            //   
            break;
        case 'create-list':
            var toDoListTitle = prompt('Enter Title For Todo List: ')
            var toDoListDescription = prompt('Enter Description (Optional): ')
            newToDoList = new ToDoList(toDoListTitle, toDoListDescription)
            allToDoLists.push(newToDoList)
            console.log(toDoListTitle + ' Created.')
            console.log('')
            break;
        case 'new-list-item':
            if (!ToDoList.openListName) {
                console.log('No List is open. Open a list first.')
                console.log()
            } else {
                let listItemName = prompt('Enter title for list item');
                let openListId = findList(ToDoList.openListName);
                if (openListId) {
                    let todoList = allToDoLists[openListId];
                    todoList.addNewListItem(listItemName);
                }
                console.log('New list item created for ' + ToDoList.openListName)
                console.log()
            }
            break;
        case 'open-list':
            var toDoListTitle = prompt('Enter Title For Todo List: ')
            listId = findList(toDoListTitle)
            if (listId < 0) {
                console.log('List not found. Ensure the list exists by entering show-all-lists')
                console.log()
            } else {
                let todoList = allToDoLists[listId]
                ToDoList.openListName = todoList.getName()
                console.log(todoList.getName() + ' opened.')
                let toDoListItems = todoList.getListItems()
                for (let i = 0; i < toDoListItems.length; i++) {
                    let todoListItem = toDoListItems[i];
                    console.log('[' + i + '] ' + todoListItem['name']);
                }
                console.log()
            }
            break;
        case 'update-list':
            if (!ToDoList.openListName) {
                console.log('No List is open. Open a list first.')
                console.log()
            } else {
                let openListId = findList(ToDoList.openListName);
                var choice = prompt('Type 1 to update name or anyother value to update description.')
                if (choice == "1") {
                    let newListName = prompt('Enter new title for list');
                    allToDoLists[openListId].updateName(newListName)
                    console.log('List updated successfully')
                    console.log()
                } else {
                    let newListDescription = prompt('Enter new description for list');
                    allToDoLists[openListId].updateDescription(newListDescription)
                    console.log('List updated successfully')
                    console.log()
                }
            }
            break;
        case 'delete-list':
            if (!ToDoList.openListName) {
                console.log('No List is open. Open a list first.')
                console.log()
            } else {
                var choice = prompt('Are you sure you want to delete this list. Select Y or N.');
                if (choice == "y" || choice == 'Y') {
                    deleteList(ToDoList.openListName)
                } else {
                }
                console.log()
            }
            break;
        case 'delete-list-item':
            if (!ToDoList.openListName) {
                console.log('No List is open. Open a list first.')
                console.log()
            } else {
                var listId = findList(ToDoList.openListName)
                if (listId < 0) {
                    console.log('List not found')
                    console.log()
                } else {
                    let listItemName = prompt('Enter list item name: ')
                    var choice = prompt('Are you sure you want to delete this list item? Select Y or N.');
                    if (choice == "y" || choice == 'Y') {
                        allToDoLists[listId].removeListItem(listItemName)
                    } else {
                    }
                }

            }
            break;
        case 'clear-list':
            prompt('Are you sure you want to Clear/Reset the app. Select Y or N.');
            if (choice == "y" || choice == 'Y') {
                allToDoLists = [];
                console.log('All to-do lists cleared')
                console.log()
            }
            break;
        default:
            console.log('>>>>> Command not recognized.');
            console.log('');
            break;
    }
}
//#endregion

function showAllLists() {
    for (let i = 0; i < allToDoLists.length; i++) {
        let todoList = allToDoLists[i];
        console.log('[' + (i + 1) + '] ' + todoList.getName() + ': ' + todoList.getDescription());
    }
    console.log('')
}

function showListItems() {
    var listId = findList(ToDoList.openListName)
    if (listId < 0) {
        console.log('List not found')
    } else {
        var todoListItems = allToDoLists[listId].getListItems();
        if (todoListItems.length < 1) {
            console.log('No list items created for' + allToDoLists[listId].getName())
        } else {
            for (let i = 0; i < todoListItems.length; i++) {
                console.log('[' + i + ']' + todoListItems[i]);
            }
        }
        console.log()
    }

}

function findList(value) {
    var id = allToDoLists.findIndex(function (e) {
        return e.getName() == value;
    })
    // console.log(allToDoLists[id])
    // console.log(id)
    return id;
}

function deleteList(listName) {
    var id = findList(listName, allToDoLists);
    // console.log(id)

    //This is an inbuilt function for deleting values in objects but it doesnt quite reset the index of the array or delete the column entirely. The place is left as undefined. Thats why the rest of the code below was created.
    // delete allToDoLists[id];  ----->>>>>>>>>

    newArray = [];
    if (id >= 0) {
        for (var i = 0; i < allToDoLists.length; i++) {
            if (i != id) {
                // console.log('item shifted');
                newArray.push(allToDoLists[i]);
            }
        }
        console.log(`%c${listName} Deleted Successfully`, 'color:green;');
        ToDoList.openListName = false
        allToDoLists = newArray;
        console.log('');
    } else {
        console.log(`%c${columnForGettingId} not found in array`, 'color:red;');
        console.log('')
    }


}

function createDummyData(toDoListTitle) {
    var toDoListDescription = 'dummy description'
    newToDoList = new ToDoList(toDoListTitle, toDoListDescription)
    allToDoLists.push(newToDoList)
    console.log(toDoListTitle + ' to-do list Created.')
}
