import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  @Input() studentId;
  @Input() studentPoint;
  @Input() rewardName;

  YEARS = ['2022', '2021', '2020', '2019', '2018'];
  selectedYear = '2022';
  selectedReport: string;

  SUMMARY_REPORTS = {
    ATTENDANCE: 'attandence',
    SUTRA: 'sutra',
    SUMMARY: 'summary',
    REWARD: 'reward'
  }
  ngOnInit() {
    if (this.rewardName) {
      this.selectedReport = 'reward'
    }
  }

  closeModal() {
    this.modalController.dismiss({ 'dismissed': true })
  }
}
