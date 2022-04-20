export interface IUniversity {
  id: number;
  name: string;
  city: string;
  degree: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICUUniversityDto {
  name?: string;
  city?: string;
  degree?: string;
}
