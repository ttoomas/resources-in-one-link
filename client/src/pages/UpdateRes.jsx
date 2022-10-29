import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editIcon from "../imgs/edit.png";
import deleteIcon from "../imgs/delete.png";
import textIcon from "../imgs/text.png";
import { handleEdit, copyRes, handleDeleteSource, handleSourceType, handleCancel, handleUpdateSourceType } from "../helpers/handleUpdates";
import { useState } from 'react';

const UpdateRes = () => {
	const [sourceName, setSourceName] = useState("");
	const [sourceType, setSourceType] = useState("text");
	const [updateSourceType, setUpdateSourceType] = useState("");
	const [err, setErr] = useState({});
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

	const handleAddRes = (e) => {
		setErr({});
	
		if(sourceName.length === 0){
			setErr({"createSource": "Please enter some source"});
		}
		else if(sourceName.length <= 2){
			setErr({"createSource": "Too short, please enter some source"});
		}
		else{
			async function createNewSource(){
				try{
					const sourceIdRes = await axios({
						method: "post",
						url: "/createsource",
						data: {"sourceName": sourceName, "sourceType": sourceType, "resourcesId": resourcesId}
					});

					const sourceId = sourceIdRes.data;

					const bottomInput = document.querySelector('.bottom__input');
					const resContentBx = document.querySelector('.res__contentBx');

					setSources(prev => ([...prev, {"body": sourceName, "type": sourceType, "id": sourceId}]));
					bottomInput.value = "";
					
					setTimeout(() => {
						resContentBx.scrollTo({ left: 0, top: resContentBx.scrollHeight, behavior: "smooth" });
					}, 10);
				}
				catch(err){
					setErr({"createSource": err.response.data})
				}
			}

			createNewSource();
		}
	}

	const resLogout = async () => {
		await axios({
			method: "get",
			url: "/logoutres"
		});
	
		navigate('/login');
	}

	const handleUpdateSource = async (e) =>  {
		const resEditBx = e.target.parentNode.parentNode;
		const resEditInput = resEditBx.querySelector('.edit__input');
		const inputValue = resEditInput.value;
		const originalInputValue = resEditInput.getAttribute('data-original-content');
		const sourceId = resEditBx.getAttribute('data-source-id');
		const originalValueType = resEditBx.getAttribute('data-original-type');
	
		if(inputValue.length === 0){
			setErr({"updateSource": "Please enter some source"});
		}
		else if(inputValue.length <= 2){
			setErr({"updateSource": "Too short, please enter some source"});
		}
		else if(inputValue === originalInputValue && originalValueType === updateSourceType){
			handleCancel({setErr});
		}
		else{
			try{
				await axios({
					method: "post",
					url: "/updatesource",
					data: {"sourceId": sourceId, "sourceContent": inputValue, "sourceType": updateSourceType, "resId": resourcesId}
				})

				setSources(sources.map(obj => {
					if(obj.id === parseInt(sourceId)){
						return {...obj, body: inputValue, type: updateSourceType};
					}

					return obj;
				}))
	
				handleCancel({setErr});
			}
			catch(err){
				setErr({"updateSource": err.response.data})
			}
		}
	}

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
				<button className="res__logout" onClick={resLogout}>Logout</button>
			</div>
			

			<div className='res__contentBx'>
				{ sources.map(({ body, type, id }) => {
					if(type === "link"){
						let link = "https://" + (body.replace("http://", "").replace("https://", ""));
						let faviconImg = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link}&size=64`;
						
						return(
							<div className='res__content' key={body}>
								<div className='res__iconBx'>
									<img src={faviconImg} alt="Icon of your source" className='res__icon' />
								</div>
								<div className='content__textBx'>
									<a href={link} target="_blank" rel="noreferrer" className='content__text link'>{ body }</a>
								</div>
								<div className='content__hover'>
									<button className="content__iconBx" id='content__edit' onClick={e => handleEdit(e, id, type, {setUpdateSourceType})}>
										<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
									</button>
									<button className="content__iconBx" id='content__delete' onClick={(e) => handleDeleteSource(e, id)}>
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
									<img src={textIcon} alt="Icon of your source" className='res__icon' />
								</div>
								<div className='content__textBx'>
									<p className='content__text'>{ body }</p>
								</div>
								<div className='content__hover'>
									<button className="content__iconBx" id='content__edit' onClick={e => handleEdit(e, id, type, {setUpdateSourceType})}>
										<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
									</button>
									<button className="content__iconBx" id='content__delete' onClick={(e) => handleDeleteSource(e, id)}>
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
					<input type="text" className='edit__input' id='edit__input' placeholder='Update your Source' data-original-content=""/>
					<label htmlFor="edit__input" className='edit__label'>Update your Source</label>
				</div>
				<div className='res__typeBx'>
					<p className='res__typeText'>What type is it?</p>
					<div className="res__inputContainer">
						<div className='res__typeInputBx'>
							<input type="radio" name='resType' className='res__typeInput' id='resType__link' value="link" checked={updateSourceType === "link"} onChange={(e) => handleUpdateSourceType(e, {setUpdateSourceType})} />
							<label htmlFor="resType__link" className='res__typeLabel'>Link</label>
						</div>
						<div className='res__typeInputBx'>
							<input type="radio" name='resType' className='res__typeInput' id='resType__text' value="text" checked={updateSourceType === "text"} onChange={(e) => handleUpdateSourceType(e, {setUpdateSourceType})} />
							<label htmlFor="resType__text" className='res__typeLabel'>Text</label>
						</div>
					</div>
				</div>
				{ err.updateSource && (
					<p className='res__editError'>{err.updateSource}</p>
				) }
				<div className="edit__btnBx">
					<button className='edit__btn edit' onClick={handleUpdateSource}>Update</button>
					<button className='edit__btn cancel' onClick={() => handleCancel({setErr})}>Cancel</button>
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
						<input type="radio" name='type' className='type__input' id="type__link" value="link" checked={sourceType === 'link'} onChange={(e) => handleSourceType(e, {setSourceType})} />
						<label htmlFor="type__link" className='type__label'>Link</label>
					</div>

					<div className="type__inputBx">
						<input type="radio" name='type' className='type__input' id="type__text" value="text" checked={sourceType === 'text'} onChange={(e) => handleSourceType(e, {setSourceType})} />
						<label htmlFor="type__text" className='type__label'>Text</label>
					</div>
				</div>
				<button className='type__addBtn' onClick={handleAddRes}>
					<span className='addDesktop'>Add new Source</span>
					<span className='addMobile'>Add new</span>
				</button>
				{ err.createSource && 
					<p className='res__error'>{ err.createSource }</p>
				}
			</div>
		</main>
	)
}

export default UpdateRes