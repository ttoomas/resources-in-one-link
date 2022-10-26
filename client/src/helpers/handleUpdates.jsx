export const handleEdit = () => {
  const resEditBx = document.querySelector('.res__editBx');

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