import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const pricing = [
  {
    title: "Open Source",
    description: "For Hackers, hobbyists, FOSS projects that run Cua locally or on their own cloud.",
    price: "Free",
    features: [
      "MIT Licensed Core",
      "Unlimited Local Agents",
      "Community Discord and Docs",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    title: "Pro",
    description: "Teams that want hosted agents with no infrastructure headaches.",
    price: "$75",
    sub: "5,100 credits\n425h typical runtime",
    features: [
      "Access to every public cloud region we support (macOS, Linux, Windows)",
      "Usage metered in universal credits",
      "Email and Slack support",
    ],
    cta: "Purchase Credits",
    highlight: true,
    discount: "-0% discount applied",
    slider: true,
  },
  {
    title: "Enterprise",
    description: "Custom cloud services — contact sales for a quote.",
    price: "",
    features: [
      "Everything in Pro",
      "24/7 support",
      "HIPAA, SOC Type 1/2 Reports",
    ],
    cta: "Book a Demo",
    highlight: false,
    icon: true,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold mb-12 text-center">Pricing</h1>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Open Source */}
          <div className="flex-1 bg-white/95 text-black rounded-3xl shadow-lg p-8 flex flex-col border border-gray-200 min-w-[320px] max-w-md">
            <h2 className="text-3xl font-bold mb-2">Open Source</h2>
            <p className="mb-6 text-gray-700">For Hackers, hobbyists, FOSS projects that run Cua locally or on their own cloud.</p>
            <div className="text-4xl font-bold mb-8">Free</div>
            <div className="mb-8">
              <div className="text-lg font-semibold mb-2">What's included</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-800"><CheckCircle className="w-5 h-5 text-green-500" /> MIT Licensed Core</li>
                <li className="flex items-center gap-2 text-gray-800"><CheckCircle className="w-5 h-5 text-green-500" /> Unlimited Local Agents</li>
                <li className="flex items-center gap-2 text-gray-800"><CheckCircle className="w-5 h-5 text-green-500" /> Community Discord and Docs</li>
              </ul>
            </div>
            <Button className="mt-auto bg-white border border-gray-300 text-black font-semibold rounded-full py-3 shadow hover:bg-gray-100">Get Started</Button>
          </div>
          {/* Pro */}
          <div className="flex-1 bg-blue-600 text-white rounded-3xl shadow-2xl p-8 flex flex-col border-4 border-blue-400 min-w-[320px] max-w-md relative">
            <span className="absolute top-6 right-6 bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</span>
            <h2 className="text-3xl font-bold mb-2">Pro</h2>
            <p className="mb-6 text-blue-100">Teams that want hosted agents with no infrastructure headaches.</p>
            <div className="text-4xl font-bold mb-2">$75</div>
            <div className="mb-2"><span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">-0% discount applied</span></div>
            <div className="w-full flex items-center justify-between mb-2 mt-2">
              <span>$75</span>
              <div className="flex-1 mx-2 h-2 bg-blue-400/30 rounded-full relative">
                <div className="absolute left-0 top-0 h-2 w-1/5 bg-blue-200 rounded-full" />
                <div className="absolute left-1/5 top-0 h-2 w-1/5 bg-blue-300 rounded-full" />
                <div className="absolute left-2/5 top-0 h-2 w-1/5 bg-blue-400 rounded-full" />
                <div className="absolute left-3/5 top-0 h-2 w-1/5 bg-blue-500 rounded-full" />
                <div className="absolute left-4/5 top-0 h-2 w-1/5 bg-blue-600 rounded-full" />
              </div>
              <span>$1000</span>
            </div>
            <div className="text-sm text-blue-100 mb-8">5,100 credits<br />425h typical runtime</div>
            <div className="mb-8">
              <div className="text-lg font-semibold mb-2">What's included</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-300" /> Access to every public cloud region we support (macOS, Linux, Windows)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-300" /> Usage metered in universal credits</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-300" /> Email and Slack support</li>
              </ul>
            </div>
            <Button className="mt-auto bg-white text-blue-600 font-semibold rounded-full py-3 shadow hover:bg-blue-50">Purchase Credits</Button>
          </div>
          {/* Enterprise */}
          <div className="flex-1 bg-black text-white rounded-3xl shadow-lg p-8 flex flex-col border border-gray-700 min-w-[320px] max-w-md">
            <h2 className="text-3xl font-bold mb-2">Enterprise</h2>
            <p className="mb-6 text-gray-300">Custom cloud services — contact sales for a quote.</p>
            <div className="text-4xl font-bold mb-8">&nbsp;</div>
            <div className="mb-8">
              <div className="text-lg font-semibold mb-2">What's included</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> 24/7 support</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> HIPAA, SOC Type 1/2 Reports</li>
              </ul>
            </div>
            <Button className="mt-auto bg-white text-black font-semibold rounded-full py-3 shadow hover:bg-gray-100 flex items-center justify-center gap-2">
              Book a Demo <span role="img" aria-label="calendar">📅</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 