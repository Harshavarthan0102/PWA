// computer-facts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComputerFactsService {
  //   private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private apiUrl = 'https://catfact.ninja/fact';

  constructor(private http: HttpClient) {}

  getComputerFacts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
