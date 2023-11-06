import React from 'react'

const AllCustomers = ({users}) => {
  return (
    <section className='bg-white w-full rounded-xl p-4'>
        <div className='w-full flex'>
            <h2>First Name</h2>
            <h2>Last Name</h2>
            <h2>Address</h2>
            <h2>Email</h2>
            <h2>Contact Number</h2>
            <h2>Gender</h2>
            <h2>Account Details</h2>
        </div>
        <div key={users.contactNumber}>{users.firstName}</div>
    </section>
  )
}

export default AllCustomers
