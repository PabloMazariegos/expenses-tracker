'use client'

import { 
  Navbar, 
  NavbarBrand
} from '@nextui-org/react'

export default function DashboardNavbar() {

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="text-2xl font-extrabold">Expenses Tracker</p>
      </NavbarBrand>
    </Navbar>
  )
}