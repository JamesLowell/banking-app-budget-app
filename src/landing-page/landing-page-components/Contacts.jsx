import React from 'react'

const Contacts = () => {
  return (
    <>
        <section className='bg-[#FFB946] flex flex-col justify-center items-center p-32'>
            {/* <div className='absolute top-0 left-0 h-full w-full flex'>
                <div className='border-dashed border-[#DDA343] border-r-2 border-y-0 h-full w-[100px]'></div>
            </div> */}
            <h1 className='font-abril text-6xl'>Let's try our service now</h1>
            <p className='font-mulish text-2xl'>Everything you need to accept payments and grow your business anywhere on the planet</p>
        </section>
        <section className='bg-[#191919] flex gap-64 p-32'>
            <div>
                <h1 className='font-abril text-white text-4xl mb-4'>Logo</h1>
                <form action="" className='relative'>
                    <span></span>
                    <input type='text' placeholder='send your email' className='p-3 rounded-lg font-mulish w-[500px]'/>
                    <button className='py-1 px-3 bg-[#FFB946] font-mulish text-black font-bold rounded-lg absolute right-2 top-[15%]'>Send Email</button>
                </form>
            </div>
            <div className='flex gap-32 text-white font-mulish'>
                <div>
                    <p className='font-black mb-4'>About</p>
                    <ul className='flex flex-col gap-2 cursor-pointer'>
                        <li>About us</li>
                        <li>Creators</li>
                        <li>Features</li>
                        <li>Contacts</li>
                    </ul>
                </div>
                <div>
                    <p className='font-black mb-4'>Company</p>
                    <ul className='flex flex-col gap-2 cursor-pointer'>
                        <li>Our Team</li>
                        <li>Partner</li>
                        <li>Faq</li>
                        <li>Blog</li>
                    </ul>
                </div>
                <div>
                    <p className='font-black mb-4'>Support</p>
                    <ul className='flex flex-col gap-2 cursor-pointer'>
                        <li>Forbes</li>
                        <li>Visa</li>
                        <li>Gcash</li>
                        <li>Paypal</li>
                        <li>Gopay</li>
                    </ul>
                </div>
                <div>
                    <p className='font-black mb-4'>Social Media</p>
                    <ul className='flex flex-col gap-2 cursor-pointer'>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                    </ul>
                </div>
            </div>

        </section>
    </>
  )
}

export default Contacts