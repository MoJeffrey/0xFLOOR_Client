import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/home_index.vue'
import Login from '../components/login/user-login.vue'
import Register from '../components/register/user-Register.vue'
import Navigation from '../components/navigation/user-navigation.vue'
import Bottom from '../components/bottom/bottom-box.vue'
import MobileHome from '../view/Mobile/Mobile-home.vue'
import User from '../components/user/Individual-center.vue'
import News from '../components/resources/news-resources.vue'
import ConfirmOrder from '../components/cloud-service/confirm-order.vue'
import OrderPay from '../components/cloud-service/order-pay.vue'
import Cloud from '../components/cloud-service/cloud-power.vue'
import FLOW from '../components/user/individual-flow.vue'
import Renewal from '../components/user/renewal-view.vue'


const route = createRouter({
    routes: [
        // PC端
        {
            path: '/',
            //路由到的地址(自定义)
            component: Home,
            //引入组件，组件Home.vue所在路径
            //Home.vue是需要路由的vue组件
            name: 'home',
            //首页
        },
        {
            // 导航栏组件
            path: '/navigation',
            component: Navigation,
            name: 'navigation',
        },
        {
            // 底部组件
            path: '/bottom',
            component: Bottom,
            name: 'bottom',
        },
        // 新闻资源
        {
            path: '/news',
            component: News,
            name: 'news',
        },
        {
            // 云服务
            path: '/cloud',
            component: Cloud,
            name: 'cloud',
        },
        {
            // 确认订单
            path: '/confirm-order',
            component: ConfirmOrder,
            name: 'confirmOrder',
        },
        {
            // 付款
            path: '/order-pay',
            component: OrderPay,
            name: 'orderPay',
        },
        {
            // 个人中心
            path: '/user',
            component: User,
            name: 'user',
        },
        {
            // 个人中心
            path: '/flow',
            component: FLOW,
            name: 'flow',
        },
        {
            // 登录
            path: '/login',
            component: Login,
            name: 'login',
        },
        {
            // 注册
            path: '/register',
            component: Register,
            name: 'register',
        },
        {
            // 手机端
            path: '/mobileHome',
            component: MobileHome,
            name: 'mobileHome',
        },
        {
            // 电费单
            path: '/renewal',
            component: Renewal,
            name: 'renewal',
        },
    ],
    history: createWebHistory(),
})
export default route
