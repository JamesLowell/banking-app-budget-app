    import React, { useState, useEffect } from 'react'
    // import { useHistory } from 'react-router-dom'

    const CreateNewUser = () => {
        
        const users = JSON.parse(localStorage.getItem('users'))
        
        const [user, setUser] = useState({
            lastName: '',
            firstName: '',
            middleName: '',
            email: '',
            password:'',
            reTypePassword:'',
            address: {
                houseNumber: '',
                city: '',
                province: '',
                country: ''
            },
        })
        useEffect(() => {
            if (user.password) {
                const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
                const isPasswordStrong = !passwordRegex.test(user.password)
                setError({ ...error, passwordError: isPasswordStrong })
            }
            // /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        }, [user.password])

        const [error, setError] = useState({
            emailError: false,
            passwordError: false,
            reTypePasswordError: false,
        })


        const handleFormSubmit = (e) => {
            e.preventDefault()
            // if theres no error create an id then ...user and push it
            const isEmailUsed = users.some(existingUser => existingUser.email.toLowerCase() === user.email.toLowerCase())
            if(isEmailUsed) {
                setError({...error, emailError: isEmailUsed})
            }
            if(user.password !== user.reTypePassword) {
                setError({...error, reTypePasswordError: true})
            }

            if(!error.emailError && !error.passwordError && !error.reTypePasswordError) {
                const id = Date.now()
                const newUser = {
                    lastName: user.lastName,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    id: id,
                    email: user.email,
                    password: user.password,
                    address: {
                        houseNumber: user.address.houseNumber,
                        city: user.address.city,
                        province: user.address.province,
                        country: user.address.country
                    }
                }

                const updatedUsers = [...users, newUser]

                localStorage.setItem('users', JSON.stringify(updatedUsers))

                // const history = useHistory()
                // history.push('/success-page') //redirect to the user info
                setUser({...user,
                    lastName: '',
                    firstName: '',
                    middleName: '',
                    email: '',
                    password:'',
                    address: {
                        houseNumber: '',
                        city: '',
                        province: '',
                        country: ''
                    }
                })
                setError({...error,
                    emailError: false,
                    passwordError: false,
                    reTypePasswordError: false,
                })
            }
        }

    return (
        <>
            <form className='flex items-center flex-col pl-[7rem] py-4 pr-8 absolute overflow-x-auto w-full' onSubmit={handleFormSubmit}>
                <div className='font-abril text-4xl p-8'>Create New User</div>
                <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8 w-full'>
                    <span className='absolute top-[-20px] left-0 font-abril text-4xl w-full text-center'>Personal Information</span>
                    <label htmlFor='last-name' className='w-[32%] font-abril text-2xl'>Last Name
                        <input type='text' id='last-name' name='last-name' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        value = {user.lastName} 
                        onChange={(e) => {
                            setUser({...user, lastName: e.target.value})
                    }}
                        required/>
                    </label>
                    <label htmlFor='first-name' className='w-[32%] font-abril text-2xl'> First Name
                        <input type='text' id='first-name' name='first-name' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        value={user.firstName}
                        onChange={e => {
                            setUser({...user, firstName: e.target.value})
                        }}
                        required/>
                    </label>
                    <label htmlFor='middle-name' className='w-[32%] font-abril text-2xl'> Middle Name
                        <input type='text' id='middle-name' name='middle-name' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        value={user.middleName}
                        onChange={e => {
                            setUser({...user, middleName: e.target.value})
                        }}/>
                    </label>
                
                </div>
                <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8 w-full'>
                    <span className='absolute top-[-20px] left-0 font-abril text-4xl w-full text-center'>Complete Address</span>
                    <label htmlFor='house-number' className='w-full font-abril text-2xl'> House Number / Subdivision 
                        <input type='text' id='house-number' name='house-number' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        value={user.address.houseNumber}
                        onChange={e => {
                            setUser({...user, address: {...user.address, houseNumber: e.target.value} })
                        }}
                        required/>
                    </label>
                    <label htmlFor='city' className='w-[32%] font-abril text-2xl'> City
                        <input type='text' id='city' name='city' className='border-[1px] rounded-lg p-2 font-mulish text-lg  w-[100%]'
                        value={user.address.city}
                        onChange={e => {
                            setUser({...user, address: {...user.address, city: e.target.value}})
                        }}
                        required/>
                    </label>
                    <label htmlFor='province' className='w-[32%] font-abril text-2xl'> Province
                        <input type='text' id='province' name='province' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        value={user.address.province}
                        onChange={e => {
                            setUser({...user, address: {...user.address, province: e.target.value}})
                        }}
                        required/>
                    </label>
                    <label htmlFor='country' className='w-[32%] font-abril text-2xl'> Country
                        <input type='text' id='country' name='country' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]'
                        value={user.address.country}
                        onChange={e => {
                            setUser({...user, address: {...user.address, country: e.target.value}})
                        }}
                        required/>
                    </label>
                </div>
                <div className='border-[1px] rounded-lg py-16 px-8 relative flex flex-wrap gap-4 mb-8 w-full'>
                    <span className='absolute top-[-20px] left-0 font-abril text-4xl w-full text-center'>Log in Details</span>
                    <label htmlFor='email' className='w-[100%] font-abril text-2xl'> Email
                        <input type='email' id='email' name='email' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]' value={user.email} 
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                    }}
                    required/>
                    </label>
                    {
                        error.emailError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span>Email is already used</div> 
                    }
                    <label htmlFor='password' className='w-[100%] font-abril text-2xl'> Password
                        <input type='password' id='password' name='password' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]' defaultValue={`${''}`}
                        onChange={e => {
                            setUser({...user, password: e.target.value})
                        }}
                        required/>
                    </label>
                    {
                        error.passwordError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span> Weak password: It should consist of a minimum of 8 characters, including an uppercase letter and digits.</div> 
                            || user.password && <div>Strong Password</div>
                    }
                    <label htmlFor='repeat-password' className='w-[100%] font-abril text-2xl'> Repeat your Password
                        <input type='password' id='repeat-password' name='repeat-password' className='border-[1px] rounded-lg p-2 font-mulish text-lg w-[100%]' defaultValue={`${''}`}
                        onChange={e => {
                            setUser({...user, reTypePassword: e.target.value})
                        }}
                        required/>
                    </label>           
                    {
                        error.reTypePasswordError && <div className='font-mulish text-lg'><span className='bg-red-600 rounded-full w-[10px] h-[10px] text-red-600'>.</span>Password doesn't match</div>
                    }
                </div>
                <div>
                    <button type='submit' className='bg-[#FCB847] p-4 rounded-lg font-abril text-2xl'>Create New User</button>
                </div>
            </form>
        </>
    )
    }

    export default CreateNewUser