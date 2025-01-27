import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {provideHttpClient} from '@angular/common/http';
import { CandidateComponent } from './candidate/candidate.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatButton} from '@angular/material/button';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {MatToolbar} from '@angular/material/toolbar';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatDivider} from '@angular/material/divider';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ResumeViewerComponent } from './resume-viewer/resume-viewer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura'
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
    HeaderComponent,
    ViewCandidateComponent,
    DialogComponent,
    ResumeViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatCard,
    MatCardContent,
    MatRadioGroup,
    MatRadioButton,
    MatButton,
    MatButtonModule,
    FormsModule,
    MatToolbar,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatTableModule,
    MatDivider,
    MatDividerModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    Toast,
    MatPaginator,
    MatSort,
    MatSortHeader,

  ],
  providers: [provideHttpClient(), provideAnimationsAsync(), providePrimeNG({theme:{preset: Aura}}), MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
