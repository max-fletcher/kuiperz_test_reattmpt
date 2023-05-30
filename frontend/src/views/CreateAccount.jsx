import PageComponent from '../components/PageComponent'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios'

const CreateAccount = () => {

   const [email, setEmail] = useState('')
   const [nidNumber, setNidNumber] = useState('')
   const [balance, setBalance] = useState('')
   const [status, setStatus] = useState('')
   const [branch, setBranch] = useState('')
   const [accountType, setAccountType] = useState('')

   const [allBranches, setAllBranches] = useState([])
   const [allAccountTypes, setAllAccountTypes] = useState([])

   const [error, setError] = useState('')
   const [message, setMessage] = useState('')

   const statuses = ['pending', 'no deposit', 'no withdrawal', 'restricted', 'frozen', 'inactive', 'active']

   function titleCase(string){

      // return string[0].toUpperCase() + string.slice(1).toLowerCase();

      const words = string.split(" ");

      for (let i = 0; i < words.length; i++) {
         words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }

      return words.join(" ");
   }

   const getAllBranches = async () => {
      try {
         const response = await axiosClient.get('/branches/index')
         console.log(response.data.branches)
         setAllBranches(response.data.branches)
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   const getAllAccountTypes = async () => {
      try {
         const response = await axiosClient.get('/account_types/index')
         console.log(response.data.account_types)
         setAllAccountTypes(response.data.account_types)
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   useEffect(() => {
      getAllBranches()
      getAllAccountTypes()
      console.log(allBranches, allAccountTypes);
   }, []);


   const create_account = async (e) => {
      e.preventDefault()

      // CLEAR ERRORS
      setError('')
      setMessage('')

      try {
         const response = await axiosClient.post('/accounts/store', {
            nid_number: nidNumber,
            email: email,
            account_type_id: accountType,
            branch_id: branch,
            balance: balance,
            status: status,
         })

         if(response.status === 201 && response.data.status === 'success'){
            // console.log(response.data)
            setMessage(response.data.message)
            // CLEAR UP INPUT FIELDS
            setNidNumber('')
            setEmail('')
            setBalance('')
            setStatus('')
            setBranch('')
            setAccountType('')
         }
      } catch (error) {
         // console.log(error.response.status, error.response.data.message)
         setError(error.response.data.message)
      }
   }

   return (
      <PageComponent title='Create Account'>

         {message && (
            <div className="bg-green-100 my-3 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
               <div className="flex">
                  <div className="py-1">
                     <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                  </div>
                  <div>
                     <p className="font-bold">Message</p>
                     <p className="text-sm">{message}</p>
                  </div>
               </div>
            </div>)
         }

         {error && (
            <div className="bg-red-100 my-3 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
               <div className="flex">
                  <div className="py-1">
                     <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                  </div>
                  <div>
                     <p className="font-bold">An Error Occured</p>
                     <p className="text-sm">{error}</p>
                  </div>
               </div>
            </div>)
         }

         <form>
            <div className="space-y-12">
               <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Create New Account</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                     Make new account for a customer
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                     <div className="sm:col-span-3">
                        <label htmlFor="nid_number" className="block text-sm font-medium leading-6 text-gray-900">
                           NID Number
                        </label>
                        <div className="mt-2">
                           <input
                              type="text"
                              min="1"
                              name="nid_number"
                              id="nid_number"
                              autoComplete="off"
                              value={nidNumber}
                              onChange={(e) => setNidNumber(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter NID Number"
                           />
                        </div>
                     </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                           Email Address
                        </label>
                        <div className="mt-2">
                           <input
                              type="email"
                              min="1"
                              name="email"
                              id="email"
                              autoComplete="off"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter Email Address"
                           />
                        </div>
                     </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                           Balance
                        </label>
                        <div className="mt-2">
                           <input
                              type="number"
                              min="1"
                              name="title"
                              id="title"
                              autoComplete="off"
                              value={balance}
                              onChange={(e) => setBalance(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="Enter Balance"
                           />
                        </div>
                     </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="Status" className="block text-sm font-medium leading-6 text-gray-900">
                           Select Status
                        </label>
                        <div className="mt-2">
                           <select
                              id="status"
                              name="status"
                              autoComplete="off"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                           >
                              {
                                 statuses.map((status, index) => {
                                    return(
                                       <option key={index} value={status}>{titleCase(status)}</option>
                                    )}
                                 )
                              }
                           </select>
                        </div>
                     </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="branch" className="block text-sm font-medium leading-6 text-gray-900">
                           Select Branch
                        </label>
                        <div className="mt-2">
                           <select
                              id="branch"
                              name="branch"
                              autoComplete="off"
                              value={branch}
                              onChange={(e) => setBranch(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                           >
                              {
                                 allBranches.map((branch) => {
                                    return(
                                       <option key={branch.id} value={branch.id}>{branch.name}</option>
                                    )}
                                 )
                              }
                           </select>
                        </div>
                     </div>

                     <div className="sm:col-span-3">
                        <label htmlFor="account_type" className="block text-sm font-medium leading-6 text-gray-900">
                           Select Account Type
                        </label>
                        <div className="mt-2">
                           <select
                              id="account_type"
                              name="account_type"
                              autoComplete="off"
                              value={accountType}
                              onChange={(e) => setAccountType(e.target.value)}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                           >
                              {
                                 allAccountTypes.map((account_type) => {
                                    return(
                                       <option key={account_type.id} value={account_type.id}>{account_type.name}</option>
                                    )}
                                 )
                              }
                           </select>
                        </div>
                     </div>

                  </div>
               </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-3">
               <Link to="/" className="rounded-md bg-gray-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                  Back
               </Link>
               <button
                  type="submit"
                  onClick={create_account}
                  className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               >
                  Save
               </button>
            </div>
         </form>
      </PageComponent>
   )
}

export default CreateAccount