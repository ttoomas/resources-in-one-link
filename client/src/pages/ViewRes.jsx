import axios from 'axios';
import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import textIcon from "../imgs/text.png";

const ViewRes = () => {
  const location = useLocation();
  const path = location.pathname.split('/resources/')[1];
  const [sources, setSources] = useState([]);
  const resTitle = useRef(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    document.title = "View Resources List";
  }, [])
  
  async function getSources(){
    try{
      const newSources = await axios({
        method: "post",
        baseURL: process.env.REACT_APP_BACKEND_URL,
        url: "/getSources",
        data: {path}
      })
  
      setSources(newSources.data.sources);
      resTitle.current = newSources.data.resName;
    }
    catch(err){
      if(err.response.data.errorId === 1){
        setErr(1);
      }
      else if(err.response.data.errorId === 2){
        resTitle.current = err.response.data.resName;
        setErr(2);
      }
    }
  }

  useEffect(() => {
    getSources();
    // eslint-disable-next-line
  }, [])

  
  return (
    <>
      {(() => {
        if(!err){
          return (
            <main className="main__view viewMaxHeight">
              <h1 className='view__title'>This is a list of all sources used in <span className='view__projectTitle'>{resTitle.current}</span> project</h1>
              <div className="view__contentBx">
                { sources.map(({ body, type, arrayId}) => {
                  if(type === "link"){
                    let link = "https://" + (body.replace("http://", "").replace("https://", ""));
                    let faviconImg = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link}&size=64`;

                    return(
                      <div className="view__content" key={arrayId}>
                        <div className='view__iconBx'>
                          <img src={faviconImg} alt="Icon type of source" className='view__icon' />
                        </div>
                        <a href={link} target="_blank" rel='noreferrer' className='view__text link'>{ body }</a>
                      </div>
                    )
                  }
                  else{
                    return(
                      <div className="view__content" key={arrayId}>
                        <div className='view__iconBx'>
                          <img src={textIcon} alt="Icon type of source" className='view__icon' />
                        </div>
                        <p className='view__text'>{ body }</p>
                      </div>
                    )
                  }
                }) }
              </div>
            </main>
          )
        }
        else if(err === 1){
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
        else if(err === 2){
          return (
            <main className="main__view">
              <div className='exError'>
                <div className='exError__statusBx'>
                  <h2 className="exError__status">200</h2>
                </div>
                <h1 className='exError__info'>This will be a list of all sources used in <span className='exError__projectInfo'>{resTitle.current}</span> project, but the author did not provide any sources</h1>
                <h3 className='exError__create'>Please, update this resources or <Link to="/" className='exError__createLink'>Create New</Link></h3>
              </div>
            </main>
          )
        }
      })()}
    </>
  )
}

export default ViewRes