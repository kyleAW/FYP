import React from 'react';

const Navbar = ({ account }) => {
    return (
      <nav className="navbar navbar-dark static-top bg-dark flex-md-nowrap p-0 shadow">
      <h2
        className="navbar-brand col-sm-3 col-md-2 mr-0"          
      >
        IoT Access Control    
      </h2>             

      <ul className="navbar-nav px-5">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">         
          <small className="text-secondary">              
            <small id="account">{account}</small>                      
          </small>         

        </li>
      </ul>
    </nav>
      );
    };

export default Navbar
