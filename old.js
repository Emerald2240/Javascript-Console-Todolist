var peopleArray = [];
var goodsArray = [];
var cartArray = []
var receipt = [];

// var firstName = "Michael";
// var lastName = "Orji";
// var email = "orjimichael4886@gmail.com";
// var password = "123";

var firstName = "";
var lastName = "";
var email = "";
var password = "";

var sessionFirstName = "";
var sessionLastName = "";
var sessionEmail = "";
var sessionWallet = 0;
var loggedIn = false;



//#region These are General Functions, regardless of array/affiliation

function getItemId(column, value, arrayToSearch) {
    var id = arrayToSearch.findIndex(function (e) {
        return e[column] == value;
    })
    //console.log(`The unique id for user with ${column}: ${peopleArray[id][column]} is ${id}`);
    //console.log('');

    return id;
}

function deleteItem(columnForGettingId, value, arrayToDeleteFrom) {
    var id = getItemId(columnForGettingId, value, arrayToDeleteFrom);
    // console.log(id)

    //This is an inbuilt function for deleting values in objects but it doesnt quite reset the index of the array or delete the column entirely. The place is left as undefined. Thats why the rest of the code below was created.
    // delete peopleArray[id];  ----->>>>>>>>>

    newArray = [];
    if (id >= 0) {
        for (var i = 0; i < arrayToDeleteFrom.length; i++) {
            if (i != id) {
                // console.log('item shifted');
                newArray.push(arrayToDeleteFrom[i]);
            }
        }
    } else {
        console.log(`%c${columnForGettingId} not found in array`, 'color:red;');
        console.log('');
    }

    console.log(`%c${value} Deleted Successfully`, 'color:green;');
    console.log('');
    return newArray;
}
//#endregion

//#region This is the Persons/People Section

function createPerson(firstName, lastName, email, password) {
    var personObject =
    {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password,
        "wallet": 0,
        "receipts": []
    }
    if (doesUserEmailAlreadyExist(email)) {
        console.log('%cUser email already exists.', 'color:red;');
        console.log('');
        return false;
    } else {
        peopleArray.push(personObject);
        console.log(`%cUser: ${firstName} ${lastName}(${email}) created succesfully. Now login`, 'color:green; background-color:yellow; font-size:50px;');
        console.log('');
        return true;
    }
}

function addMoney(amount, email) {
    // var id = peopleArray['email'].indexOf(email);
    var id = getItemId('email', email, peopleArray);
    // console.log(id);
    if (id >= 0) {
        peopleArray[id]['wallet'] += parseInt(amount);

        console.log('Money successfully added to your T3Commerce account, ' + peopleArray[id].first_name)
        console.log('Your new balance is ' + peopleArray[id].wallet + ' Naira')
        console.log('');
    } else {
        console.log("User not found. Could'nt fund wallet");
        console.log('');
    }
}

function doesUserEmailAlreadyExist(email) {
    for (var i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i].email == email) {
            // console.log('item shifted');
            return true;
        }
    }
    return false;
}

function editPerson(column, newValue) {
    var id = getItemId('email', email, peopleArray);
    if (id >= 0) {
        peopleArray[id][column] = newValue;
    } else {
        console.log('%cUser not found. Unable to edit User', 'color:red;');
        console.log('');
    }

}

function deletePerson() {
    var id = getItemId('email', sessionEmail, peopleArray);
    // console.log(id)

    //This is an inbuilt function for deleting values in objects but it doesnt quite reset the index of the array or delete the column entirely. The place is left as undefined. Thats why the rest of the code below was created.
    // delete peopleArray[id];


    newPeopleArray = [];
    if (id >= 0) {
        for (var i = 0; i < peopleArray.length; i++) {
            if (i != id) {
                // console.log('item shifted');
                newPeopleArray.push(peopleArray[i]);
            }
        }
    } else {
        console.log('user not found. Unable to delete User');
        console.log('');
    }

    peopleArray = newPeopleArray;
    logOut();
    console.log('%cUser Account deleted successfully', 'color:green;')
    console.log('');
}

function login(email, password) {
    if (doesUserEmailAlreadyExist) {
        for (var i = 0; i < peopleArray.length; i++) {
            if (peopleArray[i]['email'] == email && peopleArray[i]['password'] == password) {

                sessionFirstName = peopleArray[i]['first_name'];
                sessionLastName = peopleArray[i]['last_name'];
                sessionEmail = peopleArray[i]['email'];

                var firstName = peopleArray[i]['first_name'];
                var lastName = peopleArray[i]['last_name'];
                var email = peopleArray[i]['email'];

                loggedIn = true;
                console.log('Successfully Logged In. Welcome ' + peopleArray[i]['first_name']);
                console.log('');
                return true;
            }
        }
        loggedIn = false;
        console.log('%cIncorrect password!', 'color:red;');
        console.log('');
        return false;
    } else {
        console.log('%cEmail doesnt exist. Register Instead', 'color:red;');
        console.log('');
        return false;
    }
}

function logOut() {
    loggedIn = false;
    var sessionFirstName = "";
    var sessionLastName = "";
    var sessionEmail = "";
}


//#region testing things

// createPerson(firstName, lastName, email + '1', password);
// createPerson(firstName, lastName, email, password);
// createPerson(firstName, lastName, email + '2', password);
// createPerson(firstName, lastName, email + '3', password);
// createPerson(firstName, lastName, email + '4', password);
// createPerson(firstName, lastName, email + '5', password);

// console.log(getItemId('email', 'orjimichael4886@gmail.com5', peopleArray));

// addMoney(1000);

// editPerson('email', 'admin@mail.com');

// deletePerson();

//#endregion

// console.log(peopleArray);

//#endregion

//#region This section is for Products/Goods

function createProduct(name, price, category) {
    var productObject =
    {
        "name": name,
        "category": category,
        "price": price,
    }
    if (doesProductAlreadyExist(name)) {
        console.log('%cProduct already exists.', 'color:red;');
        console.log('');
        return false;
    } else {
        goodsArray.push(productObject);
        // console.log(`Product: ${name} at ${price} Naira created succesfully`);
        // console.log('');
        return true;
    }
}

function doesProductAlreadyExist(name) {
    for (var i = 0; i < goodsArray.length; i++) {
        if (goodsArray[i].name == name) {
            // console.log('item shifted');
            return true;
        }
    }
    return false;
}

function loadAllGoods() {
    for (var i = 0; i < goodsArray.length; i++) {
        console.log(`ID[${i}] Name: ${goodsArray[i].name}   Price: ${goodsArray[i].price}   Category: ${goodsArray[i].category}`);
    }
    console.log('');
}

function loadAllGoodsPerCategory(category) {
    var count = 0;
    for (var i = 0; i < goodsArray.length; i++) {
        if (goodsArray[i].category == category) {
            count++;
            console.log(`ID[${i}] ${goodsArray[i].name}. Price: ${goodsArray[i].price} Naira`)
        }
    }
    if (count == 0) {
        console.log(`%cNo product exists under '${category}' category`, 'color:red;')
    }
    console.log('');
}

function editProduct(name, column, newValue) {
    var id = getItemId('name', name, goodsArray);
    if (id >= 0) {
        goodsArray[id][column] = newValue;
    } else {
        console.log('%cUnable to edit product. Not found', 'color:red;');
        console.log('');
    }
}



//#region testing testing

// createProduct('Toothpaste', 1500, "hygiene");
// createProduct('20 Leaves Notebook', 20, "education");
// createProduct('Bic Pen', 50, "education");
// createProduct('Lucky Pen', 30, "hygiene");
// createProduct('Laptop', '300000', "computer");
// createProduct('Keyboard', 3000, "computer accessories");
// createProduct('Mouse', 1500, "computer accessories");
// createProduct('Kasio Calculator', 2500, "education");
// createProduct('Pepsi', 200, "beverage");

// // doesProductAlreadyExist('') ? console.log('exists') : console.log('doesnt exist');

// loadAllGoods();

// loadAllGoodsPerCategory('beverage');

// editProduct('Pepsi', 'price', 250)

// deleteItem('name', 'Pepsi', goodsArray);

//#endregion

// console.log(goodsArray);
//#endregion

//#region This section is for transactions(cart, reciept etc)

function addToCart(productId, quantity = 1) {
    if (quantity < 1) {
        quantity = 1;
    }
    var total = 0;
    var cartItem = goodsArray[productId];
    cartItem['quantity'] = quantity;
    cartItem['product_id'] = productId;

    if (isItemAlreadyInCart(cartItem['name'])) {
        console.log('%cItem already in cart. You can increase the quantity.', 'color:red;');
        console.log('');
        return false;
    } else {
        cartArray.push(cartItem);

        for (var i = 0; i < cartArray.length; i++) {
            total += cartArray[i].price * cartArray[i].quantity;
        }

        cartArray['total'] = total;
        console.log('Item added to cart');
        console.log('');
        return true;
    }

}

function isItemAlreadyInCart(name) {
    for (var i = 0; i < cartArray.length; i++) {
        if (cartArray[i].name == name) {
            return true;
        }
    }
    return false;
}

function recalculateGrossTotal() {
    var total = 0;

    for (var i = 0; i < cartArray.length; i++) {
        total += cartArray[i].price * cartArray[i].quantity;
    }

    cartArray['total'] = total;
}

function viewCart() {
    for (var i = 0; i < cartArray.length; i++) {
        console.log(`%cId[${cartArray[i].product_id}] Name: ${cartArray[i].name}. Price: ${cartArray[i].price}. Quantity: ${cartArray[i].quantity}. Total: ${cartArray[i].price * cartArray[i].quantity}`, 'color:green;');
    }

    recalculateGrossTotal();

    console.log('Gross Total: ' + cartArray.total);
    console.log('');
}

function addQuantity(name) {
    if (isItemAlreadyInCart(name)) {
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name == name) {
                cartArray[i].quantity += parseInt(1);
                recalculateGrossTotal();
                console.log('Item quantity added successfully');
                console.log('');
                return true;
            }
        }
    } else {
        console.log('%cItem not in cart', 'color:red;');
        console.log('');
        return false
    }
}

function setQuantity(name, setQuantity) {
    if (isItemAlreadyInCart(name)) {
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name == name) {
                cartArray[i].quantity = setQuantity;
                recalculateGrossTotal();
                console.log('Item quantity set successfully');
                console.log('');
                return true;
            }
        }
    } else {
        console.log('%cItem not in cart', 'color:red;');
        console.log('');
        return false;
    }
}

function reduceQuantity(name) {
    if (isItemAlreadyInCart(name)) {
        for (var i = 0; i < cartArray.length; i++) {
            if (cartArray[i].name == name) {
                if (cartArray[i].quantity > 1) {
                    cartArray[i].quantity -= parseInt(1);
                }
                recalculateGrossTotal();
                console.log('Item quantity reduced successfully');
                console.log('');
                return true;
            }
        }
    } else {
        console.log('%cItem not in cart', 'color:red;');
        console.log('');
        return false;
    }
}

function clearCart() {
    cartArray = [];
    console.log('Cart cleared successfully');
    console.log('');
}

function checkOut() {
    if (cartArray.length > 0) {


        receipt = cartArray;
        userId = getItemId('email', sessionEmail, peopleArray);
        if (userId >= 0) {
            if (peopleArray[userId].wallet >= cartArray.total) {
                console.log('%cCongratulations!', 'color: green; background-color: yellow;')
                console.log('%cYou have successfully paid: ' + cartArray.total + 'Naira', 'color: green; background-color: yellow;');
                console.log('%cYour item will be delivered to you shortly', 'color: green; background-color: yellow;')
                console.log('');

                peopleArray[userId].wallet -= cartArray.total;
                peopleArray[userId]['receipts'].push(receipt);
            } else {
                console.log('%cInsufficient Balance. Top up your wallet.', 'color:red;');
                console.log('');
                return false;
            }

            clearCart();
            return true;
        } else {
            console.log('Invalid User');
            console.log('');
            return false;
        }

    } else {
        console.log('%cCart is empty', 'color:red;');
        console.log('');
        return false;
    }
}

function viewReceipts() {
    var id = getItemId('email', sessionEmail, peopleArray);
    if (id >= 0) {
        for (var i = 0; i < peopleArray[id].receipts.length; i++) {
            console.log(`Receipt Id: ${i} Number Of Items: ${peopleArray[id].receipts[i].length} Total Amount Paid: ${peopleArray[id].receipts[i].total}`)
        }
    } else {
        console.log('%cUser not found', 'color:red;');
        console.log('')
    }
}


// //#region testing testing testing
// addToCart(1);
// addToCart(0);
// addToCart(3);
// addToCart(1);
// //#endregion

// console.log(cartArray);

//#endregion

//#region Program Showcase

// createPerson(firstName, lastName, email, password);
// login('orjimichael4886@gmail.com', 123);
// logOut();

// createPerson('m', 'm', 'mail', 22);
// login('mail', 22);

createProduct('Toothpaste', 1500, "hygiene");
createProduct('20 Leaves Notebook', 20, "education");
createProduct('Bic Pen', 50, "education");
createProduct('Lucky Pen', 30, "hygiene");
createProduct('Laptop', '300000', "computer");
createProduct('Keyboard', 3000, "computer accessories");
createProduct('Mouse', 1500, "computer accessories");
createProduct('Kasio Calculator', 2500, "education");
createProduct('Pepsi', 200, "beverage");

// loadAllGoods();

// addToCart(1);
// addToCart(0, 20);
// addToCart(3);
// addToCart(4);

// cartArray = deleteItem('name', 'Toothpaste', cartArray);

// // console.log(cartArray);
// viewCart();

// addMoney(400000);

// checkOut();

// console.log(peopleArray);


//#endregion

//#region The User Interface /// SACRED!!! ////

console.log('');
console.log('%cWelcome to T3Commerce. Your Goto app for all types of goods and services.', 'background-color: yellow; color: green;');
console.log('%cGet it? T3.... Task 3... Ecommerce...', 'background-color: yellow; color: green;');
console.log('');
console.log('%cMoving forward. Our app is very easy to use. There are some commands you can use to navigate the app. You can view a list of these commands by typing "info"', 'background-color: yellow; color: green;');
console.log('');

for (var running = 1; running >= 1; running++) {

    const prompt = require('prompt-sync')();
    var command = prompt("Enter Command: ");

    switch (command) {
        case 'close':
            running = -1;
            console.log('>>>>> Shutting down...');
            console.log('');
            break;

        case 'info':
            console.log("info:                      View all commands and what they do.");
            console.log("sign-up:                   Fill in some details to register for the app.");
            console.log('login:                     Fill in your email and password to login and start purchasing.')
            console.log('fund-wallet:               Fund your account with some virtual money.');
            console.log('logout:                    Logout from the service.');
            console.log('delete-account:            Delete your T3Commerce account.');
            console.log('show-products:             View all available products and their prices.');
            console.log('show-products-by-category: View all products/goods under a particular category');
            console.log('view-cart:                 View all items inside cart');
            console.log('add-to-cart:               Add a specified item to cart.');
            console.log('remove-from-cart:          Remove a specified item from cart');
            console.log('clear-cart:                Clear whole cart.');
            console.log('add-quantity:              Add 1 quantity to product in cart');
            console.log('reduce-quantity:           Reduce 1 quantity from product in cart');
            console.log('checkout:                  Make payments for all items in cart.');
            console.log('view-receipts:             View reciepts of all items bought previously.');
            console.log('close:                     Close app.');

            console.log('');
            break;

        case 'sign-up':
            var uFirstName = prompt('Enter First Name: ');
            var uLastName = prompt('Enter Last Name: ');
            var uEmail = prompt('Enter Email Adress: ');
            var uPassword = prompt('Enter password: ');
            var uPassword2 = prompt('Repeat password: ');
            // console.log(uPassword);
            // console.log(uPassword2);
            if (uPassword == uPassword2) {
                createPerson(uFirstName, uLastName, uEmail, uPassword);
            } else {
                console.log('>>>>> Passwords do not match. Start over');
                console.log('');
            }
            break;

        case 'login':
            var loginEmail = prompt('Enter Your Email Address: ');
            var loginPassword = prompt('Enter Password: ');
            login(loginEmail, loginPassword);
            break;

        case 'fund-wallet':
            var fundAmount = prompt('Enter Amount to Deposit: ');
            if (loggedIn) {
                addMoney(fundAmount, sessionEmail);
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'logout':
            if (loggedIn) {
                logOut();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'delete-account':
            if (loggedIn) {
                deletePerson();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'show-products':
            if (loggedIn) {
                loadAllGoods();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'show-products-by-category':
            if (loggedIn) {
                var productCategory = prompt('Enter Desired Product Category: ')
                loadAllGoodsPerCategory(productCategory);
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'view-cart':
            if (loggedIn) {
                viewCart();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'add-to-cart':
            if (loggedIn) {
                var atcProductId = prompt('Enter Product Id: ');
                var atcProductQuantity = prompt('Enter Quantity: ');
                addToCart(atcProductId, atcProductQuantity);
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'remove-from-cart':
            if (loggedIn) {
                var rfcProductName = prompt('Enter Item Name: ');
                cartArray = deleteItem('name', rfcProductName, cartArray);
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'clear-cart':
            if (loggedIn) {
                clearCart();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'add-quantity':
            if (loggedIn) {
                var aqProductName = prompt('Enter Product Name: ');
                addQuantity(aqProductName);
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'reduce-quantity':
            if (loggedIn) {
                var rqProductName = prompt('Enter Item Name: ');
                reduceQuantity(rqProductName);
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'checkout':
            if (loggedIn) {
                checkOut();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        case 'view-receipts':
            if (loggedIn) {
                // console.log(peopleArray[0]['receipts']);
                viewReceipts();
            } else {
                console.log('>>>>> Login first');
                console.log('');
            }
            break;

        default:
            console.log('>>>>> Command not recognized.');
            console.log('');
            break;
    }

}
//#endregion
