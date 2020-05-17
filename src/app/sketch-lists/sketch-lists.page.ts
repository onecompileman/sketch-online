import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SketchService } from '../core/services/sketch.service';
import { AuthService } from '../core/services/auth.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { PopoverController } from '@ionic/angular';
import { AvatarOptionComponent } from '../shared/components/avatar-option/avatar-option.component';

@Component({
  selector: 'app-sketch-lists',
  templateUrl: './sketch-lists.page.html',
  styleUrls: ['./sketch-lists.page.scss'],
})
export class SketchListsPage implements OnInit, OnDestroy {
  sketches: any[];

  user: any;

  constructor(
    private router: Router,
    private sketchService: SketchService,
    private authService: AuthService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.getAllSkecthes();
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

  viewSketch(id: string) {
    this.router.navigate(['/sketches', id]);
  }

  private getAllSkecthes() {
    this.sketchService.getAll().subscribe((res) => {
      this.sketches = res;
    });
  }

  private getCurrentUser() {
    this.authService.user$.pipe(untilDestroyed(this)).subscribe((user) => {
      this.user = user;
    });
  }
}
