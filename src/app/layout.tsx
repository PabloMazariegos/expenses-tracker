import './globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { Providers } from './providers';
import NavigationBar from './components/navbar/navigation-bar';
import Footer from './components/footer/Footer';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Expenses tracker',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>					
					<NavigationBar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
