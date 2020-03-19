import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Link} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <>
            <Link  className="p-2" to="/add_post">
                    Add new post
            </Link>
            <span className="p-2 " >or</span>
            <h6 style={{cursor: 'pointer'}} onClick={logout}  className="p-2 text-primary">
               logout
            </h6>
     <UncontrolledDropdown nav inNavbar>
       <DropdownToggle nav caret>
         Hello, {user.username}!
       </DropdownToggle>
       <DropdownMenu right>
         <DropdownItem>
           View profile
         </DropdownItem>

         <DropdownItem divider />
         <DropdownItem onClick={logout}>
           Logout
         </DropdownItem>
       </DropdownMenu>
     </UncontrolledDropdown>
            </>
  );
};

export default UserMenu;