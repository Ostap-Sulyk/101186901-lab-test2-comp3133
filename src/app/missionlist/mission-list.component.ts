import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mission} from "../models/missions";

@Component({
  selector: 'app-missionlist',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})
export class MissionListComponent {
  launches: Mission[] = [];
  filteredMissions: Mission[] = [];
  filterYear: string = "";
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Mission[]>('https://api.spacexdata.com/v3/launches?limit=100').subscribe((data: Mission[]) => {
      this.launches = data.map((mission) => {
        return {
          ...mission,
          // @ts-ignore
          mission_patch_small: mission.links.mission_patch_small
        };
      });
      this.filteredMissions = this.launches;
    });
  }
  applyFilter() {
    if (!this.filterYear) {
      this.filteredMissions = this.launches;
      return;
    }
    this.filteredMissions = this.launches.filter((mission) => {
      return mission.launch_year.toString().includes(this.filterYear);
    });
  }
}

