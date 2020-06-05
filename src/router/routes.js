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
        component:Login
    },
    {
        path:'/Register',
        component:Register
    },
    {
        path:'/Search',
        component:Search
    },
]