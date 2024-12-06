import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import WebinarHome from "../components/WebinarHome";
import Webinars from "../components/WebinarHome";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Webinars />
      <AboutUs />
      {/* <ContactUs /> */}
      <Footer />
    </div>
  );
}

export default Home;
