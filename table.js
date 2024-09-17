import Table from "cli-table3";
import chalk from "chalk";

class TableGenerator {
  constructor(moves, gameRules) {
    this.moves = moves;
    this.gameRules = gameRules;
  }

  generateTable() {
    const table = new Table({
      head: [
        chalk.black("v PCUser >"),
        ...this.moves.map((move) => chalk.yellow(move)),
      ],
    });

    for (let i = 0; i < this.moves.length; i++) {
      const row = [chalk.yellow(this.moves[i])];
      for (let j = 0; j < this.moves.length; j++) {
        const result = this.gameRules.determineWinner(j, i, this.moves);
        if (result === "It's a draw") {
          row.push(chalk.blue("Draw"));
        } else if (result === "You win!") {
          row.push(chalk.green("Win"));
        } else {
          row.push(chalk.red("Lose"));
        }
      }

      table.push(row);
    }
    console.log(table.toString());
  }
}

export default TableGenerator;
