export class Form {

    // REGEXP
    static get EMAIL_REGEXP() {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    }

    static get TEXTAREA_REGEXP() {
        return /^(?:\b\w+\b[\s\r\n]*){0,149}$/;
    }

    static get PHONE_REGEXP() {
        return /^[679][0-9]{8}$/;
    }

    constructor() {
        this.inputsText = document.querySelectorAll('input[type=text]');
        this.inputName = document.querySelector('#name');
        this.inputEmail = document.querySelector('#email');
        this.inputTel = document.querySelector('input[type=tel]');
        this.textArea = document.querySelector('#comment');
        this.select = document.querySelector('select');
        this.form = document.querySelector('#contact_form');
        this.initialize();

        this.data = {
            name: "",
            email: "",
            comment: "",
            phone: "",
            select: "",
        }
    }

    /**
     * Method for initialize listeners and other methods
     */
    initialize() {
        this.form.addEventListener('submit', this.validate.bind(this));
        this.inputsText.forEach(input => input.addEventListener('input', this.checkText.bind(this)));
        this.inputEmail.addEventListener('input', this.checkEmail.bind(this));
        this.textArea.addEventListener('input', this.checkTextArea.bind(this));
        this.inputTel.addEventListener('input', this.checkPhone.bind(this));
        this.select.addEventListener('change', this.otherSelection.bind(this));
    }

    /**
     * Method for validate form
     * @param e
     * @returns {boolean}
     */
    validate(e) {
        e.preventDefault();

        // check all inputs
        if (!this.checkEmail() || !this.checkText() ||
            !this.checkTextArea() || !this.checkPhone()) {
            return false;
        }

        this.guardarDatos();
    }

    guardarDatos() {
        this.data = {
            name:  this.inputName.value,
            email: this.inputEmail.value ,
            phone: this.inputTel.value,
            message: this.textArea.value,
            seleccion: this.getSelectValue()
        };

        console.dir(this.data)
    }

    /**
     * Method for test regexp
     * @param email
     * @param regexp
     * @returns {boolean}
     */
    check(email, regexp) {
        return regexp.test(email);
    }

    /**
     * Check comment validity
     * @returns {boolean}
     */
    checkTextArea() {
        if (!this.check(this.textArea.value, Form.TEXTAREA_REGEXP)) {
            this.textArea.setCustomValidity("El máximo de palabras es 150");
            return false;
        }
        this.textArea.setCustomValidity("");
        return true;
    }

    /**
     * Check email validity
     * @returns {boolean}
     */
    checkEmail() {
        if (!this.check(this.inputEmail.value, Form.EMAIL_REGEXP)) {
            this.inputEmail.setCustomValidity("El email no es válido");
            return false;
        }
        this.inputEmail.setCustomValidity("");
        return true;
    }

    /**
     * Check simple text validity
     * @returns {boolean}
     */
    checkText() {
        this.inputsText.forEach(input => {
            if (!input.checkValidity()) return false;
        });
        return true;
    }

    /**
     * Check phone validity
     * @returns {boolean}
     */
    checkPhone() {
        // check phone
        if (!this.check(this.inputTel.value, Form.PHONE_REGEXP)) {
            this.inputTel.setCustomValidity("El teléfono no es válido, debe empezar por 6, 7 o 9, EJ: 612345678");
            return false;
        }
        this.inputTel.setCustomValidity("");
        return true;
    }

    /**
     * Method for dinamically put text input when select is on other option
     */
    otherSelection() {
        let val = this.select.options[this.select.selectedIndex].value;
        // check if option others is selected
        if (val !== "others") {
            let positionInput = document.querySelector('#other');
            if(positionInput) positionInput.remove();
            return;
        }
        let input = document.createElement("INPUT");
        input.id = "other";
        input.required = true;
        input.addEventListener('input', this.checkText.bind(this));
        let positionInput = document.querySelector('form>div');
        this.form.insertBefore(input, positionInput);
    }

    /**
     * Method for get the value of select
     * @returns {string}
     */
    getSelectValue(){
        let val = this.select.options[this.select.selectedIndex].value;
        // check if option others is selected
        if (val === "others") {
            val = document.querySelector('#other').value;
        }
        return val;
    }

}