import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { AlertController, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { SketchService } from '../core/services/sketch.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-sketch',
  templateUrl: './edit-sketch.page.html',
  styleUrls: ['./edit-sketch.page.scss'],
})
export class EditSketchPage implements OnInit {
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

  sketch: any;

  isCreating: boolean;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private sketchService: SketchService,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getActiveSketch();
    this.initCanvas();
    this.initForm();
  }

  get name(): AbstractControl {
    return this.sketchForm.get('name');
  }

  get description(): AbstractControl {
    return this.sketchForm.get('description');
  }

  backToList() {
    this.router.navigate(['/sketches']);
  }

  private getActiveSketch() {
    this.sketch = this.route.snapshot.data.sketch;

    this.points = JSON.parse(this.sketch.points);
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

      const sketch = {
        ...this.sketch,
        ...this.sketchForm.value,
        points: JSON.stringify(this.points),
        thumbnailURL,
        created: new Date(),
      };

      this.sketchService.update(sketch).then(async () => {
        this.isCreating = false;
        const toast = await this.toastController.create({
          message: 'Your sketch has been updated successfully',
          duration: 2000,
        });

        toast.present();
      });
    }
  }

  private initForm() {
    this.sketchForm = this.formBuilder.group({
      name: [
        this.sketch ? this.sketch.name : null,
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [
        this.sketch ? this.sketch.description : null,
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
}
