const fs = require("node:fs/promises");
const path = require('node:path');

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const readFile = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const writeFile = async (data) => {
  try {
    return await fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  return await readFile() || [];
}

async function getContactById(contactId) {
  const file = await readFile()
  return file.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const file = await readFile();
  let deletedContact = null;

  const contacts = file.filter((contact) => {
    if (contact.id === contactId) {
      deletedContact = contact
    }
    return contact.id !== contactId
  });

  await writeFile(contacts);

  return deletedContact;
}

async function addContact(name, email, phone) {
  const file = await readFile()

  const newContact = { id: Date.now().toString(), name, email, phone };
  await writeFile([...file, newContact]);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};