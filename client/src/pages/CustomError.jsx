import React from 'react'
import { Link } from 'react-router-dom'

const CustomError = () => {
  return (
    <main className="main__view">
      <div className='viError'>
        <div className='viError__statusBx'>
          <h2 className='viError__status'>404</h2>
        </div>
        <h1 className='viError__info'>Resources with this name do not exist, please try different name</h1>
        <h3 className='viError__create'>Or <Link to="/" className='viError__createLink'>Create</Link> your own Resources</h3>
      </div>
    </main>
  )
}

export default CustomError