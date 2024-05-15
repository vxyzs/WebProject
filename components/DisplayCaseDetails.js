import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';

// import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

function DisplayCaseDetails(props) {
  const uid = props.caseDetail.uid;
  const [userType, setUserType] = useState("Judge");
  const router = useRouter();
  const {data: session} = useSession();

  // const { names } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const toastId = toast.loading('Assigning the case..');
    const response = await fetch('/api/case/changecase', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        uid,
        email: session.user.email,
      }),
    });
    const parse = await response.json();

    if (!response.ok) {
      toast.dismiss(toastId);
      toast.error('Something went wrong');
      throw new Error(response.message || 'Something went wrong');
    }

    console.log(parse);
    reset();
    toast.dismiss(toastId);
    router.replace('/dashboard');
    toast.success('Your case has been assigned');
    // console.log(data);
  };
  console.log(errors);


  function deleteHandler() {
    props.delete(uid);
    toast.success("Case withdrawn");
  }

  return (
    <Fragment>
      <div className="bg-white py-16 px-10">
        <div className="bg-gray-100 p-10 md:w-3/4 lg:w-1/2 mx-auto">
          <div className="flex items-center mb-5">
            <label className="items-center mr-6 text-right font-black text-gray-600 text-2xl">
              CASE DETAILS
            </label>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case No:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail._id}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case Type:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail.Case_Type}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case Description:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail.Case_desciption}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Lawyer Name:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail.Lawyer_Name}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Court Type:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail.Case_Type}
            </p>
          </div>

         <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Hearing Date:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail.Hearing_Date}
            </p>
          </div>
          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case Status:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {props.caseDetail.status}
            </p>
          </div>
          {userType!="Judge" &&
           <div className="flex items-center mb-5">
           <label className="inline-block w-32 mr-6 text-right font-bold text-blue-700">
             Fee(Rs):
           </label>
           <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
             {props.fees}
           </p>
         </div> }
          
         
        </div>
      </div>
    {userType==="Judge" &&   
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* Select case-type */}

    
    <div className="flex space-y-4 flex-col md:flex-row justify-evenly">
      <input
        className="px-2 py-2 my-2"
        type="date"
        placeholder="Hearing Date"
        {...register('Hearing_Date', { required: true })}
      />
{/* 
      <input
        className="px-2 py-2"
        type="text"
        placeholder="Court Type"
        {...register('Court_Type', { required: true })}
      /> */}
    </div>

    {userType==="Judge" && <div className="flex mt-0 mb-4 justify-center items-center">
    <input
      className="block my-2 bg-gray-300 hover:bg-gray-400 rounded-md p-2"
      type="submit"
    />
     
      <button className=" bg-red-600 p-4 mx-2 rounded-md  text-white" onClick={deleteHandler}>
       Reject
      </button>
   
      </div>
       }
  </form>
    
    }  
      {userType!="Judge" && <div className="flex items-center">
        <button className=" bg-red-600 p-3 rounded-md mx-auto text-white" onClick={deleteHandler}>
          Withdraw Case
        </button>
      </div>}
    
        
    </Fragment>
  );
}

export default DisplayCaseDetails;




 


