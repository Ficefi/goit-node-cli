const fs = require("fs").promises;
require("path");

const contactsPath = "./db/contacts.json";

function createId() {
	return Math.round(Math.random() * 10 ** 20).toString();
}

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	return JSON.parse(data);
}

async function getContactById(contactId) {
	const array = await listContacts();
	const index = array.findIndex((arr) => arr.id === contactId);
	return array[index] != -1 ? array[index] : null;
}

async function removeContact(contactId) {
	const array = await listContacts();
	const index = array.findIndex((arr) => arr.id === contactId);
	const newArray = array.filter((contact) => contact.id !== contactId);
	fs.writeFile(contactsPath, JSON.stringify(newArray));
	return array[index].id == contactId ? array[index] : null;
}

async function addContact(name, email, phone) {
	const array = await listContacts();
	const newUser = { id: createId(), name: name, email: email, phone: phone };
	array.push(newUser);
	fs.writeFile(contactsPath, JSON.stringify(array));
	return newUser;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
