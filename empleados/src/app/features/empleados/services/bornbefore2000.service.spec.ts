import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BornBefore2000Service } from './bornbefore2000.service';

describe('BornBefore2000Service', () => {
  let service: BornBefore2000Service;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BornBefore2000Service]
    });

    service = TestBed.inject(BornBefore2000Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch employees born before 2000', () => {
    const mockEmployees = [
      { id: '1', birthDate: '1999-01-01' },
      { id: '2', birthDate: '1989-01-01' }
    ];

    service.getEmployeesBornBefore2000().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('/api/employees/born-before-2000');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });
});
