<script setup lang="ts">
import UserNavigation from '../navigation/user-navigation.vue'
import { ref } from 'vue'
import { reactive } from 'vue';
import { api } from "../../utils/api";
import {useRouter} from "vue-router";
import {CloudGetProductDTO} from "../../utils/ResultDTO/CloudGetProductDTO";
import {User} from "../../utils/User";
import {CloudCreateOrderDTO} from "../../utils/ResultDTO/CloudCreateOrderDTO";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {ElNotification} from "element-plus";

const service = new api()
const user: User = new User()
const IsLogin: boolean = user.IsLogin()
const router = useRouter()

const id = ref(2)
const productQuantity = ref(1)
const productInfo = reactive({
    id: '',
    comboName: '',
    period: '',
    periodNum: 0,
    comboModelName: '',
    specification: '',
    name: '',
    price: '',
    ElectricityBill: '',
    pledgeStatus: false,
})
const GetProduct = () => {
    const success = (data: object) => {
        productInfo.id = data['miningMachineProductId']
        productInfo.comboName = data['comboName']
        productInfo.period = data['period']
        productInfo.comboModelName = data['comboModelName']
        productInfo.specification = data['specification']
        productInfo.name = data['name']
        productInfo.price = data['price']
        productInfo.ElectricityBill = data['ElectricityBill']
        productInfo.pledgeStatus = data['pledgeStatus']
        productInfo.periodNum = parseFloat(data['period'].slice(0, -1))

        data['PledgeProfitRatio'].forEach((Item) => {
            let Obj = {
                id: Item['pledgeProfitRatioId'],
                Num: Item['PledgeNum'],
                ProfitRatio: Item['ProfitRatio'],
                Currency: Item['Currency'],
                selected: false
            }
            PledgeProfitRatioList.push(Obj)
        })

        if(PledgeProfitRatioList.length > 0){
            Change_PledgeProfitRatio(PledgeProfitRatioList[0].id)
        }

    }

    const data: CloudGetProductDTO = {
        productId: parseFloat(<string>router.currentRoute.value.query.productId)
    }

    service.CloudGetProduct(data, success, () => {})
}

const PledgeProfitRatioId = ref(-999)
interface PledgeProfitRatio {
    id: number;
    Num: string;
    ProfitRatio: string;
    Currency: boolean;
    selected: boolean;
}
const PledgeProfitRatioList: UnwrapNestedRefs<PledgeProfitRatio[]> = reactive([])
const Change_PledgeProfitRatio = (Id) => {
    PledgeProfitRatioList.forEach((Item) => {
        if(Item.id !== Id){
            Item.selected = false
            return
        }

        PledgeProfitRatioId.value = Item.id
        Item.selected = true
    })
}

const ElectricityName = ref('10天')
const ElectricityIsOther = ref(false)
const ElectricityNum = ref(10)
const ElectricityOtherNum = ref(0)
const ElectricityOption = reactive([
    {
        id: 1,
        name: '10天',
        value: 10,
        selected: true
    },
    {
        id: 2,
        name: '20天',
        value: 20,
        selected: false
    },
    {
        id: 3,
        name: '30天',
        value: 30,
        selected: false
    },
    {
        id: 4,
        name: '其他',
        value: 10,
        selected: false
    }
])
const Change_ElectricityOption = (ElectricityOptionId) => {
    ElectricityIsOther.value = false
    ElectricityOtherNum.value = 0
    ElectricityOption.forEach((Item) => {
        if(Item.id !== ElectricityOptionId){
            Item.selected = false
            return
        }

        Item.selected = true
        ElectricityName.value = Item.name
        if(Item.name == '其他'){
            ElectricityIsOther.value = true
            Item.value = 0
            ElectricityName.value = '0天'
        }

        ElectricityNum.value = Item.value
    })
}
const change_ElectricityOtherNum = () => {
    ElectricityOption.forEach((Item) => {
        if(Item.name !== '其他') return
        ElectricityName.value = ElectricityOtherNum.value + '天'
        ElectricityNum.value = ElectricityOtherNum.value
    })
}

const confirmOrderButton = () => {

    const success = (data: object) => {
        router.push('/order-pay/?orderId=' + data['OrderId'])
    }

    const error = (data: object) => {
        ElNotification({message: data['msg'], type: 'error'})
    }

    const data: CloudCreateOrderDTO = {
        orderName: `${productInfo.name}(${productInfo.specification}/${productInfo.period}) + ${ElectricityName.value}电费`,
        pledgeProfitRatioId: PledgeProfitRatioId.value,
        orderItemList: [
            {
                id: <string>productInfo.id,
                num: productQuantity.value,
                type: 1
            },
            {
                id: "1",
                num: ElectricityNum.value * productQuantity.value,
                type: 2
            }
        ]
    }

    service.CloudCreateOrder(data, success, error)

}

const Init = () => {
    if(! IsLogin){
        router.push('/login/')
        return
    }
    if (! router.currentRoute.value.query.productId){
        router.push('/cloud')
        return;
    }

    GetProduct()
}
Init()
</script>

<template>
    <div class="user-box">
        <user-navigation :id="id"></user-navigation>
        <div class="confirm-order-box">

            <div class="left-box">
                <div class="title"> 确定订单</div>
                <div class="item-box">
                    <div class="title">缴电费</div>
                    <el-divider style="margin: 0 0"/>
                    <div class="select-box">
                        <div class="title">首次支付天数</div>
                        <div class="select-list">
                            <div :class="item.selected ? 'select-item selected' : 'select-item'" v-for="(item, index) in ElectricityOption" :key="index" @click="Change_ElectricityOption(item.id)">
                                <div class="round-hole"></div>
                                <div class="text">{{ item.name }}</div>
                            </div>
                        </div>
                        <div class="other_days_input" v-if="ElectricityIsOther">
                            <el-input-number v-model="ElectricityOtherNum" @change="change_ElectricityOtherNum"></el-input-number>
                        </div>

                    </div>
                    <div class="select-box">
                        <div class="title">后续支付方式</div>
                        <div class="select-list">
                            <div class="select-item selected">
                                <div class="round-hole"></div>
                                <div class="text">手动支付</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item-box" v-if="productInfo.pledgeStatus">
                    <div class="title">选择质押 {{ PledgeProfitRatioList[0].Currency }}</div>
                    <el-divider style="margin: 0 0"/>
                    <div class="select-box">
                        <div class="select-list" style="flex-wrap: wrap">
                            <div :class="item.selected ? 'select-item selected' : 'select-item'" v-for="(item, index) in PledgeProfitRatioList" :key="index" @click="Change_PledgeProfitRatio(item.id)">
                                <div class="round-hole"></div>
                                <div class="text">
                                    <div> {{ item.Num }}</div>
                                    <div> 收益 {{ item.ProfitRatio }}% </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item-box">
                    <div class="title">套餐信息</div>
                    <el-divider style="margin: 0 0"/>
                    <div class="input-box">
                        <div class="title">{{ productInfo.name }}</div>
                        <el-input-number v-model="productQuantity"></el-input-number>
                    </div>
                    <div class="details-box">
                        <div class="line">
                            <div class="item">套餐模式: {{ productInfo.comboModelName }}</div>
                            <div class="item middle">预计开始生效时间: 24小时</div>
                            <div class="item">商家</div>
                        </div>
                        <div class="line">
                            <div class="item">矿机规格: {{ productInfo.specification }}</div>
                            <div class="item middle">价格/T/天: {{ (productInfo.price *  productQuantity / productInfo.periodNum).toFixed(3) }}</div>
                            <div class="item">数量: {{ productQuantity }}</div>
                        </div>
                        <div class="line">
                            <div class="item">套餐周期: {{ productInfo.period }}</div>
                            <div class="item middle">价格单价: {{ productInfo.price }}</div>
                            <div class="item">小计: {{ productInfo.price *  productQuantity}}</div>
                        </div>
                    </div>

                    <div class="input-box">
                        <div class="title">用电{{ ElectricityName }}</div>
                    </div>
                    <div class="details-box">
                        <div class="line">
                            <div class="item">套餐模式: {{ productInfo.comboModelName }}</div>
                            <div class="item middle">预计开始生效时间: 24小时</div>
                            <div class="item">商家</div>
                        </div>
                        <div class="line">
                            <div class="item">矿机规格: {{ productInfo.specification }}</div>
                            <div class="item middle">价格/T/天: {{ productInfo.ElectricityBill }}</div>
                            <div class="item">数量: {{ productQuantity }}</div>
                        </div>
                        <div class="line">
                            <div class="item">套餐周期: {{ ElectricityName }}</div>
                            <div class="item middle">价格单价: {{ ElectricityNum * productInfo.ElectricityBill }}</div>
                            <div class="item">小计: {{ ElectricityNum * productInfo.ElectricityBill * productQuantity}}</div>
                        </div>
                    </div>
                </div>
                <div class="item-box">
                    <el-divider/>
                    <div class="pay-box">
                        <div class="">
                            <div class="title">现支持以下支付方式</div>
                            <div class="pay-item-list">
                                <div class="pay-item">
                                    <img class="logo" src="../../assets/img/USDT(TRC20).png" alt=""/>
                                    <div class="name">USDT (TRC20)</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="right-box">
                <div class="title">订单摘要</div>
                <el-divider style="margin: 0 0"/>
                <div class="product-list">
                    <div class="text">{{ productInfo.name }}</div>
                    <div class="line">
                        <div class="text">${{ productInfo.price }}</div>
                        <div class="text">x {{ productQuantity }}</div>
                    </div>

                    <div class="text">用电{{ ElectricityName }}</div>
                    <div class="line">
                        <div class="text">${{ ElectricityNum * productInfo.ElectricityBill }}</div>
                        <div class="text">x {{ productQuantity }}</div>
                    </div>
                </div>
                <el-divider style="margin: 0 0"/>
                <div class="billing-list">
                    <div class="cost-item">
                        <div class="text">套餐费：</div>
                        <div class="text">${{ productInfo.price *  productQuantity}}</div>
                    </div>
                    <div class="cost-item">
                        <div class="text">电费：</div>
                        <div class="text">${{ ElectricityNum * productInfo.ElectricityBill * productQuantity}}</div>
                    </div>
                    <div class="cost-item">
                        <div class="text">折扣：</div>
                        <div class="text">-$0.00</div>
                    </div>
                    <div class="cost-item">
                        <div class="text">总计：</div>
                        <div class="big-text">${{ (productInfo.price *  productQuantity) + ElectricityNum * productInfo.ElectricityBill * productQuantity}}</div>
                    </div>
                </div>

                <div class="buy-bottom" @click="confirmOrderButton">提交订单</div>
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
.confirm-order-box {
    width: 100%;
    background-color: #fdfdfe;
    padding: 26px 330px;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;

}

.right-box {
    width: 353px;
    height: 500px;
    background: #f2f2f2;
    border-radius: 20px;
    padding: 30px 30px;
    box-sizing: border-box;
    .title {
        font-size: 18px;
        font-weight: 400;
        color: #333333;
        line-height: 48px;
    }

    .product-list {
        padding: 10px;

        .text {
            font-size: 16px;
            margin-bottom: 10px;
        }

        .line {
            display: flex;
            justify-content: space-between;

            .text {
                font-size: 16px;
                margin-bottom: 10px;
            }
        }
    }

    .billing-list {
        padding: 10px;

        .cost-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .big-text {
                font-size: 18px;
            }
        }
    }

    .buy-bottom {
        font-size: 18px;
        width: 230px;
        height: 50px;
        color: #ffffff;
        background: #34D1AB;
        border-radius: 15px;
        padding: 10px 22px;
        margin: auto;
        cursor: pointer;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.left-box {
    width: 500px;
    height: 1000px;
    margin: 0 50px;
    background: #f2f2f2;
    border-radius: 20px;
    padding: 20px;
    .title {
        font-size: 24px;
        margin: 10px 20px;
        font-weight: bold;
    }

    .item-box {
        .title {
            font-size: 16px;
        }
        .select-box {

            padding: 10px;
            .title {
                font-size: 12px;
            }

            .select-list {
                display: flex;
                margin-left: 10px;

                .selected {
                    background: #FF0CAE;

                    .round-hole {
                        background: #ffffff;
                    }

                    .text {
                        color: #ffffff !important;
                    }
                }

                .select-item {
                    margin: 5px 10px;
                    border: 2px solid #F62DAE;
                    padding: 10px 0;
                    display: flex;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .round-hole {
                    width: 20px;
                    height: 20px;
                    margin: auto 0 auto 10px;
                    border: 2px solid #F62DAE;
                    border-radius: 50px;
                }

                .text {
                    margin: 0 10px;
                    font-size: 14px;
                }
            }

            .other_days_input {
                margin-top: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .input-box {
            padding: 5px;
            display: flex;
            justify-content: space-between;
            .title {
                font-size: 12px;
            }
        }

        .details-box {
            margin: 10px 20px;
            border: 2px solid #000000;
            border-radius: 20px;

            .line {
                margin: 20px;
                display: flex;

                .item {
                    width: 130px;
                }

                .middle {
                    width: 190px;
                }
            }
        }

        .pay-box {
            display: flex;
            justify-content: center;
            align-items: center;

            .title {
                font-size: 12px;
                text-align: center;
            }

            .pay-item-list {
                display: flex;
                justify-content: center;
                align-items: center;
                .pay-item {
                    display: flex;
                    margin: 0 10px;
                    .logo {
                        width: 50px;
                        height: 50px;
                    }
                    .name {
                        margin-left: 10px;
                        font-size: 16px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>
