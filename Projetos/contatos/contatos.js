const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const btn = document.getElementById('submit');
const list = document.getElementById('contact-list');


document.addEventListener('DOMContentLoaded', loadContacts);

function createContact() {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name && phone) {
        const contact = { name, phone };
        addContactToList(contact);
        saveContact(contact);


        nameInput.value = '';
        phoneInput.value = '';
    }
}

function addContactToList(contact) {
    let newDiv = document.createElement('div');
    newDiv.className = 'contact-item';

    let nameElement = document.createElement('p');
    nameElement.className = 'contact-info';
    nameElement.innerText = `Nome: ${contact.name}`;

    let phoneElement = document.createElement('p');
    phoneElement.className = 'contact-info';
    phoneElement.innerText = `Telefone: ${contact.phone}`;

    let actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    let editBtn = document.createElement('button');
    editBtn.innerText = 'Editar';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', function () {
        editContact(newDiv, contact);
    });

    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Excluir';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', function () {
        deleteContact(newDiv, contact);
    });

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    newDiv.appendChild(nameElement);
    newDiv.appendChild(phoneElement);
    newDiv.appendChild(actionsDiv);
    list.appendChild(newDiv);
}

function editContact(contactDiv, contact) {
    const newName = prompt('Editar nome:', contact.name);
    const newPhone = prompt('Editar telefone:', contact.phone);

    if (newName && newPhone) {
        contactDiv.children[0].innerText = `Nome: ${newName}`;
        contactDiv.children[1].innerText = `Telefone: ${newPhone}`;

        updateContact(contact, { name: newName, phone: newPhone });
    }
}

function deleteContact(contactDiv, contact) {
    list.removeChild(contactDiv);
    removeContact(contact);
}

function saveContact(contact) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContacts() {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.forEach(addContactToList);
}

function updateContact(oldContact, newContact) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    let index = contacts.findIndex(c => c.name === oldContact.name && c.phone === oldContact.phone);

    if (index !== -1) {
        contacts[index] = newContact;
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

function removeContact(contact) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts = contacts.filter(c => c.name !== contact.name || c.phone !== contact.phone);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

btn.addEventListener('click', createContact);
