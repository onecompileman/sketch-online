import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateSketchPagePage } from './create-sketch-page.page';

describe('CreateSketchPagePage', () => {
  let component: CreateSketchPagePage;
  let fixture: ComponentFixture<CreateSketchPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSketchPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSketchPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
