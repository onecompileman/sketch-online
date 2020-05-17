import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySketchListPage } from './my-sketch-list.page';

describe('MySketchListPage', () => {
  let component: MySketchListPage;
  let fixture: ComponentFixture<MySketchListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySketchListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MySketchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
