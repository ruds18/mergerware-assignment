import React, { useEffect } from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { Loans } from '../api/collections/loans';
import {useNavigate} from 'react-router-dom'

function Admin() {
  const navigate = useNavigate();
  const {allLoans}= useTracker(()=>{
    const handle = Meteor.subscribe('allLoans')
    if(!handle.ready()) return {allLoans:[]}
    const allLoans = Loans.find().fetch();
    console.log(allLoans);
    return {allLoans:allLoans};
  })

  console.log(allLoans);

  return (
    <div className=' w-full p-1'>
        {allLoans.map((loan) => (
    <div className='flex w-full bg-gray-100  rounded-lg p-2 m-2 mt-5 ' key={loan._id}>
      <div className='flex flex-col'>
        <p className='font-semibold text-sm'>Borrower Email:</p>
        <p>{loan.borrowerInfo.email}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold'>Loan Amount:</p>
        <p>{loan.borrowerInfo.loanAmount}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold text-sm'>Requested On:</p>
        <p>{new Date(loan.createdAt).toLocaleString()}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold text-sm'>Status:</p>
        <p>{loan.status}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold text-sm'>Approved By:</p>
        <p>{loan.approvedBy}</p>
      </div>
      <div className='flex flex-col ml-4'>
        <p className='font-semibold text-sm'>Approved Time:</p>
        <p>{new Date(loan.approvedTime).toLocaleString()}</p>
      </div>
    </div>
  ))}
    </div>
  )
}

export default Admin