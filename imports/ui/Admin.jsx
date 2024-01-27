import React, { useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';

function Admin() {
  const {allLoans}= useTracker(()=>{
    const handle = Meteor.subscribe('allLoans')
    if(!handle.ready()) return {allLoans:[]}
    const allLoans = Loans.find().fetch();
    console.log(allLoans);
    return {allLoans:allLoans};
  })

  console.log(allLoans);

  return (
    <div className='  w-full p-1'>
        {allLoans.map((loan) => (
    <div className='flex w-full border rounded p-2 m-2 ' key={loan._id}>
      <div className='flex flex-col'>
        <p className='font-semibold'>Borrower Email:</p>
        <p>{loan.borrowerInfo.email}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>Loan Amount:</p>
        <p>{loan.borrowerInfo.loanAmount}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>Requested On:</p>
        <p>{new Date(loan.createdAt).toLocaleString()}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>Status:</p>
        <p>{loan.status}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>Approved By:</p>
        <p>{loan.approvedBy}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>Approved Time:</p>
        <p>{new Date(loan.approvedTime).toLocaleString()}</p>
      </div>
    </div>
  ))}
    </div>
  )
}

export default Admin