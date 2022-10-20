import React, { useState } from 'react';
import { useRef } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const CreateRes = () => {
  const resName = useRef(null);
  const [err, setErr] = useState([]);

  const handleSubmit = () => {
    const resNameVal = {"resName": resName.current.value};

    if(resNameVal.length === 0){
      setErr({"resName": "Please enter some name"});
    }
    else{
      setErr([]);

      async function createResAxios(){
        const response = await axios({
          method: "post",
          url: "/createres",
          data: resNameVal
        });
  
        console.log(response);
      }

      createResAxios();
    }
  }
  
  return (
    <main className='main__create'>
      <p className='create__login'>Already created resources? <Link to="/login" className='create__loginLink'>Update</Link></p>
      <h1 className='create__title'>Have all your resources ready in one link</h1>
      <div className='create__form'>
        <div className="create__inputBx">
          <input ref={resName} type="text" placeholder='Name your Resources' className='create__input' id='create__input' />
          <label htmlFor="create__input" className='create__label'>Name your Resources</label>
          { err && 
            <p className='create__error'>{ err.resName }</p> 
          }
        </div>
        <button onClick={handleSubmit} className='create__enterBtn'>Enter</button>
      </div>
    </main>
  )
}

export default CreateRes