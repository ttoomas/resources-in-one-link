import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editIcon from "../imgs/edit.png";
import deleteIcon from "../imgs/delete.png";
import textIcon from "../imgs/text.png";
import { handleEdit, handleCancel } from "../helpers/handleEdit";

const UpdateRes = () => {
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

				console.log(getRes.data);
			}
			catch(err){
				navigate('/login');
			}
		}

		getResources();
		// eslint-disable-next-line
	}, []);


  return (
    <main className="main__res">
			<div className="res__nav">
				<div className="res__copyBx">
					<div className="copy__textBx">
						<p className='copy__text'>Share your resources</p>
						<Link to={{ pathname: `/resources/${currentSlug}`}} className='copy__link'>short.ly/haha</Link>
					</div>
					<button className='copy__btn'>Copy</button>
				</div>
				<button className="res__logout">Logout</button>
			</div>
			

			<div className='res__contentBx'>
				<div className='res__content'>
					<div className='res__iconBx'>
						<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
					</div>
					<p className='content__text'>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet lorem. Lorem, ipsum dolor.</p>
					<div className='content__hover'>
						<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
							<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
						</button>
						<button className="content__iconBx" id='content__delete'>
							<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
						</button>
					</div>
				</div>

				
				<div className='res__content'>
					<div className='res__iconBx'>
						<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
					</div>
					<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
					<div className='content__hover'>
						<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
							<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
						</button>
						<button className="content__iconBx" id='content__delete'>
							<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
						</button>
					</div>
				</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
				
				<div className='res__content'>
					<div className='res__iconBx'>
						<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
					</div>
					<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
					<div className='content__hover'>
						<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
							<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
						</button>
						<button className="content__iconBx" id='content__delete'>
							<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
						</button>
					</div>
				</div>
				
				<div className='res__content'>
					<div className='res__iconBx'>
						<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
					</div>
					<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
					<div className='content__hover'>
						<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
							<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
						</button>
						<button className="content__iconBx" id='content__delete'>
							<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
						</button>
					</div>
				</div>

				
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
<div className='res__content'>
	<div className='res__iconBx'>
		<img src="https://google.com/favicon.ico" onError={e => {e.currentTarget.src = textIcon}} alt="Icon of your resources" className='res__icon' />
	</div>
	<p className='content__text'>Lorem ipsum dolor sit amet consectetur</p>
	<div className='content__hover'>
		<button className="content__iconBx" id='content__edit' onClick={handleEdit}>
			<img src={editIcon} className="content__icon" id='contentIcon__edit' alt="" aria-hidden="true" draggable="false" />
		</button>
		<button className="content__iconBx" id='content__delete'>
			<img src={deleteIcon} className="content__icon" alt="" aria-hidden="true" draggable="false" />
		</button>
	</div>
</div>
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
					<input type="text" className='bottom__input' id='bottom__input' placeholder='Add new Source here' />
					<label htmlFor="bottom__input" className='bottom__label'>Add new Source here</label>
				</div>
				<div className='bottom__typeBx'>
					<p className='type__text'>What type is it?</p>

					<div className="type__inputBx">
						<input type="radio" name='type' className='type__input' id="type__link" checked />
						<label htmlFor="type__link" className='type__label'>Link</label>
					</div>

					<div className="type__inputBx">
						<input type="radio" name='type' className='type__input' id="type__text" />
						<label htmlFor="type__text" className='type__label'>Text</label>
					</div>
				</div>
				<button className='type__addBtn desktop'>Add new Source</button>
				<button className='type__addBtn mobile'>Add new</button>
			</div>
		</main>
  )
}

export default UpdateRes