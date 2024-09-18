const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contacts = require('./contacts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('../public'));
    //MUESTRA LOS CONTACTOS
app.get('/api/contacts', (req, res) => {
    res.json(contacts);
});
    //CREA UN CONTACTO NUEVO
app.post('/api/contacts', (req, res) => {
    const newContact = req.body;
    contacts.push(newContact);
    res.status(201).json(newContact);
});
    //ACTUALIZA LOS CONTACTOS
app.put('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    const updatedContact = req.body;

    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
        contacts[index] = updatedContact; // Actualizar el contacto
        res.status(200).json(updatedContact);
    } else {
        res.status(404).send('Contact not found');
    }
});
    //ELIMINA CONTACTO
app.delete('/api/contacts/:id', (req, res) => {
    const { id } = req.params;
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Contact not found');
    }
});
    //INICIA EL SERVIDOR
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
