import { Component } from '@angular/core';

import { NavController , Platform} from 'ionic-angular';

import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public platform: Platform,public navCtrl: NavController) {

  }
  openUrl() {
        this.platform.ready().then(() => {
            let browser = new InAppBrowser("https://demo.lazarus.bet",'_blank');
            browser.on("loadstop").subscribe((event) => {
              browser.executeScript({ code: "console.log('response');" });
              browser.executeScript({ code: "$('#sidebar-right-button').click(function(){console.log('teste');});" });
            });

        });
  }
}
