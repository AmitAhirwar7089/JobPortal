import React from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const Header = () => {
  return (
    <div>
      <div className='text-center'> 
        <div className='flex flex-col gap-5 my-10'>
            <span className="px-5 py-2 mx-auto rounded-full bg-gray-200 text-red-700 font-semibold text-sm shadow-sm">
          🚀 No.1 Job Finding Platform
        </span>
             <h2 className='text-4xl font-bold'>Find Your 
                 <span className='text-blue-600'> Dream Job</span> <br /> 
                 With Your Interest And Skills</h2>
              <p className='text-gray-600'>Explore thousands of job opportunities with all the information you need. Its your future.<br/> Come find it. Manage all your job application from start to finish.</p>

              <div className='flex w-[40%] shadow-lg border-gray-300 pl-3 rounded-full items-center gap-4 mx-auto'>
                <input type="text" placeholder='Find Your Dream Job'
                className='outline-none border-none w-full' />
                <Button className='rounded-r-full '>
                  <Search className='h-5 w-5'/>
                </Button>
              </div>
        </div>
        
      </div>

    </div>
  )
}

export default Header