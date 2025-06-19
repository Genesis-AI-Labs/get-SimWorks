import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Zap, Users, Layers, Smartphone, Globe, Star, Menu, X, Puzzle, ChevronUp, ChevronDown } from "lucide-react";
import InteractivePlayground from "@/components/InteractivePlayground";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureCard from "@/components/FeatureCard";
import BenefitCard from "@/components/BenefitCard";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import HoverDropdown from "@/components/HoverDropdown";

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

// Sidebar content for the playground section
const useRecentChats = () => {
  const [recentChats, setRecentChats] = useState(() => {
    const stored = localStorage.getItem('simworks_recent_chats');
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem('simworks_recent_chats', JSON.stringify(recentChats));
  }, [recentChats]);
  return [recentChats, setRecentChats];
};

const PlaygroundSidebarContent = ({ sidebarOpen, setSidebarOpen, recentChats, handleSelectChat }) => (
  <div className="flex flex-col h-full w-56 min-w-[200px] max-w-[90vw] bg-[#181818] border-r border-[#222] rounded-l-2xl">
    {/* Plugins section at the top */}
    <div className="p-3 border-b border-[#222]">
      <div className="flex flex-col gap-2">
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#232323] text-sm text-gray-200 transition-colors">
          <Puzzle size={18} /> Add Files
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#232323] text-sm text-gray-200 transition-colors">
          <Globe size={18} /> Add Data Source
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-[#232323] text-sm text-gray-200 transition-colors">
          <Layers size={18} /> Add Code
        </button>
      </div>
    </div>
    {/* Divider */}
    <div className="border-b border-[#222] my-1" />
    {/* Recent chats section */}
    <div className="flex-1 overflow-y-auto p-2">
      <div className="text-xs text-gray-400 px-2 mb-2">Recent Chats</div>
      {recentChats.length === 0 && (
        <div className="text-gray-500 text-sm px-2 py-4">No recent chats</div>
      )}
      {recentChats.map(chat => (
        <div
          key={chat.id}
          className="truncate px-3 py-2 rounded hover:bg-[#232323] cursor-pointer text-sm text-gray-200 mb-1"
          onClick={() => handleSelectChat(chat)}
        >
          {chat.title}
        </div>
      ))}
    </div>
    {/* Bottom: (optional) */}
    <div className="p-4 border-t border-[#222] text-xs text-gray-500">SimWorks v1.0</div>
  </div>
);

const PlaygroundTopBar = ({ tab, setTab, setSidebarOpen }) => (
  <div className="flex items-center bg-[#1a1a1a] border-b border-[#333] px-6 h-14">
    <button className="lg:hidden mr-4 p-2" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
    <button
      className={`px-6 py-2 text-lg font-semibold rounded-t-lg transition-all duration-200 ${tab === 'Agent' ? 'bg-[#232323] text-white' : 'text-[#9e9e9e] hover:text-white'}`}
      onClick={() => setTab('Agent')}
    >
      Agent
    </button>
    <button
      className={`ml-2 px-6 py-2 text-lg font-semibold rounded-t-lg transition-all duration-200 ${tab === 'Code' ? 'bg-[#232323] text-white' : 'text-[#9e9e9e] hover:text-white'}`}
      onClick={() => setTab('Code')}
    >
      Code
    </button>
  </div>
);

const PlaygroundSection = () => {
  const [tab, setTab] = useState('Agent');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentChats, setRecentChats] = useRecentChats();
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState('');
  const [simulationHtml, setSimulationHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content) => {
    setMessages(prev => [...prev, { sender: 'user', content }]);
    setLoading(true);
    if (!recentChats.some(c => c.title === content)) {
      setRecentChats([{ id: Date.now().toString(), title: content }, ...recentChats].slice(0, 20));
    }
    // Simulate agent response for landing page demo
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'agent', content: `Agent received: ${content}` }]);
      setCode('% MATLAB code example\nplot(1:10, sin(1:10));');
      setSimulationHtml('<div>Simulation output placeholder</div>');
      setLoading(false);
    }, 800);
  };

  const handleSelectChat = (chat) => {
    setMessages([{ sender: 'user', content: chat.title }]);
    setCode('');
    setSimulationHtml('');
    setSidebarOpen(false);
  };

  // UI for code and agent panes
  const CodeViewer = ({ code }) => (
    <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center overflow-auto">
      <pre className="text-[#9e9e9e] text-left w-full whitespace-pre-wrap p-4">{code || 'Code will appear here'}</pre>
    </div>
  );
  const AgentTimeline = ({ messages }) => (
    <div className="flex-1 bg-[#121212] overflow-y-auto p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="text-center text-[#a8a8a8] mt-20">
          <h3 className="text-xl font-semibold mb-2 text-[#e0e0e0]">Welcome to MatCoder Playground!</h3>
          <p className="mb-4">Ask me to perform your MATLAB task, and I'll write code, create simulation, and run it for you.</p>
          <div className="text-sm bg-[#1e1e1e] rounded-lg p-4 inline-block border border-[#333333]">
            <p className="font-semibold mb-2 text-[#e0e0e0]">Try asking:</p>
            <ul className="text-left space-y-1 text-[#a8a8a8] italic">
              <li>• "Create a simulation of a double pendulum system showing chaotic behavior, and plot its phase space and energy over time."</li>
              <li>• "Create a simulation of heat diffusion in a 2D plate using the finite difference method with Dirichlet boundary conditions."</li>
            </ul>
          </div>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div key={idx} className={`text-left ${msg.sender === 'user' ? 'text-[#2563eb]' : 'text-[#e0e0e0]'}`}>{msg.content}</div>
        ))
      )}
    </div>
  );
  const SimulationPreview = ({ simulationHtml }) => (
    <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center overflow-auto">
      <span className="text-[#9e9e9e] text-lg" dangerouslySetInnerHTML={{ __html: simulationHtml || 'Simulation/preview will appear here' }} />
    </div>
  );
  const UserInputArea = ({ onSendMessage, disabled }) => {
    const [input, setInput] = useState('');
    return (
      <div className="flex items-center p-4 bg-[#1a1a1a] border-t border-[#333]">
        <input
          className="flex-1 bg-[#232323] text-white rounded-lg px-4 py-2 mr-2 outline-none"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && input.trim() && !disabled) {
              onSendMessage(input);
              setInput('');
            }
          }}
          placeholder="Ask SimWorks to create something..."
          disabled={disabled}
        />
        <button
          className="bg-[#2563eb] text-white px-4 py-2 rounded-lg disabled:opacity-50"
          onClick={() => {
            if (input.trim() && !disabled) {
              onSendMessage(input);
              setInput('');
            }
          }}
          disabled={disabled}
        >
          Send
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-1 w-full h-full justify-center items-center">
      {/* Sidebar drawer for mobile (inside playground) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="h-full" onClick={e => e.stopPropagation()}>
            <PlaygroundSidebarContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} recentChats={recentChats} handleSelectChat={handleSelectChat} />
          </div>
        </div>
      )}
      <div className="flex w-full max-w-6xl h-[80vh] bg-[#0d0d0d] rounded-2xl shadow-xl overflow-hidden border border-[#333]">
        {/* Sidebar for desktop (flex child, not fixed) */}
        <div className="hidden lg:flex h-full"> <PlaygroundSidebarContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} recentChats={recentChats} handleSelectChat={handleSelectChat} /> </div>
        {/* Playground content */}
        <div className="flex-1 flex flex-col">
          <PlaygroundTopBar tab={tab} setTab={setTab} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-col lg:flex-row flex-1 min-h-0">
            {tab === 'Agent' ? (
              <>
                <div className="w-full lg:w-1/2 flex flex-col min-h-0">
                  <AgentTimeline messages={messages} />
                  <div ref={messagesEndRef} />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col min-h-0 border-t lg:border-t-0 lg:border-l border-[#222]">
                  <SimulationPreview simulationHtml={simulationHtml} />
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col min-h-0">
                <CodeViewer code={code} />
              </div>
            )}
          </div>
          <div className="w-full">
            <UserInputArea onSendMessage={handleSendMessage} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  // Typewriter effect state
  const phrases = ["Matlab Code", "Simulink MBD",];
  const [displayedText, setDisplayedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const visibleCount = 3;

  // Scroll to top on mount to prevent auto-scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [researchDropdownOpen, setResearchDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/90 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center group">
              {/* <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center mr-3">
                <Code className="w-6 h-6 text-black" />
              </div> */}
              <img src="/logo_solo.png" alt="SimWorks Logo" className="h-10 w-auto mr-3" />

              <span className="text-2xl font-bold text-white">
                SimWorks
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-gray-800/50 backdrop-blur-lg rounded-full p-1 border border-gray-700">
                {/* Products Link */}
                <a href="#Products" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Products</a>
                {/* Playground Link */}
                <a href="#playground" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Playground</a>
                {/* Research Link */}
                <a href="#research" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Research</a>
                {/* Pricing Link */}
                <a href="#pricing" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Pricing</a>
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
            <div className="md:w-1/2 w-full space-y-8 pr-4 md:pr-12">
              <div className="space-y-4">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.2]">
                  <span className="block mb-4">Supercharge</span>
                  <span className="block mb-4 text-gray-400">Your</span>
                  <span className="block h-[1.0em] flex items-center" style={{ minWidth: '22ch', fontFamily: 'monospace' }}>
                    <span className="inline-block min-w-[1ch]">{displayedText}</span>
                    <span className="inline-block w-2 h-8 bg-white animate-pulse ml-1"></span>
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-400 leading-relaxed">
              Experience the future of industry-grade simulations at scale.
              SimWorks’ AI agents turn natural language instructions into validated MATLAB & Simulink models, algorithms, and simulation results — cutting development time by up to 20×.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="https://github.com/simworks-ai/OctCoder">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                    Try OctCoder
                  </Button>
                </Link>
                <Link to="/fullstack-playground">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                    MatCoder AI
                  </Button>
                </Link>
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                  SimCoder AI (Coming Soon)
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 w-full flex justify-center md:justify-end mt-10 md:mt-0 md:mr-12 mr-0 md:pl-2">
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
      {/* <section className="py-12 relative z-10 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-16 opacity-50">
            <div className="text-gray-400 text-sm font-medium">Trusted by</div>
            <div className="flex items-center space-x-16">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo_%282012%29.svg" alt="IBM" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://logowik.com/content/uploads/images/647_toyota.jpg" alt="AWS" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
              <img src="https://cdn.svgporn.com/logos/salesforce.svg" alt="Salesforce" className="h-6 grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </section> */}

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
          <div className="flex flex-1 w-full h-full justify-center items-center">
            <div className="w-full max-w-7xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden relative mx-auto">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500 animate-gradient-x opacity-80"></div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 blur-3xl opacity-50"></div>
              {/* Video Container */}
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <video 
                  className="w-full h-full object-contain bg-[#0d0d0d] rounded-xl border border-[#333]"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src="/simworks_demo_v0.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/fullstack-playground">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                Try MatCoder AI Agent -&gt;
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="Products" className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 text-white">
              Simulations Beyond Boundaries
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            SimWorks Agentic Suite that automate the entire design, simulation, and validation lifecycle for STEM Engineers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* MatCoder Card */}
              <div className="relative bg-[#191A1F] rounded-2xl p-7 flex flex-col min-h-[260px] shadow-lg group overflow-hidden transition-colors duration-500">
                {/* Gradient Overlay for Hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 group-hover:animate-gradient-x bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500"></div>
                <div className="text-gray-300 text-sm mb-8 z-10 relative">From natural language prompts to full Matlab processing pipelines, visualizations, and computations. What used to take weeks now happens in hours, sometimes minutes.</div>
                <div className="mt-auto text-2xl font-bold text-white z-10 relative">MatCoder</div>
              </div>
              {/* Visualize the Impossible Card (SimCoder) */}
              <div className="relative bg-[#191A1F] rounded-2xl p-7 flex flex-col min-h-[260px] shadow-lg group overflow-hidden transition-colors duration-500">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 group-hover:animate-gradient-x bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500"></div>
                <div className="text-gray-300 text-sm mb-8 z-10 relative">Step beyond the ordinary with designs that defy conventions. Our AI conjures up imaginative visuals that push the boundaries of creativity.</div>
                <div className="mt-auto text-2xl font-bold text-white z-10 relative">SimCoder</div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {/* Synergy and Style Card (CfdCoder) */}
              <div className="relative bg-[#191A1F] rounded-2xl p-7 flex flex-col min-h-[180px] shadow-lg group overflow-hidden transition-colors duration-500">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 group-hover:animate-gradient-x bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500"></div>
                <div className="text-gray-300 text-sm mb-8 z-10 relative">Experience the perfect blend of form and function. Our AI ensures that every design not only looks stunning but also serves its purpose flawlessly.</div>
                <div className="mt-auto text-2xl font-bold text-white z-10 relative">CfdCoder</div>
              </div>
              {/* Timeless Precision Card (CadCoder) */}
              <div className="relative bg-[#191A1F] rounded-2xl p-7 flex flex-col min-h-[180px] shadow-lg group overflow-hidden transition-colors duration-500">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 group-hover:animate-gradient-x bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500"></div>
                <div className="text-gray-300 text-sm mb-8 z-10 relative">Embrace the elegance of meticulously crafted designs. Our AI polishes every detail to bring a timeless quality to your creative projects.</div>
                <div className="mt-auto text-2xl font-bold text-white z-10 relative">CadCoder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bold mb-12 text-center text-white">SimWorks Research</h2>
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4">
            {/* Left side: placeholder for future content */}
            <div className="flex-1 flex flex-col justify-center items-start mb-8 md:mb-0">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Advancing Agentic Systems for Simulations</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">We value continuous research and innovation in our agentic systems. Our research is focused on the development and evaluation of AI agents for industry-grade simulations. We support research labs in utilizing our state-of-the-art AI agents in their ecosystem to produce their own simulation-based research.</p>
              <button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold px-8 py-3 rounded-xl text-lg transition">Learn More</button>
            </div>
            {/* Right side: Research card styled like product cards, empty for user content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative bg-[#191A1F] rounded-2xl p-7 flex flex-col min-h-[260px] shadow-lg group overflow-hidden transition-colors duration-500 w-full max-w-md">
                {/* Gradient Overlay for Hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 group-hover:animate-gradient-x bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500"></div>
                {/* Card body left empty for user content */}
                 <div className="text-gray-300 text-sm mb-8 z-10 relative">OctCoder is an agentic framework that simplifies simulation creation and execution in GNU Octave. It uses natural language inputs to generate, run, and summarize simulations via interconnected AI agents. A user-friendly Gradio web interface enables seamless interaction.</div>
                <div className="mt-auto text-2xl font-bold text-white z-10 relative">OctCoder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold mb-4 text-white">Pricing</h2>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Open Source Plan */}
            <div className="relative bg-[#23242a] rounded-2xl p-8 flex flex-col shadow-md min-h-[600px]">
              <div className="text-3xl font-bold text-white mb-2">Open Source</div>
              <div className="text-base text-white mb-8">For Hackers, hobbyists, FOSS projects that run Cua locally or on their own cloud.</div>
              <div className="text-4xl font-bold text-white mb-12">Free</div>
              <div className="mt-auto">
                <div className="text-white font-semibold mb-4">What's included</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-white"><span className="inline-block w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#A3A3A3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>AGPL-3.0 license Core</li>
                  <li className="flex items-center gap-3 text-white"><span className="inline-block w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#A3A3A3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Unlimited Local Agents</li>
                  <li className="flex items-center gap-3 text-white"><span className="inline-block w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#A3A3A3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Community Discord and Docs</li>
                </ul>
                <a href="https://github.com/simworks-ai/OctCoder" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-blue-600 rounded-full py-3 font-semibold shadow hover:bg-blue-50 transition text-lg flex items-center justify-center gap-2"><span>Get Started</span></a>
              </div>
            </div>
            {/* Pro Plan */}
            <div className="relative rounded-2xl p-0 flex flex-col shadow-2xl min-h-[600px] overflow-hidden text-white border-2 border-blue-500 bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500">
              {/* Most Popular badge */}
              <div className="absolute top-6 right-6 bg-white text-blue-600 text-xs font-bold px-4 py-1 rounded-full shadow">Most Popular</div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-3xl font-bold mb-2">Team</div>
                <div className="text-base mb-6">Teams that want hosted agents with no infrastructure headaches.</div>
                <div className="text-5xl font-bold mb-2">$75</div>
                <div className="mb-4"><span className="inline-block bg-white/90 text-green-600 font-semibold px-4 py-1 rounded-full text-sm">-0% discount applied</span></div>
                {/* Slider */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/80 text-sm font-semibold">$75</span>
                  <div className="flex-1 mx-2 flex items-center gap-2">
                    <span className="w-4 h-4 bg-white rounded-full border-2 border-blue-400" />
                    <span className="w-4 h-4 bg-white/30 rounded-full border-2 border-blue-400" />
                    <span className="w-4 h-4 bg-white/30 rounded-full border-2 border-blue-400" />
                    <span className="w-4 h-4 bg-white/30 rounded-full border-2 border-blue-400" />
                    <span className="w-4 h-4 bg-white/30 rounded-full border-2 border-blue-400" />
                  </div>
                  <span className="text-white/80 text-sm font-semibold">$1000</span>
                </div>
                <div className="text-lg font-bold mb-1">5,100 credits</div>
                <div className="text-white/80 text-sm mb-8">425h typical runtime</div>
                <div className="mt-auto">
                  <div className="text-white/80 font-semibold mb-4">What's included</div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3"><span className="inline-block w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff" fillOpacity=".3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Complete access to SOTA SimWorks Agents, we support (macOS, Linux, Windows)</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff" fillOpacity=".3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Usage metered in universal credits</li>
                    <li className="flex items-center gap-3"><span className="inline-block w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff" fillOpacity=".3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Email and Slack support</li>
                  </ul>
                  <a href="https://cal.com/get-simworks/30min" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-blue-600 rounded-full py-3 font-semibold shadow hover:bg-blue-50 transition text-lg flex items-center justify-center gap-2"><span>Purchase Credits</span></a>
                </div>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="relative rounded-2xl p-0 flex flex-col shadow-md min-h-[600px] overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500 text-white">
              <div className="p-8">
                <div className="text-3xl font-bold text-white mb-2">Enterprise</div>
                <div className="text-base text-white">Custom cloud services — contact sales for a quote.</div>
              </div>
              <div className="flex-1 flex flex-col p-8 pt-4">
                <div className="mt-auto">
                  <div className="text-white font-semibold mb-4">What's included</div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-white"><span className="inline-block w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff" fillOpacity=".3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>Everything in Pro</li>
                    <li className="flex items-center gap-3 text-white"><span className="inline-block w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff" fillOpacity=".3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>24/7 support</li>
                    <li className="flex items-center gap-3 text-white"><span className="inline-block w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#fff" fillOpacity=".3"/><path d="M5 8.5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>HIPAA, SOC Type 1/2 Reports</li>
                  </ul>
                  <a href="https://cal.com/get-simworks/30min" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-blue-600 rounded-full py-3 font-semibold shadow hover:bg-blue-50 transition text-lg flex items-center justify-center gap-2"><span>Book a Demo</span><svg xmlns='http://www.w3.org/2000/svg' className='inline-block ml-1' width='20' height='20' fill='none' viewBox='0 0 24 24'><rect x='3' y='4' width='18' height='18' rx='4' fill='none' stroke='#000' strokeWidth='2'/><path d='M16 2v4M8 2v4M3 10h18' stroke='#000' strokeWidth='2' strokeLinecap='round'/></svg></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
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
      </section> */}

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-black">
        <div className="max-w-4xl mx-auto text-center relative z-20">
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
      <Footer />
    </div>
  );
};

const supabaseUrl = 'https://xfpxwvdptdwactwerfln.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmcHh3dmRwdGR3YWN0d2VyZmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzg3MTksImV4cCI6MjA2NDcxNDcxOX0.KRcHQlIZscNQKFpK2nJGty2ie-scRbopDhlv7dMeibw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export default Index;
