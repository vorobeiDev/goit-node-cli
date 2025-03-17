const { program } = require("commander");
const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contacts = await listContacts();
      console.log("Contacts list:")
      console.table(contacts);
      break;
    }

    case "get": {
      const contact = await getContactById(id);
      console.log(`Contact with id ${id}:`,contact)
      break;
    }

    case "add": {
      const contact = await addContact(name, email, phone);
      console.log("New contact was added:", contact);
      break;
    }

    case "remove": {
      const contact = await removeContact(id);
      console.log("Contact was removed:", contact);
      break;
    }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);