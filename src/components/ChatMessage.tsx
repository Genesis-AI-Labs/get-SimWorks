import { Message } from '@/services/mockAgent';
import CodeBlock from './CodeBlock';

interface ChatMessageProps {
  message: Message;
  streamingCode?: string;
  isStreaming?: boolean;
}

const ChatMessage = ({ message, streamingCode, isStreaming = false }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  const isStatus = message.type === 'status';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && !isStatus && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center text-white text-sm font-bold">
              SW
            </div>
            <span className="ml-2 text-sm text-[#9e9e9e]">SimWorks Agent</span>
          </div>
        )}
        
        <div
          className={`rounded-lg px-4 py-3 ${
            isUser
              ? 'bg-[#2563eb] text-white'
              : isStatus
              ? 'bg-[#1e1e1e] text-[#a8a8a8] italic border border-[#333333]'
              : 'bg-[#1e1e1e] text-[#e0e0e0] border border-[#333333]'
          }`}
        >
          {message.type === 'text' && <p className="whitespace-pre-wrap">{message.content}</p>}
          {message.type === 'status' && <p className="text-sm">{message.content}</p>}
          {message.type === 'code' && (
            <div>
              {message.content && <p className="mb-2">{message.content}</p>}
              <CodeBlock 
                code={streamingCode || message.code || ''} 
                language={message.language || 'javascript'}
                isStreaming={isStreaming}
              />
            </div>
          )}
        </div>
        
        <div className="text-xs text-[#9e9e9e] mt-1 px-1">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
