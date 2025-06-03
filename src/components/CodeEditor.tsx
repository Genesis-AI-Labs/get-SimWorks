
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, Play, FileText, Folder, Settings, Search } from "lucide-react";

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('app.jsx');

  const codeContent = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Welcome to SimWorks!');

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setMessage(\`You clicked \${count + 1} times!\`);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Counter reset!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center"
      >
        <h1 className="text-3xl font-bold mb-4">{message}</h1>
        <div className="text-6xl font-mono mb-6">{count}</div>
        <div className="space-x-4">
          <Button onClick={handleIncrement} className="bg-blue-600 hover:bg-blue-700">
            Increment
          </Button>
          <Button onClick={handleReset} variant="outline" className="text-white border-white hover:bg-white/20">
            Reset
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default App;`;

  const tabs = [
    { name: 'app.jsx', active: true },
    { name: 'components.jsx', active: false },
    { name: 'styles.css', active: false }
  ];

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Gradient background wrapper */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 rounded-2xl p-1">
        <div className="bg-gray-900 rounded-2xl overflow-hidden">
          {/* VS Code Header */}
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm ml-4">SimWorks Editor</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-12 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 space-y-4">
              <FileText className="w-6 h-6 text-blue-400" />
              <Folder className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Search className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>

            {/* File Explorer */}
            <div className="w-64 bg-gray-850 border-r border-gray-700">
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-sm font-medium text-gray-300">EXPLORER</h3>
              </div>
              <div className="p-2">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-300 hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>app.jsx</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
                    <FileText className="w-4 h-4" />
                    <span>components.jsx</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span>styles.css</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 hover:bg-gray-700 rounded px-2 py-1 cursor-pointer">
                    <FileText className="w-4 h-4 text-green-400" />
                    <span>package.json</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1">
              {/* Tab Bar */}
              <div className="bg-gray-800 border-b border-gray-700 flex">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    className={`px-4 py-2 text-sm border-r border-gray-700 cursor-pointer transition-colors ${
                      tab.name === activeTab 
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-750'
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                  </div>
                ))}
              </div>

              {/* Code Content */}
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white bg-gray-800/50 backdrop-blur-sm"
                    onClick={() => navigator.clipboard.writeText(codeContent)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <pre className="bg-gray-900 text-gray-100 p-6 font-mono text-sm leading-relaxed overflow-x-auto max-h-96">
                  <code>
                    <span className="text-purple-400">import</span> <span className="text-yellow-300">React</span>, {`{ `}<span className="text-blue-300">useState</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-300">'react'</span>;{'\n'}
                    <span className="text-purple-400">import</span> {`{ `}<span className="text-blue-300">motion</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-300">'framer-motion'</span>;{'\n'}
                    <span className="text-purple-400">import</span> {`{ `}<span className="text-blue-300">Button</span> {`}`} <span className="text-purple-400">from</span> <span className="text-green-300">'@/components/ui/button'</span>;{'\n\n'}
                    
                    <span className="text-purple-400">function</span> <span className="text-yellow-300">App</span>() {`{`}{'\n'}
                    {'  '}<span className="text-purple-400">const</span> [<span className="text-blue-300">count</span>, <span className="text-blue-300">setCount</span>] = <span className="text-yellow-300">useState</span>(<span className="text-orange-300">0</span>);{'\n'}
                    {'  '}<span className="text-purple-400">const</span> [<span className="text-blue-300">message</span>, <span className="text-blue-300">setMessage</span>] = <span className="text-yellow-300">useState</span>(<span className="text-green-300">'Welcome to SimWorks!'</span>);{'\n\n'}
                    
                    {'  '}<span className="text-purple-400">const</span> <span className="text-yellow-300">handleIncrement</span> = () =&gt; {`{`}{'\n'}
                    {'    '}<span className="text-yellow-300">setCount</span>(<span className="text-blue-300">prev</span> =&gt; <span className="text-blue-300">prev</span> + <span className="text-orange-300">1</span>);{'\n'}
                    {'    '}<span className="text-yellow-300">setMessage</span>(<span className="text-green-300">`You clicked $</span>{`{`}<span className="text-blue-300">count</span> + <span className="text-orange-300">1</span>{`}`}<span className="text-green-300"> times!`</span>);{'\n'}
                    {'  '}{`}`};{'\n\n'}
                    
                    {'  '}<span className="text-purple-400">const</span> <span className="text-yellow-300">handleReset</span> = () =&gt; {`{`}{'\n'}
                    {'    '}<span className="text-yellow-300">setCount</span>(<span className="text-orange-300">0</span>);{'\n'}
                    {'    '}<span className="text-yellow-300">setMessage</span>(<span className="text-green-300">'Counter reset!'</span>);{'\n'}
                    {'  '}{`}`};{'\n\n'}
                    
                    {'  '}<span className="text-purple-400">return</span> ({'\n'}
                    {'    '}&lt;<span className="text-red-300">div</span> <span className="text-blue-300">className</span>=<span className="text-green-300">"min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center"</span>&gt;{'\n'}
                    {'      '}&lt;<span className="text-red-300">motion.div</span> {'\n'}
                    {'        '}<span className="text-blue-300">initial</span>={`{{ `}<span className="text-blue-300">opacity</span>: <span className="text-orange-300">0</span>, <span className="text-blue-300">y</span>: <span className="text-orange-300">20</span> {`}}`}{'\n'}
                    {'        '}<span className="text-blue-300">animate</span>={`{{ `}<span className="text-blue-300">opacity</span>: <span className="text-orange-300">1</span>, <span className="text-blue-300">y</span>: <span className="text-orange-300">0</span> {`}}`}{'\n'}
                    {'        '}<span className="text-blue-300">className</span>=<span className="text-green-300">"bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white text-center"</span>{'\n'}
                    {'      '}&gt;{'\n'}
                    {'        '}&lt;<span className="text-red-300">h1</span> <span className="text-blue-300">className</span>=<span className="text-green-300">"text-3xl font-bold mb-4"</span>&gt;{`{`}<span className="text-blue-300">message</span>{`}`}&lt;/<span className="text-red-300">h1</span>&gt;{'\n'}
                    {'        '}&lt;<span className="text-red-300">div</span> <span className="text-blue-300">className</span>=<span className="text-green-300">"text-6xl font-mono mb-6"</span>&gt;{`{`}<span className="text-blue-300">count</span>{`}`}&lt;/<span className="text-red-300">div</span>&gt;{'\n'}
                    {'        '}&lt;<span className="text-red-300">div</span> <span className="text-blue-300">className</span>=<span className="text-green-300">"space-x-4"</span>&gt;{'\n'}
                    {'          '}&lt;<span className="text-red-300">Button</span> <span className="text-blue-300">onClick</span>={`{`}<span className="text-blue-300">handleIncrement</span>{`}`} <span className="text-blue-300">className</span>=<span className="text-green-300">"bg-blue-600 hover:bg-blue-700"</span>&gt;{'\n'}
                    {'            '}Increment{'\n'}
                    {'          '}&lt;/<span className="text-red-300">Button</span>&gt;{'\n'}
                    {'          '}&lt;<span className="text-red-300">Button</span> <span className="text-blue-300">onClick</span>={`{`}<span className="text-blue-300">handleReset</span>{`}`} <span className="text-blue-300">variant</span>=<span className="text-green-300">"outline"</span>&gt;{'\n'}
                    {'            '}Reset{'\n'}
                    {'          '}&lt;/<span className="text-red-300">Button</span>&gt;{'\n'}
                    {'        '}&lt;/<span className="text-red-300">div</span>&gt;{'\n'}
                    {'      '}&lt;/<span className="text-red-300">motion.div</span>&gt;{'\n'}
                    {'    '}&lt;/<span className="text-red-300">div</span>&gt;{'\n'}
                    {'  '});{'\n'}
                    {`}`}{'\n\n'}
                    
                    <span className="text-purple-400">export default</span> <span className="text-yellow-300">App</span>;
                  </code>
                </pre>
              </div>

              {/* Bottom Panel */}
              <div className="bg-gray-800 border-t border-gray-700 p-3 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>UTF-8</span>
                  <span>JavaScript React</span>
                  <span>Ln 24, Col 12</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Run Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
