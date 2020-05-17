import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

import * as p5 from 'p5';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  canvas: any;

  circles: any[] = [];

  isActive: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isActive = true;
    this.initCanvas();
    this.getCurrentUser();
  }

  ngOnDestroy() {
    this.isActive = false;
  }

  login() {
    this.authService.googleSignin();
    // this.router.navigate(['/my-sketch-list']);
  }

  private initCanvas() {
    // console.log(this.authService.getCurrentUser());
    const sketch = (s) => {
      s.setup = () => {
        const canvas = s.createCanvas(innerWidth, innerHeight);
        canvas.parent('canvasContainer');
        s.frameRate(300);
        s.background(255);
      };

      s.draw = () => {
        if (this.isActive) {
          this.circles.forEach((circle) => {
            circle.pos.add(s.createVector(s.random(-8, 8), s.random(-8, 8)));

            s.fill(circle.color);
            s.ellipseMode(s.CENTER);
            s.ellipse(circle.pos.x, circle.pos.y, circle.size, circle.size);
          });
        }
      };

      s.windowResized = () => {
        s.resizeCanvas(innerWidth, innerHeight);
      };

      s.mousePressed = () => {
        if (this.circles.length > 15) {
          this.circles.pop();
        }

        const circle = {
          pos: s.createVector(s.mouseX, s.mouseY),
          size: s.random(30, 80),
          color: s.color(
            s.random(140, 255),
            s.random(140, 255),
            s.random(140, 255)
          ),
        };

        this.circles.push(circle);
      };
    };

    this.canvas = new p5(sketch);
  }

  private getCurrentUser() {
    this.authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      if (user) {
        this.router.navigate(['/sketches']);
      }
    });
  }
}
