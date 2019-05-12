import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MessageItemComponent } from './message-item/message-item.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { FormAddCommentComponent } from './form/form-add-comment/form-add-comment.component';

@NgModule({
    declarations: [
      MessageItemComponent,
      CommentItemComponent,
      FormAddCommentComponent
    ],
    entryComponents: [
    ],
    imports : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
      ],
    exports: [
      MessageItemComponent,
      CommentItemComponent,
      FormAddCommentComponent
    ],
  })
  export class ComponentsModule {}
