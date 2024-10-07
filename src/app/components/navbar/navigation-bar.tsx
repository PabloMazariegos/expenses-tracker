'use client';

import React from 'react';
import UserOptions from './user-options';
import NextLink from 'next/link';
import { useUserSessionContext } from '@/app/providers';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarMenuToggle,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
	const session = useUserSessionContext();
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const dashboardItems = [
		{ title: 'Dashboard', route: '/dashboard' },
		{ title: 'Accounts', route: '/dashboard/accounts' },
		{ title: 'Transactions', route: '/dashboard/transactions' },
		{ title: 'Budgets', route: '/dashboard/budgets' }
	];

	const landingItems = [
		{ title: 'Features', route: '/#features' },
		{ title: 'AI', route: '/#AI' },
		{ title: 'Signup', route: '/#signup' }
	]

	function handleMenuItemClick() {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		}
	}

	const navItems = session && pathname.startsWith('/dashboard') ? dashboardItems : landingItems;

	const isActive = (route: string) => pathname === route;

	const NavLink = ({ title, route }: { route: string; title: string }) => (
		<NextLink href={route} passHref>
			<span
				className={isActive(route) ? 'text-primary font-bold' : 'text-foreground'}
				onClick={handleMenuItemClick}
			>
				{title}
			</span>
		</NextLink>
	);

	return (
		<Navbar maxWidth='xl' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />

				<NavbarBrand>
					<NextLink href={session ? '/dashboard' : '/'} passHref>
						<p className='text-xl font-extrabold '>ExpenseTracker</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				{navItems.map(({ title, route }) => (
					<NavbarItem key={title} isActive={isActive(route)}>
						<NavLink title={title} route={route} />
					</NavbarItem>
				))}
			</NavbarContent>

			<NavbarMenu>
				{navItems.map(({ title, route }, index) => (
					<NavbarMenuItem key={`${title}-${index}`} isActive={isActive(route)}>
						<NavLink title={title} route={route} />
					</NavbarMenuItem>
				))}
			</NavbarMenu>

			<NavbarContent as='div' justify='end'>
				<UserOptions />
			</NavbarContent>
		</Navbar>
	);
}
