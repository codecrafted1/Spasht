import React, { useState } from "react";
import { CustomCursor } from "./components/common/CustomCursor";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { Problem } from "./components/sections/Problem";
import { HowItWorks } from "./components/sections/HowItWorks";
import { DemoSection } from "./components/demo/DemoSection";
import { Trust } from "./components/sections/Trust";
import { Limits } from "./components/sections/Limits";
import { Footer } from "./components/layout/Footer";

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>("en");

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans paper-grain selection:bg-vermilion selection:text-paper">
      {/* Custom Lerp Cursor (Desktop Only via @media pointer:fine) */}
      <CustomCursor />

      {/* Sticky Ruled Minimal Navbar */}
      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} />

      {/* Main Page Landmark */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* 01 / Problem */}
        <Problem />

        {/* 02 / How It Works */}
        <HowItWorks />

        {/* 03 / Interactive Demo */}
        <DemoSection currentLang={currentLang} onLanguageChange={setCurrentLang} />

        {/* 04 / Trust & Responsible AI */}
        <Trust />

        {/* 05 / Limits (Inverted --ink Section) */}
        <Limits />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
