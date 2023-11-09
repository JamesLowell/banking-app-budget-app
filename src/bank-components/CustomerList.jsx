import React, { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import { userList } from './users.jsx'
import { fetchUser } from './utils'
import { useDebounce } from './hooks'
import { Link, useLoaderData } from 'react-router-dom'

export async function usersLoader() {

  const storedUserData = localStorage.getItem('users')

  if (storedUserData) {
    const user = JSON.parse(storedUserData);
    return user 
  } else {

    return null;
  }
}

const CustomerList = () => {

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)
  const [users, setUsers] = useState([])

  const user = useLoaderData()

  useEffect (() => {
    setUsers(user)
  }, [])

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)

      const filteredUser = await fetchUser(debouncedSearch)
      setUsers(filteredUser)

      setLoading(false)
    }
    loadUsers()
  }, [debouncedSearch])
  return (
    <section className='bg-[#F3F2E8] w-full pl-[7rem] py-4 pr-4 fixed '>
      <div className='bg-[#F7DAA8] w-full font-abril text-4xl text-center py-4'>All Customers</div>
      <div className='p-4'>
        <SearchBar onChange={setSearch} />
        <div className='w-full bg-white p-4 rounded-xl'>
          <div className='bg-[#F7DAA8] p-2 flex font-abril text-lg w-full'>
            <h2 className='w-1/5'>First Name</h2>
            <h2 className='w-1/5'>Last Name</h2>
            <h2 className='w-1/5'>Email</h2>
            <h2 className='w-1/5'>Address</h2>
            <h2 className='w-1/5'>Account Details</h2>
          </div>
          {loading && <div>Loading...</div>}
          {!loading && users.length === 0 && <div>Not Found!</div>}
          {!loading && users.map(user => {
            return (<div key={user.id} className='flex font-mulish text-lg p-2'>
              <h2 className='w-1/5'>{user.firstName}</h2>
              <h2 className='w-1/5'>{user.lastName}</h2>
              <h2 className='w-1/5'>{user.email}</h2>
              <h2 className='w-1/5'>{user.address.houseNumber} {user.address.city} {user.address.province} {user.address.country}</h2>
              <Link to={`../user/${user.id}`}>
    <button className='w-[200px] bg-[#FCB847] rounded-full'>View Account</button>
</Link>
            </div>)
          })}
        </div>
      </div>
    </section>
  )
}

export default CustomerList