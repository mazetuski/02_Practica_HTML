export class Form{

    // REGEXP
    static get EMAIL_REGEXP () {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    }

    static get TEXTAREA_REGEXP () {
        return /^(?:\b\w+\b[\s\r\n]*){0,149}$/;
    }

    static get PHONE_REGEXP () {
        return /^[679][0-9]{8}$/;
    }

    constructor(){
        this.inputsText = document.querySelectorAll('input[type=text]');
        this.inputEmail = document.querySelector('#email');
        this.inputTel = document.querySelector('input[type=tel]');
        this.textArea = document.querySelector('textarea');
        this.select = document.querySelector('select');
        this.form = document.querySelector('form');
        this.initialize();
    }

    /**
     * Method for initialize listeners and other methods
     */
    initialize(){
        this.form.addEventListener('submit', this.validate.bind(this));
        this.inputsText.forEach(input => input.addEventListener('input', this.clearValidity));
        this.inputEmail.addEventListener('input', this.clearValidity);
        this.textArea.addEventListener('input', this.clearValidity);
        this.inputTel.addEventListener('input', this.clearValidity);
        this.select.addEventListener('change', this.otherSelection.bind(this));
    }

    /**
     * Method for validate form
     * @param e
     * @returns {boolean}
     */
    validate(e) {
        e.preventDefault();

        // check text inputs
        this.inputsText.forEach(input => {
            if(!input.checkValidity()) return false;
        });

        // check email
        if(!this.check(this.inputEmail.value, Form.EMAIL_REGEXP)) {
            this.inputEmail.setCustomValidity("El email no es válido");
            return false;
        }

        // check textarea
        if(!this.check(this.textArea.value, Form.TEXTAREA_REGEXP)) {
            this.textArea.setCustomValidity("El máximo de palabras es 150");
            return false;
        }

        // check phone
        if(!this.check(this.inputTel.value, Form.PHONE_REGEXP)) {
            this.inputTel.setCustomValidity("El teléfono no es válido, debe empezar por 6, 7 o 9, EJ: 612345678");
            return false;
        }


        this.form.submit()
    }

    /**
     * Method for test regexp
     * @param email
     * @param regexp
     * @returns {boolean}
     */
    check(email, regexp){
        return regexp.test(email);
    }

    /**
     * Method for clear customValidation
     */
    clearValidity(){
        this.setCustomValidity("");
    }

    otherSelection(){
        let val = this.select.options[this.select.selectedIndex].value;
        // check if option others is selected
        if(val !== "others") return;
        let input = document.createElement("INPUT");
        let positionInput = document.querySelector('form>div');
        this.form.insertBefore(input, positionInput);
    }

}