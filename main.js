var userPoint, computerPoint;
userPoint = computerPoint = 50;

function rollDice(turn) {
    var dice = [];

    for (var i = 0; i < 2; i++) {
        var randomDice = Math.ceil(Math.random() * 6);
        dice.push(randomDice);
    }

    if (turn == 0) {
        writeTurn(0, 1, dice);
    }
    else {
        writeTurn(1, 0, dice);
    }

    return dice;
}

function checkDice(dice, point, otherPoint) {
    var points = [];

    if (dice[0] == dice[1]) {
        if (dice[0] == 1 || dice[0] == 2 || dice[0] == 4) {
            //Lose all
            otherPoint += point;
            point = 0;
            //Finish game
        }

        if (dice[0] == 3 || dice[0] == 5 || dice[0] == 6) {
            //Win all
            point += otherPoint;
            otherPoint = 0;
            //Finish game
        }
    }
    else {
        var sumOfDice = dice[0] + dice[1];

        if (sumOfDice == 3) {
            //Lose only bet
            point -= 10;
            otherPoint += 10;
        }

        if (sumOfDice == 11) {
            //Win only bet
            point += 10;
            otherPoint -= 10;
        }

        //Neither lose nor win
    }
    points.push(point);
    points.push(otherPoint);

    return points;
}

function playGame() {
    var turn = 0;

    do {
        var dice = rollDice(turn);
        var points = [];

        if (turn % 2 == 0) {
            points = checkDice(dice, userPoint, computerPoint);
            userPoint = points[0];
            computerPoint = points[1];
        }
        else {
            points = checkDice(dice, computerPoint, userPoint);
            userPoint = points[1];
            computerPoint = points[0];
        }

        document.getElementById("userPoint").innerText = "Player: " + userPoint;
        document.getElementById("computerPoint").innerText = "Computer: " + computerPoint;

        var emptyArray = [0, 0];

        if (userPoint == 0 || computerPoint == 0) {
            var number1, number2;
            number1 = number2 = 0;

            if (computerPoint == 0)
                number1 = number2 = 1;

            writeTurn(number1, number2, emptyArray);
            document.getElementById("playGame").disabled = true;
            return;
        }

        turn++;
    } while (turn < 2);
}

function startNewGame() {
    location.reload();
}

function writeTurn(number1, number2, array) {
    var sum, textValue, currentPlayer, tag, text, element;
    sum = number1 + number2;

    if (sum == 2) {
        textValue = "You win! Congrulations!";
    } else if (sum == 0) {
        textValue = "Game is over! You lose!";
    }
    else {
        if (number1 == 0 && number2 == 1)
            currentPlayer = "Player";

        if (number1 == 1 && number2 == 0)
            currentPlayer = "Computer";

        textValue = currentPlayer + "'s turn: " + array[0] + "-" + array[1];
    }

    tag = document.createElement("p");
    text = document.createTextNode(textValue);
    tag.appendChild(text);
    element = document.getElementById("board");
    element.appendChild(tag);
}