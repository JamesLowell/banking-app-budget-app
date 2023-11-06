import React from 'react'

const Login = () => {
  return (
    <section className='w-full h-screen bg-[##F3F2E8] flex justify-center items-center'>
        <div className='h-[500px] w-[350px] bg-white border-black border-2 rounded-xl overflow-hidden'>
            <div className='bg-[#FCB847] p-4'>
                <form className='flex flex-col'>
                    <h1 className='font-abril text-4xl text-center'>User</h1>
                    <label for='user-username'>Username</label>
                    <input type='text' name='user-username' id='user-username' placeholder='username'/>
                    <label for='user-password'>Password</label>
                    <input type='password' name='user-password' id='user-password' placeholder='password'/>
                    <button>Log in</button>
                </form>
            </div>
            <div className=''>
                <form>
                    <h1>Admin</h1>
                    <label for='admin-username'>Username</label>
                    <input type='text' name='admin-username' id='admin-username' placeholder='username'/>
                    <label for='admin-password'>Password</label>
                    <input type='password' name='admin-password' id='admin-password' placeholder='password'/>
                    <button>Log in</button>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login