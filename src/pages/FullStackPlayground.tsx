import { useState, useRef, useEffect } from 'react';
import { Code, Search, Loader, Puzzle, Menu, X, Zap, Layers, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import MinimalFooter from "@/components/MinimalFooter";

// --- Sidebar with hamburger, plugins, and recent chats ---
const SIDEBAR_WIDTH = 260;

const defaultChats = [
  { id: '1', title: 'Double Pendulum Simulation' },
  { id: '2', title: 'Heat Diffusion in 2D Plate' },
];

function useRecentChats() {
  const [recentChats, setRecentChats] = useState(() => {
    const stored = localStorage.getItem('simworks_recent_chats');
    return stored ? JSON.parse(stored) : defaultChats;
  });
  useEffect(() => {
    localStorage.setItem('simworks_recent_chats', JSON.stringify(recentChats));
  }, [recentChats]);
  return [recentChats, setRecentChats];
}

const Sidebar = ({ open, onClose, recentChats, onSelectChat }) => (
  <div
    className={`fixed z-40 top-0 left-0 h-full bg-[#181818] border-r border-[#222] flex flex-col transition-transform duration-300
      ${open ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 w-[260px] min-w-[200px] max-w-[90vw]`}
    style={{ width: SIDEBAR_WIDTH }}
  >
    {/* Top: Plugin buttons */}
    <div className="flex items-center justify-between p-4 border-b border-[#222]">
      <div className="flex space-x-2">
        <button className="p-2" title="MatCoder"><Zap size={20} /></button>
        <button className="p-2" title="SimCoder"><Globe size={20} /></button>
        <button className="p-2" title="CfdCoder"><Layers size={20} /></button>
        <button className="p-2" title="Plugins"><Puzzle size={20} /></button>
      </div>
      <button className="lg:hidden p-2 ml-2" onClick={onClose}><X size={22} /></button>
    </div>
    {/* Middle: Recent chats */}
    <div className="flex-1 overflow-y-auto p-2">
      <div className="text-xs text-gray-400 px-2 mb-2">Recent Chats</div>
      {recentChats.length === 0 && (
        <div className="text-gray-500 text-sm px-2 py-4">No recent chats</div>
      )}
      {recentChats.map(chat => (
        <div
          key={chat.id}
          className="truncate px-3 py-2 rounded hover:bg-[#232323] cursor-pointer text-sm text-gray-200 mb-1"
          onClick={() => onSelectChat(chat)}
        >
          {chat.title}
        </div>
      ))}
    </div>
    {/* Bottom: (optional) */}
    <div className="p-4 border-t border-[#222] text-xs text-gray-500">SimWorks v1.0</div>
  </div>
);

const PlaygroundTopBar = ({ tab, setTab }: { tab: 'Code' | 'Agent'; setTab: React.Dispatch<React.SetStateAction<'Code' | 'Agent'>> }) => (
  <div className="flex items-center bg-[#1a1a1a] border-b border-[#333] px-6 h-14">
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

const UserInputArea = ({ onSendMessage, disabled }: { onSendMessage: (msg: string) => void; disabled: boolean }) => {
  const [input, setInput] = useState('');
  return (
    <div className="flex items-center p-4 bg-[#1a1a1a] border-t border-[#333]">
      {/* Plugin/utility buttons */}
      <div className="flex items-center space-x-2 mr-2">
        <button className="p-2 rounded-lg bg-[#232323] text-[#9e9e9e] hover:text-white" title="Search"><Search size={18} /></button>
        <button className="p-2 rounded-lg bg-[#232323] text-[#9e9e9e] hover:text-white animate-spin-slow" title="Thinking"><Loader size={18} /></button>
        <button className="p-2 rounded-lg bg-[#232323] text-[#9e9e9e] hover:text-white" title="Plugins"><Puzzle size={18} /></button>
      </div>
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

const CodeViewer = ({ code }: { code: string }) => (
  <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center overflow-auto">
    <pre className="text-[#9e9e9e] text-left w-full whitespace-pre-wrap p-4">{code || 'Code will appear here'}</pre>
  </div>
);

const AgentTimeline = ({ messages }: { messages: { sender: string; content: string }[] }) => (
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

const FullStackPlayground = () => {
  const [tab, setTab] = useState<'Code' | 'Agent'>('Agent');
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [code, setCode] = useState('');
  const [simulationHtml, setSimulationHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentChats, setRecentChats] = useRecentChats();
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
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'agent', content: data.response }]);
      setCode(data.code || '');
      setSimulationHtml(data.simulation || '');
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'agent', content: 'Error contacting backend.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChat = (chat) => {
    setMessages([{ sender: 'user', content: chat.title }]);
    setCode('');
    setSimulationHtml('');
    setSidebarOpen(false);
  };

  // SimWorks Navigation Bar (copied from Index.tsx)
  const SimWorksNav = () => (
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
              <Link to="/" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Home</Link>
              <Link to="/fullstack-playground" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Playground</Link>
              <Link to="/pricing" className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:scale-105">Pricing</Link>
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
  );

  // Sidebar as a flex child (not fixed) for desktop, drawer for mobile, integrated with playground
  const SidebarContent = (
    <div className="flex flex-col h-full w-56 min-w-[200px] max-w-[90vw] bg-[#181818] border-r border-[#222] rounded-l-2xl lg:rounded-l-2xl md:rounded-l-2xl">
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

  // Playground top bar with hamburger for sidebar (inside playground)
  const PlaygroundTopBar = ({ tab, setTab }: { tab: 'Code' | 'Agent'; setTab: React.Dispatch<React.SetStateAction<'Code' | 'Agent'>> }) => (
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

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <SimWorksNav />
      <div className="flex flex-1 w-full pt-20 pb-8 px-0 md:px-0">
        <div className="flex flex-1 w-full h-full">
          {/* Sidebar for desktop (flex child, not fixed) and drawer for mobile */}
          <div className="hidden lg:flex h-[80vh] md:h-[calc(100vh-120px)]">{SidebarContent}</div>
          {/* Playground container */}
          <div className="flex-1 flex flex-col">
            <div className="flex h-[80vh] md:h-[calc(100vh-120px)] bg-[#0d0d0d] rounded-none md:rounded-r-2xl shadow-xl overflow-hidden border border-[#333]">
              {/* Sidebar drawer for mobile (inside playground) */}
              {sidebarOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 flex lg:hidden" onClick={() => setSidebarOpen(false)}>
                  <div className="h-full" onClick={e => e.stopPropagation()}>
                    {SidebarContent}
                  </div>
                </div>
              )}
              {/* Main playground content */}
              <div className="flex-1 flex flex-col">
                <PlaygroundTopBar tab={tab} setTab={setTab} />
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
        </div>
      </div>
      <MinimalFooter />
    </div>
  );
};

export default FullStackPlayground; 