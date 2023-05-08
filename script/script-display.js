$(document).ready(function() {


// Get references to the dropdown and the form elements
const dropdown = document.getElementById('form-type[]');
const dropdowncount = document.querySelectorAll('.form-type');
const productID =document.querySelectorAll('.product_id');
const g_productID = document.querySelectorAll('.g_product_id');
const dropdowns = document.querySelectorAll('.form-type');

for (let i = 0; i < dropdowns.length; i++) {
// for addons remove required
dropdowns[i].addEventListener('change', function() {
const selectedValue = dropdowns[i].value;
const parentDiv = dropdowns[i].parentNode;
const addonsInputs = parentDiv.getElementsByClassName('product_id');

if (selectedValue === 'Groups') {
for (let i = 0; i < addonsInputs.length; i++) {
  addonsInputs[i].removeAttribute('required');
}
} else {
for (let i = 0; i < addonsInputs.length; i++) {
  addonsInputs[i].setAttribute('required', '');
}
}
});
// for groups product id remove required
dropdowns[i].addEventListener('change', function() {
const selectedValue = dropdowns[i].value;
const parentDiv = dropdowns[i].parentNode;
const addonsInputs = parentDiv.getElementsByClassName('g_product_id');
const gName = parentDiv.getElementsByClassName('g_name');


if (selectedValue === 'Addons') {
for (let i = 0; i < addonsInputs.length; i++) {
  addonsInputs[i].removeAttribute('required');
  gName[i].removeAttribute('required');
}
} else {
for (let i = 0; i < addonsInputs.length; i++) {
  addonsInputs[i].setAttribute('required', '');
  gName[i].setAttribute('required', '');
}
}
});

};

//display

    const inputWrappers = document.querySelectorAll(".input_wrapper");

    inputWrappers.forEach((inputWrapper) => {
    const add_addon_button = inputWrapper.querySelector(".add_addon_button");
    const add_group_button = inputWrapper.querySelector(".add_group_button");
    const dropdown = inputWrapper.querySelector(".form-type");
    const groupsDiv = inputWrapper.querySelector(".grp");
    const addonsDiv = inputWrapper.querySelector(".addons_container");
    
    
    dropdown.addEventListener("change", () => {
    if (dropdown.value === "Groups") {
      groupsDiv.style.display = "block";
      addonsDiv.style.display = "none";
      add_addon_button.style.display="none";
      add_group_button.style.display="block";
     
    } else if (dropdown.value === "Addons") {
      groupsDiv.style.display = "none";
      addonsDiv.style.display = "grid";	
      add_addon_button.style.display="block";
      add_group_button.style.display="none";
      
    }
    });
    });


});