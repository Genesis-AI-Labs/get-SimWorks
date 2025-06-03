
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface SimulationSidebarProps {
  simulationHtml: string;
  onReset?: () => void;
}

const SimulationSidebar = ({ simulationHtml, onReset }: SimulationSidebarProps) => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
          {onReset && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          See your generated code in action
        </p>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {simulationHtml ? (
          <div 
            className="min-h-full bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200"
            dangerouslySetInnerHTML={{ __html: simulationHtml }}
          />
        ) : (
          <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-center">
              Generated code preview will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationSidebar;
