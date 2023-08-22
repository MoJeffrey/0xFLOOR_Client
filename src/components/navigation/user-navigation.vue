<script setup lang="ts">
import { useRouter } from 'vue-router'
import {defineProps, ref} from 'vue'
import { User } from "../../utils/User";
import {api} from "../../utils/api";

const router = useRouter()
const props = defineProps({
    id: {
        type: Number,
        default: 0,
    },
})

const service = new api()
const user: User = new User()
const IsLogin: boolean = user.IsLogin()
const username = ref('')

const navList = {
    1: {
        name: '首页',
        url: '/'
    },
    2: {
        name: '服务器',
        url: '/cloud'
    }
}


// vue路由跳转
const navTab = (key: any) => {
    router.push(navList[key].url)
}

// 跳转登录
const userLogin = () => {
    router.push('/login')
}
const userRegister = () => {
    router.push('/register')
}
const userLogout = () => {
    const success = (data: JSON) => {
        router.push('/').then(()=>{ router.go(0)})
    }
    service.UserLogout(success, () => {})
}

const GetUserInfo = () => {
    const success = (data: JSON) => {
        if(username.value) return
        username.value = <string>user.getUserName()
    }
    if(! IsLogin) return

    service.UserGetInfo(success, ()=> {})

}

const init = () => {
    if(IsLogin) navList[3] = {
        name: '个人中心',
        url: '/user'
    }
}

init()
GetUserInfo()
</script>

<template>
    <div class="navigation">
        <img class="logo" src="../../assets/img/logo.png" alt="logo" @click="navTab(1)">
        <div class="navigation-user">
            <div class="Navigation-bar">
                <p v-for="(item, index) in navList" :key="index" class="nav" @click="navTab(index)">
                    {{ item.name }}
                </p>
            </div>

            <!--登录注册-->
            <div class="user">
                <div class="userButton" v-if="IsLogin">
                    <div class="login" >{{ username }}</div>
                    <div class="register" @click="userLogout">登出</div>
                </div>
                <div class="userButton" v-else>
                    <div class="login" @click="userLogin">登录</div>
                    <div class="register" @click="userRegister">
                        <div class="content">注册</div>
                    </div>
                </div>

                <div class="featureSheet">
                    <img class="item" src="../../assets/img/navigation/changeColor.png" alt="changeColor">
                    <img class="item" src="../../assets/img/navigation/sound.png" alt="sound">
                    <img class="item" src="../../assets/img/navigation/changeLanguage.png" alt="changeLanguage">
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.navigation {
    width: 100%;
    height: 5.33rem;
    background-color: #131515;
    display: flex;
    align-items: center;
    margin: 0 auto;
    padding: 0 20px;

    .logo {
        cursor: pointer;
        width: 15.5rem;
        height: 1.83rem;
        margin: 0 20px;
    }

    .navigation-user {
        display: flex;
        align-items: center;
        margin: 0 1rem;
        justify-content: space-between;
        width: 100%;
        font-family: PingFang HK-Regular, PingFang HK,serif;
        color: #FFFFFF;
        font-weight: 400;
        .Navigation-bar {
            display: flex;
            margin: 0 1rem;

            .nav {
                font-size: 1.17rem;
                line-height: 1.37rem;
                cursor: pointer;
                margin: 0 1rem;
            }
            .nav:hover {
                color: #eadbad;
                border-radius: 10px;
                padding: 0 10px;
                box-sizing: border-box;
                transition: all 0.3s ease;
            }
        }
        .user {
            display: flex;
            margin-right: 1rem;
            font-size: 1rem;
            font-weight: 400;

            .userButton{
                display: flex;

                .login {
                    margin: 0 0.5rem;
                    width: 3.33rem;
                    height: 1.67rem;
                    display: flex;
                    cursor: pointer;
                    justify-content: center;
                    align-items: center;
                    .content {
                        text-align: center;
                    }
                }

                .register {
                    margin: 0 1rem;
                    width: 3.33rem;
                    height: 1.67rem;
                    background: #0DA88B;
                    border-radius: 0.17rem 0.17rem 0.17rem 0.17rem;
                    cursor: pointer;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    .content {
                        text-align: center;
                    }
                }
            }


            .featureSheet {
                .item {
                    cursor: pointer;
                    margin: 0 0.5rem;
                }
            }
        }
    }
}

</style>
