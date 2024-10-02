'use client'

import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  Dropdown, 
  DropdownTrigger, 
  Avatar, 
  DropdownMenu, 
  DropdownItem 
} from '@nextui-org/react'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function DashboardNavbar(
  {
    emailAddress, 
    avatarUrl 
  } : { 
    emailAddress: String | undefined,
    avatarUrl: string | undefined
  }
) {
  const router = useRouter()

  async function handleSignOut () {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <p className="text-2xl font-extrabold">Expenses Tracker</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={avatarUrl}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{emailAddress}</p>
            </DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}