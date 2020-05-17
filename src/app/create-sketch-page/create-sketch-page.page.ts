import { Component, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';
import { AlertController, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SketchService } from '../core/services/sketch.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-create-sketch-page',
  templateUrl: './create-sketch-page.page.html',
  styleUrls: ['./create-sketch-page.page.scss'],
})
export class CreateSketchPagePage implements OnInit, OnDestroy {
  canvas: any;
  colors: string[] = ['red', 'black', 'blue', 'yellow'];
  colorRgb: number[][] = [
    [221, 80, 68],
    [0, 0, 0],
    [37, 174, 243],
    [253, 227, 102],
  ];
  sizes: string[] = ['small', 'medium', 'large', 'xlarge'];
  sizeInNumber: number[] = [8, 15, 22, 30, 35];

  activeColor = 'black';
  activeSize = 'small';

  points: any[] = [];

  sketchForm: FormGroup;

  isCreating: boolean;

  user: any;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private sketchService: SketchService,
    private toastController: ToastController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initCanvas();
    this.initForm();
    this.getCurrentUser();
  }

  ngOnDestroy() {}

  get name(): AbstractControl {
    return this.sketchForm.get('name');
  }

  get description(): AbstractControl {
    return this.sketchForm.get('description');
  }

  backToList() {
    this.router.navigate(['/sketches']);
  }

  private initCanvas() {
    const sketch = (s) => {
      s.setup = () => {
        const canvasWidth = innerWidth < 899 ? innerWidth : 899;
        const canvas = s.createCanvas(canvasWidth, 400);
        canvas.parent('canvasContainer');
        s.frameRate(300);
      };

      s.draw = () => {
        s.background(240);
        s.noStroke();

        if (s.mouseIsPressed) {
          const point = this.createPoint(
            { x: s.mouseX, y: s.mouseY },
            this.activeColor,
            this.activeSize
          );

          this.points.push(point);
        }

        this.points.forEach((point) => {
          s.fill(s.color(...point.col));
          s.ellipse(point.pos.x, point.pos.y, point.size, point.size);
        });
      };
    };

    this.canvas = new p5(sketch);
  }

  async reset() {
    if (this.points.length) {
      const alerts = this.alertController.create({
        header: 'Are you sure?',
        message: 'You are trying to reset your canvas',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Confirm',
            cssClass: 'danger',
            handler: () => {
              this.points = [];
            },
          },
        ],
      });

      (await alerts).present();
    }
  }

  async createSketch() {
    if (this.sketchForm.valid) {
      this.isCreating = true;

      const thumbnailURL = await this.sketchService.uploadSketchThumbnail(
        document.querySelector('canvas').toDataURL()
      );

      console.log(thumbnailURL);

      const sketch = {
        ...this.sketchForm.value,
        points: JSON.stringify(this.points),
        thumbnailURL,
        created: new Date(),
        owner: this.user,
      };

      this.sketchService.create(sketch).then(async () => {
        this.isCreating = false;
        const toast = await this.toastController.create({
          message: 'Your sketch has been created successfully',
          duration: 2000,
        });

        toast.present();

        this.backToList();
      });
    }
  }

  private initForm() {
    this.sketchForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      description: [
        null,
        [
          Validators.minLength(10),
          Validators.required,
          Validators.maxLength(200),
        ],
      ],
    });
  }

  private createPoint(pos: any, color: string, size: string): any {
    const colorIndex = this.colors.indexOf(color);
    const sizeIndex = this.sizes.indexOf(size);

    return {
      pos,
      col: this.colorRgb[colorIndex],
      size: this.sizeInNumber[sizeIndex],
    };
  }

  private getCurrentUser() {
    this.authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;
    });
  }
}
