// Every private attribute needs Getters and Setters declared as a methods. Setters don't have "returns", only value as attribute.

class CalcController {

    constructor () {
 
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#hour");
        this._currentDate; 

        this.initialize();
        this.initButtonsEvents();
        
    }

    initialize () {
        
        setInterval(() => {

            this.displayDate = this.currentDate.toLocaleDateString('pt-br');
            this.displayTime = this.currentDate.toLocaleTimeString('pt-br');

        }, 1000);

        this.setLastNumberToDisplay();
    }

    addEventListenerAll(element, events, fn){

            events.split(' ').forEach(event => {
                element.addEventListener(event, fn, false);
            });
    }

// All Operations Starts Here:

    clearAll() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation() {
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value) {
        // Is Operator? Search in every calculator symbol and take the Index
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value) {
        this._operation.push(value);

        if(this._operation.length > 3) {

            this.calc()
           
        }
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last === '%') {

            result /= 100;
            this._operation = [result];

        } else {
        
        this._operation = [result];

        if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {
        let lastItem;
        for (let i = this._operation.length-1; i >= 0 ; i--) {
   
                if (this.isOperator(this._operation[i]) == isOperator) {
                    lastItem = this._operation[i];
                    break;
                }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }
    
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {
            //String
            if (this.isOperator(value)) {
                // Change the Operator
                this.setLastOperation(value);
            } else if(isNaN(value)) {
                console.log("outra coisa", value);
            } else {
                this.pushOperation(value);
                // Show in Display
                this.setLastNumberToDisplay();
            }

        } else {
            //Number?
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                // Show in Display
                this.setLastNumberToDisplay();
            }

        }
        
    } 

    setError() {
        this.displayCalc = "Error!";
    }

    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'plus':
                this.addOperation('+');
                break;

            case 'minus':
                this.addOperation('-');
                break;

            case 'division':
                this.addOperation('/');
                break;

            case 'multiplication':
                this.addOperation('*');
                break;

            case 'percent':
                this.addOperation('%');
                break;

            case 'equal':
                this.calc();
                break;

            case 'dot':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;                                        

            default:
                this.setError();
                    break;
        }

    }

// Getting buttons from DOM and turning into numbers:
    initButtonsEvents() {

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {

                btn.style.cursor = "pointer";
                
            });
    
        });
    }
        

    get displayDate () {
        return this._dateEl.innerHTML;
    }

    set displayDate (value) {
        this._dateEl.innerHTML = value;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    get displayCalc () {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc (value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate () {
        return new Date();
    }

    set currentDate (value) {
        this.currentDate = value;
    }
}