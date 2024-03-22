const commander = require("commander");
const contacts = require("./contacts");
commander.program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

commander.program.parse();

const options = commander.program.opts();
let response;

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			response = await contacts.listContacts();
			console.table(response);
			break;

		case "get":
			response = await contacts.getContactById(id);
			console.table(response);
			break;

		case "add":
			response = await contacts.addContact(name, email, phone);
			console.table(response);
			break;

		case "remove":
			response = await contacts.removeContact(id);
			console.table(response);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(options);
