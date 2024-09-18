  let contacts = [
      { id: '1', name: 'Maxi Silva', email: 'maxi@example.com' },
      { id: '2', name: 'Rena Salvi', email: 'rena@example.com' }
 ];

// Actualizar un contacto
function updateContact(id, updatedContact) {
    const index = contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
        contacts[index] = updatedContact;
    }
}

module.exports = contacts;
module.exports.updateContact = updateContact;
    