import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer 
      className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative z-10 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 0% 0%, #eaf6ff 0%, #3e7cb1 18%, transparent 32%), linear-gradient(135deg, transparent 0%, #101624 40%, #000 80%, #000 100%)`
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
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)',
        }}
      />
      {/* Subtle corner lines (top-right and bottom-left) */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Top-right corner */}
        <svg width="80" height="80" className="absolute right-0 top-0" style={{opacity:0.18}}>
          <polyline points="40,0 80,0 80,40" fill="none" stroke="#fff" strokeWidth="1.5" />
        </svg>
        {/* Bottom-left corner */}
        <svg width="80" height="80" className="absolute left-0 bottom-0" style={{opacity:0.18}}>
          <polyline points="0,40 0,80 40,80" fill="none" stroke="#fff" strokeWidth="1.5" />
        </svg>
      </div>
      {/* Gradient overlays for extra depth */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top gradient glow */}
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#1a2747]/30 to-transparent" />
        {/* Blue accent light from top left */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/15 blur-[200px]" />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_1fr_1fr] gap-y-8 gap-x-12 items-start">
          {/* Company Info */}
          <div className="md:mb-0">
            <div className="flex items-center group mb-4">
              <img src="/hypersym_logo_small.png" alt="HyperSym Logo" className="h-8 w-auto mr-2 align-middle" />
              <span className="text-3xl font-bold text-white">
                HyperSym
              </span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-4 text-left">
              AI-powered solutions for Model-Based Design and scientific computation.
            </p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="https://www.linkedin.com/company/simworks-ai/" className="hover:text-white transition-colors duration-300 flex items-center">LinkedIn <ExternalLink size={12} className="ml-1" /></a>
              <a href="https://x.com/get_simworks" className="hover:text-white transition-colors duration-300 flex items-center">Twitter <ExternalLink size={12} className="ml-1" /></a>
              <a href="https://github.com/simworks-ai" className="hover:text-white transition-colors duration-300 flex items-center">GitHub <ExternalLink size={12} className="ml-1" /></a>
              <a href="https://discord.gg/BrS8zYEM" className="hover:text-white transition-colors duration-300 flex items-center">Discord <ExternalLink size={12} className="ml-1" /></a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="#features" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">MatCoder AI</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">SimCoder AI (Coming Soon)</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">CfdCoder AI (Coming Soon)</Link></li>
              {/* <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">CadCoder AI</Link></li> */}
              <li><Link to="https://github.com/simworks-ai/OctCoder" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">OctCoder Playground</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Careers</Link></li>
              <li><Link to="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Reviews</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Pricing</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Terms of Service</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-gray-500 text-sm text-left">
          © {new Date().getFullYear()} HyperSym. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 