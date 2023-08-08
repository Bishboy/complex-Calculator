 //(2)create a calulator class for easy fuctionality
 class Calculator {
  constructor (previousOperandTextElement,currentOperandTextElement){//this is donne to no where to place our display text for our calculator 
    this.previousOperandTextElement=previousOperandTextElement
    this.currentOperandTextElement=currentOperandTextElement
    this.clear()
  }
  //(3) think of alll the operation the calculator can do, compute, clear, delete etc.

  clear(){//to clear (4)remove all the values by using the clear method.
    this.currentOperand="";
    this.previousOperand = "";
    this.operation = undefined;//use since they dont have any operation selected if we clear things.
  }

  delete (){// to delete ( next after clear)
    this.currentOperand = this.currentOperand.toString().slice(0,-1)

  }

  appendNumber(number){// responsble for what happends everytme a user clicks on a number to add to a screen
    //this.currentOperand = this.currentOperand.tostring()+ number.tostring()
    if (number === "." && this.currentOperand.includes(".")) return;//this is to stop he '.' from repeating.
    this.currentOperand = this.currentOperand.toString()+number.toString()//this function does not allow the numbers to add

  }

  chooseOperation(operation) {// this works evertime you click on the operation keys (9)
    if(this.currentOperand ==="") return //this is to not allow the operations delete a number
    if (this.previousOperand!== ""){ // this is to allow compute in the previous operand
      this.compute()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
  }

  compute (){//this is used to cumpute values (10)
    let computation
    let prev = parseFloat(this.previousOperand);
    let current=parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;// this is to not allow the code run if no number is entered
    switch (this.operation){
      case '+':
        computation = prev + current;
        break
      case '-':
          computation = prev - current;
          break
      case '*':
          computation = prev * current;
           break
       case '/':
          computation = prev / current;
           break

      default:
        return
    }
    this.currentOperand = computation;
    this.operation= undefined;
    this.previousOperand = ""
  }

  getDisplayNumber(number) {//this is done to allow the numbers have comma
    let stringNumber = number.toString();
    let integerDigits = parseFloat(stringNumber.split('.')[0])
    let decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)){
      integerDisplay = "";
    } else{
      integerDisplay= integerDigits.toLocaleString('en',{
        maximumFractionDigits:0
      })
    }if (decimalDigits !=null){
      return `${integerDisplay}.${decimalDigits}`
    }else{
      return integerDisplay
    }
  }

   

  updateDisplay(){//used to update our display   
    //this.currentOperandTextElement.innerText = this.currentOperand == the first display
    this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
    if(this.operation !=null){ //to make it display lick a real calculator

      this.previousOperandTextElement.innerText= `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    }else{
      this.previousOperandTextElement.innerText = ''
    }
  }

  }
  
 
 //(1)first connect the html element to js
 let numberButtons=document.querySelectorAll('[data-number]')//use[] for data-number
 let operationButtons=document.querySelectorAll('[data-operation]');
 let equalButtons=document.querySelector('[data-equals]');
 let deleteButtons=document.querySelector('[data-delete]');
 let allClearButtons=document.querySelector('[data-all-clear]');
 let previousOperandTextElement=document.querySelector('[data-previous-operand]');
 let currentOperandTextElement=document.querySelector('[data-current-operand]');

//(5)
 let calculator= new Calculator(previousOperandTextElement,  currentOperandTextElement);
//(6)
 numberButtons.forEach(button=> {
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })

 })
  // (7) for operation buttons
 operationButtons.forEach(button=> {
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })

 })
 //11
 equalButtons.addEventListener("click" ,button=>{
  calculator.compute();
  calculator.updateDisplay();
 })
 //next after compute
 allClearButtons.addEventListener("click" ,button=>{
  calculator.clear();
  calculator.updateDisplay();
 })
 deleteButtons.addEventListener("click" ,button=>{
  calculator.delete();
  calculator.updateDisplay();
 })
  
 
 
  

  

  
