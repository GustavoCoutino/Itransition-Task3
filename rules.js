class GameRules {
  constructor(moves) {
    this.n = moves.length;
    this.p = this.n / 2;
  }

  determineWinner(playerMoveIndex, computerMoveIndex) {
    const distance = Math.sign(
      ((playerMoveIndex - computerMoveIndex + this.n + this.p) % this.n) -
        this.p
    );
    switch (distance) {
      case 1:
        return "You win!";
      case 0:
        return "It's a draw";
      case -1:
        return "You lose!";
    }
  }
}

export default GameRules;
