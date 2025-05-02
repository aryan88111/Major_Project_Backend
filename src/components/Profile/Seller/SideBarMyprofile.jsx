import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SideBarMyProfile.module.css';
import { MdSpaceDashboard } from "react-icons/md";
import { FaBuilding, FaThList } from "react-icons/fa";
import { IoIosContact, IoIosSettings } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import classNames from 'classnames';

function SideBarMyprofile() {
  const [activeClassBorder, setActiveClassBorder] = useState('DashBoard');

  useEffect(() => {
    const sideState = localStorage.getItem('sideBarState') || 'DashBoard';
    setActiveClassBorder(sideState);
  }, []);

  const handleClickSideBar = (name) => {
    setActiveClassBorder(name);
    localStorage.setItem('sideBarState', name);
  };

  const menuItems = [
    { name: 'DashBoard', icon: <MdSpaceDashboard />, to: '/myprofile/dashboard' },
    { name: 'Properties', icon: <FaBuilding />, to: '/myprofile/myproperties' },
    { name: 'Contacts', icon: <IoIosContact />, to: '/myprofile/mycontacts' },
    { name: 'Listings', icon: <FaThList />, to: '/myprofile/listing' },
    { name: 'Clients', icon: <RiTeamFill />, to: '/myprofile/myclients' },
    { name: 'Reports', icon: <TbReportSearch />, to: '/myprofile/myreports' },
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
          <span className={styles['sideBarOptions']}>Logout</span>
        </Link>
      </div>
    </div>
  );
}

export default SideBarMyprofile;
