import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-missionlist',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent {
  launches: any[] = [];
  ngOnInit(): void {
    this.http.get('https://api.spacexdata.com/v3/launches').subscribe(data => {
      this.launches = data as any[];
    });
  }
  constructor(private http: HttpClient) {}

}
