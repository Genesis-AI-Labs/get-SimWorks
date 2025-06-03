import { Card } from "@/components/ui/card";

interface TestimonialCardProps {
  quote: string;
  author: string;
  avatar: string;
  bgColor: string;
}

const TestimonialCard = ({ quote, author, avatar, bgColor }: TestimonialCardProps) => {
  return (
    <Card className={`bg-gradient-to-br ${bgColor} p-6 hover:scale-105 transition-transform duration-300`}>
      <div className="mb-6">
        <div className="bg-white p-3 rounded-lg shadow-lg inline-block">
          <img 
            src={avatar} 
            alt={author}
            className="w-20 h-20 object-cover rounded"
          />
        </div>
      </div>
      <blockquote className="text-white mb-4 italic leading-relaxed">
        "{quote}"
      </blockquote>
      <cite className="text-gray-300 font-medium not-italic">
        {author}
      </cite>
    </Card>
  );
};

export default TestimonialCard;
