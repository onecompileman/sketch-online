import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SketchService } from '../core/services/sketch.service';
import {
  AlertController,
  ToastController,
  PopoverController,
} from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AvatarOptionComponent } from '../shared/components/avatar-option/avatar-option.component';

@Component({
  selector: 'app-my-sketch-list',
  templateUrl: './my-sketch-list.page.html',
  styleUrls: ['./my-sketch-list.page.scss'],
})
export class MySketchListPage implements OnInit, OnDestroy {
  sketches: any[];

  user: any;

  constructor(
    private router: Router,
    private sketchService: SketchService,
    private alertController: AlertController,
    private toastController: ToastController,
    private authService: AuthService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    // this.getAllSkecthes();
    this.getCurrentUser();
  }

  ngOnDestroy() {}

  async avatarClick(ev: any) {
    const popover = await this.popoverController.create({
      component: AvatarOptionComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  backToSketchList() {
    this.router.navigate(['/sketches']);
  }

  createSketch() {
    this.router.navigate(['/create-sketch']);
  }

  editSketch(id: string) {
    this.router.navigate(['/edit-sketch', id]);
  }

  viewSketch(id: string) {
    this.router.navigate(['/sketches', id]);
  }

  async deleteSketch(sketch: any) {
    const alerts = this.alertController.create({
      header: 'Are you sure?',
      message: `You are trying to delete sketch: ${sketch.name}`,
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
            this.sketchService.delete(sketch.id).then(async () => {
              const toast = await this.toastController.create({
                message: 'Your sketch has been deleted successfully',
                duration: 2000,
              });

              toast.present();
            });
          },
        },
      ],
    });

    (await alerts).present();
  }

  private getAllSkecthes() {
    this.sketchService
      .getAllSketchesByOwnerId(this.user.uid)
      .subscribe((res) => {
        this.sketches = res;
      });
  }

  private getCurrentUser() {
    this.authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;

      this.getAllSkecthes();
    });
  }
}
