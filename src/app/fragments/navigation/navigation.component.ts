import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // const contentWayPoint = function() {
    //   let i = 0;
    //   $('.animate-box').waypoint( function( direction ) {
    //
    //     if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
    //
    //       i++;
    //
    //       $(this.element).addClass('item-animate');
    //       setTimeout(function(){
    //
    //         $('body .animate-box.item-animate').each(function(k){
    //           var el = $(this);
    //           setTimeout( function () {
    //             var effect = el.data('animate-effect');
    //             if ( effect === 'fadeIn') {
    //               el.addClass('fadeIn animated-fast');
    //             } else if ( effect === 'fadeInLeft') {
    //               el.addClass('fadeInLeft animated-fast');
    //             } else if ( effect === 'fadeInRight') {
    //               el.addClass('fadeInRight animated-fast');
    //             } else {
    //               el.addClass('fadeInUp animated-fast');
    //             }
    //
    //             el.removeClass('item-animate');
    //           },  k * 200, 'easeInOutExpo' );
    //         });
    //
    //       }, 100);
    //
    //     }
    //
    //   } , { offset: '85%' } );
    // };
    //
    // var dropdown = function() {
    //
    //   $('.has-dropdown').mouseenter(function(){
    //
    //     var $this = $(this);
    //     $this
    //       .find('.dropdown')
    //       .css('display', 'block')
    //       .addClass('animated-fast fadeInUpMenu');
    //
    //   }).mouseleave(function(){
    //     var $this = $(this);
    //
    //     $this
    //       .find('.dropdown')
    //       .css('display', 'none')
    //       .removeClass('animated-fast fadeInUpMenu');
    //   });
    //
    // };
  }

}
