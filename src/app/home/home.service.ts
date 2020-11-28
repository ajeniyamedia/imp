import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

export class servicesList {
  image: string;
  title: string;
  content: string[];
  buttonText: string;

}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  info = {
      infoTitle: 'Why Study Online at United Institute of Modern Technologies?',
      description: 'UIoMT information technology degrees and certificates are the only AI-Enhanced hands-on programs. Our online, career-focused curriculum is based on the latest industry advances to keep you competitive now and in the future. Enhance your IT skills while developing invaluable business, communication, and leadership expertise.'
    };

  servicesList: servicesList[] = [
    {
      image: 'Photo1.png',
      title: 'Pick Your Degree',
      content: ['Degrees','Certificates','Specialization'],
      buttonText: 'read more'
    },
    {
      image: 'photo2.png',
      title: 'Admission',
      content: ['Requirements','Guidelines','Dates and Deadlines'],
      buttonText: 'read more'
    },
    {
      image: 'Photo3.png',
      title: 'Transfer Credits',
      content: ['Transfer to UIoMT ','Transfer from UIoMT','Earn Credit'],
      buttonText: 'read more'
    },
    {
      image: 'Photo4.png',
      title: 'Tuition And Fee',
      content: ['Fees','Financial Aid','Military Students'],
      buttonText: 'read more'
    }
  ];


  constructor(private http: HttpClient) { }
  getSiteInfo() {
    return of(this.info);
  }

  getSiteServices() {
    return of(this.servicesList);
  }

  submitForm(firstName: string, lastName: string, email: string, yourNumber: string, intrestedIn: string  ) {
      return this.http.post<any>(`${environment.baseUrl}/auth/actionCreate`,
           {  firstName: firstName,
              lastName: lastName,
              email: email,
              yourNumber: yourNumber,
              intrestedIn: intrestedIn
          })
            .pipe(map(result => {
                return result;
            }));
    }

}
