import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight, color) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.color = color;
    this.finalScore = 20;

    this.reset();
    this.ping = new Audio("public/sounds/pong-01.wav");
  }

  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (6 - Math.abs(this.vy));

    this.ax = Math.random()*0.07;
    this.ay = Math.random()*0.07;
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx *= -1;
      this.ax *= -1;
    } else if (hitTop) {
      this.vy *= -1;
      this.ay *= -1;
    } else if (hitBottom) {
      this.vy *= -1;
      this.ay *= -1;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );

      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.ax *= -1;
        this.vx *= -this.vx;
        this.ping.play();
      }
      //...
    } else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );

      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x - this.radius <= rightX &&
        this.x - this.radius >= leftX &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.ax *= -1;
        this.vx *= -this.vx;
        this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++;

    this.reset();

    console.log(player.score);

    if (player.score === this.finalScore) {
      alert("Congrat to the winner-First to reach 20 goals! Shall I call you Pong 先生 (Sensei)?");

      document.location.reload();
    }

    //console.log(); player point e.g which play and using ++
  }

  render(svg, player1, player2) {
    const rightGoal = this.x + this.radius >= this.boardWidth;

    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1);

      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);

      this.direction = -1;
    }

    //check if the ball goes off the board to the right or left

    //call a goal method

    this.vx += this.ax;
    this.vy += this.ay;

    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "fill", this.color);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "r", this.radius);

    svg.appendChild(circle);
  }
}
