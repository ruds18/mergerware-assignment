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
    <div className='flex flex-col'>
       <h1 className='text-2xl font-light'>Loan Request</h1>
       <div className='flex mt-12' >
           <form className='flex flex-col  w-full  items-between' onSubmit={(e)=>handleSubmit(e)}>
               <div className='flex flex-col'>
               <label className="mb-2">Amount</label>
                <input type="number"  className='bg-gray-100 p-2 ' value={loanAmount} onChange={(e)=>setLoanAmount(e.target.value)}/>
               </div>
                <button type='submit' className='bg-black p-2 mt-6 text-white rounded-lg'>Request</button>
           </form>
           <div className='bg-grey-300 border-l p-4 ml-2 w-full'>
                <h1 className='text-md ml-4'>Past Loans</h1>
                <div className='w-full  '>
                    {loans.map((loan)=>{
                        return (
                            <div className='flex w-full justify-between mt-4' key={loan._id}>
                                  <p> Loan request - {loan.borrowerInfo.loanAmount}</p>
                                   <p>Status  - {loan.status}</p>
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