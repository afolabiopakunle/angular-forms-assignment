import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup
  @ViewChild('myForm') myForm: NgForm;
  statuses = [
    {value: 'stable', title: 'Stable' },
    {value: 'critical', title: 'Critical' },
    {value: 'finished', title: 'Finished' },
  ]

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      projectName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required]
    })
  }

  submit() {
    console.log(this.form.value);
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}