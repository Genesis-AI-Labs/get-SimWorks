import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface UserInputAreaProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const UserInputArea = ({ onSendMessage, disabled }: UserInputAreaProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[#333333] p-4 bg-[#1a1a1a]">
      <div className="flex space-x-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask SimWorks to create something..."
          className="flex-1 min-h-[60px] resize-none bg-[#1f1f1f] text-[#f0f0f0] border-[#333333] placeholder:text-[#9e9e9e] focus:border-[#2563eb] focus:ring-[#2563eb]"
          disabled={disabled}
        />
        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="self-end bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-[#2563eb]/50 transition-all duration-300"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div className="text-xs text-[#9e9e9e] mt-2">
        Press Enter to send, Shift+Enter for new line
      </div>
    </form>
  );
};

export default UserInputArea;
