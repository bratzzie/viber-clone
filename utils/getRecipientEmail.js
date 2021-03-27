const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0]; //returns a filtered array, the first one is the recipient

export default getRecipientEmail;
