import { Component, OnInit } from '@angular/core';
import { StudentsService } from './services/students.service';
import { Student } from './Models/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'students';
  students: Student[] = [];
  student: Student = {
    StudID: '',
    Name: '',
    Address: '',
    Phone: '',
    DID: ''
  }

  constructor(private studentService: StudentsService) {

  }
  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getAllStudents()
      .subscribe(
        response => {
          this.students = response;
        }
      )
  }

  onSubmit() {
    if (this.student.StudID === '') {
      this.studentService.addStudent(this.student)
        .subscribe(
          response => {
            this.getAllStudents();
            this.student = {
              StudID: '',
              Name: '',
              Address: '',
              Phone: '',
              DID: ''
            }
          }
        );
    } else {
      this.updateStudent(this.student);
    }
  }

  deleteStudent(StudID: string) {
    this.studentService.deleteStudent(StudID)
      .subscribe(
        response => {
          this.getAllStudents();
        }
      )
  }

  populateForm(student: Student) {
    this.student = student;
  }

  updateStudent(student: Student) {
    this.studentService.updateStudent(student)
      .subscribe(
        response => {
          this.getAllStudents();
          this.student = {
            StudID: '',
              Name: '',
              Address: '',
              Phone: '',
              DID: ''
          }
        }
      );
  }
}
