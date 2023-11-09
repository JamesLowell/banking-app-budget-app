export const fetchUser = async (search) => {
  const storedUsers = await JSON.parse(localStorage.getItem('users'));
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (storedUsers) {
    return storedUsers.filter(user => {
      return user.firstName && user.firstName.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    return []; 
  }
};
//make sure to always ask the truthines