<template>
    <div>
        <div class="nav">
            <div class="upperLevel" @click="ToBack">订单</div>
            <div class="separation">/</div>
            <div class="text"> 订单详情 </div>
        </div>

        <div class="main">
            <div class="orderInfo">
                <div class="item">
                    <span class="label">订单时间</span>
                    <span class="value">{{ OrderInfo.createTime }}</span>
                </div>

                <div class="item">
                    <span class="label">订单ID</span>
                    <span class="value">{{ OrderInfo.orderId }}</span>
                </div>

                <div class="item">
                    <span class="label">订单状态</span>
                    <span class="value">{{ OrderInfo.status }}</span>
                    <span class="explain">{{ OrderInfo.explain }}</span>
                </div>
            </div>

            <div class="tabBox">
                <div class="header">
                    <h3 class="font-medium">产品信息</h3>
                </div>

                <div class="content">
                    <div class="details">
                        <div class="grid title">
                            <div class="item">产品名称</div>
                            <div class="item">产出类型</div>
                            <div class="item">数量</div>
                            <div class="item">交付时间</div>
                            <div class="item">价格/T/天</div>
                            <div class="item">总价</div>
                        </div>
                        <div class="grid" v-for="( item, index) in ProductList" :key="index">
                            <div class="item">{{ item.name }}</div>
                            <div class="item">{{ item.currency }}</div>
                            <div class="item">{{ item.num }}</div>
                            <div class="item">预计24小时内</div>
                            <div class="item">{{ item.dayPrice }}</div>
                            <div class="item">{{ item.price * item.num }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tabBox">
                <div class="header">
                    <h3 class="font-medium">支付信息</h3>
                </div>

                <div class="content">
                    <div class="text-justify">
                        <div class="label">訂單金額</div>
                        <div class="value">${{ PaymentInfo.price }}</div>
                    </div>
                    <div class="text-justify">
                        <div class="label">支付幣種</div>
                        <div class="value">{{ PaymentInfo.PaymentType }}</div>
                    </div>
                    <div class="text-justify">
                        <div class="label">支付方式</div>
                        <div class="value">区块链转账支付</div>
                    </div>
                    <div class="text-justify" v-if="OrderInfo.status !== '发生错误' && OrderInfo.status !== '已取消'">
                        <div class="label">支付狀態</div>
                        <div class="value">
                            {{ PaymentInfo.OrderStatus }}
                            <span class="link" @click="ToConfirmationUrl(PaymentInfo.confirmationUrl)" v-if="PaymentInfo.confirmationUrl">查看确认状态</span>
                            <span class="link" @click="ToPay" v-if="PaymentInfo.OrderStatus === '未支付'">去支付</span>
                        </div>
                    </div>
                    <div class="text-justify" v-if="OrderInfo.status === '已支付'">
                        <div class="label">确认时间</div>
                        <div class="value">{{ PaymentInfo.createTime }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../utils/api";
import { UnwrapNestedRefs } from "@vue/reactivity";
import {UserCloudPowerListMinerListDTO} from "../../utils/ResultDTO/UserCloudPowerListMinerListDTO";
import {UserOrderDetailsDTO} from "../../utils/ResultDTO/UserOrderDetailsDTO";

const router = useRouter()
const id = ref(1)
const service = new api()
const orderId: string = <string>router.currentRoute.value.query.orderId

const Init = () => {
    GetOrderDetails()
}

interface OrderInfoDTO {
    orderId: string;
    explain: string;
    status: string;
    createTime: string;
}
interface ProductInfoDTO {
    name: string;
    currency: string;
    dayPrice: string;
    num: number;
    price: number;
}
interface PaymentInfoDTO {
    OrderStatus: string;
    PaymentType: string;
    confirmationUrl: string;
    createTime: string;
    price: string;
}

const OrderInfo: UnwrapNestedRefs<OrderInfoDTO> = reactive({
    orderId: '',
    explain: '',
    status: '',
    createTime: '',
})
const PaymentInfo: UnwrapNestedRefs<PaymentInfoDTO> = reactive({
    OrderStatus: '',
    PaymentType: '',
    confirmationUrl: '',
    createTime: '',
    price: '',
})
const ProductList: UnwrapNestedRefs<ProductInfoDTO[]> = reactive([])

const ChangeTimeFormatted = (time: string) => {
    function padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }
    const dateTime = new Date(time);
    return `${dateTime.getFullYear()}-${padZero(dateTime.getMonth() + 1)}-${padZero(dateTime.getDate())} ${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}:${padZero(dateTime.getSeconds())}`;

}

const ToConfirmationUrl = (url:string) => {
    window.open(url, '_blank');
}
const ToPay = () => {
    router.push('/order-pay/?orderId=' + orderId)
}


const GetOrderDetails = () => {

    const successFunc = (data: object) => {
        OrderInfo.orderId = data['orderInfo'].orderId

        OrderInfo.status = data['orderInfo'].status
        OrderInfo.createTime = ChangeTimeFormatted(data['orderInfo'].createTime)

        if(data['orderInfo'].explain){
            const explain = data['orderInfo'].explain.split("|")
            OrderInfo.explain = explain[explain.length - 1]
        }

        PaymentInfo.OrderStatus = data['paymentInfo'].OrderStatus === '未支付' ? '未支付' : '已支付'
        PaymentInfo.OrderStatus = data['paymentInfo'].OrderStatus === '支付中' ? '确认中' : PaymentInfo.OrderStatus
        PaymentInfo.PaymentType = '$USDT(TRC20)'
        PaymentInfo.confirmationUrl = data['paymentInfo'].confirmationUrl
        PaymentInfo.createTime = data['paymentInfo'].createTime ? ChangeTimeFormatted(data['paymentInfo'].createTime) : ''
        PaymentInfo.price = data['paymentInfo'].price

        ProductList.length = 0
        data['productList'].forEach((item: JSON) => {
            if(item['name'] === '电费') {
                if (ProductList.length === 1){
                    const machineProduct = ProductList[0]

                    const product: ProductInfoDTO = {
                        name: <string>(item['num'] / machineProduct['num']) + '天' + item['name'],
                        currency: machineProduct['currency'],
                        dayPrice: item['price'].toFixed(4) ,
                        num: machineProduct['num'],
                        price: item['price'] * (item['num'] / machineProduct['num'])
                    }

                    ProductList.push(product)
                }else{
                    const product: ProductInfoDTO = {
                        name: '矿机[' + item['initiationAssociateId'] + '] 电费',
                        currency: '-',
                        dayPrice: item['price'] ,
                        num: item['num'],
                        price: item['price']
                    }
                    ProductList.push(product)
                }

            }else {
                const product: ProductInfoDTO = {
                    name: item['name'],
                    currency: item['currency'],
                    dayPrice: item['day'] == '永久'? '---' : "$" + <string>(item['price'] / item['day']).toFixed(4),
                    num: item['num'],
                    price: item['price']
                }
                ProductList.push(product)
            }

        })
    }

    const data: UserOrderDetailsDTO = {
        orderId: orderId
    }
    service.UserOrderDetails(data, successFunc, () => {})
}

const ToBack = () => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    delete newQuery['orderId']
    router.push({ query: newQuery}).then(()=>{
        router.go(0)
    })

}

Init()

</script>

<style scoped lang="scss">

// 订单详情
.main {
    color: #eadbad;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 10px;
    border-radius: 5px;

    .orderInfo {
        display: flex;
        padding: 30px 30px 0;
        flex-direction: row;

        .item  {
            min-width: 180px;
            display: flex;
            flex-direction: column;

            .label {
                font-size: 14px;
                color: rgba(234, 219, 173, 0.6);
            }

            .value {
                margin-top: 8px;
                font-size: 15px;
                line-height: 40px;
            }

            .explain {
                color: #f76b1c;
                font-size: 14px;
                font-weight: 400;
                line-height: 1.2;
            }
        }
    }

    .tabBox {
        margin-top: 20px;
        padding: 30px 30px 0;

        .header {
            border-bottom: 1px solid #e8e8e8;

            .font-medium {
                position: relative;
                display: inline-block;
                font-size: 15px;
                padding-bottom: 10px;
                margin-bottom: -1px;
                font-weight: 500;
                font-family: Roboto-Medium,sans-serif;
            }
            .font-medium::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(143.96deg,#36d0ac 22.43%,#60f770 134.97%);
            }

        }

        .content {
            padding: 20px 0;

            .wrap {
                overflow: visible;
                margin-right: 0;
                width: fit-content;
                cursor: default;
                font-size: 14px;
                margin-bottom: 12px;
                display: flex;
                align-items: center;
                margin-left: 8px;
            }

            .details {
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid #eee;

                .grid {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
                    text-align: center;
                    font-size: 13px;
                    padding: 0 10px;

                    .item {
                        text-align: left;
                        justify-content: left;
                        padding: 12px 10px;
                        line-height: 1.2;
                    }
                    +.grid {
                        border-top: 1px solid #f2f2f2;
                    }
                }

                .title {
                    color: #999;
                    background: #f9fafb;
                    border-top: none;

                    .item {
                        padding: 0 10px;
                        min-height: 40px;
                        display: flex;
                        align-items: center;
                    }
                }
            }

            .text-justify {
                flex-direction: row;
                display: flex;

                +.text-justify {
                    margin-top: 20px;
                }

                .label {
                    color: rgba(234, 219, 173, 0.6);
                    font-size: 14px;
                    min-width: 130px;
                    line-height: 18px;
                }

                .value {
                    margin-top: 0;
                    margin-left: 16px;
                    font-size: 15px;
                    line-height: 1.2;

                    .link {
                        display: inline;
                        margin: 0 0 0 12px;
                        cursor: pointer;
                        color: #49b881;
                    }

                    .link:hover {
                        text-decoration: underline;
                        text-underline-offset: 4px;
                    }
                }
            }
        }
    }
}
.nav {
    width: max-content;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;

    .upperLevel {
        color: #eadbad;
        cursor: pointer;
    }
    .upperLevel:hover {
        text-decoration: underline;
    }

    .separation {
        color: #ffffff;
        margin-left: 10px;
    }

    .text {
        color: rgba(234, 219, 173, 0.6);
        margin-left: 10px;
    }
}

</style>
