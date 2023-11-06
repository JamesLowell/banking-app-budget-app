const storedUsers = JSON.parse(localStorage.getItem('users'));

export const fetchUser = async (search) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
  if (storedUsers) {
    return storedUsers.filter(user => {
      return user.firstName.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    return []; 
  }
};