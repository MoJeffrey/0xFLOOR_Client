<script setup lang="ts">
import UserNavigation from '../navigation/user-navigation.vue'
import {reactive, ref} from 'vue'
import {api} from "../../utils/api";
import {User} from "../../utils/User";
import {useRouter} from "vue-router";
import {CloudPaymentInfoDTO} from "../../utils/ResultDTO/CloudPaymentInfoDTO";
import {ElNotification} from "element-plus";
import {CloudConfirmPaymentDTO} from "../../utils/ResultDTO/CloudConfirmPaymentDTO";

const router = useRouter()
const service = new api()
const user: User = new User()
const IsLogin: boolean = user.IsLogin()
const id = ref(2)
const PaymentInfo = reactive(
    {
        id: '',
        price: 0,
        status: '',
        address: '',
        orderName: '',
        balance: 0,
        createTime: '',
    }
)

const Init = () => {
    if(! IsLogin){
        router.push('/login/')
        return
    }
    if (! router.currentRoute.value.query.orderId){
        router.push('/cloud')
        return;
    }

    GetPaymentInfo()
}

const GetPaymentInfo = () => {
    const success = (data: object) => {
        if(data['status'] !== '未支付'){
            ElNotification({message: '订单 ' + data['status'], type: 'error'})
            deferredPaymentBottom()
            return
        }

        PaymentInfo.id = data['orderId']
        PaymentInfo.status = data['status']
        PaymentInfo.orderName = data['orderName']
        PaymentInfo.createTime = data['createTime']
        PaymentInfo.balance = data['balance']
        PaymentInfo.address = data['address']
        PaymentInfo.price = data['price']
    }

    const error = (data: object) => {
        if(data['msg']){
            ElNotification({message: data['msg'], type: 'error'})
        }

        deferredPaymentBottom()
    }

    const data: CloudPaymentInfoDTO = {
        orderId: <string>router.currentRoute.value.query.orderId
    }

    service.CloudPaymentInfo(data, success, error)
}

const deferredPaymentBottom = () => {
    router.push('/user/?navId=3')
}

const confirmPaymentButton = () => {

    const success = (data: object) => {
        ElNotification({message: '付款成功', type: 'success'})
        router.push('/user/?navId=3')
    }

    const error = (data: object) => {
        if(data['msg']) ElNotification({message: data['msg'], type: 'error'})
        if(data['balance']) PaymentInfo.balance = data['balance']
    }

    const data: CloudConfirmPaymentDTO = {
        orderId: <string>router.currentRoute.value.query.orderId
    }

    service.CloudConfirmPayment(data, success, error)

}

const copy = (data) => {
    navigator.clipboard.writeText(data);
    ElNotification({message: '已复制', type: 'success'})
}

Init()
</script>

<template>
    <div class="user-box">
        <user-navigation :id="id"></user-navigation>
        <div class="main-box">
            <div class="left-box">
                <div class="top">
                    <div class="title">
                        <img class="logo" src="../../assets/img/USDT(TRC20).png" alt=""/>
                        <div class="text">USDT(ERC20) 付款</div>
                    </div>

                    <div class="timer">订单将于 00:00:00 过期， 请及时付款</div>
                </div>

                <el-divider style="margin: 5px"/>

                <div class="info-item">
                    <div class="title">应付 :</div>
                    <div class="info">
                        <div class="price">{{ PaymentInfo.price }} USDT(ERC20)</div>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDQuODEzYzAtLjk2Ny43NzctMS43NSAxLjczNS0xLjc1aDUuMzVjLjk1OSAwIDEuNzM2Ljc4MyAxLjczNiAxLjc1djcuNDM3YzAgLjk2Ni0uNzc3IDEuNzUtMS43MzYgMS43NWgtNS4zNUExLjc0MyAxLjc0MyAwIDAgMSAwIDEyLjI1VjQuODEyWm03LjA4NSAwaC01LjM1djcuNDM3aDUuMzVWNC44MTJaIiBmaWxsPSIjNDlCODgxIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjAzNyAxLjc1QzMuMDM3Ljc4NCAzLjgxMyAwIDQuNzcyIDBoNS4zNWMuOTU2IDAgMS43MzUuNzggMS43MzUgMS43NDh2Ny40MzhjMCAuOTYzLS43NzQgMS43NTItMS43MzUgMS43NTJoLS4xNDV2LTEuNzVoLjE0NGwuMDAxLS4wMDJWMS43NWgtNS4zNXYuMTQ2SDMuMDM3VjEuNzVaIiBmaWxsPSIjNDlCODgxIi8+PC9zdmc+"
                             class="copy-button" alt="" @click="copy(PaymentInfo.price)">
                    </div>
                </div>

                <div class="info-item">
                    <div class="title">收款地址 :</div>
                    <div class="info">
                        <p class="text">{{ PaymentInfo.address }}</p>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDQuODEzYzAtLjk2Ny43NzctMS43NSAxLjczNS0xLjc1aDUuMzVjLjk1OSAwIDEuNzM2Ljc4MyAxLjczNiAxLjc1djcuNDM3YzAgLjk2Ni0uNzc3IDEuNzUtMS43MzYgMS43NWgtNS4zNUExLjc0MyAxLjc0MyAwIDAgMSAwIDEyLjI1VjQuODEyWm03LjA4NSAwaC01LjM1djcuNDM3aDUuMzVWNC44MTJaIiBmaWxsPSIjNDlCODgxIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjAzNyAxLjc1QzMuMDM3Ljc4NCAzLjgxMyAwIDQuNzcyIDBoNS4zNWMuOTU2IDAgMS43MzUuNzggMS43MzUgMS43NDh2Ny40MzhjMCAuOTYzLS43NzQgMS43NTItMS43MzUgMS43NTJoLS4xNDV2LTEuNzVoLjE0NGwuMDAxLS4wMDJWMS43NWgtNS4zNXYuMTQ2SDMuMDM3VjEuNzVaIiBmaWxsPSIjNDlCODgxIi8+PC9zdmc+"
                             class="copy-button" alt="" @click="copy(PaymentInfo.address)">
                    </div>
                </div>

                <div class="button-list">
                    <div class="bottom" @click="confirmPaymentButton">确认付款</div>
                    <div class="bottom" @click="deferredPaymentBottom">延后付款</div>
                </div>
            </div>
            <div class="right-box">
                <div class="title"> 订单说明</div>
                <el-divider />
                <div class="info-item">
                    <div class="text">订单编号</div>
                    <div class="text">{{ PaymentInfo.id }}</div>
                </div>
                <div class="info-item">
                    <div class="text">订单</div>
                    <div class="text">{{ PaymentInfo.orderName }}</div>
                </div>
                <div class="info-item">
                    <div class="text">下单时间</div>
                    <div class="text">{{ PaymentInfo.createTime }}</div>
                </div>

                <div class="placeholder"></div>

                <div class="info-item">
                    <div class="text">订单金额</div>
                    <div class="text">{{ PaymentInfo.price }} USD</div>
                </div>
                <div class="info-item">
                    <div class="text">已有金额</div>
                    <div class="text">{{ PaymentInfo.balance }} USD</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.user-box {
    width: 1920px;
    //height: 1080px;
    background-color: #fff;
    margin: 0 auto;
}
.main-box {
    width: 1200px;
    background-color: #f2f2f2;
    margin: 50px auto;
    display: flex;
    border-radius: 20px;
    padding: 30px;
    justify-content: space-between;

    .left-box {
        width: 50%;

        .top {
            display: flex;
            justify-content: space-between;

            .title {
                display: flex;
                align-items: center;

                .logo {
                    height: 50px;
                    width: 50px;
                    margin: auto 10px;
                    border-radius: 50px;
                }
                .text {
                    font-size: 24px;
                }
            }

            .timer {
                display: flex;
                align-items: center;
                font-size: 16px;
            }
        }

        .info-item {
            margin-top: 30px;
            padding: 10px;
            .title {
                font-size: 28px;
            }

            .info {
                margin-top: 10px;
                padding: 10px;
                display: flex;
                justify-content: space-between;

                .price {
                    color: #ff4d51;
                    font-size: 24px;
                }

                .text {
                    width: 90%;
                    font-size: 24px;
                    word-wrap: break-word;
                }

                .copy-button {
                    width: 20px;
                    height: 30px;
                    cursor: pointer;
                }
            }
        }

        .button-list {
            display: flex;
            padding: 10px;
            .bottom {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 40px;
                color: #ffffff;
                background: #34D1AB;
                border-radius: 15px;
                margin: auto;
                cursor: pointer;
                font-size: 18px;
            }
        }
    }

    .right-box {
        width: 40%;
        border: 3px solid #000000;
        border-radius: 50px;
        padding: 10px;

        .title {
            margin-top: 20px;
            padding: 5px 20px;
            font-size: 24px;
        }

        .info-item {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            padding: 0 10px;
        }

        .placeholder {
            height: 60px;
        }
    }
}

</style>
