const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const listContainer = document.getElementById('list-container');
let shoppingList = [];

if (localStorage.getItem('shoppingList')) {
    shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
    renderList();
}

addBtn.addEventListener('click', () => {
    const newItem = itemInput.value.trim();
    if (newItem) {
        shoppingList.push({ text: newItem, purchased: false });
        itemInput.value = '';
        renderList();
    }
});


clearBtn.addEventListener('click', () => {
    shoppingList = [];
    renderList();
});

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