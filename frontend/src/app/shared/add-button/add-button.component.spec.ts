import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddButtonComponent } from './add-button.component'
import { By } from '@angular/platform-browser'
import { MatIconTestingModule } from '@angular/material/icon/testing'

describe('AddButtonComponent', () => {
  let component: AddButtonComponent
  let fixture: ComponentFixture<AddButtonComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatIconTestingModule],
      declarations: [AddButtonComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should emit when button click is received', function () {
    let isEmitted = false

    component.clickReceived.subscribe(() => {
      isEmitted = true
    })

    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement
    button.click()

    expect(isEmitted).toBeTrue()
  })
})
