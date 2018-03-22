import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelcardComponent } from './panelcard.component';

describe('PanelcardComponent', () => {
  let component: PanelcardComponent;
  let fixture: ComponentFixture<PanelcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
