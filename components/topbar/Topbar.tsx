
import Link from "next/link";
import AuthButton from "../AuthButton";

export default function Topbar(){
  
    const headerNavLinks = [
        { href: '/', title: 'Home' },
        { href: '/contact', title: 'Contact Us' },
        { href: '/pricing', title: 'Pricing' },
        { href: '/about', title: 'About' },
      ]
      
    return (
        <header className="ml-auto mr-10 flex items-center justify-between py-10">
            <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
                {headerNavLinks.map((link) => (
                <Link key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400
                sm:block">
                {link.title}
              </Link>
            ))}
            <AuthButton></AuthButton>
        </div>
      </header>
      );
  
}