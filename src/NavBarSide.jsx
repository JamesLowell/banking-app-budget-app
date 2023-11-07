import React from 'react';
import "./NavBarSide.css";
import { NavLink } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

const NavBarSide = () => {
  return (
    <>
    <div className='sidebar' >
      <NavLink style={({isActive}) => {return isActive ? {backgroundColor: '#FFAE57'} : {}}} to='/user-info' className='item firstBreak'>
        <span><AiOutlineHome/></span>
        <div className='text'>App</div>
      </NavLink>

      

      <NavLink style={({isActive}) => {return isActive ? {backgroundColor: '#FFAE57'} : {}}} to='dashboard' className='item'>
        <span><LuLayoutDashboard/></span>
        <div className='text'>Dashboard</div>
      </NavLink>

      <NavLink style={({isActive}) => {return isActive ? {backgroundColor: '#FFAE57'} : {}}} to='customer-list' className='item'>
        <span><AiOutlineSearch/></span>
        <div className='text'>Search</div>
      </NavLink>

      <NavLink style={({isActive}) => {return isActive ? {backgroundColor: '#FFAE57'} : {}}} to ='new-user' className='item'>
       <span><AiOutlineUserAdd/></span>
        <div className='text'>New User</div>
      </NavLink>

      <NavLink style={({isActive}) => {return isActive ? {backgroundColor: '#FFAE57'} : {}}} to='settings' className='item secondBreak' >
        <span><FiSettings/></span>
        <div className='text'>Settings</div>
      </NavLink>


      <NavLink href='/home' className='item'>
      <span><FiLogOut/></span>
        <div className='text'>Log Out</div>
      </NavLink>
    </div>
    </>
  );
}

export default NavBarSide;
