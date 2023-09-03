<template>
    <div class="assetDynamics" v-if="RechargeLogTableObj">
        <div class="header">
            <div class="title"><p>资产动态</p></div>
            <div class="more" v-if="props.showToMoreButton">全部记录 ></div>
        </div>
        <el-table :data="RechargeLogList" :row-style="rowState" class="rechargeLogTable" >
            <el-table-column
                prop="currencyName" :label="RechargeLogTableObj.value.currencyName.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'currencyName')"
                :width="(RechargeLogTableObj.value.currencyName.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div class="currencyName">
                        <img :src="row.logo" alt="" class="logo">
                        <div class="name">{{ row.currencyName }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="type" :label="RechargeLogTableObj.value.type.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'type')"
                :width="(RechargeLogTableObj.value.type.width / TableTotalWidth * 100) + '%'">
            </el-table-column>
            <el-table-column
                prop="date" :label="RechargeLogTableObj.value.date.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'date')"
                :width="(RechargeLogTableObj.value.date.width / TableTotalWidth * 100) + '%'">
            </el-table-column>

            <el-table-column
                prop="status" :label="RechargeLogTableObj.value.status.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'status')"
                :width="(RechargeLogTableObj.value.status.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div :style="row.amount === '+0' ? 'color: #E4413C' : 'color: #06B99A' ">{{ row.status }}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="status" :label="RechargeLogTableObj.value.withdrawalStatus.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'withdrawalStatus')"
                :width="(RechargeLogTableObj.value.withdrawalStatus.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div :style="row.amount === '+0' ? 'color: #E4413C' : 'color: #06B99A' ">{{ row.withdrawalStatus }}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="balanceChange" :label="RechargeLogTableObj.value.balanceChange.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'balanceChange')"
                :width="(RechargeLogTableObj.value.balanceChange.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div :style="'color:' + getBalanceChangeColor(row.balanceChange)">{{ row.balanceChange }}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="withdrawalAmount" :label="RechargeLogTableObj.value.withdrawalAmount.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'withdrawalAmount')"
                :width="(RechargeLogTableObj.value.withdrawalAmount.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div :style="'color:' + getBalanceChangeColor(row.withdrawalAmount)">{{ row.withdrawalAmount }}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="amount" :label="RechargeLogTableObj.value.amount.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'amount')"
                :width="(RechargeLogTableObj.value.amount.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div :style="row.amount === '+0' ? 'color: #E4413C' : '' ">{{ row.amount }}</div>
                </template>
            </el-table-column>

            <el-table-column
                prop="balance" :label="RechargeLogTableObj.value.balance.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'balance')"
                :width="(RechargeLogTableObj.value.balance.width / TableTotalWidth * 100) + '%'">
            </el-table-column>
            <el-table-column
                prop="voucher" :label="RechargeLogTableObj.value.voucher.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'voucher')"
                :width="(RechargeLogTableObj.value.voucher.width / TableTotalWidth * 100) + '%'">
                <template #default="{ row }">
                    <div class="voucher">{{ row.voucher }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="progress" :label="RechargeLogTableObj.value.progress.label"
                v-if="props.RechargeLogTableShowList.find(e => e === 'progress')"
                :width="(RechargeLogTableObj.value.progress.width / TableTotalWidth * 100) + '%'">
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import moment from 'moment'
import {api} from "../../../utils/api";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {ElNotification} from "element-plus";
import {UserGetWalletLogListDTO} from "../../../utils/ResultDTO/UserGetWalletLogListDTO";

interface RechargeLog {
    currencyName: string;
    logo: string;
    date: string;
    withdrawalStatus: string;
    status: string;
    amount: string;
    balanceChange: string;
    voucher: string;
    progress: string;
    type: string;
    balance: number;
    withdrawalAmount: number;
}

const props = defineProps({
    showToMoreButton:{
        type: Boolean,
        default: false
    },
    RechargeLogTableShowList: {
        type: Array,
        default: ['currencyName', 'date']
    },
    Type: {
        type: Number,
        default: null
    }
})
const service = new api()
const RechargeLogList: UnwrapNestedRefs<RechargeLog[]> = reactive([])
const RechargeLogTableLabel = {
    currencyName: '币种',
    date: '时间',
    status: '状态',
    withdrawalStatus: '状态',
    amount: '充值金额',
    voucher: '交易凭证',
    progress: '进度',
    type: '类型',
    balanceChange: '收支明细',
    balance: '总资产',
    withdrawalAmount: '提币金额'
}
const RechargeLogTableObj = ref()
const TableTotalWidth = ref(0)
const WalletLogStatusList = {
    1: '等待確認',
    2: '入账成功',
    3: '入账失败'
}
const withdrawalStatusList = {
    1: '等待確認',
    2: '提币成功',
    3: '提币失败'
}
const WalletLogTypeList = {
    1: '充值',
    2: '提現',
    3: '質押',
    4: '解押',
    5: '购买'
}

const Init = () => {
    GetWalletLogList()
}
const GetWalletLogList = () => {
    const successFunc = (data: object) => {
        if(! data) return
        RechargeLogList.length = 0

        data['data'].forEach( (item: JSON) => {
            const Item: RechargeLog = {
                currencyName: item['name'],
                logo: item['logo'],
                date: moment(item['transactionTime']).format("YYYY-MM-DD HH:mm:ss"),
                status: WalletLogStatusList[item['status']],
                withdrawalStatus: withdrawalStatusList[item['status']],
                amount: "+" + item['changeAmount'],
                withdrawalAmount: item['changeAmount'],
                balanceChange: "+" + item['changeAmount'],
                voucher: item['hax'],
                progress: item['status'] === 1 ? '0/20' : '20/20',
                type: WalletLogTypeList[item['type']],
                balance: item['balance'],
            }
            RechargeLogList.push(Item)
        })

        RechargeLogTableObj.value = calColWidth(RechargeLogTableLabel, RechargeLogList)
    }

    const successError = (data: object) => {
        ElNotification({message: data['msg'], type: 'error'})
    }

    const data: UserGetWalletLogListDTO = {
        currencyId: null,
        type: <number>(props.Type),
        page: 1,
        limit: 5
    }
    service.UserGetWalletLogList(data, successFunc, successError)

}
function calColWidth(colLabel, tableData){
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = "18px Microsoft YaHei";
    return computed(() => {
        let res = {};
        for (let key in colLabel) {
            res[key] = {
                label: colLabel[key],
                width: context.measureText(colLabel[key]).width + 24
            };
        }
        TableTotalWidth.value = 0
        for (let i = 0; i < tableData.length; i++) {
            for (let key in colLabel) {
                const curContent = tableData[i][key] + '';
                const curWidth = context.measureText(curContent).width + 24;
                if (curWidth > res[key].width) {
                    res[key].width = curWidth;
                    TableTotalWidth.value += curWidth
                }
            }
        }

        if ('currencyName' in res) res['currencyName'].width += 30
        return res;
    })
}
const rowState = (arg) => {
    return {
        backgroundColor: arg.rowIndex % 2 === 1 ? '#131515' : '#0A0A0A',
        color: 'color: rgba(255,255,255,0.6)',
    }
}
const getBalanceChangeColor = (balance) => {
    if(balance === 0) {
        return '#3B6CFE'
    }else if(balance < 0){
        return '#06B99A'
    }else{
        return '#E4413C'
    }
}
Init()

defineExpose({ GetWalletLogList })
</script>

<style scoped lang="scss">

.assetDynamics {
    .header {
        display: flex;
        justify-content: space-between;

        .title {
            font-size: 1rem;
            border-left: 0.2rem solid #0DA88B;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei,serif;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 1.56rem;

            p {
                margin-left: 0.5rem;
            }
        }

        .more {
            font-size: 0.8rem;
            font-family: PingFang SC-Regular, PingFang SC,serif;
            font-weight: 400;
            color: #D0DBD9;
            line-height: 1.37rem;
            margin-right: 1%;
            cursor: pointer;
        }
    }
    :deep(.el-table) {
        --el-table-border-color: none !important;
        --el-table-row-hover-bg-color: none !important;
        --el-table-bg-color: #0A0A0A !important;
    }
    ::v-deep .el-table th {
        background-color: #131515 !important;
        font-size: 0.8rem;
        font-family: PingFang SC-Bold, PingFang SC,serif;
        font-weight: bold;
        color: rgba(255,255,255,0.7);
        line-height: 1.37rem;
    }
    ::v-deep .el-table td.el-table__cell, ::v-deep .el-table th.el-table__cell.is-leaf {
        border-bottom: none !important;
    }
    .rechargeLogTable {
        width: 100%;
        margin-top: 1rem;
        ::v-deep .el-table__header {
            width: 100% !important;
        }

        ::v-deep .el-table__body {
            width: 100% !important;
        }

        .voucher {
            text-decoration: underline;
        }

        .currencyName {
            display: flex;
            .logo {
                width: 25px;
                height: 25px;
            }
            .name {
                margin-left: 5px;
            }
        }

    }
}

</style>
