import axios from "axios";

export const handleEdit = (e, id) => {
  const resContent = e.target.parentNode.parentNode.parentNode;
  const contentText = resContent.querySelector('.content__text').textContent;
  const editInput = document.querySelector('.edit__input');
  const resEditBx = document.querySelector('.res__editBx');

  editInput.value = contentText;
  editInput.setAttribute('data-original-content', contentText);
  resEditBx.setAttribute('data-source-id', id);

  resEditBx.style.animation = "resEditActiveIn 250ms ease-in-out forwards";
}

export const handleCancel = () => {
  const resEditBx = document.querySelector('.res__editBx');

  resEditBx.style.animation = "resEditActiveOut 250ms ease-in-out forwards";
}

export const copyRes = (e, resShortUrl) => {
  const copyBtn = e.target;

  navigator.clipboard.writeText(resShortUrl);
  copyBtn.innerText = "Copied";
  copyBtn.setAttribute('disabled', '');
  copyBtn.classList.add('copied');

  setTimeout(() => {
    copyBtn.classList.remove('copied');
    copyBtn.innerText = "Copy";
    copyBtn.removeAttribute('disabled');
  }, 2000);
}

export const handleDeleteSource = (e, id) => {
  const parent = e.target.parentNode.parentNode.parentNode;

  parent.remove();

  axios({
    method: "post",
    url: "/deletesource",
    data: {id}
  })
}