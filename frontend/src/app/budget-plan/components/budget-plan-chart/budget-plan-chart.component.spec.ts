import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BudgetPlanChartComponent } from './budget-plan-chart.component'
import { BreakpointObserver } from '@angular/cdk/layout'
import { of } from 'rxjs'
import { BudgetPlan } from '../../../model/budget-plan.model'
import { BudgetPlanEntry } from '../../../model/budget-plan-entry.model'

describe('BudgetPlanChartComponent', () => {
  let component: BudgetPlanChartComponent
  let fixture: ComponentFixture<BudgetPlanChartComponent>
  let breakpointObserver: BreakpointObserver

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetPlanChartComponent],
      providers: [
        {
          provide: BreakpointObserver,
          useValue: { observe: () => of({ matches: false }) },
        },
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(BudgetPlanChartComponent)
    component = fixture.componentInstance
    breakpointObserver = TestBed.inject(BreakpointObserver)

    jasmine.clock().install()
  })

  afterEach(() => {
    jasmine.clock().uninstall()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize with default values', () => {
    component.budgetPlan = {
      start_date: '2022-01-01',
      end_date: '2022-01-03',
      budget: 1000,
    } as BudgetPlan

    component.entries = []

    component.ngOnInit()

    expect(component.lineChartOptions?.aspectRatio).toEqual(4)
  })

  it('should update chart data on changes', () => {
    const spy = spyOn(component, 'updateChartData' as never)
    component.ngOnChanges({})
    expect(spy).toHaveBeenCalled()
  })

  it('should group entries by date', () => {
    const entries: BudgetPlanEntry[] = [
      { date: new Date('2022-01-01'), value: 100 } as BudgetPlanEntry,
      { date: new Date('2022-01-02'), value: 300 } as BudgetPlanEntry,
      { date: new Date('2022-01-01'), value: 200 } as BudgetPlanEntry,
    ]
    const grouped = component['groupByDate'](entries)
    expect(Object.keys(grouped).length).toEqual(2)

    expect(grouped).toEqual({
      [new Date('2022-01-01').toString()]: [
        { date: new Date('2022-01-01'), value: 100 } as BudgetPlanEntry,
        { date: new Date('2022-01-01'), value: 200 } as BudgetPlanEntry,
      ],
      [new Date('2022-01-02').toString()]: [
        {
          date: new Date('2022-01-02'),
          value: 300,
        } as BudgetPlanEntry,
      ],
    })
  })

  it('should compare dates correctly', () => {
    const compare = component['compareDate']()
    expect(
      compare(
        {
          date: new Date('2022-01-01'),
          value: 100,
        } as BudgetPlanEntry,
        {
          date: new Date('2022-01-02'),
          value: 200,
        } as BudgetPlanEntry,
      ),
    ).toEqual(-1)
    expect(
      compare(
        {
          date: new Date('2022-01-02'),
          value: 200,
        } as BudgetPlanEntry,
        {
          date: new Date('2022-01-01'),
          value: 100,
        } as BudgetPlanEntry,
      ),
    ).toEqual(1)
    expect(
      compare(
        {
          date: new Date('2022-01-01'),
          value: 100,
        } as BudgetPlanEntry,
        {
          date: new Date('2022-01-01'),
          value: 200,
        } as BudgetPlanEntry,
      ),
    ).toEqual(0)
  })

  it('should generate data from entries', () => {
    const mockDate = new Date('2022-01-04')
    jasmine.clock().mockDate(mockDate)

    const budgetPlan: BudgetPlan = {
      start_date: '2022-01-01',
      end_date: '2022-01-05',
      budget: 1000,
    } as BudgetPlan
    const entries: BudgetPlanEntry[] = [
      { date: new Date('2022-01-01'), value: 100 } as BudgetPlanEntry,
      { date: new Date('2022-01-01'), value: 200 } as BudgetPlanEntry,
      { date: new Date('2022-01-01'), value: 50 } as BudgetPlanEntry,
      { date: new Date('2022-01-02'), value: 300 } as BudgetPlanEntry,
    ]

    const grouped = component['groupByDate'](entries)

    expect(grouped).toEqual({
      [new Date('2022-01-01').toString()]: [
        { date: new Date('2022-01-01'), value: 100 } as BudgetPlanEntry,
        { date: new Date('2022-01-01'), value: 200 } as BudgetPlanEntry,
        { date: new Date('2022-01-01'), value: 50 } as BudgetPlanEntry,
      ],
      [new Date('2022-01-02').toString()]: [
        {
          date: new Date('2022-01-02'),
          value: 300,
        } as BudgetPlanEntry,
      ],
    })

    const data = [{ x: new Date('2022-01-01'), y: 1000 }]
    component['generateDataFromEntries'](budgetPlan, grouped, 1000, data)

    expect(data).toEqual([
      { x: new Date('2022-01-01'), y: 1000 },
      { x: new Date('2022-01-01'), y: 650 },
      { x: new Date('2022-01-02'), y: 350 },
      { x: new Date('2022-01-04'), y: 350 },
    ])
  })
})
