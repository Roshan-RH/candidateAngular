import {Component, OnInit, ViewChild} from '@angular/core';
import {CandidateService} from '../candidate.service';
import {Candidate} from '../candidate.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, range} from 'rxjs';
import {ResumeViewerComponent} from '../resume-viewer/resume-viewer.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-view-candidate',
  standalone: false,

  templateUrl: './view-candidate.component.html',
  styleUrl: './view-candidate.component.css'
})
export class ViewCandidateComponent implements OnInit{
  dataSource: Candidate[]= [];
  displayedSource: Candidate[]= [];
  pageSize = 5;
  currPage = 1;
  totalPages = 0;
  //displayedColumns: string[] = ['ID', 'Name', 'Age', 'Degree', 'Gender'];

constructor(private candidateService: CandidateService, private dialog: MatDialog) {
}
  ngOnInit(): void {
    this.getCandidate();
  }

  getCandidate(): void{
  this.candidateService.getExp().subscribe(
    {
      next: (res: Candidate[])=>{
        console.log(res)
        this.dataSource=res;
        this.totalPages=Math.ceil(this.dataSource.length/this.pageSize);
        this.updateDisplayedCan();
        // @ts-ignore
        //console.log(tst)
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err);
      }
    }
  )
  }

  updateDisplayedCan(){
    const startIndex = (this.currPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedSource = this.dataSource.slice(startIndex, endIndex);
  }
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currPage = page;
      this.updateDisplayedCan();
    }
  }

      nextPage(): void {
    if (this.currPage < this.totalPages) {
      this.currPage++;
      this.updateDisplayedCan();
    }
  }

  previousPage(): void {
    if (this.currPage > 1) {
      this.currPage--;
      this.updateDisplayedCan();
    }
  }

  viewResume(fileName: string): void {
    const resumeUrl = `http://localhost:1710/resume/${fileName}`;
    window.open(resumeUrl,'_blank')
  }
}
