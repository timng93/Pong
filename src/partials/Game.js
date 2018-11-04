import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";
import { SVG_NS, KEYS } from "../settings";

export default class Game {
  constructor(element, width, height, color) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;



    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight) / 2,
      KEYS.a,
      KEYS.z,
      "player1"
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      "player2"
    );

    this.radius = 8;
    this.boardWidth = 512;
    this.boardHeight = 256;
    this.color = color;
    
    
    this.ball = new Ball(this.radius, this.boardWidth, this.boardHeight, "darkmagenta");

    this.ball2 = new Ball(this.radius*2, this.boardWidth, this.boardHeight, "darkorange");

    this.ball3 = new Ball(this.radius*1.5, this.boardWidth, this.boardHeight, "mediumslateblue");


    console.log(this.player1);

    this.score1= new Score(this.width/ 2 - 50, 30, 30);

    this.score2= new Score(this.width/ 2 + 25, 30, 30)


    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.enter:
        this.enter = !this.enter;
        break;
      }
    });
  }
  //...
  //end of constructor


  

  render() {
    
    if (this.pause) {
      
      return;
    }


    
    if (this.enter) {
    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);

    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.ball2.render(svg,this.player1, this.player2);
    this.ball3.render(svg,this.player1, this.player2);
    this.score1.render(svg,this.player1.score);
    this.score2.render(svg, this.player2.score);
    }
  }
}
