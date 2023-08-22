<template>
    <!--    个人中心-->
    <div class="user-box1">
        <user-navigation :id="3"></user-navigation>
        <!--背景层，不要删除，不然没有作用-->
        <div class="flow-box">
            <flow></flow>
            <div class="navs-box">
                <div class="title-box">
                    <p>电费单</p>
                    <div @click="returnBut">返回</div>
                </div>
                <div class="renewalBox1">
                    <div class="box-ren">
                        <p class="box-title">可续套餐</p>
                        <div class="boxRen-img">
                            <img
                                src="https://lanhu.oss-cn-beijing.aliyuncs.com/pslrr4y6qpqmq7gy2v5ax7pgb6fk6ythpfcc2def6-b4d9-4ead-99a4-3489673e4bb0"
                            />
                            <p>本次不需要电费</p>
                        </div>
                    </div>
                    <div class="box-ren">
                        <p class="box-title">优惠券</p>
                        <div class="couponBox1">
                            <div class="couponBox2">
                                <p>无可用优惠券</p>
                                <div>选择</div>
                            </div>
                            <p>订单摘要</p>
                        </div>
                        <div class="boxContent-Value">
                            <div class="valueBox">
                                <span>
                                    <p>支付数量:</p>
                                    <p>$0.00</p>
                                </span>
                                <span>
                                    <p>折扣:</p>
                                    <p>$0.00</p>
                                </span>
                                <span>
                                    <p>总计:</p>
                                    <p>$0.00</p>
                                </span>
                            </div>
                            <div class="pay">缴电费</div>
                            <div class="prompt">
                                如果您的套餐有任何处理中的电费订单或未结费用，电费自动
                                收费功能将不会执行。请按时付款，以免影响您的矿机共享服
                                务。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserNavigation from '../navigation/user-navigation.vue'
import Flow from './individual-flow.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const returnBut = () => {
    router.push('/user')
}
</script>

<style scoped lang="scss">
.item {
    margin-left: 20px;
}
.flow-box {
    /*设置宽高*/
    width: 100%;
    height: 100%;
    /*下面的属性是必须的*/
    position: relative;
    background: radial-gradient(
        200% 100% at bottom center,
        #f7f7b6,
        #e96f92,
        #75517d,
        #1b2947
    );
    background: radial-gradient(
        220% 105% at top center,
        #1b2947 10%,
        #75517d 40%,
        #e96f92 65%,
        #f7f7b6
    );
    background-attachment: fixed;
    overflow: hidden;
}
.user-box1 {
    width: 1920px;
    //height: 1080px;
    background-color: #fff;
    margin: 0 auto;
}
.navs-box {
    width: 100%;
    height: 100vh;
    background: linear-gradient(150deg, #291b40 1%, #4d2b58 40%, #b05d84 99%);
    padding: 26px 330px;
    box-sizing: border-box;
    margin: 0 auto;
    .title-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 10px;
        p {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #ffffff;
            line-height: 24px;
        }
        div {
            width: 80px;
            height: 40px;
            background: linear-gradient(90deg, #69ceae 0%, #81e790 100%);
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
.renewalBox1 {
    width: 100%;
    height: 80vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .box-ren {
        width: 592px;
        height: 683px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 25px;
        padding: 45px 55px;
        .box-title {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 24px;
        }
        .boxRen-img {
            //background-color: #6aceae;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 150px auto;
            p {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #cdcdcd;
                line-height: 88px;
            }
        }
    }
}
.couponBox1 {
    width: 100%;
    height: 164px;
    border-top: 1px solid rgba(234, 219, 173, 0.2);
    border-bottom: 1px solid rgba(234, 219, 173, 0.2);
    margin: 30px auto;
    padding: 30px 0px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 18px;
    }
}
.couponBox2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #eadbad;
        line-height: 18px;
    }
    div {
        width: 80px;
        height: 40px;
        background: linear-gradient(89deg, #999999 0%, #eeeeee 99%);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        line-height: 18px;
        cursor: pointer;
    }
}
.boxContent-Value {
    width: 100%;
    height: 360px;
    //background-color: #6aceae;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .valueBox {
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        span {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        p:nth-child(1) {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #eadbad;
            line-height: 18px;
        }
        p:nth-child(2) {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #fff;
            line-height: 18px;
        }
    }
}
.pay {
    width: 430px;
    height: 58px;
    background: linear-gradient(89deg, #999999 0%, #eeeeee 99%);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 18px;
    cursor: pointer;
}
.prompt {
    width: 377px;
    height: 62px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 24px;
    opacity: 0.6;
}
</style>
