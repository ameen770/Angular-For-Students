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
    studID: '',
    name: '',
    address: '',
    departmentName: ''
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
    if (this.student.studID === '') {
      this.studentService.addStudent(this.student)
        .subscribe(
          response => {
            this.getAllStudents();
            this.student = {
              studID: '',
              name: '',
              address: '',
              departmentName: ''
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
            studID: '',
            name: '',
            address: '',
            departmentName: ''
          }
        }
      );
  }
}
