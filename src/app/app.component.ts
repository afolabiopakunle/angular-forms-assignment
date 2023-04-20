import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators/custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  forbiddenProjectNames = ['Test']
  
  statuses = [
    {value: 'stable', title: 'Stable' },
    {value: 'critical', title: 'Critical' },
    {value: 'finished', title: 'Finished' },
  ]

  qualifications = [
    {value: 'bsc', qualification: 'B.Sc.',},
    {value: 'ssce', qualification: 'SSCE',},
    {value: 'phd', qualification: 'PhD',}
  ]

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      projectName: ['', [Validators.required, CustomValidators.forbiddenProjectNames ] ],
      mail: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      projectManager: this.fb.array([
        this.createProjectManager()
      ])
    })
  }

  createProjectManager() {
    return this.fb.group({
      name: new FormControl(''),
      qualification: new FormControl('')
    })
  }

  get projectManagers() {
    return (this.form.get('projectManager') as FormArray);
  }

  addProjectManager() {
    (this.form.get('projectManager') as FormArray).push(this.createProjectManager())
  }

  removeManager(i) {
    (this.form.get('projectManager') as FormArray).removeAt(i)
  }
  submit() {
    console.log(this.form.value);
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
 

}