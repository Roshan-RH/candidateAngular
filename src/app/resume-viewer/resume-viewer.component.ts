import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Candidate} from '../candidate.model';
import {MatTableDataSource} from '@angular/material/table';
import {CandidateService} from '../candidate.service';

@Component({
  selector: 'app-resume-viewer',
  standalone: false,

  templateUrl: './resume-viewer.component.html',
  styleUrl: './resume-viewer.component.css',

})
export class ResumeViewerComponent implements OnInit{
  displayedColumns: string[] = ['id', 'firstName','lastName', 'age', 'graduation', 'gender', 'resume'];
  dataSource: MatTableDataSource<Candidate> = new MatTableDataSource<Candidate>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private  canService: CandidateService) {
  }

  ngOnInit(): void {
this.getCandidates();
  }

  getCandidates(){
    this.canService.getExp().subscribe({
      next: (res: Candidate[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('Candidates fetched:', res); // Debug
      },
      error: (err) => {
        console.error('Error fetching candidates:', err);
      },
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Reset to the first page if filtering reduces the dataset
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewResume(fileName: string): void {
    const resumeUrl = `http://localhost:1710/resume/${fileName}`;
    window.open(resumeUrl, '_blank');
  }
}
