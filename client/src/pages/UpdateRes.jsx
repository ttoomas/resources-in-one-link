import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editIcon from "../imgs/edit.png";
import deleteIcon from "../imgs/delete.png";
import textIcon from "../imgs/text.png";
import { handleEdit, handleCancel, copyRes } from "../helpers/handleUpdates";
import { useState } from 'react';

const UpdateRes = () => {
	const [sourceName, setSourceName] = useState("");
	const [sourceType, setSourceType] = useState("text");
	const [err, setErr] = useState("");
	const [resourcesId, setResourcesId] = useState("");
	const [sources, setSources] = useState([]);
	const [resShortUrl, setResShortUrl] = useState("github.com/ttoomas");

	const navigate = useNavigate();
	const currentSlug = window.location.pathname.split('/').pop();

	useEffect(() => {
		async function getResources(){
			try{
				const getRes = await axios({
					method: 'post',
					url: "/checkres",
					data: {"currentSlug": currentSlug}
				});

				setResShortUrl(getRes.data.resShortUrl);
				setResourcesId(getRes.data.resId);
				setSources(getRes.data.result);
			}
			catch(err){
				navigate('/login');
			}
		}

		getResources();
		// eslint-disable-next-line
	}, []);


	const handleSourceType = (e) => {
		setSourceType(e.target.value);
	}

	const handleAddRes = (e) => {
		setErr("");
	
		if(sourceName.length === 0){
			setErr("Please enter some source");
		}
		else if(sourceName.length <= 2){
			setErr("Too short, please enter some source");
		}
		else{
			async function createNewSource(){
				try{
					await axios({
						method: "post",
						url: "/createsource",
						data: {"sourceName": sourceName, "sourceType": sourceType, "resourcesId": resourcesId}
					});

					const bottomInput = document.querySelector('.bottom__input');
					const resContentBx = document.querySelector('.res__contentBx');

					setSources(prev => ([...prev, {body: sourceName, type: sourceType}]));
					bottomInput.value = "";
					
					setTimeout(() => {
						resContentBx.scrollTo({ left: 0, top: resContentBx.scrollHeight, behavior: "smooth" });
					}, 10);
				}
				catch(err){
					setErr(err.response.data)
				}
			}

			createNewSource();
		}
	}

	useEffect(() => {
		console.log(sources);
	}, [sources])

	useEffect(() => {
		let isSourceNameLink = /http|www.|..com|..cz/.test(sourceName);
		isSourceNameLink ? setSourceType("link") : setSourceType("text");
	}, [sourceName])


  return (
    <main className="main__res">
			<div className="res__nav">
				<div className="res__copyBx">
					<div className="copy__textBx">
						<p className='copy__text'>Share your resources</p>
						<Link to={{ pathname: `/resources/${currentSlug}`}} target="_blank" className='copy__link'>{ resShortUrl }</Link>
					</div>
					<button className='copy__btn' onClick={(e) => copyRes(e, resShortUrl)}>Copy</button>
				</div>
				<button className="res__logout">Logout</button>
			</div>
			

			<div className='res__contentBx'>
				{ sources.map(({ body, type }) => {
					if(type === "link"){
						let link = "https://" + (body.replace("http://", "").replace("https://", ""));

						return(
							<div className='res__content' key={body}>
								<div className='res__iconBx'>
									<img src={`https://www.google.com/s2/favicons?domain=${link}&sz=32`} onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
								</div>
								<a href={link} target="_blank" rel="noreferrer" className='content__text link'>{ body }</a>
								<div className='content__hover'>
									<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
										<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
									</button>
									<button className="content__iconBx" id='content__delete'>
										<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
									</button>
								</div>
							</div>
						)
					}
					else {
						return(
							<div className='res__content' key={body}>
								<div className='res__iconBx'>
									<img src={textIcon} alt="Icon of your resources" className='res__icon' />
								</div>
								<p className='content__text'>{ body }</p>
								<div className='content__hover'>
									<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
										<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
									</button>
									<button className="content__iconBx" id='content__delete'>
										<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
									</button>
								</div>
							</div>
						)
					}
				}) }
			</div>

			<div className="res__editBx">
				<h3 className='edit__title'>Edit your source</h3>
				<div className='edit__inputContainer'>
					<input type="text" className='edit__input' id='edit__input' placeholder='Update your Source'/>
					<label htmlFor="edit__input" className='edit__label'>Update your Source</label>
				</div>
				<div className="edit__btnBx">
					<button className='edit__btn edit'>Update</button>
					<button className='edit__btn cancel' onClick={handleCancel}>Cancel</button>
				</div>
			</div>

			<div className="res__bottom">
				<div className="bottom__inputBx">
					<input onChange={e => setSourceName(e.target.value)} type="text" className='bottom__input' id='bottom__input' placeholder='Add new Source here' onKeyDown={e => {if(e.key === "Enter" || e.key === "NumpadEnter") {handleAddRes()}}} />
					<label htmlFor="bottom__input" className='bottom__label'>Add new Source here</label>
				</div>
				<div className='bottom__typeBx'>
					<p className='type__text'>What type is it?</p>

					<div className="type__inputBx">
						<input type="radio" name='type' className='type__input' id="type__link" value="link" checked={sourceType === 'link'} onChange={handleSourceType} />
						<label htmlFor="type__link" className='type__label'>Link</label>
					</div>

					<div className="type__inputBx">
						<input type="radio" name='type' className='type__input' id="type__text" value="text" checked={sourceType === 'text'} onChange={handleSourceType} />
						<label htmlFor="type__text" className='type__label'>Text</label>
					</div>
				</div>
				<button className='type__addBtn' onClick={handleAddRes}>
					<span className='addDesktop'>Add new Source</span>
					<span className='addMobile'>Add new</span>
				</button>
				{ err && 
					<p className='res__error'>{ err }</p>
				}
			</div>
		</main>
  )
}

export default UpdateRes