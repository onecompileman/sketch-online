import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewSketchPage } from './view-sketch.page';

describe('ViewSketchPage', () => {
  let component: ViewSketchPage;
  let fixture: ComponentFixture<ViewSketchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSketchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSketchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
