import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../shared/modules/material.module';
import { PastTrainingsComponent } from './past-trainings.component';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../../models/exercise.model';

describe('PastTrainingsComponent', () => {
  let component: PastTrainingsComponent;
  let fixture: ComponentFixture<PastTrainingsComponent>;
  let filterSpy: jasmine.Spy;
  let filterDataSourceSpy: jasmine.Spy;
  const dataSource = new MatTableDataSource<Exercise>();
  const exercises: Exercise[] = [
    {
      id: 'Ensjfkjg',
      name: 'crunches',
      duration: 24,
      calories: 15
    }
    ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule],
      declarations: [ PastTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingsComponent);
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    component.dataSource.data = exercises;
    filterSpy = spyOn(component, 'filter').and.callThrough();
    filterDataSourceSpy = spyOn(component.filterDataSource, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise dataSource to the correct value', () => {
    expect(component.dataSource).toBeTruthy();
  });

  it('should invoke the filterDataSource event emitter', () => {
    const filterString = 't';
    component.filter(filterString);
    expect(filterDataSourceSpy).toHaveBeenCalledWith(filterString);
    expect(filterDataSourceSpy).toHaveBeenCalledTimes(1);
  });
});
