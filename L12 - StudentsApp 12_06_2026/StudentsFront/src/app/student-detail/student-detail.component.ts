import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, UpperCasePipe } from '@angular/common';
import { StudentService } from '../student.service';
import { Student } from '../student';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-detail',
  imports: [FormsModule, UpperCasePipe],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent {
  student = signal<Student | null>(null);

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getStudent();
  }

  getStudent(): void {
    const pathId = this.route.snapshot.paramMap.get('id');
    if (pathId) {
      this.studentService.getStudent(+pathId)
        .subscribe(student => this.student.set(student));
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const s = this.student();
    this.studentService.updateStudent(s!)
      .subscribe(() => this.goBack());
  }
}
