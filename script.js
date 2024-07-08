//input field for adding new items
const itemInput = document.getElementById('item-input'); 
// Button for adding new items 
const addBtn = document.getElementById('add-btn');  
//Button for clearing new items
const clearBtn = document.getElementById('clear-btn');  
//container for the list items
const listContainer = document.getElementById('list-container'); 
//initializes an empty array
let shoppingList = [];  

if (localStorage.getItem('shoppingList')) {
    shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    renderList(); 
}

// Seting up a click event listener on the add button
addBtn.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        shoppingList.push({ text: newItem, purchased: false });
        itemInput.value = '';
        renderList();
    }
});

// Seting up a click event on the clear button
clearBtn.addEventListener('click', () => {
    shoppingList = [];
    renderList();
});

// Updating the HTML display
function renderList() {
    listContainer.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.addEventListener('click', () => {
            item.purchased =!item.purchased;
            renderList();
        });
        listItem.appendChild(checkbox);
        listItem.appendChild(document.createTextNode(item.text));
        if (item.purchased) {
            listItem.classList.add('purchased');
        }
        listItem.addEventListener('dblclick', () => {
            listItem.classList.add('editing');
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = item.text;
            listItem.appendChild(editInput);
            editInput.focus();
            editInput.addEventListener('blur', () => {
                item.text = editInput.value.trim();
                listItem.removeChild(editInput);
                listItem.classList.remove('editing');
                renderList();
            });
        });
        listContainer.appendChild(listItem);
    });
}