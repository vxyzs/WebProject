import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

async function createUser(email, password, firstName, lastName, isJudge) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, firstName, lastName, isJudge }),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();

  if (!response.ok) {
    toast.error('User already exists.');
    throw new Error(response.message || 'Something went wrong');
  }

  return data;
}

function SignUpPage(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const fnameInputRef = useRef(null);
  const lnameInputRef = useRef(null);
  const [role, setrole] = useState('user');
  const [code, setcode] = useState('');
  const [verify, setverify] = useState(false);

  const handleCheck = (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      toast.error("Code must be of 6 characters long");
      setverify(false);
      return; 
    }
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (!alphanumericRegex.test(code)) {
      toast.error("Code must contain only letters and numbers");
      setverify(false);
      return; 
    }

    setverify(true);
    toast.success("Verified");
    return;
  };
  

  async function submitHandler(e) {
    e.preventDefault();
    const toastId = toast.loading('Processing...');

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = fnameInputRef.current.value;
    const enteredLastName = lnameInputRef.current.value;


    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@') ||
      !enteredFirstName ||
      enteredFirstName.trim() === '' ||
      !enteredLastName ||
      enteredLastName.trim() === ''
    ) {
      setIsInvalid(true);
      toast.error("Enter correct mail");
      toast.dismiss(toastId);
      return;
    }

    if(role === 'Judge' && !verify) return;
    const isJudge = role === 'Judge' ? true : false;
    console.log(isJudge);

    try {
      const response = await createUser(
        enteredEmail,
        enteredPassword,
        enteredFirstName,
        enteredLastName,
        isJudge
      );
      console.log(response);
      toast.dismiss(toastId);
      toast.success("You're in 🤘🏼");
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
    }

    emailInputRef.current.value = '';
    fnameInputRef.current.value = '';
    lnameInputRef.current.value = '';
    passwordInputRef.current.value = '';
    setcode('');
  }

  return (
    <section className="w-full bg-white">
      <form onSubmit={submitHandler}>
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center">
            <div className="w-full bg-white lg:w-3/4 xl:w-3/4">
              <div className="flex flex-col items-start justify-start w-full h-full p-4 lg:p-6 xl:p-8">
                <h4 className="w-full text-3xl font-bold">Signup</h4>
                <div className="relative w-full mt-10 space-y-8">
                  <div className='flex flex-row gap-8'>
                  <div className="relative w-1/2">
                    <label className="font-medium text-gray-900">
                      First Name
                    </label>
                    <input
                      ref={fnameInputRef}
                      type="text"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your First Name"
                    />
                  </div>
                  <div className="relative w-1/2">
                    <label className="font-medium text-gray-900">
                      Last Name
                    </label>
                    <input
                      ref={lnameInputRef}
                      type="text"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your Last Name"
                    />
                  </div>
                  </div>
                  <div className='flex flex-row gap-8'>
                  <div className="relative w-1/2">
                    <label className="font-medium text-gray-900">Email</label>
                    <input
                      ref={emailInputRef}
                      type="text"
                      className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter Your Email Address"
                    />
                  </div>
                  <div className="relative w-1/2">
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
                  </div>
                  <div className="relative">
                    <label className="font-medium text-gray-900">Role</label>
                    <div className='flex flex-row gap-2 m-2'>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        required
                        className="form-checkbox h-6 w-6 text-blue-600"
                        value="user"
                        name='role'
                        
                        onClick={(e) => setrole(e.target.value)}
                      />
                      <span className="ml-2">User</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type='radio'
                        required
                        className="form-checkbox h-6 w-6 text-blue-600"
                        value="Judge"
                        name='role'
                        onClick={(e) => setrole(e.target.value)}
                      />
                      <span className="ml-2">Judge</span>
                    </label>
                    </div>
                  </div>
                  {role === 'Judge' && 
                    <div className="relative w-2/3">
                      <label className="font-medium text-gray-900">
                        Enter Code
                      </label>
                      <div className='flex flex-row'>
                        <input
                          onChange={(e) => setcode(e.target.value)}
                          type='text'
                          className="block w-2/3 px-4 py-4 m-2 text-md placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                          placeholder="Enter Government Code"
                        />
                        {verify ? (
                          <button
                          disabled
                          className=" cursor-not-allowed w-1/5 items-center h-10 m-4 text-base font-medium text-center text-white transition duration-200 bg-blue-400 rounded-lg hover:bg-blue-500 ease"
                        >
                          Verified
                        </button>
                        ):(
                        <button
                          onClick={handleCheck}
                          className=" w-1/5 items-center h-10 m-4 text-base font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                        >
                          Verify
                        </button>
                        )}
                        
                      </div>
                    </div>
                  }
                  <div className="relative w-1/4">
                    <button
                      type="submit"
                      className="inline-block w-full p-2 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </form>

      {isInvalid && <p>Please enter valid information!</p>}

      
    </section>
  );
}

export default SignUpPage;
