const nameField = document.querySelector('#name');
const otherJobField = document.querySelector('#other-job-role');
const jobRoleSelect = document.querySelector('#title');

nameField.focus();

//  job role selector
otherJobField.style.display = 'none';
jobRoleSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected === 'other') {
        otherJobField.style.removeProperty('display');
    } else {
        otherJobField.style.display = 'none';
    }
});

const shirtDesignSelect = document.querySelector('#design');
const shirtColorSelect = document.querySelector('#color');
const jsPunsColors = document.querySelectorAll('[data-theme="js puns"]');
const heartJsColors = document.querySelectorAll('[data-theme="heart js"]');

// shirt color options are disabled until a design option is selected
shirtColorSelect.disabled = true;

//  this adds/removes hidden attribute to shirt colors
shirtDesignSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    const jsPunsOption = shirtDesignSelect[1];
    shirtColorSelect.disabled = false;

    for (let i = 0; i < 3; i++) {
        if (selected === jsPunsOption.value) {
            shirtColorSelect[0].selected = true;
            heartJsColors[i].hidden = true;
            jsPunsColors[i].hidden = false;
        } else {
            shirtColorSelect[0].selected = true;
            jsPunsColors[i].hidden = true;
            heartJsColors[i].hidden = false;
        }
    }
});

const activities = document.querySelectorAll('#activities input');
const activitiesCost = document.querySelector('#activities-cost');
const activityFieldset = document.querySelector('#activities');
let totalCost = 0;

// change occurs for loop adds cost of activity to total price if checked

activityFieldset.addEventListener('change', (e) => {
    const checked = e.target;
    const checkedPrice = checked.getAttribute('data-cost');
    const checkedDayTime = checked.getAttribute('data-day-and-time');


    if (checked.checked) {
        totalCost += parseInt(checkedPrice);
    } else {
        totalCost -= parseInt(checkedPrice);
    }

    activitiesCost.innerHTML = `Total: $${totalCost}`;

    // when checked the activity time & day matches other activities. it disable conflicting activities
    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        const activityDayTime = activity.getAttribute('data-day-and-time')
        if (checkedDayTime === activityDayTime && activity !== checked && checked.checked === true) {
            activity.disabled = true;
            activity.parentElement.classList.add('disabled');
        } else if (checkedDayTime === activityDayTime && activity !== checked && checked.checked === false) {
            activity.disabled = false;
            activity.parentElement.classList.remove('disabled');
        }
    }
});

const paymentSelect = document.querySelector('#payment');
const paymentMethods = document.querySelector('.payment-methods').children
const creditCard = document.querySelector('#credit-card');
const payPal = document.querySelector('#paypal');
const bitCoin = document.querySelector('#bitcoin');

// starts  on credit card
paymentSelect[1].selected = true;
creditCard.hidden = false;
payPal.hidden = true;
bitCoin.hidden = true;

// when user selects the payment menthod it shows only the selected one and others are hidden
paymentSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    for (let i = 0; i < paymentMethods.length; i++) {

        if (selected === 'credit-card') {
            creditCard.hidden = false;
            paymentMethods[3].hidden = true;
            paymentMethods[4].hidden = true;
        }
        if (selected === 'paypal') {
            payPal.hidden = false;
            paymentMethods[2].hidden = true;
            paymentMethods[4].hidden = true;
        }
        if (selected === 'bitcoin') {
            bitCoin.hidden = false;
            paymentMethods[2].hidden = true;
            paymentMethods[3].hidden = true;
        }
    }
});

function nameValidator() {
    const nameValue = nameField.value;
    // regex provided by teamtreehouse interactive form input validation course
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue) && nameValue !== '';
    return nameIsValid
}

const emailField = document.querySelector('#email');

function emailValidator() {
    const emailValue = emailField.value;
    // regex provided by teamtreehouse interactive form input validation course
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue) && emailValue !== '';
    return emailIsValid;
}

function activityValidator() {
    let cost = activitiesCost.innerText;
    // regex to remove nondigits provided by Alex Wayne on stackoverflow
    cost = parseInt(cost.replace(/\D/g, ''));
    const activityIsValid = cost > 0;
    return activityIsValid;
}

const ccNumberField = document.querySelector('#cc-num');

function ccNumberValidator() {
    const ccNumberValue = ccNumberField.value;
    const ccNumberIsValid = /^\d{13,16}$/g.test(ccNumberValue) && ccNumberValue !== '';
    return ccNumberIsValid;
}

const zipCodeField = document.querySelector('#zip');

function zipCodeValidator() {
    const zipCodeValue = zipCodeField.value;
    const isZipCodeValid = /^\d{5}$/g.test(zipCodeValue) && zipCodeValue !== '';
    return isZipCodeValid;
}

const cvvField = document.querySelector('#cvv');

function cvvValidator() {
    const cvvValue = cvvField.value;
    const isCvvValid = /^\d{3}$/g.test(cvvValue) && cvvValue !== '';
    return isCvvValid;
}

/**
 * This function changes the styling of invalid fields.
 * 
 * @param {variable} field variable containing the field you want to style as invalid
 */
function invalidField(field) {
    field.parentElement.classList.add('not-valid');
    field.parentElement.classList.remove('valid');
    field.parentElement.lastElementChild.classList.remove('hint');
}

/**
 * This function changes the styling of invalid activity fieldset.
 * 
 * @param {variable} fieldset variable containing the fieldset you want to style as invalid
 */
function invalidActivityField(fieldset) {
    fieldset.classList.add('not-valid');
    fieldset.classList.remove('valid');
    fieldset.lastElementChild.classList.remove('hint');
}

// This function changes the styling of valid fields.
 @param {variable} field variable containing the field you want to style as valid
 
function validField(field) {
    field.parentElement.classList.add('valid');
    field.parentElement.classList.remove('not-valid');
    field.parentElement.lastElementChild.classList.add('hint');
}

// This function changes the styling of valid activity fieldset
  @param {variable} fieldset variable containing the fieldset you want to style as valid
 
function validActivityField(fieldset) {
    fieldset.parentElement.classList.add('valid');
    fieldset.parentElement.classList.remove('not-valid');
    fieldset.lastElementChild.classList.add('hint');
}

// prevents form submission and puts error message for invalid field
// shows checkmark by field if valid
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {

    if (!nameValidator()) {
        e.preventDefault();
        invalidField(nameField);
        if (nameField.value === '') {
            nameField.parentElement.lastElementChild.innerText = 'Name field cannot be blank.'
        } else {
            nameField.parentElement.lastElementChild.innerText = 'Name must only contain alphabetical characters.'
        }
    }

    if (nameValidator()) {
        validField(nameField);
    }

    if (!emailValidator()) {
        e.preventDefault();
        invalidField(emailField);
        if (emailField.value === '') {
            emailField.parentElement.lastElementChild.innerText = 'Email field cannot be blank.'
        } else {
            emailField.parentElement.lastElementChild.innerText = 'Email address must be formatted properly.'
        }
    }

    if (emailValidator()) {
        validField(emailField);
    }

    if (!activityValidator()) {
        e.preventDefault();
        invalidActivityField(activityFieldset);
    }

    if (activityValidator()) {
        validActivityField(activityFieldset);
    }

    if (paymentSelect[1].selected) {
        if (!ccNumberValidator()) {
            e.preventDefault();
            invalidField(ccNumberField);
        }

        if (ccNumberValidator()) {
            validField(ccNumberField);
        }
    }

    if (!zipCodeValidator()) {
        e.preventDefault();
        invalidField(zipCodeField);
    }

    if (zipCodeValidator()) {
        validField(zipCodeField);
    }

    if (!cvvValidator()) {
        e.preventDefault();
        invalidField(cvvField);
    }

    if (cvvValidator()) {
        validField(cvvField);
    }
});

// provides real time feedback to user for errors, conditional error messaging for name & email fields
nameField.addEventListener('keyup', () => {
    if (!nameValidator()) {
        invalidField(nameField);
        if (nameField.value === '') {
            nameField.parentElement.lastElementChild.innerText = 'Name field cannot be blank.'
        } else {
            nameField.parentElement.lastElementChild.innerText = 'Name must only contain alphabetical characters.'
        }
    }

    if (nameValidator()) {
        validField(nameField);
    }
});

emailField.addEventListener('keyup', () => {
    if (!emailValidator()) {
        invalidField(emailField);
        if (emailField.value === '') {
            emailField.parentElement.lastElementChild.innerText = 'Email field cannot be blank.'
        } else {
            emailField.parentElement.lastElementChild.innerText = 'Email address must be formatted properly.'
        }
    }

    if (emailValidator()) {
        validField(emailField);
    }
});

activityFieldset.addEventListener('change', () => {
    if (!activityValidator()) {
        invalidActivityField(activityFieldset);
    }

    if (activityValidator()) {
        validActivityField(activityFieldset);
    }
});

ccNumberField.addEventListener('keyup', () => {
    if (!ccNumberValidator()) {
        invalidField(ccNumberField);
    }

    if (ccNumberValidator()) {
        validField(ccNumberField);
    }
});

zipCodeField.addEventListener('keyup', () => {
    if (!zipCodeValidator()) {
        invalidField(zipCodeField);
    }

    if (zipCodeValidator()) {
        validField(zipCodeField);
    }
});

cvvField.addEventListener('keyup', () => {
    if (!cvvValidator()) {
        invalidField(cvvField);
    }

    if (cvvValidator()) {
        validField(cvvField);
    }
});

// adds  obvious focus indicator to activities when tabbing through
for (let i = 0; i < activities.length; i++) {
    const activityLabels = document.querySelectorAll('#activities label');
    const activity = activities[i];
    const label = activityLabels[i];

    activity.addEventListener('focus', () => {
        label.classList.add('focus');
    });

    activity.addEventListener('blur', () => {
        label.classList.remove('focus');
    });
}
