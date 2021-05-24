import { createRouter, createWebHistory } from "vue-router"
import index from '../view/index.vue'
import login from '../view/login.vue'
import register from '../view/register.vue'
import changepassword from '../view/changepassword.vue'
import detail from '../view/detail.vue'
import navbar from '../view/bar.vue'
import favourite from '../view/favourite.vue'
import search from '../view/search.vue'


const routes = [
    {
        path: "/",
        components: {
            default: index,
            nav: navbar
        }
    },
    {
        path:"/login",
        components:{
            default:login,
            nav: navbar
        }
    },
    {
        path:"/register",
        components:{
            default:register,
            nav: navbar
        }
    },
    {
        path:"/changepassword",
        components:{
            default:changepassword,
            nav: navbar
        }
    },
    {
        path: "/logout",
        component: () => import('../view/logout.vue')
      },
      {
          path:"/detail/:id",
          components:{
              default:detail,
              nav: navbar
          }
      },
      {
        path:"/favourite",
        components:{
            default:favourite,
            nav: navbar
        }
      },
      {
          path:"/search/:name",
          components:{
              default:search,
              nav:navbar
          }
      }
]


const router = createRouter({
    history: createWebHistory('/client/'),
    routes
  });
  
  export default router;
