<template>
    <div>
        <div class="nav">
            <div class="upperLevel" @click="ToBack">云算力</div>
            <div class="separation">/</div>
            <div class="text"> 矿机详情 订单号（{{ MinerInfo.orderId }}） </div>
        </div>

        <div class="main">
            <div class="orderInfo">
                <div class="item">
                    <span class="label">机器编号</span>
                    <span class="value">{{ minerId }}</span>
                </div>

                <div class="item">
                    <span class="label">机器</span>
                    <span class="value">{{ MinerInfo.Name }}</span>
                </div>

                <div class="item">
                    <span class="label">机器状态</span>
                    <span class="value">{{ MinerInfo.status }}</span>
                    <span class="explain">{{ MinerInfo.explain }}</span>
                </div>

                <div class="item">
                    <span class="label">有效时间</span>
                    <span class="value">{{ MinerInfo.effectiveTime === -999 ? '永久' :  MinerInfo.effectiveTime + '天'}}</span>
                </div>
            </div>

            <div class="tabBox">
                <div class="header">
                    <h3 class="font-medium">电力信息</h3>
                </div>

                <div class="content">
                    <div class="text-justify">
                        <div class="label">剩余电力</div>
                        <div class="value">{{ MinerInfo.electricity }} 天</div>
                    </div>

                    <div class="operate-list">
                        <div class="button" v-if="MinerInfo.status !== '已完成'" @click="clickElectricityRecharge">充值电力</div>
                        <div class="button" @click="ChangeMinerStatus(false)"
                             v-if="MinerInfo.status !== '已完成'
                             && MinerInfo.status !== '暂停中'
                             && MinerInfo.status !== '准备暂停中'">暂停</div>
                        <div class="button" @click="ChangeMinerStatus(true)"
                             v-if="MinerInfo.status !== '已完成'
                             && (MinerInfo.status === '暂停中'
                             || MinerInfo.status === '准备暂停中')">开启</div>
                    </div>

                </div>
            </div>

            <div class="tabBox">
                <div class="header">
                    <h3 class="font-medium">收益信息</h3>
                </div>

                <div class="content">
                    <div class="text-justify">
                        <div class="label">总收益</div>
                        <div class="value">{{ MinerInfo.TotalRevenue }} {{ PledgeInfo.Currency }}</div>
                    </div>
                    <div class="text-justify">
                        <div class="label">已工作天数</div>
                        <div class="value">{{ MinerInfo.workingDay }} 天</div>
                    </div>
                    <div class="text-justify">
                        <div class="label">平均收益</div>
                        <div class="value">{{ MinerInfo.workingDay === 0 ? 0 : MinerInfo.TotalRevenue / MinerInfo.workingDay }} {{ PledgeInfo.Currency }} / 天</div>
                    </div>
                    <div class="operate-list">
<!--                        <div class="button">查看收益情况</div>-->
                    </div>
                </div>
            </div>

            <div class="tabBox" v-if="PledgeInfo.Id !== 0">
                <div class="header">
                    <h3 class="font-medium">质押信息</h3>
                </div>

                <div class="content">
                    <div class="text-justify">
                        <div class="label">质押数量</div>
                        <div class="value">{{ PledgeInfo.PledgeNum }} {{ PledgeInfo.Currency}}</div>
                    </div>
                    <div class="text-justify">
                        <div class="label">收益比率</div>
                        <div class="value">{{ PledgeInfo.ProfitRatio }}%</div>
                    </div>
                    <div class="text-justify">
                        <div class="label">状态</div>
                        <div class="value">{{ PledgeInfo.status }}</div>
                    </div>

                    <div class="operate-list">
                        <div class="button" v-if="PledgeInfo.status === '未质押'" @click="clickPledge">质押</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <el-dialog v-model="PledgeDialogVisible" :title="'质押 '+ PledgeInfo.Currency" :visible="PledgeDialogVisible">
        <div>
            <div>
                需质押 {{ PledgeInfo.PledgeNum }} {{ PledgeInfo.Currency }}
            </div>
            <div>
                地址：{{ PledgeInfo.address }}
            </div>
            <div>
                已有金额： {{ PledgeInfo.Balance }} {{ PledgeInfo.Currency }}
            </div>
        </div>
        <template #footer>
            <el-button type="primary" @click="ConfirmPledge">确定质押</el-button>
        </template>
    </el-dialog>

    <el-dialog v-model="ElectricityRechargeDialogVisible" title="电力充值" :visible="ElectricityRechargeDialogVisible">
        <div class="ElectricityRechargeBox">
            <div class="select-list">
                <div :class="item.selected ? 'select-item selected' : 'select-item'" v-for="(item, index) in ElectricityOption" :key="index" @click="Change_ElectricityOption(item.id)">
                    <div class="round-hole"></div>
                    <div class="text">{{ item.name }}</div>
                </div>
            </div>
            <div class="other_days_input" v-if="ElectricityIsOther">
                <el-input-number v-model="ElectricityOtherNum" @change="change_ElectricityOtherNum"></el-input-number>
            </div>

            <div class="info">
                <div>
                    需要金额： {{ ElectricityNum * ElectricityBill }} USDT
                </div>
                <div>
                    地址：{{ USDTAddress }}
                </div>
                <div>
                    已有金额： {{ USDTBalance }} USDT
                </div>
                <div class="button" @click="clickRefreshBalance">刷新余额</div>
            </div>
        </div>
        <template #footer>
            <el-button type="primary" @click="ConfirmElectricityRecharge">确定充值</el-button>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../../utils/api";
import { UnwrapNestedRefs } from "@vue/reactivity";
import {UserMinerDetailsDTO} from "../../../utils/ResultDTO/UserMinerDetailsDTO";
import {UserMinerOpenOrStop} from "../../../utils/ResultDTO/UserMinerOpenOrStopDTO";
import {CloudGetProductDTO} from "../../../utils/ResultDTO/CloudGetProductDTO";
import {UserGetBalanceDTO} from "../../../utils/ResultDTO/UserGetBalanceDTO";
import {ElNotification} from "element-plus";
import {UserElectricityRechargeDTO} from "../../../utils/ResultDTO/UserElectricityRechargeDTO";

const router = useRouter()
const id = ref(1)
const service = new api()
const minerId: string = <string>router.currentRoute.value.query.minerId
const productId = ref(0)
const USDTBalance = ref(0)
const USDTAddress = ref('')

const Init = () => {
    GetMinerDetails()
}

interface MinerInfoDTO {
    orderId: string;
    Name: string;
    status: string;
    effectiveTime: number;
    electricity: number;
    TotalRevenue: number;
    workingDay: number;
}
const MinerInfo: UnwrapNestedRefs<MinerInfoDTO> = reactive({
    orderId: '',
    Name: '',
    status: '',
    effectiveTime: 0,
    electricity: 0,
    TotalRevenue: 0,
    workingDay: 0,
})

interface PledgeInfoDTO {
    Id: number;
    PledgeNum: number;
    ProfitRatio: number;
    Currency: string;
    status: string;
    address: string;
    Balance: number;
}
const PledgeInfo: UnwrapNestedRefs<PledgeInfoDTO> = reactive({
    Id: 0,
    PledgeNum: -1,
    ProfitRatio: 0,
    Currency: '',
    status: '无需质押',
    address: '',
    Balance: 0,
})

const PledgeDialogVisible = ref(false)
const clickPledge = () => {
    const successFunc = (data: object) => {
        PledgeInfo.address = data.address
        PledgeInfo.Balance = data.Balance

        PledgeDialogVisible.value = true
    }

    const data: UserMinerDetailsDTO = {
        MinerBindingId: minerId
    }
    service.UserMinerGetPledgeInfo(data, successFunc, () => {})
}

const ConfirmPledge = () => {
    const successFunc = (data: object) => {
        PledgeDialogVisible.value = false
        GetMinerDetails()
    }

    const data: UserMinerDetailsDTO = {
        MinerBindingId: minerId
    }

    service.UserMinerPledge(data, successFunc, () => {})

}

const MinerStatusList = {
    1: '等待上链',
    2: '等待质押',
    3: '待激活',
    4: '準備工作中',
    5: '工作中',
    6: '已完成',
    7: '暂停中',
    8: '准备暂停中',
    9: '维修中',
    10: '等待支付维修费',
}

const ChangeTimeFormatted = (time: string) => {
    function padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }
    const dateTime = new Date(time);
    return `${dateTime.getFullYear()}-${padZero(dateTime.getMonth() + 1)}-${padZero(dateTime.getDate())} ${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}:${padZero(dateTime.getSeconds())}`;
}

const GetMinerDetails = () => {

    const successFunc = (data: object) => {
        MinerInfo.orderId = data.orderId
        MinerInfo.Name = data.Name
        MinerInfo.status = MinerStatusList[data['miningStatusId']]
        MinerInfo.effectiveTime = data.effectiveTime
        MinerInfo.electricity = data.electricity
        MinerInfo.TotalRevenue = data.TotalRevenue
        MinerInfo.workingDay = data.workingDay
        productId.value = data['miningMachineProductId']

        PledgeInfo.PledgeNum = data.PledgeNum
        PledgeInfo.Id = data['pledgeProfitRatioId']
        PledgeInfo.ProfitRatio = data.ProfitRatio
        PledgeInfo.Currency = data.Currency

        const Pledge = data['Pledge']
        if(Object.keys(Pledge).length === 0) {
            PledgeInfo.status = PledgeInfo.PledgeNum === 0 ? '无需质押' : '未质押';
        }else {
            if(Pledge['type'] === 2) {
                if(Pledge['status'] === 0){
                    PledgeInfo.status = '质押确认中'
                }else if(Pledge['status'] === 1){
                    PledgeInfo.status = '已质押'
                }else{
                    PledgeInfo.status = '未质押'
                }
            }
        }

        GetProduct()
    }

    const data: UserMinerDetailsDTO = {
        MinerBindingId: minerId
    }
    service.UserMinerDetails(data, successFunc, () => {})
}

const GetProduct = () => {
    const success = (data: object) => {
        ElectricityBill.value = data.ElectricityBill
    }

    const data: CloudGetProductDTO = {
        productId: productId.value
    }

    service.CloudGetProduct(data, success, () => {})
}

const ToBack = () => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    delete newQuery['minerId']
    router.push({ query: newQuery}).then(()=>{
        router.go(0)
    })
}

const ChangeMinerStatus = (IsOpen: boolean) => {
    const successFunc = (data: object) => {
        GetMinerDetails()
    }

    const data: UserMinerOpenOrStop = {
        MinerBindingId: minerId,
        IsOpen: IsOpen
    }
    service.UserMinerOpenOrStop(data, successFunc, () => {})
}

const GetBalance = () => {
    const success = (data: object) => {
        USDTBalance.value = data['balance']
        USDTAddress.value = data['address']
    }

    const data: UserGetBalanceDTO = {
        CurrencyName: 'USDT'
    }

    service.UserGetBalance(data, success, () => {})
}

const clickRefreshBalance = () => {
    GetBalance()
}

/**
 * 电力
 */
const ElectricityBill = ref(0)
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
const ElectricityRechargeDialogVisible = ref(false)
const clickElectricityRecharge = () => {
    GetBalance()
    ElectricityRechargeDialogVisible.value = true
}
const ConfirmElectricityRecharge = () => {
    if(ElectricityNum.value < 1){
        ElNotification({message: '充值电力不能低于1天', type: 'error'})
        return
    }

    if(ElectricityNum.value * ElectricityBill.value > USDTBalance.value){
        ElNotification({message: '余额不足以支付！请充值后刷新再试！', type: 'error'})
        return
    }

    if((ElectricityNum.value > MinerInfo.effectiveTime - MinerInfo.electricity) && MinerInfo.effectiveTime !== -999){
        ElNotification({message: '充值的电力不能大于有效期！', type: 'error'})
        return
    }

    const success = (data: object) => {
        ElectricityRechargeDialogVisible.value = false
    }

    const data: UserElectricityRechargeDTO = {
        MinerBindingId: minerId,
        Num: ElectricityNum.value
    }

    service.UserElectricityRecharge(data, success, () => {})
}

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

            .operate-list {
                display: flex;
                margin-top: 10px;

                .button {
                    margin: 0 10px;
                    height: 40px;
                    color: #ffffff;
                    background: #34D1AB;
                    border-radius: 15px;
                    padding: 10px 22px;
                    cursor: pointer;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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

.ElectricityRechargeBox {
    .info {
        margin: 10px 0 0 0;

        .button {
            width: 100px;
            margin: 10px 0 0 10px;
            height: 30px;
            color: #ffffff;
            background: #34D1AB;
            border-radius: 15px;
            padding: 10px 22px;
            cursor: pointer;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
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
}

</style>
