import {Component, OnInit} from '@angular/core';
import {Candidate, canExpDto} from '../candidate.model';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {CandidateService} from '../candidate.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {ToastrService} from 'ngx-toastr';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-candidate',
  standalone: false,

  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{
  candidate: Candidate={// @ts-ignore
    id: null, firstName:'', lastName:'', age:'', city:'', email:'', gender:'', graduation:'', graduationYear:'',phone:'', resume:''
  }
  // graduation= '';
  // graduationYear= '';

  selectedFile: File | null = null;
  fileName: string | null  =null;

  isHid=true;
upd: boolean=true;
del: boolean=true;
sav: boolean=false;
mr:  boolean=false;
isUpOrDel=false;
isPdfValid: boolean = true ;
resumeTouched = false

  constructor(private candidateService: CandidateService, private dialog:MatDialog, private messageService: MessageService) {
  }
  ngOnInit(): void {
  }

  onFileSelected(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.resumeTouched=true
    if(input.files && input.files.length>0){
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name

    if (this.selectedFile.type !== 'application/pdf') {
      this.isPdfValid = false;
      this.fileName = null;
      this.messageService.add({severity:'error', summary:'Error', detail:'Please Upload Resume in PDF Format',key:'k1', life: 3000})

    } else {
      this.isPdfValid = true;
    }
  } else {
  this.selectedFile = null;
  this.fileName = null;
  this.isPdfValid = false;
}
  }

  saveCandidate(candidateForm: NgForm){
    this.isUpOrDel=false;
    this.candidateService.saveCandidate(this.candidate).subscribe(
      {
        next: (res: Candidate)=>{
          console.log(res);

          this.dialog.open(DialogComponent,{
            width: '20%',
            data:{title:"Success", message:`Candidate Saved Successfully \n your Candidate Id is: ${res.id}`}
          }).afterClosed().subscribe(() => {location.reload()})
        },
        error: (err: HttpErrorResponse)=>{
          console.log(err);
          candidateForm.reset();
        }
      }
    )
  }

  saveCandidate2(candidateForm: NgForm){
    if(this.selectedFile){
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'multipart/file'})
      }
      const formData = new FormData();
      formData.append('candidate',new Blob([JSON.stringify(this.candidate)],{type:`application/json`}))
      formData.append('file',this.selectedFile)
      formData.append('graduation', this.candidate.graduation);
      formData.append('graduationYear', this.candidate.graduationYear);

      this.candidateService.saveFile(formData).subscribe({
        next: (res) =>{
          console.log(res)
          this.dialog.open(DialogComponent,{
            width: '20%',
            data:{title:"Success", message:`Candidate Saved Successfully`}
          }).afterClosed().subscribe(() => {location.reload()})
        }, error: (err: HttpErrorResponse) => {
          console.log(err)
          alert('err')
        }
      })
    } else {
      this.resumeTouched= true
      this.messageService.add({severity:'error', summary:'Error', detail:'Resume Required \n Upload a Resume',key:'k1', life: 3000})
    }
  }

  selectGender(gender: string){
    this.candidate.gender=gender;
  }

  updateFields(candidateForm: NgForm){
    candidateForm.controls['id'].enable();
    //candidateForm.controls['save'].disable();
    this.isUpOrDel=true
    this.upd=false
    this.del=true
    this.sav=true
    this.mr=false
    this.isHid=false
    candidateForm.controls['firstName'].enable();
    candidateForm.controls['lastName'].enable();
    candidateForm.controls['age'].enable();
    candidateForm.controls['email'].enable();
    candidateForm.controls['graduation'].enable();
    candidateForm.controls['graduationYear'].enable();
    candidateForm.controls['city'].enable();
    candidateForm.controls['phone'].enable();
  }

  deleteFields(candidateForm: NgForm){
    this.isUpOrDel=true
    this.mr=true
    this.del=false
    this.upd=true
    this.sav=true
    this.isHid=false
    candidateForm.controls['id'].enable();
    candidateForm.controls['firstName'].disable();
    candidateForm.controls['lastName'].disable();
    candidateForm.controls['age'].disable();
    candidateForm.controls['email'].disable();
    candidateForm.controls['graduation'].disable();
    candidateForm.controls['graduationYear'].disable();
    candidateForm.controls['city'].disable();
    candidateForm.controls['phone'].disable();

  }
deleteCandid(canId: number){
    if (!canId){
      this.messageService.add({severity:'warn', summary:'Error', detail:'Please enter a Candidate ID',key:'k1', life: 3000})
    } else {
    console.log(canId)
  this.dialog.open(DialogComponent,{
    data:{title:"Are you sure !!", message:`do you wanna delete Candidate ${canId} ??`}
  }).afterClosed().subscribe(() => {


  this.candidateService.deleteExp(canId).subscribe({
    next: (res)=>{
      console.log(res)
      this.dialog.open(DialogComponent,{
        width: '20%',
        data:{title:"Deleted !!", message:`Candidate ${canId} Deleted Successfully`}
      }).afterClosed().subscribe(() => {location.reload()})
      //location.reload();
    },
    error:(err: HttpErrorResponse)=> {
      console.log(err);
      alert(err)
  }
  })
  })}
}

updateCandid(candidateForm: NgForm){
this.candidateService.updateCandid(this.candidate).subscribe(
  {
    next: (res: Candidate)=>{
      this.dialog.open(DialogComponent,{
        width: '20%',
        data:{title:"Updated !!", message:`Candidate ${res.id}'s Details Updated Successfully`}
      }).afterClosed().subscribe(() => {location.reload()})
      console.log(res)
    },
    error: (err: HttpErrorResponse)=>{
      console.log(err)
    }
  }
)
}

  updateExp(candidateForm: NgForm){
    console.log("clicked")
      const formData = new FormData();
      formData.append('candidate',new Blob([JSON.stringify(this.candidate)],{type:`application/json`}))
      formData.append('graduation', this.candidate.graduation);
      formData.append('graduationYear', this.candidate.graduationYear)

    if(this.selectedFile){
      formData.append('resume',this.selectedFile)
    }

      this.candidateService.updateExperience(this.candidate.id , formData).subscribe({
        next: (res: any) =>{
          this.dialog.open(DialogComponent,{
            width: '20%',
            data:{title:"Updated !!", message:`Candidate Details Updated Successfully`}
          }).afterClosed().subscribe(() => {location.reload()})
          console.log(res)
        }, error: (err: HttpErrorResponse) => {
          console.log(err)
          alert('err')
        }
      })
  }

  fetchCan() {
    if (this.candidate.id) {
      this.candidateService.getCanById(this.candidate.id).subscribe({
        next: (res: Candidate) => {
          this.candidate = res; // Populate the form with fetched data
          console.log("Fetched candidate:", res);
        },
        error: (err: HttpErrorResponse) => {
          console.error("Error fetching candidate:", err);
          alert("Candidate not found!");
          // Clear the form if no candidate is found
          this.candidate = {
            id: 0,
            firstName: '',
            lastName: '',
            age: '',
            city: '',
            email: '',
            gender: '',
            graduation: '',
            graduationYear: '',
            phone: '',
            resume:'',
          };
        },
      });
    } else {
      alert("Please enter a valid Candidate ID");
    }
  }

  fetchCan2() {
    if (this.candidate.id) {
      // Call the service to fetch both Candidate and Experience
      this.candidateService.getCanExp(this.candidate.id).subscribe({
        next: (res: canExpDto) => {
          // Populate the form with fetched data
          this.candidate = res.candidate;  // Fill the candidate form fields
          this.candidate.graduation = res.experience.graduation;  // Set graduation
          this.candidate.graduationYear = res.experience.graduationYear;
          this.fileName = res.experience.resume;// Set graduationYear
          console.log("Fetched candidate and experience:", res);
        },
        error: (err: any) => {
          console.error("Error fetching candidate and experience:", err);
          //alert("Candidate not found!");
          this.messageService.add({severity:'error', summary:'Error', detail:'Candidate Not Found',key:'k1', life: 3000})

          this.candidate = {// @ts-ignore
            id: null,
            firstName: '',
            lastName: '',
            age: '',
            city: '',
            email: '',
            gender: '',
            graduation: '',
            graduationYear: '',
            phone: '',
            resume:'',
          };
          this.fileName = ''
        }
      });
    } else {
      //alert("Please enter a valid Candidate ID");
      this.messageService.add({severity:'error', summary:'Error', detail:'Please enter a Candidate ID',key:'k1', life: 3000})
    }
  }

  protected readonly location = location;
}
