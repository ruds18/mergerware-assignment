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
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                   Borrower info
                </th>
                <th scope="col" class="px-6 py-3">
                    Loan amount
                </th>
                <th scope="col" class="px-6 py-3">
                    Requested on
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                   Approved by
                </th>
                <th scope="col" class="px-6 py-3">
                   Approved time
                </th>
            </tr>
        </thead>
        <tbody>
           {allLoans.map((loan)=>(
             <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                 {loan.borrowerInfo.email}
             </th>
             <td class="px-6 py-4">
                 {loan.borrowerInfo.loanAmount}
             </td>
             <td class="px-6 py-4">
                 {new Date(loan.createdAt).toLocaleString()}
             </td>
             <td class="px-6 py-4">
                 {loan.status}
             </td>
             <td class="px-6 py-4">
                 {loan.approvedBy ? loan.approvedBy : 'N/A' }
             </td>
             <td class="px-6 py-4">
               { loan.approvedTime ? new Date(loan.approvedTime).toLocaleString(): 'N/A'}
             </td>
         </tr>
        
           ))}
        </tbody>
    </table>
</div>

    </div>
  )
}

export default Admin