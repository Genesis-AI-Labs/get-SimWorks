import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Schedule a Call Block */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white text-black py-2 px-8 rounded-xl mb-12 max-w-5xl mx-auto">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2 text-black">Ready to Automate Simulation Workflows That Scale?</h2>
            {/* <p className="text-gray-600 text-base">Schedule a call with our team to learn how SimWorks can transform your Model-Based Design infrastructure.</p> */}
          </div>
          <a
            href="https://cal.com/get-simworks/30min"
            className="inline-flex items-center justify-center rounded-xl text-xl font-bold px-12 py-5 bg-[#8B5CF6] text-white shadow-md hover:bg-[#7C3AED] transition-all duration-300 mx-auto w-full max-w-xs"
            style={{ boxShadow: '0 2px 16px 0 rgba(80, 80, 120, 0.10)' }}
          >
            Schedule a Call <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_1fr_1fr] gap-y-8 gap-x-12 items-start">
          {/* Company Info */}
          <div className="md:mb-0">
            <div className="flex items-center group mb-4">
              <img src="/logo_solo.png" alt="SimWorks Logo" className="h-8 w-auto mr-2" />
              <span className="text-3xl font-bold text-white">
                SimWorks
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
          © {new Date().getFullYear()} SimWorks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 