import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from "@ionic/core";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  animals: string[] = [
    "Physical excercise",
    "Upskill individual skills",
    "Cooking ability",
    "Communication skill",
    "Social relationship"
  ];
  showInput: boolean;
  utilText: string;
  selectedUtil: any;
  currentDate: string;
  toDate: string;
  fromDate: string;
  submitted: boolean;
  
  constructor(private pickerController: PickerController,
    private localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.currentDate = this.formatDate(new Date);
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  async showPicker() {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (value: any) => {
            this.selectedUtil = value.Utilities.value;
          }
        }
      ],
      columns: [{
        name: 'Utilities',
        options: this.getColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present();
  }


  getColumnOptions() {
    let options = [];
    this.animals.forEach(x => {
      options.push({ text: x, value: x });
    });
    return options;
  }

  addUtil() {
    this.showInput = true;
  }

  addData() {
    if (!this.animals.includes(this.utilText)) {
      this.animals.push(this.utilText);
      this.showInput = false;
      this.utilText = '';
      this.selectedUtil = this.utilText;
    }
  }

  setGoal() {
    this.submitted = true;
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: `Gentle reminder for your ${this.selectedUtil}`,
      sound: 'file://sound.mp3',
     // trigger: { every: { hour: 9, minute: 0 } }
    });
  }

}
