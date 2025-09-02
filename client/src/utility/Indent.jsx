import React from 'react'

function Indent({children}) {
  return (
    <div className='p-8 w-auto h-auto translate-y-[60px]'>
        {children}
    </div>
  )
}

export default Indent