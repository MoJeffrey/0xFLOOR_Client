<template>
    <component v-if="IsToAction" :is="actionPageComponent"></component>
    <div class="user-asset-overview-box" v-else>
        <div class="top">
            <div class="totalAssetValuation_Box block">
                <div class="header">
                    <div class="title">
                        <p>总资产估值</p>
                    </div>
                    <div class="featuresList">
                        <div class="item focus" @click="toAction('UserAssetRecharge')">充币</div>
                        <div class="item" @click="toAction('UserAssetWithdrawals')">提币</div>
                    </div>
                </div>
                <div class="amount_item">
                    <p class="amount">349</p>
                    USDT &asymp;&nbsp;
                    <p class="exchangeRate">241</p>
                    USD
                    <p class="partition"></p>
                    +$
                    <p class="increase">12</p>
                    (+1%)
                </div>
                <div class="echarts" ref="EarningsRallyChart"></div>
            </div>
            <div class="assetDistribution_Box block">
                <div class="header">
                    <div class="title">
                        <p>资产分布</p>
                    </div>
                </div>
                <div class="main">
                    <div class="chart">
                        <div class="echarts" ref="CircleChart"></div>
                    </div>

                    <div class="currencyList">
                        <div class="currency_item" v-for="(item, index) in CurrencyList" :key="index">
                            <div class="detail">
                                <div class="colorIdentification" :style="'background: #' + item.color "></div>
                                <img class="logo" :src="item.logo"  alt=""/>
                                <div class="name">
                                    <div class="nickname">{{ item.nickname }}</div>
                                    <div class="fullName">{{ item.name }}</div>
                                </div>
                            </div>
                            <div class="amount">
                                <div class="num">{{ item.lumpSum.toFixed(3) }}</div>
                                <div class="unit">{{ item.nickname }}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="main">
            <AssetDynamics :RechargeLogTableShowList="RechargeLogTableShowList"/>
        </div>
    </div>


    <el-dialog v-model="CashOutDialogVisible" :title="CurrencyName + '提现' " :visible="CashOutDialogVisible">
        <div class="CashOutBox">
            <div class="text-justify">
                <div class="label">提现金额</div>
                <el-input-number v-model="CashOutAmount"></el-input-number>
            </div>
            <div class="text-justify">
                <div class="label">提现地址</div>
                <el-input v-model="CashOutAddress"></el-input>
            </div>
        </div>
        <template #footer>
            <el-button type="primary" @click="ConfirmCashOut">确定</el-button>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../../utils/api";
import { UnwrapNestedRefs } from "@vue/reactivity";
import {ElNotification} from "element-plus";
import {UserCashOutApplyDTO} from "../../../utils/ResultDTO/UserCashOutApplyDTO";
import {UserGetWalletListDTO} from "../../../utils/ResultDTO/UserGetWalletListDTO";
import UserAssetRecharge from "../asset/user-asset-recharge.vue";
import UserAssetWithdrawals from "../asset/user-asset-withdrawals.vue";
import AssetDynamics from "../asset/assetDynamics.vue";

const router = useRouter()
const service = new api()
const CurrencyName = ref('')
const TheCurrencyId = ref(0)
const EarningsRallyChart = ref()
const CircleChart = ref()
const IsToAction = ref(false)
const RechargeLogTableShowList = ['currencyName', 'type',  'status', 'date', 'balanceChange', 'balance']
let actionPageComponent = null
const actionPageList = {
    'UserAssetRecharge': {
        name: '充币',
        component: UserAssetRecharge
    },
    'UserAssetWithdrawals': {
        name: '提币',
        component: UserAssetWithdrawals
    },
}

const Init = () => {
    if (router.currentRoute.value.query.actionPageId){
        toAction(router.currentRoute.value.query.actionPageId)
        return
    }

    GetCurrencyList()

    setTimeout(()=> {
        RunEarningsRallyChart()
    }, 2000)
}

interface Currency {
    currencyId: number;
    name: string;
    nickname: string;
    logo: string;
    lumpSum: number;
    color: string;
}
interface Wallet {
    cashOut: number;
    freeze: number;
    balance: number;
    thaw: number;
}

const CurrencyList: UnwrapNestedRefs<Currency[]> = reactive([])
const GetCurrencyList = () => {
    const successFunc = (data: object) => {
        if(! data) return
        CurrencyList.length = 0

        data.forEach( (item: JSON) => {
            const Item: Currency = {
                currencyId: item['currencyId'],
                name: item['name'],
                nickname: item['nickname'],
                logo: item['imgUrl'],
                lumpSum: item['lumpSum'],
                color: item['color']
            }
            CurrencyList.push(Item)
        })

        RunCircleChart()
    }

    const data: UserGetWalletListDTO = {
        limit: 4
    }

    service.UserGetWalletList(data, successFunc, () => {})
}
const WalletInfo: UnwrapNestedRefs<Wallet> = reactive({
    cashOut: 0,
    freeze: 0,
    balance: 0,
    thaw: 0
})

/**
 * 提现
 */
const CashOutDialogVisible = ref(false)
const CashOutAmount = ref(0)
const CashOutAddress = ref('')
const clickCashOut = () => {
    if(WalletInfo.balance === 0) {
        ElNotification({message: '没有可提现的余额', type: 'error'})
        return
    }
    CashOutDialogVisible.value = true
}
const ConfirmCashOut = () => {
    if(CashOutAmount.value < 1){
        ElNotification({message: '提现金额不可少于1', type: 'error'})
        return
    }

    if(CashOutAmount.value > WalletInfo.balance){
        ElNotification({message: '提现金额不可大于余额！', type: 'error'})
        return
    }

    if(CashOutAddress.value === ""){
        ElNotification({message: '提现地址不可为空！', type: 'error'})
        return
    }

    const success = (data: object) => {
        ElNotification({message: '申请成功！', type: 'success'})
        // GetWallet(TheCurrencyId.value)
        CashOutDialogVisible.value = false
    }

    const data: UserCashOutApplyDTO = {
        amount: CashOutAmount.value,
        currencyId: TheCurrencyId.value,
        address: CashOutAddress.value
    }

    service.UserCashOutApply(data, success, () => {})
}

/**
 * 作图
 */
const RunEarningsRallyChart = () => {
    const my = echarts.init(EarningsRallyChart.value)
    const options = {
        grid: {
            left: 23,
            top: 30,
            right: 22,
            bottom: 10,
            containLabel: true
        },
        xAxis: {
            type: "category",
            axisLabel: { color: "#BDC4CA" },
            axisTick: { show: false },
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
        },
        yAxis: {
            type: "value",
            min: 0,
            minInterval: 20,
            nameLocation: "end",
            nameTextStyle: { color: "#BDC4CA", fontSize: "12" },
            axisLabel: { color: "#BDC4CA" },
            axisTick: { show: false },
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.56)",
                    type: 'dashed'
                }
            },
        },
        series: [
            {
                name: "实到",
                type: "line",
                symbolSize: 0, //折线拐点大小
                data: [60, 80, 100, 40, 49],//纵坐标值
                lineStyle: { color: "#0064FB", width: 2 },
                itemStyle: {
                    color: "#0064FB",
                },
                areaStyle: {
                    // 渐变填充色（线条下半部分）
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0064FB" },
                        { offset: 1, color: "#0064FB00" },
                    ])
                }
            },
            {
                name: "迟到",
                type: "line",
                symbolSize: 0, //折线拐点大小
                data: [40, 60, 30, 50, 100],//纵坐标值
                lineStyle: { color: "#06B99A", width: 2 },
                itemStyle: {
                    color: "#06B99A",
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#06B99A" },
                        { offset: 1, color: "#06B99A00" }
                    ])
                }
            }
        ]
    }
    my.setOption(options)
}
const RunCircleChart = () => {
    const my = echarts.init(CircleChart.value)
    const option = {
        color: [],
        series: [
            {
                type: "pie",
                radius: ['50%', '100%'],
                labelLine: { show: false},
                data: []
            }
        ]
    };

    for(const item of CurrencyList){
        option.color.push('#' + item.color)
        option.series[0].data.push(item.lumpSum)
    }

    my.setOption(option)
}

const toAction = (actionPageId) => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    newQuery['actionPageId'] = actionPageId
    router.push({ query: newQuery}).then(()=> {
        IsToAction.value = true
        actionPageComponent = actionPageList[actionPageId].component
    })
}

Init()

</script>

<style scoped lang="scss">

// 提现
.CashOutBox {
    .text-justify {
        flex-direction: row;
        display: flex;

        +.text-justify {
            margin-top: 20px;
        }

        .label {
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
.user-asset-overview-box {
    width: 100%;
    min-height: 100vh;
    background: #000000;

    .top {
        display: flex;
        width: 100%;
        justify-content: space-between;
        height: 25rem;

        .totalAssetValuation_Box {
            width: 49.5%;
            background: #0A0A0A;
            padding: 20px;
            border-radius: 5px;

            .amount_item {
                margin-top: 2.5rem;
                display: flex;
                font-size: 1rem;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
                font-weight: 400;
                color: rgba(255,255,255,0.56);
                line-height: 1.17rem;

                .amount {
                    font-size: 1.5rem;
                    font-family: Montserrat Alternates-SemiBold, Montserrat Alternates, serif;
                    font-weight: 600;
                    color: #06B99A;
                    line-height: 0.76rem;
                    margin-right: 0.2rem;
                }

                .exchangeRate {
                    font-size: 1.5rem;
                    font-family: Montserrat Alternates-SemiBold, Montserrat Alternates, serif;
                    font-weight: 600;
                    color: #BDC4CA;
                    line-height: 0.76rem;
                }
                .partition {
                    margin-left: 6.75rem;
                }
                .increase {
                    font-size: 1.5rem;
                    font-family: Montserrat Alternates-SemiBold, Montserrat Alternates, serif;
                    font-weight: 600;
                    color: #06B99A;
                    line-height: 1rem;
                }
            }

            .echarts {
                margin-top: 2rem;
                height: 70%;
                width: 100%;
            }
        }

        .assetDistribution_Box {
            width: 49.5%;
            background: #0A0A0A;
            padding: 20px;
            border-radius: 5px;

            .main {
                display: flex;
                margin-top: 2rem;
                width: 100%;
                height: 100%;
                .currencyList {
                    width: 60%;
                    height: 80%;

                    .currency_item {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: 1px solid rgba(189,196,202,0.07);
                        padding: 0.5rem;

                        .detail {
                            display: flex;
                            align-items: center;

                            .colorIdentification {
                                width: 0.83rem;
                                height: 0.83rem;
                                background: #0DA88B;
                                border-radius: 50%;
                            }

                            .logo {
                                margin-left: 1rem;
                                width: 3rem;
                                height: 3rem;
                                border-radius: 50%;
                            }

                            .name {
                                margin-left: 1rem;

                                .nickname {
                                    font-size: 1rem;
                                    font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
                                    font-weight: 400;
                                    color: rgba(255,255,255,0.8);
                                    line-height: 1.37rem;
                                }

                                .fullName {
                                    font-size: 0.5rem;
                                    font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
                                    font-weight: 400;
                                    color: rgba(255,255,255,0.6);
                                    line-height: 1.17rem;
                                }
                            }
                        }

                        .amount {
                            display: flex;
                            align-items: center;

                            .num {
                                font-size: 1.2rem;
                                font-family: DIN-Medium, DIN,serif;
                                font-weight: 500;
                                color: #FFFFFF;
                                line-height: 1.95rem;
                            }

                            .unit {
                                font-size: 0.5rem;
                                font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
                                font-weight: 400;
                                color: rgba(255,255,255,0.7);
                                line-height: 1.17rem;
                                margin-left: 0.2rem;
                            }
                        }
                    }
                }

                .chart {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40%;
                    height: 80%;
                    .echarts {
                        height: 80%;
                        width: 60%;
                    }
                }
            }
        }
    }

    .main {
        margin-top: 2rem;
    }
}
// 通用区块
.block {

    .header {
        display: flex;
        justify-content: space-between;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei,serif;
        color: #FFFFFF;

        .title {
            border-left: 0.2rem solid #0DA88B;
            font-size: 1.33rem;
            font-weight: bold;
            line-height: 1.56rem;

            p {
                margin-left: 0.5rem;
            }
        }

        .featuresList {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.17rem;

            .item {
                margin-right: 0.83rem;
                cursor: pointer;
            }

            .focus {
                background: #0DA88B;
                border-radius: 30px;
                padding: 0.33rem 1.25rem;
            }
        }
    }
}
</style>
