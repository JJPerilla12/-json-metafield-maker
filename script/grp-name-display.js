$(document).ready(function() {
//grp name
const name_inputs = document.getElementsByClassName('g_name');
const name_labels = document.querySelectorAll('.grp-label');
//title


for (let i = 0; i < name_inputs.length; i++) {
  name_inputs[i].addEventListener('input', (event) => {
    name_labels[i].textContent ='Group Name: '+ event.target.value;
  });
};

const title = document.getElementsByClassName('title');
const titleLabel = document.querySelectorAll('.labelAccordion');
for(let i = 0; i < title.length; i++){
  title[i].addEventListener('input', (event) =>{
titleLabel[i].textContent = event.target.value;
  });
};

});