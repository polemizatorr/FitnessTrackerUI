import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { AerobicTrainingService } from 'src/Services/AerobicTrainingService/AerobicTrainingService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aerobic-trainings',
  templateUrl: './aerobic-trainings.component.html',
  styleUrls: ['./aerobic-trainings.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
})
export class AerobicTrainingsComponent implements OnInit {

  data: any[] = [{
    "$id": "2",
    "aerobicTrainingId": "1b0f5773-7856-40fb-4504-08dc360c0b0f",
    "userId": "2500b154-fff1-4c79-a164-7ae9485fa4c2",
    "user": null,
    "activityType": "walking",
    "activityDurationMinutes": 20,
    "calorieBurnt": 100,
    "creationDate": "2024-02-25T15:14:12.6636367",
    "modificationTime": "2024-02-25T15:14:12.6636979"
},
{
    "$id": "3",
    "aerobicTrainingId": "9c14b9ae-d88b-4155-04a1-08dc3620aab4",
    "userId": "2500b154-fff1-4c79-a164-7ae9485fa4c2",
    "user": null,
    "activityType": "running",
    "activityDurationMinutes": 120,
    "calorieBurnt": 1000,
    "creationDate": "2024-02-25T17:41:48.003646",
    "modificationTime": "2024-04-13T19:28:44.374479"
},
{
    "$id": "4",
    "aerobicTrainingId": "f5669878-bc38-487b-9f4e-08dc4f561b2c",
    "userId": "2500b154-fff1-4c79-a164-7ae9485fa4c2",
    "user": null,
    "activityType": "dance",
    "activityDurationMinutes": 90,
    "calorieBurnt": 450,
    "creationDate": "2024-03-28T19:37:08.9041567",
    "modificationTime": "2024-03-28T19:37:08.9041598"
}
]; 
  trainingsData: object[] = []
  pageSize = 10; 
  pageSizeOptions = [10, 50, 100]; 
  displayedColumns = ['activityType', 'activityDurationMinutes', 'calorieBurnt']; 

  constructor(private aerobicTrainingService: AerobicTrainingService) { }

  ngOnInit(): void {
    this.aerobicTrainingService.getTrainings().subscribe((data: any[]) => {
      console.log(data)
      console.log(this.trainingsData);
    });
  }

}
