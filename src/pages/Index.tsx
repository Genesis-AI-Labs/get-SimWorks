import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Zap, Users, Layers, Smartphone, Globe, Star } from "lucide-react";
import InteractivePlayground from "@/components/InteractivePlayground";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureCard from "@/components/FeatureCard";
import BenefitCard from "@/components/BenefitCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    quote: "SimWorks has drastically cut down my MATLAB coding time. The AI suggestions are incredibly accurate and insightful.",
    author: "Dr. Anya Sharma, Aerospace Engineer",
    avatar: "https://images.unsplash.com/photo-1590649880765-91b1956b8276?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "from-gray-800 to-gray-900",
  },
  
  {
    quote: "Debugging complex Simulink models used to be a nightmare. SimCoder's analysis tools pinpoint issues instantly.",
    author: "Ben Carter, Robotics Researcher",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "from-gray-800 to-gray-900",
  },
  {
    quote: "I can now go from concept to a working simulation in hours, not weeks. SimWorks is a game-changer for Model-Based Design.",
    author: "Chloe Lee, Automotive Systems Engineer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&q=80&w=100&h=100",
    bgColor: "from-gray-800 to-gray-900",
  },
  {
    quote: "The intuitive natural language interface of MatCoder makes generating code feel effortless, even for complex tasks.",
    author: "David Chen, Chemical Engineer",
    avatar: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&q=80&w=100&h=100",
    bgColor: "from-gray-800 to-gray-900",
  },
];

const Index = () => {
  // Typewriter effect state
  const phrases = ["Matlab Simulations", "Simulink Models", "Model Based Design"];
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const currentPhrase = phrases[phraseIdx];

    if (typing) {
      // Typing phase
      if (charIdx < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentPhrase[charIdx]);
          setCharIdx((prev) => prev + 1);
        }, 120); // Typing speed
      } else {
        // Finished typing current phrase, transition to erasing after a pause
        timeout = setTimeout(() => {
          setTyping(false);
        }, 800); // Reduced wait before erasing
      }
    } else {
      // Erasing phase
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIdx((prev) => prev - 1);
        }, 80); // Erasing speed
      } else {
        // Finished erasing, move to next phrase after a pause and start typing
        timeout = setTimeout(() => {
          setTyping(true); // Set typing back to true
          setPhraseIdx((prev) => (prev + 1) % phrases.length); // Move to the next phrase
          setCharIdx(0); // Reset character index for the new phrase
        }, 400); // Reduced wait before typing the next phrase
      }
    }

    return () => clearTimeout(timeout);
  }, [charIdx, typing, phraseIdx, phrases]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const arr = [];
    for (let i = 0; i < Math.min(visibleCount, testimonials.length); i++) {
      arr.push(testimonials[(testimonialIdx + i) % testimonials.length]);
    }
    return arr;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/90 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mr-3">
                <Code className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-bold text-white">
                SimWorks
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-gray-800/50 backdrop-blur-lg rounded-full p-1 border border-gray-700">
                <a href="#features" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Features</a>
                <a href="#playground" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Playground</a>
                <a href="#testimonials" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Reviews</a>
                <a href="/pricing" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Pricing</a>
              </div>
            </div>
            
            <Link to="/get-started">
              <Button className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 w-full space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="block">Supercharge</span>
                  <span className="block text-gray-400">Your</span>
                  <span className="block min-h-[1em]">{displayedText}&nbsp;<span className="inline-block w-2 h-8 bg-white align-middle animate-pulse" style={{ verticalAlign: 'middle' }}></span></span>
                </h1>
              </div>
              <p className="text-xl text-gray-400 leading-relaxed">
              Experience the future of Model-Based Design. SimWorks' AI agents transform your natural language instructions into validated MATLAB & Simulink models, algorithms, and simulation results – slashing development time by up to 20x.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                    MatCoder AI
                  </Button>
                </Link>
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                  SimCoder AI (Coming Soon)
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 w-full flex justify-center md:justify-end mt-10 md:mt-0 md:mr-12 mr-0">
              <img 
                src="/animation_mesh_240_c24.gif" 
                alt="Animated Mesh" 
                style={{ aspectRatio: '4/3', maxWidth: '500px', width: '100%', height: 'auto', borderRadius: '1rem', boxShadow: '0 4px 32px rgba(0,0,0,0.15)' }}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Carousel */}
      <section className="py-12 relative z-10 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-16 opacity-50">
            <div className="text-gray-400 text-sm font-medium">Trusted by</div>
            <div className="flex items-center space-x-16">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://cdn.svgporn.com/logos/aws.svg" alt="AWS" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://cdn.svgporn.com/logos/salesforce.svg" alt="Salesforce" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Playground */}
      <section id="playground" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              MatCoder Agentic Playground
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch MatCoder transform your ideas into simulations. Type anything and see magic happen.
            </p>
          </div>
          <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
            <InteractivePlayground />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              Simulations Beyond Boundaries
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Revolutionary AI tools that automate the entire design, simulation, and validation lifecycle for STEM Engineers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 h-full hover:scale-105 transition-all duration-500 group flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold">MatCoder</h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {/* From natural language prompts to full Matlab processing pipelines, visualizations, and computations. What used to take weeks now happens in hours, sometimes minutes. */}
                </p>
                <div className="flex justify-center items-center flex-grow">
                  <img src="/matcoder_simple.png" alt="MatCoder Simple Diagram" className="w-full h-full" />
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 hover:scale-105 transition-all duration-500 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">SimCoder</h3>
                <p className="text-gray-400 text-sm">Computer Use AI agents write, optimize, and debug sophisticated algorithms tailored for your specific MBD tasks, minimizing errors and freeing your engineers for high-level innovation.</p>
              </div>
              
              <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 hover:scale-105 transition-all duration-500 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-xl font-bold mb-2">CfdCoder</h3>
                <p className="text-gray-400 text-sm">Agents that auto-adapt to your CFD simulation solver like OpenFoam</p>
              </div>

              {/* CadCoder Card */}
              <div className="bg-gray-900 rounded-3xl p-6 border border-gray-800 hover:scale-105 transition-all duration-500 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4">
                  {/* Placeholder for CadCoder Icon */}
                  <span className="text-black text-lg font-bold">CAD</span>
                </div>
                <h3 className="text-xl font-bold mb-2">CadCoder</h3>
                <p className="text-gray-400 text-sm">AI agents for CAD design and automation (details to come).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              Loved by 10x STEM Engineers
            </h2>
          </div>
          <div className="overflow-hidden w-full">
            <div className="flex gap-8 animate-testimonial-scroll">
              {testimonials.concat(testimonials).map((t, idx) => (
                <div key={idx} className="w-full sm:w-[340px] md:w-[320px] flex-shrink-0">
                  <TestimonialCard
                    quote={t.quote}
                    author={t.author}
                    avatar={t.avatar}
                    bgColor={t.bgColor}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl sm:text-7xl font-bold mb-8 text-white leading-tight">
            Ready to Create the Impossible?
          </h2>
          <p className="text-2xl text-gray-400 mb-12 leading-relaxed">
            Join the revolution. Build the future.
          </p>
          <Link to="/get-started">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-xl px-12 py-6 rounded-full transform hover:scale-110 transition-all duration-300">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-8 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy</a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 SimWorks. Crafting the future.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
