import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccessoryService } from './accessory.service';

describe('AccessoryService', () => {
  let service: AccessoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccessoryService]
    });
    service = TestBed.inject(AccessoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve accessories', () => {
    const mockAccessories = [{ id: 1, name: 'Accessory 1', price: 19.99, stock: 10, type: 'Accessory' }];

    service.getAccessories().subscribe(accessories => {
      expect(accessories).toEqual(mockAccessories);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/accessories');
    expect(req.request.method).toBe('GET');
    req.flush(mockAccessories);
  });
});