import { useState, useEffect, useRef } from 'react';
import { getAgentResponse, Message, AgentUpdate } from '@/services/mockAgent';
import ChatMessage from './ChatMessage';
import UserInputArea from './UserInputArea';
import SimulationSidebar from './SimulationSidebar';

type AgentStatus = 'idle' | 'thinking' | 'generating' | 'error';

// Placeholder for plugin sidebar
const PlaygroundSidebar = () => (
  <div className="w-16 bg-[#181818] border-r border-[#222] flex flex-col items-center py-4 space-y-4">
    {/* Example plugin icons (replace with your own) */}
    <div className="w-10 h-10 bg-[#232323] rounded-xl flex items-center justify-center text-[#2563eb] font-bold text-lg">C</div>
    <div className="w-10 h-10 bg-[#232323] rounded-xl flex items-center justify-center text-[#eab308] font-bold text-lg">D</div>
    <div className="w-10 h-10 bg-[#232323] rounded-xl flex items-center justify-center text-[#22d3ee] font-bold text-lg">S</div>
  </div>
);

// Placeholder for top tab bar
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

// Placeholder for code viewer
const CodeViewer = () => (
  <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center">
    <span className="text-[#9e9e9e] text-lg">Code will appear here</span>
  </div>
);

// Placeholder for agent timeline
const AgentTimeline = () => {
  // For now, keep welcome content always visible (can add logic for messages later)
  return (
    <div className="flex-1 bg-[#121212] overflow-y-auto p-6 space-y-4">
      {/* Welcome message and Try Asking */} {/* Conditionally render based on messages state */}
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
      {/* Agent actions/messages will go here */}
    </div>
  );
};

// Placeholder for simulation/preview
const SimulationPreview = () => (
  <div className="flex-1 bg-[#181818] rounded-lg m-4 border border-[#222] flex flex-col justify-center items-center">
    <span className="text-[#9e9e9e] text-lg">Simulation/preview will appear here</span>
  </div>
);

const InteractivePlayground = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  const [currentGeneratedCode, setCurrentGeneratedCode] = useState('');
  const [simulationHtml, setSimulationHtml] = useState('');
  const [streamingCode, setStreamingCode] = useState('');
  const [currentStreamingMessageId, setCurrentStreamingMessageId] = useState<string | null>(null);
  const [tab, setTab] = useState<'Code' | 'Agent'>('Agent');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingCode]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setAgentStatus('thinking');

    getAgentResponse(content, (update: AgentUpdate) => {
      if (update.type === 'status') {
        setAgentStatus(update.content?.includes('thinking') ? 'thinking' : 'idle');
        const statusMessage: Message = {
          id: Date.now().toString() + '_status',
          sender: 'system',
          type: 'status',
          content: update.content || '',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, statusMessage]);
      } else if (update.type === 'text') {
        const textMessage: Message = {
          id: Date.now().toString() + '_text',
          sender: 'agent',
          type: 'text',
          content: update.content || '',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, textMessage]);
      } else if (update.type === 'code_stream') {
        setAgentStatus('generating');
        setStreamingCode(update.currentFullCode || '');
        
        if (!currentStreamingMessageId) {
          const codeMessage: Message = {
            id: Date.now().toString() + '_code',
            sender: 'agent',
            type: 'code',
            content: '',
            code: update.currentFullCode || '',
            language: update.language || 'javascript',
            timestamp: new Date(),
          };
          setCurrentStreamingMessageId(codeMessage.id);
          setMessages(prev => [...prev, codeMessage]);
        }
      } else if (update.type === 'code_complete') {
        setAgentStatus('idle');
        setCurrentGeneratedCode(update.fullCode || '');
        setSimulationHtml(update.simulationData || '');
        setStreamingCode('');
        setCurrentStreamingMessageId(null);
        
        // Update the last code message with the complete code
        setMessages(prev => prev.map(msg => 
          msg.id === currentStreamingMessageId 
            ? { ...msg, code: update.fullCode || '' }
            : msg
        ));
        
        // Remove the status message
        setMessages(prev => prev.filter(msg => msg.type !== 'status'));
      }
    });
  };

  const handleReset = () => {
    setSimulationHtml('');
    setCurrentGeneratedCode('');
  };

  return (
    <div className="max-w-full h-[80vh] bg-[#0d0d0d] rounded-2xl shadow-xl overflow-hidden border border-[#333] flex flex-col">
      <div className="flex flex-1 min-h-0">
        <PlaygroundSidebar />
        <div className="flex-1 flex flex-col min-h-0">
          <PlaygroundTopBar tab={tab} setTab={setTab} />
          <div className="flex flex-1 min-h-0">
            {tab === 'Agent' ? (
              <>
                <div className="w-1/2 flex flex-col min-h-0">
                  <AgentTimeline />
                </div>
                <div className="w-1/2 flex flex-col min-h-0 border-l border-[#222]">
                  <SimulationPreview />
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col min-h-0">
                <CodeViewer />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Bottom input bar */}
      <div className="border-t border-[#333] bg-[#1a1a1a]">
        <UserInputArea onSendMessage={handleSendMessage} disabled={agentStatus === 'thinking' || agentStatus === 'generating'} />
      </div>
    </div>
  );
};

export default InteractivePlayground;
