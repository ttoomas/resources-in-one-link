import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

const Resources = () => {
	useEffect(() => {
		const currentSlug = window.location.pathname.split('/').pop();
		
		async function getResources(){
			try{
				const getRes = await axios({
					method: 'post',
					url: "/checkres",
					data: {"currentSlug": currentSlug}
				});

				console.log(getRes.data);
			}
			catch(err){
				console.log(err);
			}
		}

		getResources();
	}, [])

  return (
    <div>
			resources
		</div>
  )
}

export default Resources