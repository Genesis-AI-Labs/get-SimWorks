
import { Card } from "@/components/ui/card";

interface BenefitCardProps {
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const BenefitCard = ({ title, description, gradientFrom, gradientTo }: BenefitCardProps) => {
  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform duration-300">
      <div className={`h-48 bg-gradient-to-br ${gradientFrom} ${gradientTo} relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="w-16 h-16 bg-white/30 rounded-full blur-xl"></div>
          <div className="absolute top-2 left-8 w-12 h-12 bg-white/20 rounded-full blur-lg"></div>
        </div>
      </div>
      <div className="bg-gray-50 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default BenefitCard;
