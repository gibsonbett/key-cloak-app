import { createRouter, createWebHistory } from 'vue-router';
// import keycloak from '@/keycloak';
import landingpage from "../pages/landingpage/landing-page.vue";
import login from "../components/LoginComp.vue";
import admin from "../pages/landingpage/admindashboard/admin-dashboard.vue"
import manager from "../pages/landingpage/managerdashboard/manager-dashboard.vue"
import employee from "../pages/landingpage/employeedashboard/employee-dashboard.vue"
const routes = [
  { 
    path: '/',
   component: login 
},{
    path: '/landing',
    component:  landingpage,
    meta: { requiresAuth: true },
  },{
    path: '/admin',
    component:  admin,
  },{
    path: '/manager',
    component:  manager,
  },{
    path: '/employee',
    component:  employee,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next)=>{
//   if(to.meta.requiresAuth){
//     const token = localStorage.getItem('token')
//     if(token){
//       // this.$router.push("/landing");
//       next()
//     }
//   }
// })

// router.beforeEach(async (to, from, next) => {
//   const authenticated = await keycloak.init({ onLoad: 'login-required' });
//   if (authenticated) {
//     const requiredRoles = to.meta.roles;
//     if (requiredRoles && !keycloak.hasRealmRole(requiredRoles)) {
//       next('/');
//     } else {
//       next();
//     }
//   } else {
//     next('/');
//   }
// });

export default router;
