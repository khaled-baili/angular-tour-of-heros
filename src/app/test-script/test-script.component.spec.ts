import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestScriptComponent } from './test-script.component';

describe('TestScriptComponent', () => {
  let component: TestScriptComponent;
  let fixture: ComponentFixture<TestScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestScriptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
