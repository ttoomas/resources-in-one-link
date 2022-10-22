import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eyeOn from "../imgs/eye.png";

const LoginRes = () => {
  const navigate = useNavigate();
  const resName = useRef(null);
  const resPassword = useRef(null);
  const [err, setErr] = useState([]);

  const showPassword = () => {
    const createEye = document.querySelector('.login__eyeOff');
    const passwordInput = document.querySelector('#login__inputPass');
    
    if(createEye.dataset.showpass === "true"){
      createEye.dataset.showpass = "false";
      passwordInput.type = "password";
    }
    else{
      createEye.dataset.showpass = "true";
      passwordInput.type = "text";
    }
  }

  const handleSubmit = () => {
    const resNameVal = resName.current.value;
    const resPasswordVal = resPassword.current.value;
    let errs = 0;
    setErr([]);

    if(resNameVal.length === 0){
      errs++;
      setErr(prev => ({...prev, "resName": "Please enter resources Name"}));
    }
    if(resPasswordVal.length === 0){
      errs++
      setErr(prev => ({...prev, "resPassword": "Please enter resources Password"}));
    }
    else if(errs === 0){
      async function loginResAxios(){
        try{
          const slug = await axios({
            method: "post",
            url: "/loginres",
            data: {"resName": resNameVal, "resPassword": resPasswordVal}
          });

          navigate(`/resources/${slug.data.slug}`);
        }
        catch(err){
          setErr(err.response.data);
        }
      }

      loginResAxios();
    }
  }

  
  return (
    <main className='main__login'>
      <p className='login__create'>Don't have resources? <Link to="/" className='login__createLink'>Create</Link></p>
      <h1 className='login__title'>Already created your resources? Update them!</h1>
      <div className="login__formContainer">
        <div className="login__formBx">
          <div className='login__form name'>
            <input ref={resName} type="text" placeholder='Name of Resources' className='login__input' id='login__inputName' />
            <label htmlFor="login__inputName" className='login__label'>Name of Resources</label>
          </div>
            { err.resName &&
              <p className='login__error'>{ err.resName }</p>
            }
        </div>

        <div className="login__formBx password">
          <div className='login__form password'>
            <input ref={resPassword} type="password" placeholder='Resources Password' className='login__input' id='login__inputPass' onKeyDown={e => {if(e.key === "Enter" || e.key === "NumEnter"){handleSubmit();}}} />
            <label htmlFor="login__inputPass" className='login__label'>Resources Password</label>
            <div className='login__eyeBx' onClick={showPassword}>
              <img src={eyeOn} alt="" aria-hidden="true" className='login__eye on' draggable="false" />
              <div data-showpass="false" className='login__eyeOff'>
                  <span className='eyeOff__span'></span>
              </div>
            </div>
          </div>
            { err.resPassword &&
              <p className='login__error'>{ err.resPassword }</p>
            }
        </div>
        <button onClick={handleSubmit} className='login__enterBtn'>Login</button>
      </div>
    </main>
  )
}

export default LoginRes