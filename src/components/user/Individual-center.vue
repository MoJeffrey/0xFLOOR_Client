<template>
    <!--    个人中心-->
    <div class="userPage">
        <user-navigation :id="3"></user-navigation>
        <div class="main">
            <div class="left-navs-box">
                <div v-for="(item, index) in NavList" :key="index" :class="item.display ? 'item itemClick' : 'item' " @click="navChange(index)">
                    <img class="icon-circle" :src="item.logo" alt="icon" v-if="item.display"/>
                    <img class="icon-circle" :src="item.displayLogo" alt="icon" v-else/>
                    <div class="navs-name">{{ item.name }}</div>
                </div>
            </div>
            <div class="views">
                <component :is="displayComponent"></component>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import UserNavigation from '../navigation/user-navigation.vue'
import UserOrderList from './user-order-list.vue'
import UserAssetOverview from './asset/user-asset-overview.vue'
import UserLoginLogList from './user-login-log-list.vue'
import UserCloudPowerList from './cloudPower/user-cloud-power-list.vue'
import {reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../utils/api";

const router = useRouter()
const navId = ref(1)
const service = new api()

let displayComponent = UserAssetOverview
const NavList = {
    1: {
        name: '资产总览',
        logo: 'src/assets/img/user/navigation/assetOverview.png',
        displayLogo: 'src/assets/img/user/navigation/assetOverview_display.png',
        display: false,
        component: UserAssetOverview
    },
    2: {
        name: '我的服务器',
        logo: 'src/assets/img/user/navigation/myServer.png',
        displayLogo: 'src/assets/img/user/navigation/myServer_display.png',
        display: false,
        component: UserCloudPowerList
    },
    3: {
        name: '算力共享',
        logo: 'src/assets/img/user/navigation/computingPowerSharing.png',
        displayLogo: 'src/assets/img/user/navigation/computingPowerSharing_display.png',
        display: false,
        component: UserCloudPowerList
    },
    4: {
        name: '我的订单',
        logo: 'src/assets/img/user/navigation/myOrder.png',
        displayLogo: 'src/assets/img/user/navigation/myOrder_display.png',
        display: false,
        component: UserOrderList
    },
    7: {
        name: '登陆记录',
        logo: 'src/assets/img/user/navigation/assetOverview.png',
        displayLogo: 'src/assets/img/user/navigation/assetOverview_display.png',
        display: false,
        component: UserLoginLogList
    },
}

const Init = () => {
    const email: string = localStorage.getItem('email')
    if(! email){
        router.push('/login/')
        return
    }

    if (router.currentRoute.value.query.navId){
        navId.value = parseFloat(<string>router.currentRoute.value.query.navId)
    }
    navChange(navId.value)

}

const navChange = (Id) => {
    for (const key in NavList) {
        NavList[key].display = false
    }

    NavList[Id].display = true
    displayComponent = NavList[Id].component
    navId.value = Id
    router.push({ query: {'navId': Id}})
}


Init()
</script>

<style scoped lang="scss">
html, body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden; /* 防止页面滚动条出现 */
}

.userPage {
    width: 100%;
    min-height: 100vh;
    background-color: #0A0A0A;
    margin: 0 auto;

    .main {
        display: flex;

        .left-navs-box {
            width: 19.83rem;
            position: relative;
            align-items: center;
            padding: 3.25rem 0;
            box-sizing: border-box;
            cursor: pointer;
            justify-content: space-between;
            font-size: 1.17rem;
            font-family: PingFang SC-Regular, PingFang SC,serif;
            font-weight: 400;
            color: #FFFFFF;

            .itemClick {
                border-left: 0.2rem solid #0DA88B;
                border-radius: 2px;
            }

            .item {
                display: flex;
                align-items: center;
                margin: 20px auto;
                height: 4rem;
                padding: 0 4.17rem;

                .icon-circle {
                    width: 1.5rem;
                    height: 1.5rem;
                }
                .navs-name {
                    margin-left: 10px;
                    line-height: 1.37rem;
                }
            }
        }

        .views {
            margin-left: 40px;
            background-color: #000000;
            padding: 20px 20px;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }

    }
}

</style>
