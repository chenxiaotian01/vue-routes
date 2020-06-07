import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Search from '../views/Search'

export default[
    {
        path:'/',
        component:Home
    },
    {
        path:'/Login',
        component:Login,
        meta:{
            isHideFooter:true
        }
    },
    {
        path:'/register',
        component:Register,
        meta:{
            isHideFooter:true
        }
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        props: route => ({keyword3:route.params.keyword,keyword4:route.query.keyword2})
    },
]