import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import textIcon from "../imgs/text.png";

const ViewRes = () => {
  const location = useLocation();
  const path = location.pathname.split('/resources/')[1];
  const [sources, setSources] = useState([]);
  
  async function getSources(){
    const newSources = await axios({
      method: "post",
      url: "/getSources",
      data: {path}
    })

    setSources(newSources.data);
  }

  useEffect(() => {
    getSources();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log(sources);
  }, [sources])


  return (
    <main className="main__view">
      <h1 className='view__title'>This is a list of all sources used in <span className='view__projectTitle'>School Presentation</span> project</h1>
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
                <a href='idk' className='view__text link'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, possimus ea ipsum voluptatem rem ex dolorum vel eveniet dolore amet asperiores sapiente explicabo. Asperiores enim, quos explicabo architecto sit laudantium sunt eum debitis velit beatae aliquam reprehenderit sed fuga laborum.</a>
              </div>
            )
          }
          else{
            return(
              <div className="view__content" key={arrayId}>
                <div className='view__iconBx'>
                  <img src={textIcon} alt="Icon type of source" className='view__icon' />
                </div>
                <p className='view__text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, possimus ea ipsum voluptatem rem ex dolorum vel eveniet dolore amet asperiores sapiente explicabo. Asperiores enim, quos explicabo architecto sit laudantium sunt eum debitis velit beatae aliquam reprehenderit sed fuga laborum.</p>
              </div>
            )
          }
        }) }

      </div>
    </main>
  )
}

export default ViewRes