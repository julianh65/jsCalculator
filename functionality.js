let currentNumber;
            let previousNumber;
            let previousPreviousNumber;

            let lastCharWasOperator = true;
            let decimalInputted = false;

            let hasPreviousEquation = false;
            let previousEquationValue = "";

            let currentEquation = "";

            let equationCalculated = false;

            let polarityReversed = false;


            let polarityButtonReference = document.querySelector("#polarityButton");
            polarityButtonReference.addEventListener("click", changePolarity);

            function changePolarity(){
                console.log("polarityReversed: " + polarityReversed);
                console.log("lastCharWas: " + lastCharWasOperator);
                if(lastCharWasOperator){
                    if(polarityReversed){
                        console.log("neet");
                        backSpace();
                        polarityReversed = false;
                    }
                    else{
                        console.log("yeet");
                        currentEquation += "-";
                        polarityReversed = true;
                    }
                }

            }


            function appendValueToEquation(e){
                let value = ""
                if(e.key != null){
                    if(isNaN(e.key)){
                        value += " ";
                        value += e.key;
                        value += " ";
                    }
                    else{
                        value += e.key;
                    }

                }
                else{
                    value += e.target.getAttribute("data-value");
                }

                console.log(value);

                operators = [" + ", " - ", " * ", " / "];

                if(equationCalculated){
                    if(polarityReversed && !operators.includes(value)){
                        currentEquation = "-";
                    }
                    else if(!operators.includes(value)){
                        currentEquation = "";
                    }

                }

                equationCalculated = false;

                if(lastCharWasOperator && operators.includes(value)){
                    alert("Error: You can't enter two operators in a row");
                    return;
                }

                if(currentEquation == "" && operators.includes(value) && hasPreviousEquation){
                    currentEquation += previousEquationValue;
                    currentEquation += value;
                    return;
                }

                if(value == "."){
                    decimalInputted = true;
                }

                if(operators.includes(value)){
                    lastCharWasOperator = true;
                    polarityReversed = false;
                }

                if(!operators.includes(value)){
                    lastCharWasOperator = false;
                    decimalInputted = false;
                }

                if(decimalInputted && value == "."){
                    alert("Error: You can't enter two decimals");
                    return;
                }



                currentEquation += value;
            }

            let backspaceButtonReference = document.querySelector("#backspaceButton");
            backspaceButtonReference.addEventListener("click", backSpace);

            function backSpace(){
                if(currentEquation.charAt(currentEquation.length - 1) == " "){
                    temp = currentEquation.slice(0, -2);
                    currentEquation = temp;
                }
                else{
                    temp = currentEquation.slice(0, -1);
                    currentEquation = temp;   
                }
            }

            let clearButtonReference = document.querySelector("#clearButton");
            clearButtonReference.addEventListener("click", clear);

            function clear(){
                lastCharWasOperator = true;
                polarityReversed = false;
                currentEquation = "";
            }

            function evaluate(equation){
                let equationArr = equation.split(" ");

                polarityReversed = false;

                // equationArr.pop();

                //if last element in array is an operator
                if(isNaN(equationArr[equationArr.length-1])){
                    invalidEquation();
                }

                let totalValue = equationArr[0];
                let currentNumber;
                let currentOperator;

                for(i = 1; i < equationArr.length; i++){
                    // console.log("ITERATION " + i);
                    // console.log(totalValue);
                    // console.log(currentOperator);
                    // console.log(currentNumber);
                    
                    if(isNaN(equationArr[i])){
                        if(isNaN(equationArr[i - 1])){
                            invalidEquation();
                            return;
                        }

                        if(currentNumber && currentOperator){
                            // console.log("operating" + currentOperator); 
                            totalValue = operatorEvaluation(currentOperator, currentNumber, totalValue);
                        }
                        currentOperator = equationArr[i];

                    }
                    else{
                        // console.log("assigning");
                        currentNumber = Number(equationArr[i]);
                    }
                }

                totalValue = operatorEvaluation(currentOperator, currentNumber, totalValue);

                hasPreviousEquation = true;

                previousEquationValue = totalValue;

                return totalValue;

            }

            function operatorEvaluation(operator, currentNumber, totalValue){
                // console.log("current operation: " + totalValue + " " + operator + " " + currentNumber);
                newVal = Number(totalValue);

                if(operator == "+"){
                    newVal += currentNumber;
                }
                if(operator == "-"){
                    newVal -= currentNumber;
                }
                if(operator == "*"){
                    newVal *= currentNumber;
                }
                if(operator == "/"){
                    if(currentNumber == 0){
                        divideByZeroError();
                        return;
                    } 
                    newVal /= currentNumber;
                }

                return newVal;
            }

            function invalidEquation(){
                alert("That equation is invalid");
                clear();
            }

            function divideByZeroError(){
                alert("Divide by zero error");
                clear();
            }



            //adding event listeners to button area
            let buttonArea = document.querySelector(".buttonArea").children;
            for(i = 0; i < buttonArea.length; i++){
                if(buttonArea[i].classList.contains("normal")){
                    buttonArea[i].addEventListener("click", appendValueToEquation);
                }
            }

            let button = document.querySelector("#equalsButton");
            button.addEventListener("click", evaluateEq);



            let currentNumberReference = document.querySelector("#currentNumber");
            let buttonAreaReference = document.querySelector(".buttonArea");
            buttonAreaReference.addEventListener("click", updateNumberField);

            let previousNumberReference = document.querySelector("#previousNumber");
            let previousPreviousNumberReference = document.querySelector("#previousPreviousNumber");

            function updateNumberField(){
                currentNumberReference.textContent = currentEquation;
            }


            function evaluateEq(){
                previousEquationValue = evaluate(currentEquation);
                currentEquation = evaluate(currentEquation);
                previousPreviousNumberReference.textContent = previousNumberReference.textContent;
                previousNumberReference.textContent = currentEquation;
                equationCalculated = true;
            }

            function square(){
                currentEquation *= currentEquation;
                previousPreviousNumberReference.textContent = previousNumberReference.textContent;
                previousNumberReference.textContent = currentEquation;
                equationCalculated = true;
            }
            
            let squareButtonReference = document.querySelector("#squareButton");
            squareButtonReference.addEventListener("click", square);



            //area to add keyboard input
            document.onkeydown = function(e){
                let currentKey = e.key;
                if(e.keyCode == 8 || e.keyCode == 46){
                    currentKey = "Backspace";
                }
                let valid_keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
                "Backspace", "*", "/", ".", "+", "-","Enter"]

                if(valid_keys.includes(currentKey)){
                    console.log(currentKey);
                    if(currentKey == "Backspace"){
                        backSpace();
                    }
                    if(currentKey == "Enter"){
                        evaluateEq();
                    }
                    else{
                        appendValueToEquation(e);
                    }
                    updateNumberField();
                }

            }
