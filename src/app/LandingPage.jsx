import React from 'react';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const LandingPage = () => {
  return (
    <>
    <div>
      {/* Header Section */}
      <header>
        <div className="navbar bg-base-300 px-4 shadow-lg">
          <div className="flex-1 align-left">
            <button className="btn btn-ghost text-2xl font-bold">Print it!</button>
          </div>
          <div className="flex-none">
            <SignInButton>
              <button className="btn btn-outline btn-primary">Sign In</button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp')",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-extrabold text-white">Print it!</h1>
            <p className="mb-5 text-lg">
              Skip the queue and hassle. Get your prints picked up from the shop or delivered to you in no time!
            </p>
            <SignInButton>
              <button className="btn btn-primary btn-wide">Get Started / Sign In</button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer bg-base-300 p-10 text-base-content mt-4">
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Careers</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </div>
        <div>
          <span className="footer-title">Follow Us</span>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Instagram</a>
        </div>
        <div className="mt-4 text-sm">
          © 2024 Print it! All rights reserved.
        </div>
      </footer>
    </div></>
  );
};

export default LandingPage;
