import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CandidateComponent} from './candidate/candidate.component';
import {ViewCandidateComponent} from './view-candidate/view-candidate.component';
import {ResumeViewerComponent} from './resume-viewer/resume-viewer.component';

const routes: Routes = [
  {path:'', component:CandidateComponent},
  {path:'view2', component:ViewCandidateComponent},
  {path:'view', component:ResumeViewerComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
