import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import UserOptions from "./user-options";

export default function NavigationBar(){

  return(
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="text-2xl font-extrabold">Expenses Tracker</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <UserOptions />
      </NavbarContent>      
    </Navbar>
  )
}