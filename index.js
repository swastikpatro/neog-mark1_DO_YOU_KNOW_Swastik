var chalk = require('chalk');

const error = chalk.bold.red;
const outputColor = chalk.keyword('orange');
const success = chalk.keyword('green');
const dashColor = chalk.keyword('yellow');
const queColor = chalk.keyword('cyan');
const pinkColor = chalk.keyword('pink');

var readlineSync = require('readline-sync');
var questionsArr = [
  { que: "What is Swastik's favourite game? ", rightAns: 'cricket' },
  { que: "Who is Swastik's best friend? ", rightAns: 'krishna' },
  { que: "What is Swastik's favourite show? ", rightAns: 'mahabharat' },
  { que: "What is Swastik's favourite fruit? ", rightAns: 'apple' },
  { que: "What is Swastik's hobby? ", rightAns: 'coding' },
];

var topScores = [
  { name: 'Krishna', score: 5 },
  { name: 'Tanmay', score: 4 },
];

function dash() {
  console.log(dashColor('-------------------------------------------------'));
}

function enter() {
  console.log('\n');
}

function startGameAndGetScore(ourUser) {
  var score = 0;
  for (var i = 0; i < questionsArr.length; i++) {
    var userAns = readlineSync.question(queColor(questionsArr[i].que));
    if (userAns.toLowerCase() === questionsArr[i].rightAns) {
      score += 1;
      console.log(success(`✅ Correct`));
    } else {
      console.log(error(`❌ Wrong !!`));
    }

    console.log(outputColor('Your current score is ') + score);
    dash();
  }

  return { name: ourUser, score };
}

function showHighScore() {
  topScores.sort((a, b) => b.score - a.score);
  dash();
  console.log(
    pinkColor('                 ➡  LEADERBOARD ⬅                      ')
  );
  topScores.forEach((singleData) =>
    console.log(
      outputColor(singleData.name) + ' : ' + pinkColor(singleData.score)
    )
  );
  dash();
}

function welcome() {
  var userName =
    readlineSync.question(queColor('Hey, what is your name? ')) || 'noName';
  console.log(
    pinkColor('Welcome, ') +
      error(userName) +
      pinkColor(" to 'Do YOU KNOW Swastik?' game.")
  );
  console.log(pinkColor("Let's see how well you know me ⚡"));
  enter();
  var userNameWithScore = startGameAndGetScore(userName);
  enter();
  console.log(
    chalk.blue(
      `${userNameWithScore.name}, your final score is ${userNameWithScore.score}/${questionsArr.length} ✔`
    )
  );
  enter();
  topScores.push(userNameWithScore);
  showHighScore();
}

welcome();
