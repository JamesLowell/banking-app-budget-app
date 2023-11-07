import React, {useState, useEffect } from 'react'
import { Form, useLoaderData, redirect } from "react-router-dom"

export async function editUserAction({request, params}) {
    const formData = await request.formData()
    const updates = Object.fromEntriess(formData)
    await updateContact(params.customerId, updates)
     return redirect(`../customer/${params.customerId}`)
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


    // const handleFormSubmit = (e) => {
    //     e.preventDefault()
    //     // if theres no error create an id then ...user and push it
    //     const isEmailUsed = users.some(existingUser => existingUser.email.toLowerCase() === user.email.toLowerCase())
    //     if(isEmailUsed) {
    //         setError({...error, emailError: isEmailUsed})
    //     }
    //     if(user.password !== user.reTypePassword) {
    //         setError({...error, reTypePasswordError: true})
    //     }

    //     if(!error.emailError && !error.passwordError && !error.reTypePasswordError) {
            
    //         const updatedUsers = [...users, newUser]
    //         setError({...error,
    //             emailError: false,
    //             passwordError: false,
    //             reTypePasswordError: false,
    //         })
    //     }
    // }

return (
    <>
        <Form className='flex items-center flex-col p-4' method='post'>
            <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8'>
                <span className='absolute top-[-20px] left-[40%] font-abril bg-white text-4xl'>Personal Information</span>
                <label htmlFor='last-name' className='w-[30%] font-abril text-2xl'> Last Name
                    <input type='text' id='last-name' name='last-name' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.lastName}  required/>
                </label>
                <label htmlFor='first-name' className='w-[30%] font-abril text-2xl'> First Name
                    <input type='text' id='first-name' name='first-name' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.firstName}  required/>
                </label>
                <label htmlFor='middle-name' className='w-[30%] font-abril text-2xl'> Middle Name
                    <input type='text' id='middle-name' name='middle-name' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]'
                    defaultValue={user.middleName} />
                </label>
            
            </div>
            <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8'>
                <span className='absolute top-[-20px] left-[40%] font-abril bg-white text-4xl'>Complete Address</span>
                <label htmlFor='house-number' className='w-full font-abril text-2xl'> House Number / Subdivision 
                    <input type='text' id='house-number' name='house-number' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.address.houseNumber} required/>
                </label>
                <label htmlFor='city' className='w-[30%] font-abril text-2xl'> City
                    <input type='text' id='city' name='city' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg  w-[70%]' defaultValue={user.address.city} required/>
                </label>
                <label htmlFor='province' className='w-[30%] font-abril text-2xl'> Province
                    <input type='text' id='province' name='province' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValue={user.address.province} required/>
                </label>
                <label htmlFor='country' className='w-[30%] font-abril text-2xl'> Country
                    <input type='text' id='country' name='country' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' defaultValuev={user.address.country} required/>
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
                <label htmlFor='repeat-password' className='w-[100%] font-abril text-2xl'> Repeat your Password
                    <input type='password' id='repeat-password' name='repeat-password' className='border-[1px] rounded-lg p-2 ml-4 font-mulish text-lg w-[70%]' required/>
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