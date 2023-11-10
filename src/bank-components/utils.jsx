import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

export const showSuccessAlert = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}

export const showFailedAlert = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
}