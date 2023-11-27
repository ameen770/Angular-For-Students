import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../Models/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  // baseUrl = 'https://localhost:7136/api/Students'
  baseUrl = 'https://localhost:7136/Student/List'

  constructor(private http: HttpClient) { }

  // Get all student

  getAllStudents(): Observable<Student[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });
    return this.http.get<Student[]>(this.baseUrl, { headers });
  }

  addStudent(student: Student): Observable<Student> {
    //student.StudID = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Student>(this.baseUrl, student);
  }

  deleteStudent(studID: string): Observable<Student> {
    return this.http.delete<Student>(this.baseUrl + '/' + studID);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(this.baseUrl + '/' + student.studID, student);
  }
}
