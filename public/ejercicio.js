const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
let editingContactId = null; // Para manejar la edición

// Cargar contactos al inicio
async function loadContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.textContent = `${contact.name} - ${contact.email}`;
        li.appendChild(createEditButton(contact));
        li.appendChild(createDeleteButton(contact.id));
        contactList.appendChild(li);
    });
}

// Crear botón de editar
function createEditButton(contact) {
    const button = document.createElement('button');
    button.textContent = 'Editar';
    button.onclick = () => {
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        editingContactId = contact.id; // Guardar el ID del contacto que se está editando
    };
    return button;
}

// Crear botón de eliminar
function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.onclick = async () => {
        await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
        loadContacts();
    };
    return button;
}

// Manejar el formulario
form.onsubmit = async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (editingContactId) {
        // Si estamos editando, actualizamos el contacto
        await fetch(`/api/contacts/${editingContactId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingContactId, name, email })
        });
        editingContactId = null; // Reiniciar la edición
    } else {
        // Agregar un nuevo contacto
        await fetch('/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: Date.now().toString(), name, email })
        });
    }

    form.reset();
    loadContacts();
};

// Cargar contactos al inicio
loadContacts();
