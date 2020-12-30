// Every private attribute needs Getters and Setters declared as a methods. Setters don't have "returns", only value as attribute.

class CalcController {

    constructor () {
 
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
    }

    addEventListenerAll(element, events, fn){

            events.split(' ').forEach(event => {
                element.addEventListener(event, fn, false);
            });
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    addOperation(value) {

        this._operation.push(value);
        console.log(this._operation);
    }

    setError() {
        this.displayCalc = "Error!";
    }

    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ec':
                this.clearEntry();
                break;

            case 'plus':
                
                break;

            case 'minus':
                
                break;

            case 'division':
                
                break;

            case 'multiplication':
                
                break;

            case 'percent':
                
                break;

            case 'equal':
                
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