import React, { useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';

function LoanRequest({role,email}) {
    const id='JphTQGDyFh9xeLtbm';
    const { loans, loading } = useTracker(() => {
        const subscription = Meteor.subscribe('userLoans', email);
       
        const loans = Loans.find({ 'borrowerInfo.email' : email }).fetch();
        console.log(loans)
    
        return {
          loans,
          loading: !subscription.ready(),
        };
      });

    const [loanAmount , setLoanAmount] = useState(0);

    const handleSubmit= (e)=>{
        e.preventDefault();
        
        Meteor.call("loans.request", { email , loanAmount}, (error) => {
            if (error) {
              console.error("Error creating loan request:", error.reason);
            } else {
                setLoanAmount(0);
              console.log("Loan created successfully");
            }
          });
    }
  return (
    <div className='flex flex-col w-full '>
       <h1 className='text-2xl font-light'>Loan Request</h1>
       <div className='flex mt-12 md:flex-row flex-col' >
           <form className='flex flex-col  w-full  items-between' onSubmit={(e)=>handleSubmit(e)}>
               <div className='flex flex-col'>
               <label className="mb-2">Amount</label>
                <input type="number"  className='bg-gray-100 p-2 ' value={loanAmount} onChange={(e)=>setLoanAmount(e.target.value)}/>
               </div>
                <button type='submit' className='bg-black p-2 mt-6 text-white rounded-lg'>Request</button>
           </form>
           <div className='bg-grey-300 border-l p-4 ml-2 w-full'>
                <h1 className='text-md '>Past Loans</h1>
                <div className='w-full  '>
                    {loans.map((loan)=>{
                        return (
                            <div className='flex w-full justify-between mt-4  items-center' key={loan._id}>
                                  <p className='flex md:text-lg'> 💲{loan.borrowerInfo.loanAmount} </p>
                                   <p className='font-light text-sm  hidden   md:block' >🕕 {new Date(loan.createdAt).toLocaleString()} </p>
                                   <p className='flex items-center justify-center sm:text-sm md:text-md'> <p className={`w-3 h-3 ${loan.status==='Pending'?'bg-red-500':'bg-green-400'} rounded-xl  mr-2 flex`}></p> {loan.status}</p>
                             </div>
                        )
                    })}
                </div>
           </div>
       </div>
    </div>
  )
}

export default LoanRequest