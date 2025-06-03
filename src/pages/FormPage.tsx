import React from 'react';

const FormPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Get Started</h1>
      <div className="w-full max-w-3xl">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfYo_KoqCIvCFKz0Ur2cYablUoQpZ4cUU2xcZnT66VcKzz0nw/viewform?embedded=true"
          width={640}
          height={1178}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="rounded-lg shadow-lg"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default FormPage; 