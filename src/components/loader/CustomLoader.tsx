import React from 'react';

const CustomLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">

      
      {/* Loader 1: Simple spinner with image */}
      <div className="mb-12">

        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-42 w-42 border-b-2 border-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/brandLogo.jpeg" 
                alt="Loading" 
                className="h-40 w-40 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
     </div>
  );
};

// Individual loader components for reuse
export const SpinnerWithImage = ({ size = 32, borderColor = 'border-gray-900' }) => {
  return (
    <div className="relative">
      <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 ${borderColor}`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
           src="/brandLogo.jpeg" 
          alt="Loading" 
          className={`h-${size/2} w-${size/2} rounded-full`}
        />
      </div>
    </div>
  );
};

// export const RotatingImageLoader = ({ imageUrl, size = 32 }) => {
//   return (
//     <div className={`animate-spin rounded-full h-${size} w-${size} border-2 border-gray-300 flex items-center justify-center`}>
//       <img 
//         src={imageUrl} 
//         alt="Loading" 
//         className={`h-${size/4} w-${size/4} rounded-full`}
//       />
//     </div>
//   );
// };

export default CustomLoader;