import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBarBuyer.module.css';
import { MdSpaceDashboard } from "react-icons/md";
import { FaBuilding, FaThList } from "react-icons/fa";
import { IoIosContact, IoIosSettings } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import classNames from 'classnames';

function SideBarBuyer() {
  const [activeClassBorder, setActiveClassBorder] = useState('My Profile');

  useEffect(() => {
    const sideState = localStorage.getItem('sideBarState') || 'My Profile';
    setActiveClassBorder(sideState);
  }, []);

  const handleClickSideBar = (name) => {
    setActiveClassBorder(name);
    localStorage.setItem('sideBarState', name);
  };

  const menuItems = [
    { name: 'My Profile', icon: <MdSpaceDashboard />, to: '/myprofile/profileBuyer' },
    { name: 'My Bookmarks', icon: <FaThList />, to: '/myprofile/mybookmarks' },
    { name: 'Properties', icon: <FaBuilding />, to: '/myprofile/propertiesBought' },
    { name: 'My Partners', icon: <IoIosContact />, to: '/myprofile/mypartners' },
    { name: 'Clients', icon: <RiTeamFill />, to: '/myprofile/addproperty' },
    { name: 'Settings', icon: <IoIosSettings />, to: '/myprofile/mysettings' },
  ];

  return (
    <div className={styles['sideBar']}>
      <div className={styles['ownerImgName']}>
        <img
          src="https://media.istockphoto.com/id/1392528328/photo/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=6vUtfKvHhNsK9kdNWb7EJlksBDhBBok1bNjNRULsAYs="
          alt="Owner"
        />
        <small>Welcome Back!</small>
        <strong>Shadav Sheikh</strong>
      </div>

      <ul>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={classNames(styles['menuItem'], {
              [styles['active']]: activeClassBorder === item.name,
            })}
            onClick={() => handleClickSideBar(item.name)}
          >
            {item.icon}
            <span className={styles['sideBarOptions']}>{item.name}</span>
          </Link>
        ))}
      </ul>

      <div className={styles['LogoutDiv']}>
        <Link to={'/'}>
          <CiLogout className={styles['barIcons']} />
          <span className={styles['sideBarOptions']}> Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBarBuyer;
