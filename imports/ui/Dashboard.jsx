import React from 'react'
import LoanRequest from './LoanRequest';
import Lender from './Lender';
import Admin from './Admin';

function Dashboard() {
  const role  = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  return (
    <div className='h-dvh w-full bg-grey-300 mx-auto'>
     
     <div className='bg-white flex px-12 py-3 flex justify-between items-center' >
      <h1 className='text-black text-3xl'>{role && role}</h1>
      <p className='text-lg'>{email}</p>
     </div>
      
      <div className='bg-white p-5 mt-5 w-[80%] mx-auto rounded-lg'>
          {role==='Borrower' && <LoanRequest role={role} email={email} />}
          {role === 'Lender' && <Lender role={role} email={email}/>}
          {role ==='Admin' && <Admin email={email} />}
      </div>
   
    </div>
  )
}

export default Dashboard