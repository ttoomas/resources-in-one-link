import React, { useState } from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import eyeOn from "../imgs/eye.png";
import axios from "axios";

const CreateRes = () => {
  const resName = useRef(null);
  const resPassword = useRef(null);
  const [err, setErr] = useState([]);
  const navigate = useNavigate();

  const handlePassword = () => {
    const resNameVal = resName.current.value;

    if(resNameVal.length === 0){
      setErr({"resName": "Please enter some name"});
    }
    else{
      setErr([]);

      const createInputBxName = document.querySelector('.create__form.name');
      const createInputBxPassword = document.querySelector('.create__form.password');
      
      createInputBxName.style.animation = "createFormChangeName 500ms ease-in-out forwards";
      createInputBxPassword.style.animation = "createFormChangePassword 500ms 500ms ease-in-out forwards";

      setTimeout(() => {
        createInputBxPassword.querySelector('.create__input').focus();

        createInputBxName.style.left = "0";
        createInputBxName.style.visibility = "hidden";
        createInputBxName.style.opacity = "0";

        createInputBxPassword.style.left = "50%";
        createInputBxPassword.style.visibility = "visible";
        createInputBxPassword.style.opacity = "1";
      }, 1001);
    }
  }

  const handleSubmit = () => {
    const resNameVal = resName.current.value;
    const resPasswordVal = resPassword.current.value;
    if(resPasswordVal.length === 0){
      setErr({"resPassword": "Please enter some name"});
    }
    else{
      setErr([]);

      async function createResAxios(){
        try{
          const createRes = await axios({
            method: "post",
            url: "/createres",
            data: {"resName": resNameVal, "resPassword": resPasswordVal}
          });

          navigate(`/update/resources/${createRes.data.slug}`);
        }
        catch(err){
          const createInputBxName = document.querySelector('.create__form.name');
          const createInputBxPassword = document.querySelector('.create__form.password');

          createInputBxPassword.style.animation = "createFormChangeName 500ms ease-in-out forwards";
          createInputBxName.style.animation = "createFormChangePassword 500ms 500ms ease-in-out forwards";

          setTimeout(() => {
            createInputBxName.querySelector('.create__input').focus();

            createInputBxName.style.left = "";
            createInputBxName.style.visibility = "";
            createInputBxName.style.opacity = "";

            createInputBxPassword.style.left = "";
            createInputBxPassword.style.visibility = "";
            createInputBxPassword.style.opacity = "";
          }, 1001);

          setErr({"resName": err.response.data});
        }
      }

      createResAxios();
    }
  }

  const showPassword = () => {
    const createEye = document.querySelector('.create__eyeOff');
    const passwordInput = document.querySelector('#create__inputPass');
    
    if(createEye.dataset.showpass === "true"){
      createEye.dataset.showpass = "false";
      passwordInput.type = "password";
    }
    else{
      createEye.dataset.showpass = "true";
      passwordInput.type = "text";
    }
  }

  
  return (
    <main className='main__create'>
      <p className='create__login'>Already created resources? <Link to="/login" className='create__loginLink'>Update</Link></p>
      <h1 className='create__title'>Have all your resources ready in one link</h1>
      <div className='create__formBx'>
        <div className='create__form name'>
          <div className="create__inputBx">
            <input ref={resName} type="text" placeholder='Name your Resources' className='create__input' id='create__inputName' onKeyDown={e => {if(e.code === "Enter" || e.code === "NumpadEnter"){handlePassword()}}} />
            <label htmlFor="create__inputName" className='create__label'>Name your Resources</label>
            { err.resName && 
              <p className='create__error'>{ err.resName }</p>
            }
          </div>
          <button onClick={handlePassword} className='create__enterBtn'>Next</button>
        </div>
        <div className='create__form password'>
          <div className="create__inputBx">
            <input ref={resPassword} type="password" placeholder='Hide your Resources, enter Password' className='create__input' id='create__inputPass' onKeyDown={e => {if(e.code === "Enter" || e.code === "NumpadEnter"){handleSubmit()}}} />
            <label htmlFor="create__inputPass" className='create__label'>Enter your password</label>
            <div className='create__eyeBx' onClick={showPassword}>
              <img src={eyeOn} alt="" aria-hidden="true" className='create__eye on' draggable="false" />
              <div data-showpass="false" className='create__eyeOff'>
                <span className='eyeOff__span'></span>
              </div>
            </div>
            { err.resPassword && 
              <p className='create__error'>{ err.resPassword }</p>
            }
          </div>
          <button onClick={handleSubmit} className='create__enterBtn'>Enter</button>
        </div>
      </div>
    </main>
  )
}

export default CreateRes