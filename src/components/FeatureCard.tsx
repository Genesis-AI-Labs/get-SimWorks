
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
      <div className="text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;
