<template>
    <UserMiningMachineDetails v-if="IsViewDetails"/>
    <div class="cloud-power-list-box" v-else>
        <div class="currency-tab-list">
            <div v-for="( item, index) in CurrencyList" :key="index" :class="item.selected ? 'tab selected': 'tab'" @click="CurrencySelect(item.id)">
                <img class="logo" :src="item.logo" alt="" />
                <div class="info">
                    <div class="name">{{ item.nickname }}</div>
                </div>
            </div>
        </div>

        <el-divider style="margin: auto auto; width: 80%;"/>
        <div class="info-box">
            <div class="item">
                <div class="title">总产出</div>
                <div class="info">{{ AllTotalRevenue }} {{ CurrencyName }}</div>
            </div>

            <div class="item">
                <div class="title">昨日产出</div>
                <div class="info">{{ previousAllTotalRevenue }} {{ CurrencyName }}</div>
            </div>

        </div>
        <el-divider style="margin: auto auto; width: 80%;"/>

        <div class="list-tab">
            <div class="orderId">机器编号</div>
            <div class="name">矿机</div>
            <div class="num">累计产出</div>
            <div class="status">状态</div>
            <div class="action">操作</div>
        </div>

        <div v-for="(item, index) in MinerList" :key="index" class="orderTable">
            <div class="orderId">{{ item.id }}</div>
            <div class="name">{{ item.name }}</div>
            <div class="num">{{ item.output }} {{ CurrencyName }}</div>
            <div class="action">{{ item.status }}</div>
            <div class="manage-button" @click="manageMiner(item.id)">管理</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../../utils/api";
import { UnwrapNestedRefs } from "@vue/reactivity";
import {UserCloudPowerListMinerListDTO} from "../../../utils/ResultDTO/UserCloudPowerListMinerListDTO";
import UserMiningMachineDetails from './user-mining-machine-details.vue'

const router = useRouter()
const service = new api()
const IsViewDetails = ref(false)
const previousAllTotalRevenue = ref(0)
const AllTotalRevenue = ref(0)
const CurrencyName = ref('')

const Init = () => {
    if (router.currentRoute.value.query.minerId){
        IsViewDetails.value = true
        return
    }

    GetCurrencyList()
}

interface Currency {
    id: number;
    nickname: string;
    logo: string;
    num: number;
    selected: boolean;
    totalOutput: number
}
interface Miner {
    id: string;
    orderId: string;
    name: string;
    output: string;
    status: string
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

const CurrencyList: UnwrapNestedRefs<Currency[]> = reactive([])
const GetCurrencyList = () => {
    const successFunc = (data: object) => {
        if(! data) return
        CurrencyList.length = 0

        data.forEach( (item: JSON) => {
            const Item: Currency = {
                id: item['currencyId'],
                nickname: item['nickname'],
                logo: item['imgUrl'],
                num: item['num'],
                totalOutput: item['totalOutput'],
                selected: false
            }
            CurrencyList.push(Item)
        })

        if (CurrencyList.length > 0) CurrencySelect(CurrencyList[0].id)
    }

    service.UserCloudPowerListCurrencyList(successFunc, () => {})
}
const MinerList: UnwrapNestedRefs<Miner[]> = reactive([])
const GetMinerList = (CurrencyId: number) => {

    const successFunc = (data: object) => {
        if(! data) return
        MinerList.length = 0

        data['MinerList'].forEach( (item: JSON) => {
            const Item: Miner = {
                id: item['MinerBindingId'],
                orderId: item['orderId'],
                name: item['name'],
                output: item['output'],
                status: MinerStatusList[item['miningStatusId']]
            }
            MinerList.push(Item)
        })

        previousAllTotalRevenue.value = data['previousAllTotalRevenue'] ? data['previousAllTotalRevenue'] : 0
        AllTotalRevenue.value = data['AllTotalRevenue']
    }

    const data: UserCloudPowerListMinerListDTO = {
        currencyId: CurrencyId
    }
    service.UserCloudPowerListMinerList(data, successFunc, () => {})
}

const CurrencySelect = (CurrencyId: number) => {
    CurrencyList.forEach((Item) => {
        if (Item.id != CurrencyId){
            Item.selected = false
            return
        }
        Item.selected = true
        GetMinerList(Item.id)
        CurrencyName.value = Item.nickname;
    })
}

const manageMiner = (minerId: string) => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    newQuery['minerId'] = minerId
    router.push({ query: newQuery}).then(()=> {
        IsViewDetails.value = true
    })
}

Init()

</script>

<style scoped lang="scss">
// 订单
.cloud-power-list-box {
    width: 100%;
    height: 786px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;

    .currency-tab-list {
        width: 100%;
        border-radius: 20px;
        display: flex;
        align-items: center;
        padding: 10px;
        flex-wrap: wrap;

        .selected {
            color: #ffffff;
            border-bottom: 4px solid #bb177e;
            border-radius: 2px;
            box-sizing: border-box;
        }

        .tab {
            display: flex;
            font-size: 16px;
            font-weight: 400;
            color: rgba(234, 219, 173, 0.6);
            cursor: pointer;
            padding: 5px;
            margin: 5px;
            width: 230px;

            .logo {
                height: 50px;
                width: 50px;
                margin: auto 10px;
                border-radius: 50px;
            }

            .info {
                display: inline-flex;
                justify-content: center;
                align-items: center;

                .name {
                    font-size: 24px;
                    margin: auto 10px;
                }
            }
        }

    }

    .info-box {
        width: 100%;
        height: 80px;
        color: #ffffff;
        padding: 0 100px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .item {


            .title {
                font-size: 20px;
            }

            .info {
                font-size: 28px;
            }
        }

    }

    .list-tab {
        width: 100%;
        height: 53px;
        background: rgba(242, 242, 242, 0.1);
        display: flex;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.8);
        line-height: 18px;
        padding: 0 5px;
        margin-top: 10px;

        .orderId {
            width: 150px;
        }
        .name {
            width: 200px;
        }
        .num {
            width: 150px;
        }
        .status {
            width: 100px;
        }
        .action {
            width: 50px;
        }
    }
    .orderTable {
        width: 100%;
        min-height: 53px;
        border-bottom: 1px solid rgba(234, 219, 173, 0.2);
        display: flex;
        align-content: center;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #eadbad;
        margin: 5px 0;
        padding: 0 5px;

        .orderId {
            width: 150px;
        }

        .name {
            width: 200px;
        }

        .num {
            width: 150px;
        }
        .status {
            width: 100px;
        }

        .manage-button {
            font-size: 18px;
            width: 80px;
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

</style>
