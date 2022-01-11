import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Device} from './device';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  private readonly deviceUrl: string;

  constructor(private http: HttpClient) {
    this.deviceUrl = 'http://localhost:8080/devices';
  }

  public getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.deviceUrl);
  }
  public createDevice(device: Device) {
    return this.http.post<Device>(this.deviceUrl, device);
  }
}
