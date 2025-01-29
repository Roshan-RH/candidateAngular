import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Candidate, canExpDto} from './candidate.model';
import {catchError, Observable, throwError} from 'rxjs';

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
    return this.httpClient.post<any>(`${this.api}/save/exp`,formData).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    )
  }

  public deleteExp(canId: number){
    return this.httpClient.delete(`${this.api}/delete/exp/${canId}`)
  }

  public getCanExp(id: number): Observable<canExpDto>{
    return this.httpClient.get<canExpDto>(`${this.api}/canExp/${id}`)
  }

  public deleteByEmail(email: string): Observable<any>{
    return this.httpClient.delete(`${this.api}/delete/email/${email}`)
  }

  public getCanExpByMail(email: String): Observable<canExpDto>{
    return this.httpClient.get<canExpDto>(`${this.api}/canExp/email/${email}`)
  }

  checkEmailExists(email: String): Observable<boolean> {
    return this.httpClient.get<boolean>(`http://localhost:1710/check/email/${email}`);
  }

}
