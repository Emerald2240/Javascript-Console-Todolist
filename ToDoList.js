class ToDoList {
    #name
    #description
    #listItems = [];
    static openListName = false;
    constructor(name, description = '') {
        this.#name = name
        this.#description = description
        this.openListName = this.#name
    }

    staticaddNewListItem(title) {
        this.#listItems.push(title);
        return true;
    }

    getName() {
        return this.#name
    }

    getDescription() {
        return this.#description
    }

    getListItems() {
        return this.#listItems
    }

    getOpenList() {
        return this.openListName;
    }

    updateName(newName) {
        this.#name = newName
        return true
    }

    updateDescription(newDescription) {
        this.#description = newDescription
        return true
    }

    addNewListItem(name) {
        this.#listItems.push(name);
    }

    removeListItem(name) {
        var id = this.#findListItem(name)
        newArray = [];
        if (id >= 0) {
            for (var i = 0; i < this.#listItems.length; i++) {
                if (i != id) {
                    // console.log('item shifted');
                    newArray.push(this.#listItems[i]);
                }
            }
            console.log(`%c${name} successfully deleted from ${this.#name} to-do list`, 'color:green;');
            console.log()
        } else {
            console.log(`%c${name} not found in ${this.#name} to-do list`, 'color:red;');
            console.log('');
        }
        this.#listItems = newArray
    }

    #findListItem(value) {
        var id = this.#listItems.findIndex(function (e) {
            return e == value;
        })
        // console.log(id)
        return id;
    }

}