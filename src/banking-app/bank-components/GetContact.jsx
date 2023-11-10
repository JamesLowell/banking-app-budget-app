export async function getContact(contactId) {
    const usersData = JSON.parse(localStorage.getItem("users")) || [];
    const contact = usersData.find((contact) => contact.id === Number(contactId));
    return contact;
  }