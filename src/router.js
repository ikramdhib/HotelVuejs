
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
      }},
      
      {
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
        path: '/SpaTable',
        name: 'SpaTable',
        component: () => import('./components/SpaTable.vue'),
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
        path: '/PoolTable',
        name: 'PoolTable',
       component: () => import('./components/PoolTable.vue'),
        beforeEnter: (to, from, next) => {
            if (!localStorage.getItem("token")) {
              next("login");
            } else {
              next();
            }
          }
    },

  
    {
      path: '/TypeTable/',
      name: 'TypeTable',
      component: () => import('./components/TypeTable.vue'),
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
              path: '/RoomTable',
              name: 'RoomTable',
              component: () => import('./components/RoomTable.vue'),
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
        path: '/Type',
        name: 'Type',
        component: () => import('./components/Type.vue')
      
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
  path: '/addmenu:id',
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
{
  path: '/conferencerooms',
  name: 'confrencerooms',
 component: () => import('./components/ConferenceRoomTable.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/TableContact',
  name: 'TableContact.vue',
 component: () => import('./components/TableContact.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/updaterooftop:id',
  name: 'updaterooftop',
 component: () => import('./components/UpdateRoofTop.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/equipementupdate:id',
  name: 'equipementupdate',
 component: () => import('./components/EquipementUpdate.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/typeupdate:id',
  name: 'typeupdate',
 component: () => import('./components/TypeUpdate.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/conferenceroomupdate:id',
  name: 'conferenceroomupdate',
 component: () => import('./components/ConferenceRoomUpdate.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/restaurantupdate:id',
  name: 'restaurantupdate',
 component: () => import('./components/RestaurantUpdate.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/platupdate:id',
  name: 'platupdate',
 component: () => import('./components/PlatUpdate.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/notifications',
  name: 'notifications',
 component: () => import('./components/Notifications.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/addoffres',
  name: 'addoffres',
 component: () => import('./components/AddOffres.vue'),
  beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("login");
      } else {
        next();
      }
    }
},
{
  path: '/images :id :categorie',
  name: 'images',
 component: () => import('./components/Images.vue'),
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
