// Every private attribute needs Getters and Setters declared as methods. Setters don't have "returns", only value as attribute.

class CalcController {

    constructor () {
 
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#hour");
        this._currentDate; 

        this.initialize();
    }

    initialize () {
        
        setInterval(() => {

            this.displayDate = this.currentDate.toLocaleDateString('pt-br');
            this.displayTime = this.currentDate.toLocaleTimeString('pt-br');

        }, 1000);
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