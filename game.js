import readline from "readline";
import HmacGenerator from "./utils.js";
import GameRules from "./rules.js";
import TableGenerator from "./table.js";

function printMenu(args) {
  console.log("HMAC:", hmac);
  console.log("Available moves:");
  for (let i = 0; i < args.length; i++) {
    console.log(`${i + 1} - ${args[i]}`);
  }
  console.log("0 - exit\n? - help");
}

function chooseMove() {
  rl.question("Enter your move: ", (input) => {
    if (input === "0") {
      console.log("Exiting...");
      rl.close();
      return;
    }

    if (input === "?") {
      const tableGenerator = new TableGenerator(args, gameRules);
      tableGenerator.generateTable();
      printMenu(args);
      chooseMove();
      return;
    }

    const moveIndex = parseInt(input) - 1;

    if (isNaN(moveIndex) || moveIndex < 0 || moveIndex >= args.length) {
      console.log("Invalid move! Please choose a valid move.");
      printMenu(args);
      chooseMove();
    } else {
      console.log(`Your move: ${args[moveIndex]}`);
      console.log(`Computer move: ${computerMove}`);

      const result = gameRules.determineWinner(moveIndex, computerMoveIndex);

      console.log(result);
      console.log("HMAC Key:", secretKey);
      rl.close();
    }
  });
}

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log(`You are missing ${3 - args.length} arguments`);
  process.exit(1);
}

if (args.length % 2 == 0) {
  console.log("The number of arguments should not be even");
  process.exit(1);
}

const duplicates = args.filter((item, index) => args.indexOf(item) !== index);
const uniqueDuplicates = [...new Set(duplicates)];
if (uniqueDuplicates.length > 0) {
  console.log("There's repeated arguments:", uniqueDuplicates.join(", "));
  process.exit(1);
}

const hmacGen = new HmacGenerator();
const computerMoveIndex = Math.floor(Math.random() * args.length);
const computerMove = args[computerMoveIndex];
const secretKey = hmacGen.generateSecretKey();
const hmac = hmacGen.generateHmac(secretKey, computerMove);
const gameRules = new GameRules(args);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

printMenu(args);
chooseMove();
