"use client";

import { useState } from 'react';
import { QrCode, Bell } from 'lucide-react';
import AnimatedLogo from './animated-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Header() {
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = ['Home', 'Social Club', 'Events', 'Book Now'];

  return (
    <header className="main-header sticky top-5 z-50 flex flex-col md:flex-row justify-between items-center p-4 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10">
      <div className="header-left flex items-center gap-5">
        <div className="logo text-3xl font-bold flex items-center gap-1.5">
          <span>gr</span>
          <AnimatedLogo />
          <span>tful</span>
        </div>
      </div>
      <nav className="hidden lg:block">
        <ul className="flex gap-2.5 list-none m-0 p-1.5 bg-black/50 rounded-2xl">
          {navLinks.map((link) => (
            <li key={link}>
              <Link
                href={`#${link.toLowerCase().replace(' ', '')}`}
                onClick={() => setActiveLink(link)}
                className={`px-4 py-2 rounded-xl transition-colors duration-300 cursor-pointer ${
                  activeLink === link ? 'bg-background' : ''
                }`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header-right flex items-center gap-5">
        <div className="header-icons flex items-center gap-5 text-xl">
          <QrCode className="cursor-pointer" />
          <div className="notification-icon relative">
            <Bell className="cursor-pointer" />
            <span className="notification-dot absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
          </div>
        </div>
        <Avatar>
          <AvatarImage src="https://placehold.co/36x36" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
