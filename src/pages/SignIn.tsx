import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/fullstack-playground');
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Black background, logo, art, quote */}
      <div className="md:w-1/2 w-full bg-black flex flex-col justify-between p-10 min-h-[400px]">
        <div>
          <div className="text-white text-xl font-bold mb-8">SimWorks</div>
          <div className="flex flex-1 items-center justify-center min-h-0">
            <img
              src="/sigin_in_page.gif"
              alt="Simulation Labs Animation"
              className="w-full max-w-[750px] h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="mt-12 text-gray-200 text-sm italic">
        “SimWorks is revolutionizing model-based design by bridging natural language with powerful AI agents. Their system empowers engineers to effortlessly create and validate MATLAB & Simulink models, dramatically accelerating innovation cycles and reducing development time.”<br />
        {/* <span className="not-italic font-semibold">Prof. Michael Wheeler</span> (Harvard Business School) */}
        </div>
      </div>
      {/* Right side: Sign-in card */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white min-h-screen">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white text-2xl font-bold">S</div>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Welcome!</h2>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-6 hover:bg-gray-100"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>
          <div className="flex items-center mb-4">
            <div className="flex-grow border-t border-gray-200" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>
          <form>
            <label className="block text-gray-700 text-sm mb-1" htmlFor="email">Email address</label>
            <input id="email" type="email" className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email address" disabled />
            <label className="block text-gray-700 text-sm mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" className="w-full mb-6 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" disabled />
            <button type="button" className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold text-lg mb-2 opacity-60 cursor-not-allowed">Sign in</button>
          </form>
          <div className="flex justify-between mt-2 text-sm">
            <a href="#" className="text-gray-500 hover:underline">Forgot password?</a>
            <a href="#" className="text-gray-500 hover:underline">No account? Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 