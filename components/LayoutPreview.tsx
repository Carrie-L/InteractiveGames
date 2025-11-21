import React from 'react';
import { LayoutDirection, MainAxisAlignment, CrossAxisAlignment } from '../types';
import { Star, Moon, Heart, Cloud } from 'lucide-react';

interface LayoutPreviewProps {
  direction: LayoutDirection;
  mainAxis: MainAxisAlignment;
  crossAxis: CrossAxisAlignment;
  showAxisLabels?: boolean;
}

const LayoutPreview: React.FC<LayoutPreviewProps> = ({ 
  direction, 
  mainAxis, 
  crossAxis,
  showAxisLabels = true
}) => {
  
  // Map props to Tailwind classes
  const containerClasses = `
    flex 
    ${direction === LayoutDirection.ROW ? 'flex-row' : 'flex-col'}
    ${getJustifyClass(mainAxis)}
    ${getItemsClass(crossAxis)}
    w-full h-64 sm:h-80 
    bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl 
    relative transition-all duration-500
    p-4
  `;

  return (
    <div className="relative w-full my-6 group">
      
      {/* Axis Visualizers */}
      {showAxisLabels && (
        <>
            {/* Main Axis Arrow */}
            <div className={`absolute z-0 pointer-events-none transition-all duration-500 opacity-80
                ${direction === LayoutDirection.ROW 
                    ? 'top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 to-blue-500' 
                    : 'left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 to-blue-500'
                }
            `}>
                <div className={`absolute bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full transform -translate-x-1/2 -translate-y-1/2
                    ${direction === LayoutDirection.ROW ? 'left-1/2 top-0' : 'top-1/2 left-0'}
                `}>
                    Main Axis (主轴)
                </div>
                {/* Arrow head */}
                 <div className={`absolute w-4 h-4 border-t-4 border-r-4 border-blue-500 
                    ${direction === LayoutDirection.ROW 
                        ? 'right-0 top-1/2 -translate-y-1/2 rotate-45' 
                        : 'bottom-0 left-1/2 -translate-x-1/2 rotate-135'
                    }
                `}></div>
            </div>

            {/* Cross Axis Arrow */}
            <div className={`absolute z-0 pointer-events-none transition-all duration-500 opacity-40
                ${direction === LayoutDirection.ROW 
                    ? 'left-1/2 top-0 bottom-0 w-1 border-l-2 border-pink-300 border-dashed' 
                    : 'top-1/2 left-0 right-0 h-1 border-t-2 border-pink-300 border-dashed'
                }
            `}>
                 <div className={`absolute text-pink-400 text-xs font-bold bg-white/80 px-1 rounded transform 
                    ${direction === LayoutDirection.ROW 
                        ? 'top-4 left-2' 
                        : 'left-4 top-2'
                    }
                `}>
                    Cross Axis (交叉轴)
                </div>
            </div>
        </>
      )}

      <div className={containerClasses}>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-200 rounded-2xl shadow-md flex items-center justify-center text-yellow-600 transform transition-all duration-300 hover:scale-110 z-10">
            <Star fill="currentColor" size={24} />
        </div>
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-pink-200 rounded-full shadow-md flex items-center justify-center text-pink-600 transform transition-all duration-300 hover:scale-110 z-10">
            <Heart fill="currentColor" size={28} />
        </div>
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-200 rounded-tr-3xl rounded-bl-3xl shadow-md flex items-center justify-center text-blue-600 transform transition-all duration-300 hover:scale-110 z-10">
            <Moon fill="currentColor" size={24} />
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex flex-col text-[10px] text-gray-400 pointer-events-none">
         <span>Container: {direction === LayoutDirection.ROW ? 'Row' : 'Column'}</span>
         <span>Main: {mainAxis}</span>
         <span>Cross: {crossAxis}</span>
      </div>
    </div>
  );
};

// Helper functions for Tailwind mapping
function getJustifyClass(alignment: MainAxisAlignment): string {
    switch (alignment) {
        case MainAxisAlignment.START: return 'justify-start';
        case MainAxisAlignment.CENTER: return 'justify-center';
        case MainAxisAlignment.END: return 'justify-end';
        case MainAxisAlignment.SPACE_BETWEEN: return 'justify-between';
        case MainAxisAlignment.SPACE_AROUND: return 'justify-around';
        case MainAxisAlignment.SPACE_EVENLY: return 'justify-evenly';
        default: return 'justify-start';
    }
}

function getItemsClass(alignment: CrossAxisAlignment): string {
    switch (alignment) {
        case CrossAxisAlignment.START: return 'items-start';
        case CrossAxisAlignment.CENTER: return 'items-center';
        case CrossAxisAlignment.END: return 'items-end';
        case CrossAxisAlignment.STRETCH: return 'items-stretch';
        default: return 'items-start';
    }
}

export default LayoutPreview;