import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Owner} from './owner';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private readonly ownersUrl: string;

  constructor(private http: HttpClient) {
    this.ownersUrl = 'http://localhost:8080/owners';
  }

  public getAll(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.ownersUrl);
  }
  public create(owner: Owner) {
    return this.http.post<Owner>(this.ownersUrl, owner);
  }
}

