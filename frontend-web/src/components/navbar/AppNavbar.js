import React from "react";

import { NavLink } from "react-router-dom";

import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CButton,
} from "@coreui/react";

function AppNavbar() {
  return (
    <CNavbar colorScheme="light" className="bg-body">
      <CContainer fluid>
        <CNavbarBrand href="#">Shopping platform</CNavbarBrand>
        <div>
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            <CButton color="success" className="me-2">
              Sign up
            </CButton>
          </NavLink>
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <CButton color="success">Login</CButton>
          </NavLink>
        </div>
        <CDropdown alignment="end">
          <CDropdownToggle color="secondary">Dhanushka117</CDropdownToggle>
          <CDropdownMenu>
            <NavLink to="/profile" style={{ textDecoration: "none" }}>
              <CDropdownItem>Profile</CDropdownItem>
            </NavLink>
            <CDropdownDivider />
            <NavLink to="/logout" style={{ textDecoration: "none" }}>
              <CDropdownItem>Logout</CDropdownItem>
            </NavLink>
          </CDropdownMenu>
        </CDropdown>
      </CContainer>
    </CNavbar>
  );
}

export default AppNavbar;
