import React, {useState, useEffect } from 'react'
import { Form, useLoaderData, redirect } from "react-router-dom"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export async function editUserAction({request, params}) {
    try {
        const formData = await request.formData()
        const user = Object.fromEntries(formData)
        const users = JSON.parse(localStorage.getItem('users'))
        console.log(users)

        const nameRegex = /^[A-Z][a-zA-Z]{2,19}$/;

        if (!nameRegex.test(user.lastName)) {
            throw new Error('Last name should start with a capital letter and be between 3 and 20 characters long.');
        }

        if (!nameRegex.test(user.firstName)) {
            throw new Error('First name should start with a capital letter and be between 3 and 20 characters long.');
        }

        if (user.middleName && !nameRegex.test(user.middleName)) {
            throw new Error('Middle name should start with a capital letter and be between 3 and 20 characters long.');
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const isPasswordStrong = !passwordRegex.test(user.password)
        if (isPasswordStrong) {
            throw new Error('Email is already in use')
        }
        const isEmailUsed = users.find((storedUser) => storedUser.email === user.email && storedUser.id !== parseInt(params.userId, 10))

        if (isEmailUsed) {
            throw new Error('Email is already in use');
        }

        const passwordMatched = user.password === user.retypedPassword;

        if (!passwordMatched) {
            throw new Error('Passwords do not match');
        }

        const referenceUser = users.find(user => user.id === parseInt(params.userId, 10))
        if (!referenceUser) throw new Error(`No user found for ${params.userId}`);
        Object.assign(referenceUser, user);
          
        localStorage.setItem('users', JSON.stringify(users));
          
        return redirect(`../user/${params.userId}`)

        } catch (error) {
            toast.error(`${error}`)
            return  { error: 'An unexpected error occurred' }
        }
}

const EditUser = () => {

    const user =  useLoaderData()
    useEffect(() => {
        console.log(user)
    }, [])

    // useEffect(() => {
    //     if (user.password) {
    //         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    //         const isPasswordStrong = !passwordRegex.test(user.password)
    //         setError({ ...error, passwordError: isPasswordStrong })
    //     }
    //     console.log(user)
    // }, [user.password])


    const [error, setError] = useState({
         emailError: false,
         passwordError: false,
         reTypePasswordError: false,
    })

return (
    <>
        <Form className='flex items-center flex-col pl-[7rem] py-4 pr-8 absolute overflow-x-auto w-full' method='post'>
            <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8'>
                <span className='absolute top-[-20px] left-[40%] font-abril bg-white text-4xl'>Personal Information</span>
                <label htmlFor='lastName' className='w-[30%] font-abril text-2xl'> Last Name
                    <input type='text' id='lastName' name='lastName' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.lastName}  required/>
                </label>
                <label htmlFor='firstName' className='w-[30%] font-abril text-2xl'> First Name
                    <input type='text' id='firstName' name='firstName' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.firstName}  required/>
                </label>
                <label htmlFor='middleName' className='w-[30%] font-abril text-2xl'> Middle Name
                    <input type='text' id='middleName' name='middleName' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]'
                    defaultValue={user.middleName} />
                </label>
            
            </div>
            <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8'>
                <span className='absolute top-[-20px] left-[40%] font-abril bg-white text-4xl'>Complete Address</span>
                <label htmlFor='houseNumber' className='w-full font-abril text-2xl'> House Number / Subdivision 
                    <input type='text' id='houseNumber' name='houseNumber' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.address.houseNumber} required/>
                </label>
                <label htmlFor='city' className='w-[30%] font-abril text-2xl'> City
                    <input type='text' id='city' name='city' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg  w-[70%]' defaultValue={user.address.city} required/>
                </label>
                <label htmlFor='province' className='w-[30%] font-abril text-2xl'> Province
                    <input type='text' id='province' name='province' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.address.province} required/>
                </label>
                <label htmlFor='country' className='w-[30%] font-abril text-2xl'> Country
                    <input type='text' id='country' name='country' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.address.country} required/>
                </label>
            </div>
            <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8'>
                <span className='absolute top-[-20px] left-[40%] font-abril bg-white text-4xl'>Log in Details</span>
                <label htmlFor='email' className='w-[100%] font-abril text-2xl'> Email
                    <input type='email' id='email' name='email' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.email} required/>
                </label>
                {
                    error.emailError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span>Email is already used</div> 
                }
                <label htmlFor='password' className='w-[100%] font-abril text-2xl'> Password
                    <input type='password' id='password' name='password' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' required/>
                </label>
                {
                    error.passwordError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span> Weak password: It should consist of a minimum of 8 characters, including an uppercase letter and digits.</div> 
                        || user.password && <div>Strong Password</div>
                }
                <label htmlFor='retypedPassword' className='w-[100%] font-abril text-2xl'> Repeat your Password
                    <input type='password' id='retypedPassword' name='retypedPassword' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' required/>
                </label>           
                {
                    error.reTypePasswordError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span>Password doesn't match</div>
                }
            </div>
            <div>
                <button type='submit' className='bg-[#FCB847] p-4 rounded-lg font-abril text-2xl'>Create New User</button>
            </div>
        </Form>
    </>
)
}

export default EditUser