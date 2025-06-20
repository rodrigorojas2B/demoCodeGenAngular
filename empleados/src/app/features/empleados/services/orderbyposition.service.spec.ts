import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderByPositionService } from './orderbyposition.service';

describe('OrderByPositionService', () => {
  let service: OrderByPositionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderByPositionService]
    });

    service = TestBed.inject(OrderByPositionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch employees ordered by position', () => {
    const mockEmployees = [
      { id: '1', position: 'Manager' },
      { id: '2', position: 'Developer' }
    ];

    service.getEmployeesOrderByPosition().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('/api/employees/order-by-position');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });
});
