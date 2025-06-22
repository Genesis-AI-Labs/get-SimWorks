import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const coreServices = [
  {
    title: "AI Agent Integration",
    tagline: "Autonomous Simulation for Your Team",
    description: "Deploy our expert AI agents directly into your workflows."
  },
  {
    title: "Expert Simulation Services",
    tagline: "Your On-Demand Simulation Partner",
    description: "Outsource your most complex simulation challenges to our team of experts, powered by our proprietary agents."
  },
  {
    title: "Workflow Modernization",
    tagline: "DevOps & Integration for MBD",
    description: "We transform your fragmented simulation processes into a seamless, version-controlled, and automated pipeline."
  }
];

const expertServices = [
  {
    category: "AI & MBD SERVICES",
    title: "Accelerated Model-Based Design (MBD)",
    description: "Our agents act as your most proficient Simulink developer, translating high-level requirements into efficient, complex MBD algorithms. We eliminate the steep learning curve and empower your domain experts to build sophisticated models without needing to be Simulink gurus.",
    capabilities: [
      "Prompt-based model generation (e.g., control systems, plant models).",
      "Automated tuning and optimization of algorithms (e.g., PID controllers, filters).",
      "Rapid prototyping and iteration of complex system designs.",
      "Generation of efficient, expert-level Simulink models."
    ]
  },
  {
    category: "COMPLIANCE & CODE GENERATION",
    title: "Automated Code Generation & Compliance",
    description: "Leverage our agents' embedded expertise to generate reliable, efficient, and certifiable code for safety-critical applications. We offer 'Compliance-as-a-Service,' turning a high-risk, manual process into a repeatable and automated workflow.",
    capabilities: [
      "Production code generation for hardware targets (e.g., ARM Cortex).",
      "Automated adherence to industry standards (e.g., ISO 26262, MISRA C).",
      "Configuration and execution of model advisors for compliance checks.",
      "Generation of documentation and artifacts for certification."
    ]
  },
  {
    category: "INTEGRATION & AUTOMATION",
    title: "Cross-Platform Workflow Integration",
    description: "Break down engineering silos with HyperSim agents acting as your universal orchestrator. We connect your entire toolchain—from Python data scripts to legacy C++ code and Simulink models—into a single, cohesive, and automated system.",
    capabilities: [
      "API-driven integration with data sources (S3, databases) and analysis tools (Python, etc.).",
      "End-to-end automation of multi-step simulation pipelines.",
      "Custom agent configuration to interact with your proprietary or legacy systems.",
      "User training on managing and prompting the integrated workflow."
    ]
  },
  {
    category: "WORKFLOW TRANSFORMATION",
    title: "MBD Ops & Version Control Implementation",
    description: "We bring modern DevOps and software engineering best practices to your MBD workflows. By making text-based prompts the 'source of truth,' we enable auditable, collaborative, and fully version-controlled simulation design in tools like Git.",
    capabilities: [
      "Establishing Git-based workflows for Simulink projects.",
      "Full traceability and human-readable history of model changes.",
      "Enabling branching, merging, and pull-request-based reviews for simulation design.",
      "Consulting on best practices for collaborative MBD."
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            From Prompt to Production-Ready Simulation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Partner with HyperSim to shift your team's focus from being "tool operators" to "problem solvers." Our autonomous AI agents are designed to understand your engineering goals, executing complex simulations and development tasks within the MATLAB and Simulink ecosystem. We turn your natural language prompts into validated models, certifiable code, and actionable results, radically accelerating your project timelines.
          </p>
        </div>
      </section>

      {/* Core Service Offerings */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((service, i) => (
              <div key={i} className="relative bg-[#191A1F] rounded-2xl p-8 flex flex-col shadow-lg group overflow-hidden transition-colors duration-500 border border-gray-800">
                <div className="text-lg font-bold text-white mb-2">{service.title}</div>
                <div className="text-blue-400 font-semibold mb-4">{service.tagline}</div>
                <div className="text-gray-300 text-base mb-2">{service.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Engineering Services */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Our Expert Engineering Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertServices.map((service, i) => (
              <div key={i} className="relative bg-[#191A1F] rounded-2xl p-8 flex flex-col shadow-lg group overflow-hidden transition-colors duration-500 border border-gray-800">
                {/* Gradient Overlay for Hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 group-hover:animate-gradient-x bg-gradient-to-br from-blue-900 via-indigo-900 to-amber-500"></div>
                <div className="text-xs font-mono text-blue-400 mb-2 tracking-widest z-10 relative">{service.category}</div>
                <div className="text-2xl font-bold text-white mb-2 z-10 relative">{service.title}</div>
                <div className="text-gray-300 text-base mb-4 z-10 relative">{service.description}</div>
                <div className="text-white font-semibold mb-2 z-10 relative">Key Capabilities:</div>
                <ul className="list-disc list-inside text-blue-300 text-sm space-y-1 z-10 relative">
                  {service.capabilities.map((cap, j) => (
                    <li key={j}>{cap}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The HyperSim Advantage */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">The HyperSim Advantage: Your Expertise, Scaled</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
            <div className="bg-[#191A1F] rounded-2xl p-8 shadow-lg border border-gray-800">
              <div className="text-xl font-bold text-blue-400 mb-2">Democratize Expertise</div>
              <div className="text-gray-300 mb-2">We make the knowledge of a senior Simulink expert available to every engineer, instantly.</div>
              <div className="text-xl font-bold text-blue-400 mb-2 mt-6">Drastically Reduce Timelines</div>
              <div className="text-gray-300 mb-2">Automate repetitive modeling, scripting, and code generation tasks that take weeks or months and execute them in minutes or hours.</div>
            </div>
            <div className="bg-[#191A1F] rounded-2xl p-8 shadow-lg border border-gray-800">
              <div className="text-xl font-bold text-blue-400 mb-2">Mitigate Project Risk</div>
              <div className="text-gray-300 mb-2">Ensure repeatable, compliant, and predictable outcomes for safety-critical systems.</div>
              <div className="text-xl font-bold text-blue-400 mb-2 mt-6">Unlock Your Senior Talent</div>
              <div className="text-gray-300 mb-2">Free your best engineers from tedious tool operation so they can focus on innovation and solving the next generation of engineering challenges.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-black">
        <div className="max-w-3xl mx-auto text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Let's Solve Your Engineering Challenges</h2>
          <p className="text-xl text-gray-300 mb-8">Partner with us to move from concept to validated results faster than ever before. Let our agents handle the tools, so your team can focus on what they do best: engineering.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold">
                Request a Demo
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-4 rounded-full font-semibold">
                Discuss Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 