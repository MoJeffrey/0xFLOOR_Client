<template>
    <div class="box">
        <!--首页展示-->
        <div class="home-box">
            <!--导航栏-->
            <user-navigation></user-navigation>
            <!--首页展示图-->
            <div class="animation">
                <div class="center-main">
                    <div class="title">您的WEB3 算力基地</div>
                    <div class="button" @click="toHome">前往基地</div>
                </div>

                <div class="bottom-main">
                    <div class="item">
                        <div class="text">
                            <div class="big-font">$500+</div>
                            <div class="small-font">Locked Volume</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="text">
                            <div class="big-font">10+</div>
                            <div class="small-font">Total Machines</div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="text">
                            <div class="big-font">5</div>
                            <div class="small-font">All Projects</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="details-box">
                <div class="item">
                    <div class="title">
                        <div class="text">自有数据中心</div>
                        <img class="logo"  alt="" src="/src/assets/img/index/item_1.png"/>
                    </div>
                    <div class="content">0xFLOOR拥有最大限度的网力控制能力，确保用
                        的服套餐安全定的运行。</div>
                </div>
                <div class="item content_item">
                    <div class="title">
                        <div class="text">自动化运维</div>
                        <img class="logo"  alt="" src="/src/assets/img/index/item_2.png"/>
                    </div>
                    <div class="content">通过自研程序可在第一时间发现服务器、网络等异
                        常、故障，并配备专业人员7*24小时快速处理。</div>
                </div>
                <div class="item">
                    <div class="title">
                        <div class="text">增值链上服务</div>
                        <img class="logo"  alt="" src="/src/assets/img/index/item_3.png"/>
                    </div>
                    <div class="content">提供热门项目的链上行为监控，为用户提供可靠的
                        决策依据。</div>
                </div>
            </div>
        </div>
        <!--底部-->
        <bottom-box />
    </div>
</template>

<script setup lang="ts">
import UserNavigation from '../components/navigation/user-navigation.vue'
import BottomBox from '../components/bottom/bottom-box.vue'
import { useRouter } from "vue-router";

const router = useRouter()

const toHome = () => {
    router.push('/user')
}

</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

.box {
    background-color: #fdfdfe;
    margin: 0 auto;
}
.home-box {
    background-color: #0f1746;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: space-around;
}
.animation {
    width: 100%;
    height: 50rem;
    background: url('../src/assets/img/homeBack.png') center top no-repeat;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: cover;

    .center-main {
        height: 80%;
        text-align: center;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        .title {
            font-size: 3rem;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei,serif;
            font-weight: bold;
            color: #FFFFFF;
        }

        .button {
            cursor: pointer;
            margin: 1rem auto;
            width: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(137deg, #06B99A 0%, #0DA88B 100%);
            border-radius: 3px;
            height: 3rem;
            font-size: 1.17rem;
            font-family: PingFang SC-Semibold, PingFang SC,serif;
            font-weight: 600;
            color: #FFFFFF;
        }
    }

    .bottom-main {
        height: 20%;
        width: 100%;
        background: rgba(0,0,0,0.8);
        opacity: 1;
        display: flex;
        flex-wrap: wrap;

        .item {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            .text {
                font-family: Inter-Regular, Inter,serif;
                font-weight: 400;
                color: #FFFFFF;
                text-align: center;

                .big-font {
                    font-size: 3rem;
                }

                .small-font {
                    font-size: 0.5rem;
                    color: rgba(255,255,255,0.5);
                }
            }
        }
    }
}

.details-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #000000;
    padding: 2rem;

    .item {
        flex: 1;
        padding: 1.5rem 2rem;
        border-radius: 5px;
        opacity: 1;
        border: 1px solid;
        border-image: linear-gradient(160deg, rgba(6, 185, 154, 1), rgba(6, 185, 154, 0)) 0.08 0.08;
        background: url("../src/assets/img/index/item_1_bg.png") center top no-repeat;
        background-size: 100% 100%;
        margin: 0 1rem;

        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .logo {
                width: 2.5rem;
                height: 2.5rem;
            }

            .text {
                font-size: 1rem;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
                font-weight: 400;
                color: #FFFFFF;
            }
        }

        .content {
            padding: 1rem 3.5rem 2rem 0;
            font-size: 0.5rem;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
            font-weight: 400;
            color: rgba(255,255,255,0.5);
        }
    }

    .content_item {
        background: url("../src/assets/img/index/item_2_bg.png") center top no-repeat;
        background-size: 100% 100%;
    }

}
.home {
    margin: 20px auto;
    padding: 46px 370px;
}

</style>
