import { Component } from '@angular/core';

import { NavController , Platform} from 'ionic-angular';

import { InAppBrowser } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor( public platform: Platform,public navCtrl: NavController) {
    this.platform.ready().then(() => {
      let url = "http://demo.lazarus.bet";
      let browser = new InAppBrowser(url,'_blank', 'location=no');
      browser.on("loadstop").subscribe((event) => {
        browser.executeScript({ code: "window.localStorage.setItem('name', '')"});
          // "$('#sidebar-right-button').click(function(){window.localStorage.setItem('name','teste')})"
        browser.executeScript({ code:
            "$(document).on('click', 'a#print-button', function(){window.localStorage.setItem('name','Print');})"
          }).then( data => {
            console.log('loadstop');
          });
          browser.executeScript({ code:
            "$('#sidebar-right-button').on('click', function(){window.localStorage.setItem('name','Hello')})"
          }).then( data => {
            console.log('loadstop');
          });
          this.setName(browser);


      });
    });
  }

  public setName(browser) {
    var $self = this;
    var loop = setInterval(function() {
      browser.executeScript({
        code: "localStorage.getItem( 'name' )"
      }).then(function( values ) {
        var name = values[ 0 ];
        if ( name ) {
          // alert(name);
          browser.executeScript({ code: "window.localStorage.setItem('name', '')"});
          browser.executeScript({ code: "document.getElementsByClassName('printable')[0].innerHTML"})
          .then(response => {
            console.log(response);
          });
          clearInterval( loop );
          $self.setName(browser);
        }
      });
    });

  }

}
