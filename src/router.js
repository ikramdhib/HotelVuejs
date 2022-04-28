
import { createRouter, createWebHashHistory } from 'vue-router';


const routes = [
    

      {
        path: '/',
        name: 'dashboard',
        component: () => import('./components/Dashboard.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }

    },
    {
      path: '/pool',
      name: 'pool',
      component: () => import('./components/AddPool.vue'),
      beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("token")) {
            next("login");
          } else {
            next();
          }
        }
  
  }, {
  path: '/updateSpa:id',
  name: 'updateSpa',
  component: () => import('./components/updateSpa.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }

}, 
  {
    path: '/updatePool:id',
    name: 'updatePool',
    component: () => import('./components/updatePool.vue'),
    beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("token")) {
          next("login");
        } else {
          next();
        }
      }},{
    path: '/Spa',
    name: 'Spa',
    component: () => import('./components/AddSpa.vue'),
    beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("token")) {
          next("login");
        } else {
          next();
        }
      }

},
      
      {
        path: '/image',
        name: 'Image',
        component: () => import('./components/image.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    
    },
        {
            path: '/AddRoom',
            name: 'AddRoom',
           component: () => import('./components/AddRoom.vue'),
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem("token")) {
                  next("login");
                } else {
                  next();
                }
              }
        },
        {
          path: '/Option',
          name: 'Option',
         component: () => import('./components/Option.vue'),
          beforeEnter: (to, from, next) => {
              if (!localStorage.getItem("token")) {
                next("login");
              } else {
                next();
              }
            }
      },
      {
        path: '/tablepool',
        name: 'tablepool',
       component: () => import('./components/TablePool.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },

  
    {
      path: '/TableType/',
      name: 'TableType',
      component: () => import('./components/TableType.vue'),
      beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("token")) {
            next("login");
          } else {
            next();
          }
        }},
        {
          path: '/TableOption',
          name: 'TableOption',
          component: () => import('./components/TableOption.vue'),
          beforeEnter: (to, from, next) => {
              if (!localStorage.getItem("token")) {
                next("login");
              } else {
                next();
              }
            }},
           
      
            {
              path: '/OptionUpdate:id',
              name: 'OptionUpdate',
              component: () => import('./components/OptionUpdate.vue'),
              beforeEnter: (to, from, next) => {
                  if (!localStorage.getItem("token")) {
                    next("login");
                  } else {
                    next();
                  }
                }},
                {
                  path: '/UpdateType:id',
                  name: 'UpdateType',
                  component: () => import('./components/UpdateType.vue'),
                  beforeEnter: (to, from, next) => {
                      if (!localStorage.getItem("token")) {
                        next("login");
                      } else {
                        next();
                      }
                    }},
                    {
                      path: '/UpdateRoom:id',
                      name: 'UpdateRoom',
                      component: () => import('./components/UpdateRoom.vue'),
                      beforeEnter: (to, from, next) => {
                          if (!localStorage.getItem("token")) {
                            next("login");
                          } else {
                            next();
                          }
                        }},
            {
              path: '/TableRoom',
              name: 'TableRoom',
              component: () => import('./components/TableRoom.vue'),
              beforeEnter: (to, from, next) => {
                  if (!localStorage.getItem("token")) {
                    next("login");
                  } else {
                    next();
                  }
                }},
  
  

    
    {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/Type',
        name: 'Type',
        component: () => import('./components/Type.vue')
      
    },
    
    {
        path: '/button',
        name: 'button',
        component: () => import('./components/ButtonDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('./components/TableDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./components/ListDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('./components/TreeDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/panel',
        name: 'panel',
        component: () => import('./components/PanelsDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/overlay',
        name: 'overlay',
        component: () => import('./components/OverlayDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/media',
        name: 'media',
        component: () => import('./components/MediaDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/menu',
        component: () => import('./components/MenuDemo.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/menu/PersonalDemo.vue'),
                beforeEnter: (to, from, next) => {
                    if (!localStorage.getItem("token")) {
                      next("login");
                    } else {
                      next();
                    }
                  }
            },
            {
                path: '/menu/seat',
                component: () => import('./components/menu/SeatDemo.vue'),
                beforeEnter: (to, from, next) => {
                    if (!localStorage.getItem("token")) {
                      next("login");
                    } else {
                      next();
                    }
                  }
            },
            {
                path: '/menu/payment',
                component: () => import('./components/menu/PaymentDemo.vue'),
                beforeEnter: (to, from, next) => {
                    if (!localStorage.getItem("token")) {
                      next("login");
                    } else {
                      next();
                    }
                  }
            },
            {
                path: '/menu/confirmation',
                component: () => import('./components/menu/ConfirmationDemo.vue'),
                beforeEnter: (to, from, next) => {
                    if (!localStorage.getItem("token")) {
                      next("login");
                    } else {
                      next();
                    }
                  }
            },
        ],
    },
    {
        path: '/messages',
        name: 'messages',
        component: () => import('./components/MessagesDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('./components/FileDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('./components/ChartDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/misc',
        name: 'misc',
        component: () => import('./components/MiscDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./pages/CrudDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('./pages/TimelineDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('./components/Profile.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
      path: '/profileEdit',
      name: 'profileEdit',
      component: () => import('./components/ProfileEdit.vue'),
      beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("token")) {
            next("login");
          } else {
            next();
          }
        }
  },
    {
      path: '/calendrier',
      name: 'calendrier',
      component: () => import('./components/Calender.vue'),
      beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("token")) {
            next("login");
          } else {
            next();
          }
        }
  },
    {
        path: '/documentation',
        name: 'documentation',
        component: () => import('./components/Documentation.vue'),
        
    },
    {
        path: '/blocks',
        name: 'blocks',
        component: () => import('./components/BlocksDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/icons',
        name: 'icons',
        component: () => import('./components/IconsDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/landing',
        name: 'landing',
        component: () => import('./pages/LandingDemo.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./pages/Login.vue'),
       
    },
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: () => import('./pages/Login.vue'),
     
  },
    {
        path: '/register',
        name: 'register',
        component: () => import('./components/Register.vue'),
        
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('./pages/Error.vue'),
       
    },
    {
      path: '/done',
      name: 'done',
      component: () => import('./pages/Done.vue'),
     
  },
    {
        path: '/notfound',
        name: 'notfound',
        component: () => import('./pages/NotFound.vue'),
        
    },
  
    {
        path: '/access',
        name: 'access',
        component: () => import('./pages/Access.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },
    {
      path: '/addrooftop',
      name: 'addrooftop',
     component: () => import('./components/AddRoofTop.vue'),
      beforeEnter: (to, from, next) => {
          if (!localStorage.getItem("token")) {
            next("login");
          } else {
            next();
          }
        }
  },
  {
    path: '/addrestaurant',
    name: 'addrestaurant',
   component: () => import('./components/AddRestaurant.vue'),
    beforeEnter: (to, from, next) => {
        if (!localStorage.getItem("token")) {
          next("login");
        } else {
          next();
        }
      }
},
{
  path: '/addmenu',
  name: 'addmenu',
 component: () => import('./components/AddMenu.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/addconferenceroom',
  name: 'addconferenceroom',
 component: () => import('./components/AddConferenceRoom.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/rooftop',
  name: 'rooftop',
 component: () => import('./components/RoofTopTable.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/restaurants',
  name: 'restaurants',
 component: () => import('./components/RestaurantTable.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
   
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


router.beforeEach(async(to, from, next)=>{
    if(to.matched.some(record => record.meta.auth) && to.meta.auth){
        let token = localStorage.getItem('token');
        if(token){
            next()
        }else{
            next({
                path:'/login',
                query:{
                    redirect: to.fullPath
                }
            })
        }
    }
    next();
});

export default router;
