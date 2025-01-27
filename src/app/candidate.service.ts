import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Candidate, canExpDto} from './candidate.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient) { }

  api = "http://localhost:1710"

  public saveCandidate(candidate: Candidate): Observable<Candidate>{
    return this.httpClient.post<Candidate>(`${this.api}/save/candidate`, candidate);
  }

  public getCandidate(): Observable<Candidate[]>{
    return this.httpClient.get<Candidate[]>(`${this.api}/get/main`)
  }

  public getExp(): Observable<Candidate[]>{
    return this.httpClient.get<Candidate[]>(`${this.api}/get/exp`)
  }

  public deleteCandid(canId: number){
    return this.httpClient.delete(`${this.api}/delete/candidate/${canId}`)
  }

  public updateCandid(candidate: Candidate): Observable<Candidate>{
    // @ts-ignore
    return this.httpClient.put(`${this.api}/update/candidate`, candidate);
  }

  updateExperience(candidateId: number, formData: FormData): Observable<any> {
    return this.httpClient.put(`${this.api}/update/exp/${candidateId}`, formData);
  }

  public getCanById(canId: number) {
    return this.httpClient.get<Candidate>(`${this.api}/get/${canId} `)
  }

  public getExpById(canId: number){

  }

  public saveFile(formData: FormData): Observable<any>{
    return this.httpClient.post<any>(`${this.api}/save/exp`,formData)
  }

  public deleteExp(canId: number){
    return this.httpClient.delete(`${this.api}/delete/exp/${canId}`)
  }

  public getCanExp(id: number): Observable<canExpDto>{
    return this.httpClient.get<canExpDto>(`${this.api}/canExp/${id}`)
  }
}
