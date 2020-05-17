import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSketchPage } from './edit-sketch.page';

describe('EditSketchPage', () => {
  let component: EditSketchPage;
  let fixture: ComponentFixture<EditSketchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSketchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSketchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
