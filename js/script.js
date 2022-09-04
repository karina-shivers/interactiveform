// The Name field
window.onload = function () {
    document.getElementById('name').focus();
};

//Job Role
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';

const jobTitle = document.getElementById('title');
jobTitle.addEventListener('change', e => {
    (e.target.value === 'other')? otherJobRole.style.display = '' : otherJobRole.style.display = 'none';
});

// T-Shirt Info
const designTheme = document.getElementById('design');
const colorTheme = document.getElementById('color');
const colorThemeOption = colorTheme.children;
colorTheme.disabled = true;

designTheme.addEventListener ('change', e=> {
    colorTheme.disabled = false;
    for (let i=0; i < colorThemeOption.length; i++){
        const selectTheme = e.target.value;
        const themeOption = colorThemeOption[i].getAttribute('data-theme');
        if (selectTheme === themeOption) {
            colorThemeOption[i].hidden = false;
            colorThemeOption[i].setAttribute('selected', true);
        } else {
            colorThemeOption[i].hidden = true;
            colorThemeOption[i].removeAttribute('selected');
        }
    }
}); 

// Register for Activities
const activitiesSelected = document.getElementById('activities-box');
const activitiesAmount = document.getElementById('activities-cost');
const allSelected = document.querySelectorAll('input[type="checkbox"]');
let allCosts = 0;

activitiesSelected.addEventListener('change', e => {
    const costSelected = parseInt(e.target.getAttribute('data-cost'));
    (e.target.checked)? allCosts += costSelected : allCosts -= costSelected;
    activitiesAmount.textContent = `Total: $${allCosts}`;

    const dayTime = e.target.getAttribute('data-day-and-time');
    const isChecked = e.target.checked;

    if (isChecked) {
        for (let i=0; i < allSelected.length; i++) {
            if (e.target !== allSelected[i] && dayTime === allSelected[i].getAttribute('data-day-and-time')) {
                allSelected[i].disabled = true;
                allSelected[i].parentElement.classList.add('disabled');
            }
        }
    } else {
        for (let i=0; i < allSelected.length; i++) {
            if (dayTime === allSelected[i].getAttribute('data-day-and-time')) {
                allSelected[i].disabled = false; 
                allSelected[i].parentElement.classList.remove('disabled');
            }
        }
    }
}); 

// Payment Info
const paymentMethods = document.getElementById('payment');
paymentMethods.children[1].setAttribute('selected', true);

const creditCard = document.getElementById('credit-card');
creditCard.style.display = '';

const bitcoin = document.getElementById('bitcoin');
bitcoin.style.display = 'none';

const paypal = document.getElementById('paypal');
paypal.style.display = 'none';

paymentMethods.addEventListener ('change', e => {
    const selectPaymentMethod = e.target.value;
    switch (selectPaymentMethod) {
        case 'paypal':
            paypal.style.display = '';
            bitcoin.style.display = 'none';
            creditCard.style.display = 'none';
            break;
        case 'bitcoin':
            bitcoin.style.display = '';
            creditCard.style.display = 'none';
            paypal.style.display = 'none';
            break;
        case 'creditCard':
            creditCard.style.display = '';
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';
            break;
        default:
            creditCard.style.display = '';
            paypal.style.display = 'none';
            bitcoin.style.display = 'none';    
    }
}); 

// Form validation
// Form inputs
const form = document.querySelector("form");
const nameValid = document.getElementById("name");
const email = document.getElementById("email");
const ccNumber = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");

// Validating name field
function isValidName() {
    const validCheck = /^\s*$/.test(nameValid.value);
    (!validCheck)? noRequiredHint(nameValid) : requiredHint(nameValid);
    return validCheck;
};

nameValid.addEventListener ('keyup', isValidName);

// Validate email field
function isEmailValid() {
    const isEmpty = /^\s*$/.test(email.value);
    const isValid = /^[^@]+\@[^@.]+\.com$/i.test(email.value);

    if (isEmpty) {
        requiredHint(email);
        email.parentElement.lastElementChild.innerHTML = 'Email field cannot be blank';
        return false;
    } else if (!isValid) {
        requiredHint(email);
        email.parentElement.lastElementChild.innerHTML = 'Email address must contain @ sign and end with ".com"';
        return false;
    } else {
        noRequiredHint(email);
        return true;
    }
};



function isActivitySelected() {
    const valid = allCosts > 0;
    (valid)? noRequiredHint(activitiesSelected) : requiredHint(activitiesSelected);
    return valid; 
};


function isCreditCardValid() {
    const valid = /^(\d{13,16})$/.test(ccNumber.value);
    (valid)? noRequiredHint(ccNumber) : requiredHint(ccNumber);
    return valid; 
};


function isZipValid() {
    const valid = /^(\d{5})$/.test(zip.value);
    (valid)? noRequiredHint(zip) : requiredHint(zip);
    return valid; 
};


function isCvvValid() {
    const valid = /^(\d{3})$/.test(cvv.value);
    (valid)? noRequiredHint(cvv) : requiredHint(cvv);
    return valid; 
};

// Validate form
form.addEventListener('submit', e => {
    if (isValidName()) {
        e.preventDefault();
    }
    if (!isEmailValid()) {
        e.preventDefault();
    }
    if (!isActivitySelected()) {
        e.preventDefault();
    }
    if (creditCard.style.display === '' && !isCreditCardValid()) {
        e.preventDefault();
    }
    if (creditCard.style.display === '' && !isZipValid()) {
        e.preventDefault();
    }
    if (creditCard.style.display === '' && !isCvvValid()) {
        e.preventDefault();
    }
});

// Accessibility 
for (let i=0; i < allSelected.length; i++) {
    allSelected[i].addEventListener('focus', e => {e.target.parentElement.classList.add('focus')});
    allSelected[i].addEventListener('blur', e => {e.target.parentElement.classList.remove('focus')});
}

// Hint validation
function requiredHint (element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
};

function noRequiredHint (element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = "none";
};
