'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams', '$modalStack',
      function ($rootScope,   $state,   $stateParams, $modalStack) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams; 
          $rootScope.$on('$stateChangeStart', function() {
            var top = $modalStack.getTop();
            if (top) {
              $modalStack.dismiss(top.key);
            }
          });       
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";
          if(window.location.href.indexOf("material") > 0){
            layout = "tpl/blocks/material.layout.html";
            $urlRouterProvider
              .otherwise('/app/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('/homepage');
          }
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: layout
              })
              .state('app.dashboard-v1', {
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/app_dashboard_v1.html',
                  resolve: load(['js/controllers/chart.js'])
              })
              .state('app.dashboard-v2', {
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/app_dashboard_v2.html',
                  resolve: load(['js/controllers/chart.js'])
              })
              .state('app.dashboard-v3', {
                  url: '/dashboard-v3',
                  templateUrl: 'tpl/app_dashboard_v3.html',
                  resolve: load(['js/controllers/chart.js'])
              })
              .state('app.ui', {
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>'
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'tpl/ui_buttons.html'
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'tpl/ui_icons.html'
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/ui_grid.html'
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'tpl/ui_widgets.html'
              })          
              .state('app.ui.bootstrap', {
                  url: '/bootstrap',
                  templateUrl: 'tpl/ui_bootstrap.html'
              })
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'tpl/ui_sortable.html'
              })
              .state('app.ui.scroll', {
                  url: '/scroll',
                  templateUrl: 'tpl/ui_scroll.html',
                  resolve: load('js/controllers/scroll.js')
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'tpl/ui_portlet.html'
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/ui_timeline.html'
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'tpl/ui_tree.html',
                  resolve: load(['angularBootstrapNavTree', 'js/controllers/tree.js'])
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'tpl/ui_toaster.html',
                  resolve: load(['toaster', 'js/controllers/toaster.js'])
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'tpl/ui_jvectormap.html',
                  resolve: load('js/controllers/vectormap.js')
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'tpl/ui_googlemap.html',
                  resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'js/app/map/map.js'], function(){ return loadGoogleMaps(); })
              })
              .state('app.chart', {
                  url: '/chart',
                  templateUrl: 'tpl/ui_chart.html',
                  resolve: load('js/controllers/chart.js')
              })
              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>'
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'tpl/table_static.html'
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'tpl/table_datatable.html'
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'tpl/table_footable.html'
              })
              .state('app.table.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/table_grid.html',
                  resolve: load(['ngGrid','js/controllers/grid.js'])
              })
              .state('app.table.uigrid', {
                  url: '/uigrid',
                  templateUrl: 'tpl/table_uigrid.html',
                  resolve: load(['ui.grid','js/controllers/uigrid.js'])
              })
              .state('app.table.editable', {
                  url: '/editable',
                  templateUrl: 'tpl/table_editable.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','js/controllers/xeditable.js'])
              })
              .state('app.table.smart', {
                  url: '/smart',
                  templateUrl: 'tpl/table_smart.html',
                  resolve: load(['smart-table','js/controllers/table.js'])
              })
              // form
              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: load('js/controllers/form.js')
              })
              .state('app.form.components', {
                  url: '/components',
                  templateUrl: 'tpl/form_components.html',
                  resolve: load(['ngBootstrap','daterangepicker','js/controllers/form.components.js'])
              })
              .state('app.form.elements', {
                  url: '/elements',
                  templateUrl: 'tpl/form_elements.html'
              })
              .state('app.form.validation', {
                  url: '/validation',
                  templateUrl: 'tpl/form_validation.html'
              })
              .state('app.form.wizard', {
                  url: '/wizard',
                  templateUrl: 'tpl/form_wizard.html'
              })
              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'tpl/form_fileupload.html',
                  resolve: load(['angularFileUpload','js/controllers/file-upload.js'])
              })
              .state('app.form.imagecrop', {
                  url: '/imagecrop',
                  templateUrl: 'tpl/form_imagecrop.html',
                  resolve: load(['ngImgCrop','js/controllers/imgcrop.js'])
              })
              .state('app.form.select', {
                  url: '/select',
                  templateUrl: 'tpl/form_select.html',
                  controller: 'SelectCtrl',
                  resolve: load(['ui.select','js/controllers/select.js'])
              })
              .state('app.form.slider', {
                  url: '/slider',
                  templateUrl: 'tpl/form_slider.html',
                  controller: 'SliderCtrl',
                  resolve: load(['vr.directives.slider','js/controllers/slider.js'])
              })
              .state('app.form.editor', {
                  url: '/editor',
                  templateUrl: 'tpl/form_editor.html',
                  controller: 'EditorCtrl',
                  resolve: load(['textAngular','js/controllers/editor.js'])
              })
              .state('app.form.xeditable', {
                  url: '/xeditable',
                  templateUrl: 'tpl/form_xeditable.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','js/controllers/xeditable.js'])
              })
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>'
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/page_profile.html'
              })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: 'tpl/page_post.html'
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: 'tpl/page_search.html'
              })
              .state('app.page.invoice', {
                  url: '/invoice',
                  templateUrl: 'tpl/page_invoice.html'
              })
              .state('app.page.price', {
                  url: '/price',
                  templateUrl: 'tpl/page_price.html'
              })
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'tpl/docs.html'
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: load( ['js/controllers/signin.js'] )
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: load( ['js/controllers/signup.js'] )
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/app_calendar.html',
                  // use resolve to load other dependences
                  resolve: load(['moment','fullcalendar','ui.calendar','js/app/calendar/calendar.js'])
              })

              // mail
              .state('app.mail', {
                  abstract: true,
                  url: '/mail',
                  templateUrl: 'tpl/mail.html',
                  // use resolve to load other dependences
                  resolve: load( ['js/app/mail/mail.js','js/app/mail/mail-service.js','moment'] )
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'tpl/mail.list.html'
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: 'tpl/mail.detail.html'
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'tpl/mail.new.html'
              })

              .state('layout', {
                  abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/layout.html'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: load( ['js/controllers/vectormap.js'] )
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_mobile.html'
                      }
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/layout_app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/layout_footer_fullwidth.html'
                      }
                  },
                  resolve: load( ['js/controllers/tab.js'] )
              })
              .state('apps', {
                  abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/layout.html'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note.html',
                  resolve: load( ['js/app/note/note.js','moment'] )
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps_contact.html',
                  resolve: load( ['js/app/contact/contact.js'] )
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'tpl/apps_weather.html',
                  resolve: load(['js/app/weather/skycons.js','angular-skycons','js/app/weather/ctrl.js','moment'])
              })
              .state('app.todo', {
                  url: '/todo',
                  templateUrl: 'tpl/apps_todo.html',
                  resolve: load(['js/app/todo/todo.js', 'moment'])
              })
              .state('app.todo.list', {
                  url: '/{fold}'
              })
              .state('app.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps_note_material.html',
                  resolve: load(['js/app/note/note.js', 'moment'])
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'tpl/music.html',
                  controller: 'MusicCtrl',
                  resolve: load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js', 
                            'js/app/music/theme.css'
                          ])
              })
                  .state('music.home', {
                      url: '/home',
                      templateUrl: 'tpl/music.home.html'
                  })
                  .state('music.genres', {
                      url: '/genres',
                      templateUrl: 'tpl/music.genres.html'
                  })
                  .state('music.detail', {
                      url: '/detail',
                      templateUrl: 'tpl/music.detail.html'
                  })
                  .state('music.mtv', {
                      url: '/mtv',
                      templateUrl: 'tpl/music.mtv.html'
                  })
                  .state('music.mtvdetail', {
                      url: '/mtvdetail',
                      templateUrl: 'tpl/music.mtv.detail.html'
                  })
                  .state('music.playlist', {
                      url: '/playlist/{fold}',
                      templateUrl: 'tpl/music.playlist.html'
                  })
              .state('app.material', {
                  url: '/material',
                  template: '<div ui-view class="wrapper-md"></div>',
                  resolve: load(['js/controllers/material.js'])
                })
                .state('app.material.button', {
                  url: '/button',
                  templateUrl: 'tpl/material/button.html'
                })
                .state('app.material.color', {
                  url: '/color',
                  templateUrl: 'tpl/material/color.html'
                })
                .state('app.material.icon', {
                  url: '/icon',
                  templateUrl: 'tpl/material/icon.html'
                })
                .state('app.material.card', {
                  url: '/card',
                  templateUrl: 'tpl/material/card.html'
                })
                .state('app.material.form', {
                  url: '/form',
                  templateUrl: 'tpl/material/form.html'
                })
                .state('app.material.list', {
                  url: '/list',
                  templateUrl: 'tpl/material/list.html'
                })
                .state('app.material.ngmaterial', {
                  url: '/ngmaterial',
                  templateUrl: 'tpl/material/ngmaterial.html'
                })
              // NEW ROUTES
                // Sample page template
                .state('app.page_template', {
                  url: '/page_template',
                  templateUrl: 'tpl/pages/page_template.html'
                })
                  // Sample page template 1
                  .state('app.page_template1', {
                    url: '/page_template1',
                    templateUrl: 'tpl/pages/page_template1.html'
                  })
                  // Sample page template 2
                  .state('app.page_template2', {
                    url: '/page_template2',
                    templateUrl: 'tpl/pages/page_template2.html'
                  })
                  // Sample page template 3
                  .state('app.page_template3', {
                    url: '/page_template3',
                    templateUrl: 'tpl/pages/page_template3.html'
                  })
                  // Sample page template 4
                  .state('app.page_template4', {
                    url: '/page_template4',
                    templateUrl: 'tpl/pages/page_template4.html'
                  })
                  // the-basics.html page url config
                  .state('app.the_basics', {
                    url: '/the-basics',
                    templateUrl: 'tpl/pages/introduction/the-basics/the-basics.html'
                  })

                  // big-data.html page url config
                  .state('app.big_data', {
                    url: '/big-data',
                    templateUrl: 'tpl/pages/introduction/big-data/big-data.html'
                  })

                  // ratings.html page url config
                  .state('app.ratings', {
                    url: '/ratings',
                    templateUrl: 'tpl/pages/introduction/ratings/ratings.html'
                  })

                  // intro-review.html page url config
                  .state('app.intro_review', {
                    url: '/intro-review',
                    templateUrl: 'tpl/pages/introduction/intro-review/intro-review.html'
                  })

                  // what-type-of-media-do-you-interact-with.html page url config
                  .state('app.what_type_of_media_do_you_interact_with', {
                    url: '/what-type-of-media-do-you-interact-with',
                    templateUrl: 'tpl/pages/key-terminology/what-type-of-media-do-you-interact-with/what-type-of-media-do-you-interact-with.html'
                  })

                  // what-form-does-media-take.html page url config
                  .state('app.what_form_does_media_take', {
                    url: '/what-form-does-media-take',
                    templateUrl: 'tpl/pages/key-terminology/what-form-does-media-take/what-form-does-media-take.html'
                  })

                  // how-do-you-consume-media.html page url config
                  .state('app.how_do_you_consume_media', {
                    url: '/how-do-you-consume-media',
                    templateUrl: 'tpl/pages/key-terminology/how-do-you-consume-media/how-do-you-consume-media.html'
                  })

                  // who-are-the-key-players-in-the-media-industry.html page url config
                  .state('app.who_are_the_key_players_in_the_media_industry', {
                    url: '/who-are-the-key-players-in-the-media-industry',
                    templateUrl: 'tpl/pages/key-terminology/who-are-the-key-players-in-the-media-industry/who-are-the-key-players-in-the-media-industry.html'
                  })

                  // overview.html page url config
                  .state('app.overview', {
                    url: '/overview',
                    templateUrl: 'tpl/pages/key-terminology/overview/overview.html'
                  })

                  // what-comes-after-measurement.html page url config
                  .state('app.what_comes_after_measurement', {
                    url: '/what-comes-after-measurement',
                    templateUrl: 'tpl/pages/more-about-ratings/what-comes-after-measurement/what-comes-after-measurement.html'
                  })

                  

                  // the-most-well-known-metric.html page url config
                  .state('app.the_most_well_known_metric', {
                    url: '/the-most-well-known-metric',
                    templateUrl: 'tpl/pages/more-about-ratings/the-most-well-known-metric/the-most-well-known-metric.html'
                  })

                  // ratings-questions.html page url config
                  .state('app.ratings_questions', {
                    url: '/ratings-questions',
                    templateUrl: 'tpl/pages/more-about-ratings/ratings-questions/ratings-questions.html'
                  })


                  // primary-playback.html page url config
                  .state('app.primary_playback', {
                    url: '/primary-playback',
                    templateUrl: 'tpl/pages/more-about-ratings/primary-playback/primary-playback.html'
                  })

                  // our-hybrid-approach.html page url config
                  .state('app.our_hybrid_approach', {
                    url: '/our-hybrid-approach',
                    templateUrl: 'tpl/pages/how-ratings-are-calculated/our-hybrid-approach/our-hybrid-approach.html'
                  })

                  // panels.html page url config
                  .state('app.panels', {
                    url: '/panels',
                    templateUrl: 'tpl/pages/how-ratings-are-calculated/panels/panels.html'
                  })

                  


      




              // Sample deep-linked modal
                .state('app.page_template.modal_template', {
                  url: '/modal_template',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/modal_template.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })
              // the-basics TLDR modal
                .state('app.the_basics.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/introduction/the-basics/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // big-data TLDR modal
                .state('app.big_data.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/introduction/big-data/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // ratings TLDR modal
                .state('app.ratings.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/introduction/ratings/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // review TLDR modal
                .state('app.intro_review.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/introduction/intro-review/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })


                // what-type-of-media-do-you-interact-with TLDR modal
                .state('app.what_type_of_media_do_you_interact_with.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/key-terminology/what-type-of-media-do-you-interact-with/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // what-form-does-media-take TLDR modal
                .state('app.what_form_does_media_take.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/key-terminology/what-form-does-media-take/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // how-do-you-consume-media TLDR modal
                .state('app.how_do_you_consume_media.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/key-terminology/how-do-you-consume-media/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })


                // who-are-the-key-players-in-the-media-industry TLDR modal
                .state('app.who_are_the_key_players_in_the_media_industry.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/key-terminology/who-are-the-key-players-in-the-media-industry/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })
                
                

                // Overview TLDR modal
                .state('app.overview.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/key-terminology/overview/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // what_comes_after_measurement TLDR modal
                .state('app.what_comes_after_measurement.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/more-about-ratings/what-comes-after-measurement/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })


                // the_most_well_known_metric TLDR modal
                .state('app.the_most_well_known_metric.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/more-about-ratings/the-most-well-known-metric/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })


                // ratings_questions TLDR modal
                .state('app.ratings_questions.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/more-about-ratings/ratings-questions/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // primary_playback TLDR modal
                .state('app.primary_playback.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/more-about-ratings/primary-playback/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })


                // our_hybrid_approach TLDR modal
                .state('app.our_hybrid_approach.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/how-ratings-are-calculated/our-hybrid-approach/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                // panels TLDR modal
                .state('app.panels.tldr', {
                  url: '/tldr',
                  onEnter: ['$stateParams', '$state', '$modal', '$resource', function($stateParams, $state, $modal, $resource) {
                        $modal.open({
                            templateUrl: "tpl/pages/how-ratings-are-calculated/panels/tldr.html",
                            resolve: {
                              item: function() { return; }
                            },
                            controller: ['$scope', 'item', function($scope, item) {
                              $scope.dismiss = function() {
                                $scope.$dismiss();
                              };

                              $scope.save = function() {
                                item.update().then(function() {
                                  $scope.$close(true);
                                });
                              };
                            }]
                        }).result.finally(function() {
                            $state.go('^');
                        });
                    }]
                })

                





              // Homepage configuration 
                .state('homepage', {
                    url: '/homepage',
                    templateUrl: 'tpl/pages/homepage.html',
                })
                ;

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );
