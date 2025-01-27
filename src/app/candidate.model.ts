export interface Candidate{
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  city: string,
  age: string,
  graduation: string,
  graduationYear: string,
  gender: string,
  resume: string,
}

export interface Experience{
  graduation: string,
  graduationYear: string,
  resume: string,
}

export interface canExpDto{
  candidate: Candidate,
  experience: Experience
}
