import React, { useState, useEffect } from 'react'
import { showFailedAlert, showSuccessAlert } from './utils';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Form, redirect } from 'react-router-dom'

export async function createNewUserAction({ request }) {
    try {
        const formData = await request.formData()
        const user = Object.fromEntries(formData)
        const users = JSON.parse(localStorage.getItem('users'))
    
        const id = Date.now()
        const lastName = formData.get('last-name')
        const firstName = formData.get('first-name')
        const middleName = formData.get('middle-name')
        const houseNumber = formData.get('house-number')

        const isEmailUsed = users.find((storedUser) => storedUser.email === user.email)
        const nameRegex = /^[A-Z][a-zA-Z]{2,19}$/;

        if (!nameRegex.test(lastName)) {
            throw new Error('Last name should start with a capital letter and be between 3 and 20 characters long.');
        }

        if (!nameRegex.test(firstName)) {
            throw new Error('First name should start with a capital letter and be between 3 and 20 characters long.');
        }

        if (middleName && !nameRegex.test(middleName)) {
            throw new Error('Middle name should start with a capital letter and be between 3 and 20 characters long.');
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const isPasswordStrong = !passwordRegex.test(user.password)
        if (isPasswordStrong) {
            throw new Error('Email is already in use')
        }

        if (isEmailUsed) {
            throw new Error('Email is already in use')
        }
        const retypedPassword = formData.get('retyped-password')  
        const passwordMatched = user.password === retypedPassword;

        if (!passwordMatched) {
            throw new Error('Passwords do not match');
        }
      
        const newUser = {
            lastName: lastName,
            firstName: firstName,
            middleName: middleName,
            id: id,
            email: user.email,
            password: user.password,
            amount: 0,
            address: {
                houseNumber: houseNumber,
                city: user.city,
                province: user.province,
                country: user.country,
            },
                transactionHistory: [],
            };
          
        const updatedUsers = [...users, newUser];
          
        localStorage.setItem('users', JSON.stringify(updatedUsers));
          
        return redirect(`../user/${id}`);

        } catch (error) {
            toast.error(`${error}`)
            return  { error: 'An unexpected error occurred' }
        }
}



const CreateNewUser = () => {
    const [user, setUser] = useState({
        password:'',
    })

    useEffect(() => {
        if (user.password) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
            const isPasswordStrong = !passwordRegex.test(user.password)
            setError({ ...error, passwordError: isPasswordStrong })
        }
    }, [user.password])

    const [error, setError] = useState({
        passwordError: false,
    })

    return (
        <>
            <Form className='flex items-center flex-col pl-[7rem] py-4 pr-8 absolute overflow-x-auto w-full' method='post'>
                <div className='font-abril text-4xl p-8'>Create New User</div>
                <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8 w-full'>
                    <span className='absolute top-[-20px] left-0 font-abril text-4xl w-full text-center'>Personal Information</span>
                    <label htmlFor='last-name' className='w-[32%] font-abril text-2xl'>Last Name
                        <input type='text' id='last-name' name='last-name' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        required/>
                    </label>
                    <label htmlFor='first-name' className='w-[32%] font-abril text-2xl'> First Name
                        <input type='text' id='first-name' name='first-name' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        required/>
                    </label>
                    <label htmlFor='middle-name' className='w-[32%] font-abril text-2xl'> Middle Name
                        <input type='text' id='middle-name' name='middle-name' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
/>
                    </label>
                
                </div>
                <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8 w-full'>
                    <span className='absolute top-[-20px] left-0 font-abril text-4xl w-full text-center'>Complete Address</span>
                    <label htmlFor='house-number' className='w-full font-abril text-2xl'> House Number / Subdivision 
                        <input type='text' id='house-number' name='house-number' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'

                        required/>
                    </label>
                    <label htmlFor='city' className='w-[32%] font-abril text-2xl'> City
                        <input type='text' id='city' name='city' className='border-[1px] rounded-lg p-2 font-mulish text-lg  w-[100%]'
                        required/>
                    </label>
                    <label htmlFor='province' className='w-[32%] font-abril text-2xl'> Province
                        <input type='text' id='province' name='province' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        required/>
                    </label>
                    <label htmlFor='country' className='w-[32%] font-abril text-2xl'> Country
                        <input type='text' id='country' name='country' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        required/>
                    </label>
                </div>
                <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8 w-full'>
                    <span className='absolute top-[-20px] left-0 font-abril text-4xl w-full text-center'>Log in Details</span>
                    <label htmlFor='email' className='w-[100%] font-abril text-2xl'> Email
                        <input type='email' id='email' name='email' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                    required/>
                    </label>

                    <label htmlFor='password' className='w-[100%] font-abril text-2xl'> Password
                        <input type='password' id='password' name='password' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        onChange={e => {
                            setUser({...user, password: e.target.value})
                        }}
                        required/>
                    </label>
                    {
                        error.passwordError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span> Weak password: It should consist of a minimum of 8 characters, including an uppercase letter and digits.</div> 
                            || user.password && <div className='font-mulish text-lg'><span className='bg-green-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span>Strong Password</div>
                    }
                    <label htmlFor='retyped-password' className='w-[100%] font-abril text-2xl'> Repeat your Password
                        <input type='password' id='retyped-password' name='retyped-password' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        required/>
                    </label>           

                </div>
                <div>
                    <button type='submit' className='bg-[#FCB847] p-4 rounded-lg font-abril text-2xl'>Create New User</button>
                </div>
            </Form>
        </>
    )
    }

    export default CreateNewUser