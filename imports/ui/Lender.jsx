import React, { useEffect, useState } from 'react'
import { Meteor } from "meteor/meteor";
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';


function Lender({role , email}) {
    const { activeLoans } = useTracker(() => {
        const handle = Meteor.subscribe('allLoans'); 
    
        if (!handle.ready()) {
          return { activeLoans: [] }; 
        }
    
        const allLoans = Loans.find().fetch();
        const active = allLoans.filter((loan) => !loan.isApproved);
        
        return {activeLoans :active};
      });

      const { pastPayments } = useTracker(() => {
        const pastPayments = Loans.find({
          approvedBy: email, 
          isApproved: true, 
        }).fetch();
      
        return { pastPayments };
      }, [email]);
    


      const handelApprove = (loanId)=>{
        Meteor.call('approveLoan', loanId, email, (error) => {
            if (!error) {
               
            }
          });
     }
  return (
    <div className=''>
      <div className='w-full'>
         <h1 className='text-xl font-light border-b mb-4' >Active Loans</h1>
         <div className=''>
              {activeLoans.map((loan)=>{
                return(
                    <div className='flex w-full justify-between items-center' key={loan._id}>
                      <p>Loan amount - {loan.borrowerInfo.loanAmount}</p>
                      <button className='bg-green-700 text-white px-3 py-2 rounded-lg mt-3' onClick={()=>handelApprove(loan._id)} >Approve</button>
                    </div>
                )
              })}
         </div>
         <h1 className='text-xl font-light border-b mb-4 mt-6'>Past Payments</h1>
          <div className=''>
          {pastPayments.map((loan)=>{
                return(
                    <div className='flex w-full justify-between items-center' key={loan._id}>
                      <p>Loan amount - {loan.borrowerInfo.loanAmount}</p>
                      <p>posted by - {loan.borrowerInfo.email}</p>
                    </div>
                )
              })}
          </div>

      </div>
         
      
    </div>
  )
}

export default Lender