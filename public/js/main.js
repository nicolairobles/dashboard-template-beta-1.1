'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$cookies','$cookieStore',  
    function(              $scope,   $translate,   $localStorage,   $window, $cookies,$cookieStore ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      if(isIE){ angular.element($window.document.body).addClass('ie');}
      if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};

      // config
      $scope.app = {
        name: 'Media Overview',
        version: '1.0.0',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 7,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-black',
          asideColor: 'bg-white b-r',
          headerFixed: true,
          asideFixed: true,
          asideFolded: false,
          asideDock: false,
          container: true
        }, 
        click_history: {
          page1_link: false,
          page2_link: false,
          page3_link: false,
          page4_link: false,
          the_basics_link: false,
          the_basics_modal_link: false,
          big_data_link: false,
          big_data_modal_link: false,
          ratings_link: false,
          ratings_modal_link: false,
          intro_review_link: false,
          intro_review_modal_link: false,
          what_type_of_media_do_you_interact_with_link: false,
          what_type_of_media_do_you_interact_with_modal_link: false,
          what_form_does_media_take_link_link: false,
          what_form_does_media_take_link_modal_link: false,
          how_do_you_consume_media_link: false,
          how_do_you_consume_media_modal_link: false,
          who_are_the_key_players_in_the_media_industry_link: false,
          who_are_the_key_players_in_the_media_industry_modal_link: false,
          overview_link: false,
          overview_modal_link: false,
          what_comes_after_measurement: false,
          what_comes_after_measurement_modal_link: false,
          primary_playback: false,
          primary_playback_modal_link: false,
          our_hybrid_approach: false,
          our_hybrid_approach_modal_link: false,
          panels: false,
          panels_modal_link: false


          

        }
      }

      // CUSTOM - save click_history to local storage

      if ( angular.isDefined($localStorage.click_history) ) {
        $scope.app.click_history = $localStorage.click_history;
      } else {
        $localStorage.click_history = $scope.app.click_history;
      }
      $scope.$watch('app.click_history', function(){
        // save to local storage
        $localStorage.click_history = $scope.app.click_history;
      }, true);


      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // for box layout, add background image
        $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);


      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);
