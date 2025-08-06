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
    quote: "HyperSym has drastically cut down my MATLAB coding time. The AI suggestions are incredibly accurate and insightful.",
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
    quote: "I can now go from concept to a working simulation in hours, not weeks. HyperSym is a game-changer for Model-Based Design.",
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
  const [recentChats, setRecentChats] = useState<any[]>([]);
  
  useEffect(() => {
    // Initialize from localStorage on mount
    const stored = localStorage.getItem('simworks_recent_chats');
    if (stored) {
      try {
        setRecentChats(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing stored chats:', error);
        setRecentChats([]);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever recentChats changes
    localStorage.setItem('simworks_recent_chats', JSON.stringify(recentChats));
  }, [recentChats]);
  
  return [recentChats, setRecentChats] as const;
};

const PlaygroundSidebarContent = ({ sidebarOpen, setSidebarOpen, recentChats, handleSelectChat }: any) => (
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
      {recentChats.map((chat: any) => (
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
    <div className="p-4 border-t border-[#222] text-xs text-gray-500">HyperSym v1.0</div>
  </div>
);

const PlaygroundTopBar = ({ tab, setTab, setSidebarOpen }: any) => (
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
  const [messages, setMessages] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [simulationHtml, setSimulationHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
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

  const handleSelectChat = (chat: any) => {
    setMessages([{ sender: 'user', content: chat.title }]);
    setCode('');
    setSimulationHtml('');
    setSidebarOpen(false);
  };

  // UI for code and agent panes
  const CodeViewer = ({ code }: { code: string }) => (
    <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center overflow-auto">
      <pre className="text-[#9e9e9e] text-left w-full whitespace-pre-wrap p-4">{code || 'Code will appear here'}</pre>
    </div>
  );
  
  const AgentTimeline = ({ messages }: { messages: any[] }) => (
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
  
  const SimulationPreview = ({ simulationHtml }: { simulationHtml: string }) => (
    <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center overflow-auto">
      <span className="text-[#9e9e9e] text-lg" dangerouslySetInnerHTML={{ __html: simulationHtml || 'Simulation/preview will appear here' }} />
    </div>
  );
  
  const UserInputArea = ({ onSendMessage, disabled }: { onSendMessage: (message: string) => void; disabled: boolean }) => {
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
          placeholder="Ask HyperSym to create something..."
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
        <div className="hidden lg:flex h-full"> 
          <PlaygroundSidebarContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} recentChats={recentChats} handleSelectChat={handleSelectChat} /> 
        </div>
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
  const phrases = ["Matlab Code", "Simulink Models", "CFD Simulation"];
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
    let timeout: ReturnType<typeof setTimeout>;

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
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleProductClick = (index: number) => {
    if (index !== selectedProduct) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedProduct(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const products = [
    {
      id: 0,
      title: "Transparent Data Delivery with Benchmark Insights",
      description: "Access your data through our visual dataset viewer, complete with benchmark scores and quality metrics. You'll see exactly what was built, how it performs, and where it fits in your development pipeline. We offer unlimited revisions until you're confident in every datapoint—so you can move forward with certainty, not assumptions.",
      badge: "DELIVERY",
      color: "blue"
    },
    {
      id: 1,
      title: "Kick Off Data Creation with Top Talent on Our Gamified Platform", 
      description: "Once your needs are defined, our curated pool of world-class engineers and annotators gets to work. Using our proprietary gamified platform, we drive high engagement, precision, and speed—ensuring your data is generated and labeled by top performers incentivized to solve real AI problems, not just complete tasks. Our users include top software & research engineers at leading companies & startups.",
      badge: "DATA CREATION",
      color: "green"
    },
    {
      id: 2,
      title: "Quality Check with Advanced Validation Systems",
      description: "Every piece of data goes through our multi-layered quality assurance process. Our advanced validation systems ensure accuracy, consistency, and reliability before delivery. Real-time monitoring and automated checks catch issues early, maintaining the highest standards throughout the entire pipeline.",
      badge: "QUALITY CHECK", 
      color: "purple"
    },
    {
      id: 3,
      title: "Evaluation and Performance Optimization",
      description: "Comprehensive evaluation metrics and performance analysis help you understand exactly how your data performs. Our evaluation framework provides detailed insights into model performance, data quality scores, and optimization recommendations to ensure your AI systems achieve peak performance.",
      badge: "EVALUATION",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white overflow-x-hidden relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50" style={{background:'transparent',border:'none',boxShadow:'none'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16">
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Home</Link>
              <a href="#Products" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Products</a>
              <a href="#platform" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Platform</a>
              <Link to="/services" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Services</Link>
              <a href="#research" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Research</a>
              <Link to="/careers" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Careers</Link>
            </div>
          </div>
        </div>
        
        {/* Detached Logo - Top Left */}
        <div className="absolute top-4 left-4 sm:left-8">
          <div className="flex items-center gap-2">
            <img src="/hypersym_logo_small.png" alt="HyperSym Logo" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-white">
              HyperSym
            </span>
          </div>
        </div>
        
        {/* Detached Button - Top Right */}
        <div className="absolute top-4 right-4 sm:right-8">
          <Link to="/get-started">
            <Button className="bg-gray-800 text-white hover:bg-gray-700 text-sm px-6 py-2.5 rounded-lg font-medium transition-all duration-200 border border-gray-600">
              SCHEDULE A CALL <ArrowRight className="inline-block ml-1" size={14} />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            `radial-gradient(circle at 0% 100%, #eaf6ff 0%, #3e7cb1 22%, transparent 45%), 
             radial-gradient(ellipse 120% 80% at 75% 50%, transparent 0%, transparent 35%, rgba(16, 22, 36, 0.6) 50%, #000000 65%, #000000 100%),
             linear-gradient(90deg, transparent 0%, rgb(14, 22, 42) 25%, #101624 45%, rgba(0, 0, 0, 0.8) 58%, #000000 62%, #000000 100%)`,
        }}
      >
        {/* Enhanced Line Pattern Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              `repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.15) 0px,
                rgba(255,255,255,0.15) 1px,
                transparent 1px,
                transparent 25px
              ),
              repeating-linear-gradient(
                to right,
                rgba(255,255,255,0.12) 0px,
                rgba(255,255,255,0.12) 1px,
                transparent 1px,
                transparent 40px
              ),
              repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.06) 0px,
                rgba(255,255,255,0.06) 1px,
                transparent 1px,
                transparent 50px
              ),
              repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.04) 0px,
                rgba(255,255,255,0.04) 1px,
                transparent 1px,
                transparent 70px
              )`,
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
          }}
        />
        {/* Subtle corner lines (top-left and bottom-right) */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* Top-left corner */}
          <svg width="80" height="80" className="absolute left-0 top-0" style={{opacity:0.18}}>
            <polyline points="0,40 0,0 40,0" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>
          {/* Bottom-right corner */}
          <svg width="80" height="80" className="absolute right-0 bottom-0" style={{opacity:0.18}}>
            <polyline points="40,80 80,80 80,40" fill="none" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Gradient overlays for extra depth */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Bottom gradient glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#1a2747]/30 to-transparent" />
          {/* Blue accent light from bottom left */}
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/15 blur-[200px]" />
        </div>
        <div className="relative z-20 max-w-8xl mx-auto w-full px-8 sm:px-12 lg:px-16 pb-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 min-h-[75vh]">
            <div className="lg:w-3/5 w-full space-y-10">
              <div className="space-y-8">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg">
                  <span className="block mb-2">Supercharge</span>
                  <span className="block mb-4 text-gray-500">Your</span>
                  <span className="block text-white">
                    <span className="inline-block">{displayedText}</span>
                    <span className="inline-block w-1 h-8 bg-white animate-pulse ml-2"></span>
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mt-6">
              Re-imagine industrial simulations at scale.
              HyperSym Agents turn natural language instructions into validated simulation models — cutting development time by up to 20×.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-8">
                <Link to="/get-started">
                  <Button size="lg" className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg border-0 relative overflow-hidden" 
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                    SCHEDULE A CALL <ArrowRight className="inline-block ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg border-0 relative overflow-hidden" 
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                    CAREERS <ArrowRight className="inline-block ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-2/5 w-full flex justify-center lg:justify-end items-center mt-10 lg:mt-0 pr-8 lg:pr-16">
              <div className="relative w-full max-w-2xl">
                <img 
                  src="/animation_mesh_240_c24.gif" 
                  alt="Animated Mesh" 
                  className="w-full h-auto object-contain"
                  style={{ 
                    minWidth: '400px',
                    maxWidth: '800px',
                    width: '100%'
                  }}
                  onError={(e) => {
                    console.log('GIF failed to load:', e);
                    (e.target as HTMLImageElement).style.border = '2px solid red';
                  }}
                  onLoad={() => console.log('GIF loaded successfully')}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Backed By section - positioned at bottom */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 text-sm">
              <span className="text-gray-500">Building At</span>
              <div className="px-4 py-2 bg-[#1a1f2a] rounded border border-gray-800/50">
                <span className="text-gray-400 font-semibold">LossFunk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform */}
      <section 
        id="platform" 
        className="pt-1 pb-1 relative z-10 overflow-hidden"
        style={{
          background: '#000000'
        }}
      >
        {/* White grid lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background:
              `repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.4) 0px,
                rgba(255,255,255,0.4) 1px,
                transparent 1px,
                transparent 40px
              ),
              repeating-linear-gradient(
                to right,
                rgba(255,255,255,0.4) 0px,
                rgba(255,255,255,0.4) 1px,
                transparent 1px,
                transparent 40px
              )`
          }}
        />
        <div className="w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center min-h-screen">
            {/* Left side - Text content */}
            <div className="order-2 lg:order-1 lg:col-span-3 text-left px-8 sm:px-12 lg:px-16 py-8 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium mb-3 text-white tracking-tight leading-tight font-sans">
                Platform
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed font-normal font-sans">
                Our integrated platform brings together simulation, AI, and collaboration tools. Design, simulate, and iterate faster with our cloud-native workspace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/fullstack-playground">
                  <Button 
                    size="lg" 
                    className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg border-0 relative overflow-hidden"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: '0 4px 12px rgba(255,255,255,0.3)'
                    }}
                  >
                    Explore Platform
                    <ArrowRight className="inline-block ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side - Video with simple effect */}
            <div className="order-1 lg:order-2 lg:col-span-9 px-6 py-2">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.15)] bg-black transition-all duration-300 hover:scale-[1.02]">
                <div className="relative w-full" style={{paddingTop: '65%'}}>
                  <video 
                    className="absolute inset-0 w-full h-full object-contain"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="/simworks_demo_v1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section 
        id="Products" 
        className="relative z-10 overflow-hidden"
        style={{
          background: '#000000'
        }}
      >
        {/* White grid lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background:
              `repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.4) 0px,
                rgba(255,255,255,0.4) 1px,
                transparent 1px,
                transparent 40px
              ),
              repeating-linear-gradient(
                to right,
                rgba(255,255,255,0.4) 0px,
                rgba(255,255,255,0.4) 1px,
                transparent 1px,
                transparent 40px
              )`
          }}
        />
        <div className="w-full relative z-10">
          {/* Section Header */}
          <div className="py-8 px-6 lg:px-8 text-left px-8 sm:px-12 lg:px-16">
            <h2 className="text-2xl sm:text-3xl font-medium mb-3 text-white font-sans">
              Meet Simmy! Your AI‑Powered Simulation Co‑Pilot
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-sans">
              HyperSym Agentic Suite that automate the entire design, simulation, and validation lifecycle for STEM Engineers.            </p>
          </div>

          {/* Products Content */}
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Vertical List */}
            <div className="lg:w-1/2 flex flex-col justify-start p-8 lg:p-16">
              
              {/* Step indicators */}
              <div className="flex flex-col space-y-6">
                {products.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`cursor-pointer transition-all duration-300 p-4 rounded-lg border-l-4 ${
                      selectedProduct === index 
                        ? 'border-white bg-white/5 shadow-lg' 
                        : 'border-gray-500 hover:border-gray-300 hover:bg-white/5'
                    }`}
                    onClick={() => handleProductClick(index)}
                  >
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        selectedProduct === index ? 'bg-white' : 'bg-gray-500'
                      }`} />
                      <span className={`text-xs font-semibold tracking-wider ${
                        selectedProduct === index ? 'text-white' : 'text-gray-400'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                    <h3 className={`text-base font-medium leading-tight transition-colors duration-300 ${
                      selectedProduct === index ? 'text-white' : 'text-gray-400'
                    }`}>
                      {product.title}
                    </h3>
                  </div>
                ))}
              </div>

              {/* GET STARTED Button */}
              <div className="mt-8">
                <Button 
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg border-0 relative overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    boxShadow: '0 4px 12px rgba(255,255,255,0.3)'
                  }}
                >
                  GET STARTED <ArrowRight className="inline-block ml-2" size={20} />
                </Button>
              </div>

            </div>
            
            {/* Right Side - Content Display */}
            <div className="lg:w-1/2 flex flex-col justify-start pt-8 lg:pt-16 p-8 lg:px-16 pb-8">
              <div 
                className={`w-full transition-all duration-500 ease-out ${
                  isTransitioning 
                    ? 'transform translate-y-8 opacity-0' 
                    : 'transform translate-y-0 opacity-100'
                }`}
              >
                {/* Main graphic area - positioned at top */}
                <div className="mb-6 w-full flex items-center justify-center">
                  {/* Hero gradient box with very thin borders */}
                  <div 
                    className="rounded-xl p-4 relative overflow-hidden inline-block"
                    style={{
                      background: `radial-gradient(circle at 0% 100%, #eaf6ff 0%, #3e7cb1 22%, transparent 45%), 
                                  radial-gradient(ellipse 120% 80% at 75% 50%, transparent 0%, transparent 35%, rgba(16, 22, 36, 0.6) 50%, #000000 65%, #000000 100%),
                                  linear-gradient(90deg, transparent 0%, rgb(14, 22, 42) 25%, #101624 45%, rgba(0, 0, 0, 0.8) 58%, #000000 62%, #000000 100%)`
                    }}
                  >
                    {/* Platform Visualization */}
                    <img 
                      src="/hypersym_platform_simulation.png" 
                      alt="Simulation Platform" 
                      className="object-contain rounded-lg block w-full h-full"
                      style={{ 
                        height: '420px',
                        width: '780px',
                        maxWidth: 'calc(90vw - 2rem)',
                        filter: 'brightness(1.1) contrast(1.05)'
                      }}
                    />
                  </div>
                </div>
                
                {/* Content description - positioned below graphic */}
                <div className="text-left">
                  <h2 className="text-2xl font-medium text-white mb-4">
                    {products[selectedProduct].title}
                  </h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {products[selectedProduct].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-24 px-6 relative z-10 bg-white" style={{borderRadius: '50px 50px 0 0', marginTop: '-50px', paddingTop: '74px'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side content */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-2 text-gray-900 font-sans">HyperSym Research</h2>
              <h3 className="text-xl sm:text-2xl font-medium mb-6 text-gray-800 font-sans">Advancing Agentic Systems for Simulations</h3>
              <p className="text-base text-gray-600 mb-8 leading-relaxed font-normal font-sans">
                We value continuous research and innovation in our agentic systems. Our research is focused on the development and evaluation of AI agents for industry-grade simulations. We support research labs in utilizing our state-of-the-art AI agents in their ecosystem to produce their own simulation-based research.
              </p>
              <Link to="/get-started">
                <Button 
                  size="lg" 
                  className="bg-gray-900 text-white hover:bg-gray-800 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg border-0 relative overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                >
                  Apply for Research Program
                  <ArrowRight className="inline-block ml-2" size={20} />
                </Button>
              </Link>
            </div>
            
            {/* Right side - OCTcoder card */}
            <div>
              <a href="https://github.com/simworks-ai/OctCoder" target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-medium text-gray-900 font-sans">OCTcoder</h3>
                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Open Source</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-sans">
                      OctCoder is an agentic framework that simplifies simulation creation and execution in GNU Octave. It uses natural language inputs to generate, run, and summarize simulations via interconnected AI agents. A user-friendly Gradio web interface enables seamless interaction.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">View on GitHub</span>
                    <ArrowRight className="text-gray-400" size={20} />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-24 px-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div 
            className="rounded-3xl p-12 lg:p-16 relative overflow-hidden"
            style={{
              background: `radial-gradient(circle at 0% 50%, rgba(234, 246, 255, 0.4) 0%, #3e7cb1 20%, #1e3a8a 40%, transparent 60%), 
                          linear-gradient(90deg, transparent 0%, #1e3a8a 30%, #0f172a 60%, #000000 100%)`
            }}
          >
            {/* Enhanced Line Pattern Overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background:
                  `repeating-linear-gradient(
                    to bottom,
                    rgba(255,255,255,0.15) 0px,
                    rgba(255,255,255,0.15) 1px,
                    transparent 1px,
                    transparent 25px
                  ),
                  repeating-linear-gradient(
                    to right,
                    rgba(255,255,255,0.12) 0px,
                    rgba(255,255,255,0.12) 1px,
                    transparent 1px,
                    transparent 40px
                  ),
                  repeating-linear-gradient(
                    45deg,
                    rgba(255,255,255,0.06) 0px,
                    rgba(255,255,255,0.06) 1px,
                    transparent 1px,
                    transparent 50px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    rgba(255,255,255,0.04) 0px,
                    rgba(255,255,255,0.04) 1px,
                    transparent 1px,
                    transparent 70px
                  )`,
                maskImage: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
              }}
            />
            {/* Subtle corner lines */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* Top-left corner */}
              <svg width="80" height="80" className="absolute left-0 top-0" style={{opacity:0.18}}>
                <polyline points="0,40 0,0 40,0" fill="none" stroke="#fff" strokeWidth="1.5" />
              </svg>
              {/* Bottom-right corner */}
              <svg width="80" height="80" className="absolute right-0 bottom-0" style={{opacity:0.18}}>
                <polyline points="40,80 80,80 80,40" fill="none" stroke="#fff" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Gradient overlays for extra depth */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Bottom gradient glow */}
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#1a2747]/30 to-transparent" />
              {/* Blue accent light from bottom left */}
              <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/15 blur-[200px]" />
            </div>
            
            <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 text-white font-sans">
                Ready to Revolutionize Your Simulations?
              </h2>
              <p className="text-lg text-gray-300 mb-10 font-normal font-sans">
                Join thousands of engineers who are already using HyperSym to accelerate their development cycles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-started">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg border-0 relative overflow-hidden w-full sm:w-auto"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  >
                    Schedule a Demo
                    <ArrowRight className="inline-block ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button 
                    size="lg" 
                    className="bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-gray-900 text-lg px-8 py-4 font-semibold transition-all duration-200 shadow-lg relative overflow-hidden w-full sm:w-auto"
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      boxShadow: '0 4px 12px rgba(255,255,255,0.1)'
                    }}
                  >
                    Try for Free
                    <ArrowRight className="inline-block ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
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
