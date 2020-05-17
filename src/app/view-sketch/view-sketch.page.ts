import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-sketch',
  templateUrl: './view-sketch.page.html',
  styleUrls: ['./view-sketch.page.scss'],
})
export class ViewSketchPage implements OnInit {
  sketch: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getSketch();
  }

  backToList() {
    this.router.navigate(['/sketches']);
  }

  private getSketch() {
    this.sketch = this.route.snapshot.data.sketch;
  }
}
