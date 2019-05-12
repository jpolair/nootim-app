import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-comment',
  templateUrl: './form-add-comment.component.html',
  styleUrls: ['./form-add-comment.component.scss'],
})
export class FormAddCommentComponent implements OnInit, OnChanges {
  @Output() validForm: EventEmitter<any> = new EventEmitter();
  commentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnChanges() {
  }

  public submit() {
    if (this.commentForm.valid) {
      this.validForm.emit(this.commentForm.controls.comment.value);
    }
  }

}
