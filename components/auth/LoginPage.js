import { signin, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import toast from 'react-hot-toast';

function LoginPage() {
  const router = useRouter();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  async function loginHandler(event) {
    event.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    if (!enteredEmail || !enteredPassword) {
      return;
    }
  
    const toastId = toast.loading('Logging In...');
  
      const result = await signIn('credentials',{
        email: enteredEmail,
        password: enteredPassword,
      });
     
      if (result?.error) {
        toast.dismiss(toastId);
        toast.error(result.error);
      } else {
        toast.dismiss(toastId);
        toast.success('Welcome!');
      }
  }
  

  return (
    <section className="w-full bg-white">
      <form onSubmit={loginHandler}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center">
            <div
              className="
            w-full bg-white lg:w-6/12 xl:w-5/12"
            >
              <div className="flex flex-col items-start justify-start w-full h-full p-4 lg:p-10 xl:p-12">
                <h4 className="w-full text-3xl font-bold">Login</h4>
                <div className="relative w-full mt-5 space-y-8">
                  <div className="relative">
                    <label className="font-medium text-gray-900">Email</label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your Email Address"
                    />
                  </div>
                  <div className="relative">
                    <label className="font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      ref={passwordInputRef}
                      type="password"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Password"
                    />
                  </div>

                  <div className="relative">
                    <button
                      type="submit"
                      className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <hr className="border-blueGray-300" />
    </section>
  );
}

export default LoginPage;
