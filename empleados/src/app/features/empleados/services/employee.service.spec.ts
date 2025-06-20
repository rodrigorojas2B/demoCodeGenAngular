import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if trying to delete a female employee', () => {
    const mockEmployee = { id: '1', gender: 'Femenino' };

    service.deleteEmployee('1').subscribe(() => {}, err => {
      expect(err).toEqual('Cannot delete female employees');
    });

    const req = httpMock.expectOne('/api/employees/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should delete a male employee', () => {
    const mockEmployee = { id: '2', gender: 'Masculino' };

    service.deleteEmployee('2').subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne('/api/employees/2');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);

    const deleteReq = httpMock.expectOne('/api/employees/2');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush(null);
  });
});
