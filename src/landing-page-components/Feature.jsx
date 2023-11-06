import React from 'react'

const Feature = () => {
  return (
    <>
      <section className='bg-[#FCB847] flex gap-32 p-16 justify-center'>
        <h1 className='font-abril text-6xl'>Forbes</h1>
        <h1 className='font-abril text-6xl'>VISA</h1>
        <h1 className='font-abril text-6xl'>Paypal</h1>
        <h1 className='font-abril text-6xl'>Gcash</h1>
        <h1 className='font-abril text-6xl'>gopay</h1>
      </section>
      <section className='bg-[#F3F2E8] px-32 py-16'>
        <div className='flex mb-6'>
          <h1 className='flex-1 font-abril text-6xl leading-normal'>
            This is a special <span className=''>feature</span> we realy on for you
          </h1>
          <p className='flex-1 font-mulish text-slate-700'>
            We provide the best feature for those of you who want to manage your money well in the future of course only available here.
          </p>
        </div>
        <div className='flex flex-wrap gap-8'>
          <div className='border-2 border-black rounded-lg bg-white p-4 min-w-[400px] w-[45%]'>
            <h2 className='font-abril text-xl'>Free Transaction</h2>
            <p className='font-mulish text-md'>Additional admin fees like other banks in general</p>
          </div>
          <div className='border-2 border-black rounded-lg bg-white p-4 min-w-[400px] w-[45%]'>
            <h2 className='font-abril text-xl'>Insurance</h2>
            <p className='font-mulish text-md'>Learn about insurancec for your home and belongings</p>
          </div>
          <div className='border-2 border-black rounded-lg bg-white p-4 min-w-[400px] w-[45%]'>
            <h2 className='font-abril text-xl'>Credit Card</h2>
            <p className='font-mulish text-md'>We will help you make a credit card for emergency needs</p>
          </div>
          <div className='border-2 border-black rounded-lg bg-white p-4 min-w-[400px] w-[45%]'>
            <h2 className='font-abril text-xl'>Invessting</h2>
            <p className='font-mulish text-md'>We will help you create a clear path to your financial goals</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Feature