import { CustomDateAdapter } from './custom-date.adapter';
import { TestBed } from '@angular/core/testing';

describe('CustomDateAdapter', () => {
  let systemUnderTest: CustomDateAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CustomDateAdapter] });
    systemUnderTest = TestBed.inject(CustomDateAdapter);
  });

  it('should create', () => {
    expect(systemUnderTest).toBeDefined();
  });

  it('should return monday as the first day', () => {
    expect(systemUnderTest.getFirstDayOfWeek()).toEqual(1);
  });
});
