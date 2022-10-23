export const handleEdit = () => {
  const resEditBx = document.querySelector('.res__editBx');

  resEditBx.style.animation = "resEditActiveIn 250ms ease-in-out forwards";
}

export const handleCancel = () => {
  const resEditBx = document.querySelector('.res__editBx');

  resEditBx.style.animation = "resEditActiveOut 250ms ease-in-out forwards";
}