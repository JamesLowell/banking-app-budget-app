import React from 'react'
import { useState } from 'react'
import {motion, useMotionValueEvent, useScroll} from 'framer-motion'
import { Link } from 'react-router-dom'

const NavbarTop = () => {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

  return (
    <>
        <motion.nav 
        variants={{
            visible: { y: 0 },
            hidden: { y: "-110%" }
        }}
        transition={{ duration: 0.35, ease:"easeInOut"}}
        animate={hidden ? "hidden" : "visible"}
        className='sticky top-0 flex w-full z-10 justify-center gap-64 items-center pt-8  bg-[#F3F2E8]'>
            <div>
                Logo
            </div>
            <ul className='flex gap-16 font-abril text-xl'>
                <li>Home</li>
                <li>Features</li>
                <li>Solutions</li>
                <li>Feedbacks</li>
                <li>Contact Us</li>
            </ul>
            <div>
                <button className='rounded-md border-2 border-black py-4 px-8 shadow-md shadow-slate-950 hover:shadow-lg hover:shadow-slate-950 font-mulish font-bold'>
                    Log in!
                </button>
            </div>
        </motion.nav>
    </>
  )
}

export default NavbarTop