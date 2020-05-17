import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SketchListsPage } from './sketch-lists.page';

describe('SketchListsPage', () => {
  let component: SketchListsPage;
  let fixture: ComponentFixture<SketchListsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SketchListsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SketchListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
