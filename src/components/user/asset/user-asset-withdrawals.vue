<template>
    <WithdrawalManagement v-if="IsWithdrawalManagement" @comeBack="WithdrawalManagementDisplayChange" :CurrencyList="deepCopy(CurrencyList)" :WithdrawalNetworkList="deepCopy(WithdrawalNetworkList)"/>
    <div class="user-asset-withdrawals-box" v-else>
        <div class="top">
            <div class="comeback" @click="ToBack">
                <svg t="1692403200498" class="icon" viewBox="0 0 1366 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3483" width="200" height="200">
                    <path d="M450.922842 24.950479 24.993146 450.88318C-8.27416 484.150485-8.27416 538.087396 24.993146 571.354702L450.922841 997.284395C484.190146 1030.54569 538.127057 1030.54569 571.394362 997.284395 604.664673 964.017092 604.664673 910.077175 571.394362 876.812877L290.882159 596.303677 1277.833259 596.303677C1324.882304 596.303677 1363.020996 558.16498 1363.020996 511.115934 1363.020996 464.066888 1324.885308 425.928191 1277.833259 425.928191L290.882159 425.928193 571.391357 145.418994C588.02501 128.785341 596.343339 106.982786 596.343339 85.186239 596.343339 63.386687 588.028015 41.584131 571.394362 24.950479 538.124052-8.316826 484.193152-8.316826 450.922842 24.950479L450.922842 24.950479Z" p-id="3484" fill="#0DA88B"></path>
                </svg></div>
            <div class="title">提币</div>
        </div>
        <div class="main">
            <div class="detailed">
                <div class="item">
                    <div class="label">选择币种</div>
                    <div class="currencySelect">
                        <div class="currencySelected">
                            <img :src="SelectedInfo.logo" class="logo" alt="">
                            <div class="name">{{ SelectedInfo.name }}</div>
                        </div>

                        <el-select class="select" v-model="SelectedInfo.currencyId" @change="changeCurrency">
                            <el-option v-for="(item, index) in CurrencyList" :key="index" class="select_item" :value="item.currencyId">
                                <img :src="item.logo" alt="" class="logo">
                                {{ item.name }}
                            </el-option>
                        </el-select>
                    </div>

                </div>
                <div class="item">
                    <div class="label">选择转账网络</div>
                    <el-select class="select" v-model="SelectedInfo.networkId" @change="changeNetwork">
                        <el-option v-for="(item, index) in SelectedInfo.NetworkList" :key="index" class="select_item" :value="item.currencyNetworkId" :label="item.name"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div class="label">
                        <div class="left_text">提币地址</div>
                        <div class="right_text" @click="WithdrawalManagementDisplayChange">地址管理</div>
                    </div>
                    <div class="address">
                        <el-select class="select" v-model="SelectedInfo.withdrawalAddressId" @change="changeWithdrawalAddress">
                            <el-option v-for="(item, index) in SelectedInfo.WithdrawalsAddressList" :key="index" class="select_item" :value="item.WithdrawalAddressId" :label="item.text"></el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="label">提币数量</div>
                    <div class="input">
                        <div class="text">
                            <el-input class="inputNum_box" type="number" placeholder="请输入提币数量" v-model="SelectedInfo.withdrawalNum">{{ SelectedInfo.address }}</el-input>
                        </div>

                        <div class="inputAll" @click="inputAll()">全部</div>
                    </div>
                    <div class="prompt">
                        <div class='left_text'>
                            <svg t="1692393919570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1944" width="200" height="200">
                                <path d="M512 128c212.064 0 384 171.936 384 384s-171.936 384-384 384S128 724.064 128 512 299.936 128 512 128z m0 64C335.296 192 192 335.296 192 512s143.296 320 320 320 320-143.296 320-320S688.704 192 512 192z m6.848 429.728a48 48 0 1 1 0 96 48 48 0 0 1 0-96zM516.576 320a32 32 0 0 1 32 32v182.848a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z" fill="#cdcdcd" p-id="1945"></path>
                            </svg>
                            <div class="text">最小单笔提现数量：{{ SelectedInfo.minimumWithdrawal }} {{ SelectedInfo.name }}</div>
                        </div>
                        <div class="right_text">
                            可用余额：<p class="num"> {{ SelectedInfo.balance }}</p> &nbsp;{{ SelectedInfo.name }}
                        </div>
                    </div>
                </div>
                <div class="exegesis">
                    <div class="title">温馨提示</div>
                    <div class="item">· 24h提现额度:0.00381004/50000 USDT</div>
                    <div class="item">· 请注意：若单笔提现金额不得小于10USDT将无法入账。由此若造成您的资产损失，平台将不予处理，感谢您的理解与支持！</div>
                </div>
                <div class="confirmWithdrawals" @click="openWithdrawalsConfirmDialog">确认提交</div>
            </div>
            <div class="currencyList_box">
                <el-table :data="CurrencyList" :row-style="rowState" class="currencyListTable" >
                    <el-table-column prop="name" label="币种">
                        <template #default="{ row }">
                            <div class="currencyName">
                                <img :src="row.logo" alt="" class="logo">
                                <div class="name">{{ row.name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="balance" label="余额"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="bottom">
            <AssetDynamics ref="AssetDynamicsRef" :showToMoreButton="true" :RechargeLogTableShowList="RechargeLogTableShowList" :Type="2"/>
        </div>
    </div>

    <el-dialog v-model="WithdrawalsConfirmDialogVisible" title="&nbsp;安全验证" :visible="WithdrawalsConfirmDialogVisible" class="WithdrawalsConfirm_box">
        <div class="main">
            <div class="header">
                <svg t="1692393919570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1944" width="200" height="200">
                    <path d="M512 128c212.064 0 384 171.936 384 384s-171.936 384-384 384S128 724.064 128 512 299.936 128 512 128z m0 64C335.296 192 192 335.296 192 512s143.296 320 320 320 320-143.296 320-320S688.704 192 512 192z m6.848 429.728a48 48 0 1 1 0 96 48 48 0 0 1 0-96zM516.576 320a32 32 0 0 1 32 32v182.848a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z" fill="#cdcdcd" p-id="1945"></path>
                </svg>
                请确保以下资料正确
            </div>
            <div class="body">
                <div class="info">
                    <div class="item">
                        <div class="label">网络</div>
                        <div class="value">
                            <div class="prompt">请检查提币网络是否与接收平台匹配</div>
                            &nbsp;
                            {{ SelectedInfo.name }}-{{ SelectedInfo.networkName }}
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">地址名称</div>
                        <div class="value">
                            <p class="highlight">{{ SelectedInfo.withdrawalsAddressNotes }}</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="label">地址</div>
                        <div class="value">{{ SelectedInfo.withdrawalsAddress }}</div>
                    </div>
                    <div class="item">
                        <div class="label">数量</div>
                        <div class="value"><div class="highlight">{{ SelectedInfo.withdrawalNum }}</div> &nbsp;{{ SelectedInfo.name }}</div>
                    </div>
                    <div class="item">
                        <div class="label">手续费</div>
                        <div class="value"><div class="highlight">0</div> &nbsp;{{ SelectedInfo.name }}</div>
                    </div>
                </div>
                <el-button type="primary" @click="confirmWithdrawals" class="confirm_button">确定</el-button>
            </div>
            <div class="bottom">
                <div class="title">
                    溫馨提示
                </div>
                <div class="item">欧易 官方在任何情况下都不会要求您向某一账户转账，也不会向您索要验证码。</div>
                <div class="item">请勿参与代买、洗钱、非法集资等违法行为，谨防网络诈骗。</div>
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {api} from "../../../utils/api";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {ElNotification, ElLoading} from "element-plus";
import {UserGetConfirmRechargeDTO} from "../../../utils/ResultDTO/UserGetConfirmRechargeDTO";
import AssetDynamics from "../asset/assetDynamics.vue";
import WithdrawalManagement from "../asset/withdrawal-management.vue";

interface RechargeNetwork {
    name: string;
    currencyId: number;
    currencyNetworkId: number
}
interface Currency {
    currencyId: number;
    name: string;
    nickname: string;
    logo: string;
    address: string;
    minimumWithdrawal: number;
    balance: number;
}
interface WithdrawalsAddress {
    WithdrawalAddressId: number;
    currencyId: number;
    currencyNetworkId: number;
    text: string;
    notes: string;
    address: string;
}

const router = useRouter()
const IsWithdrawalManagement = ref(false)
const WithdrawalsConfirmDialogVisible = ref(false)
const service = new api()
const AssetDynamicsRef = ref<any>()
const CurrencyName = ref('')
const SelectedInfo = ref({
    logo: '',
    name: '',
    address: '',
    currencyId: 1,
    networkId: 1,
    networkName: '',
    withdrawalAddressId: 1,
    withdrawalsAddress: '',
    withdrawalsAddressNotes: '',
    minimumWithdrawal: 1,
    balance: 1,
    withdrawalNum: 1,
    NetworkList: [] as RechargeNetwork[],
    WithdrawalsAddressList: [
        {
            WithdrawalAddressId: 1,
            currencyId: 1,
            currencyNetworkId: 1,
            text: '测试'
        }
    ] as WithdrawalsAddress[]
})
const RechargeLogTableShowList = ['currencyName', 'date', 'withdrawalStatus', 'withdrawalAmount', 'voucher', 'progress']
const Init = () => {
    GetWithdrawalsInfo()
}

const WithdrawalNetworkList: UnwrapNestedRefs<RechargeNetwork[]> = reactive([])
const WithdrawalsAddressList: UnwrapNestedRefs<WithdrawalsAddress[]> = reactive([])
const CurrencyList: UnwrapNestedRefs<Currency[]> = reactive([])

const GetWithdrawalsInfo = () => {
    const successFunc = (data: object) => {
        if(! data) return
        data['currency'].forEach( (item: JSON) => {
            const Item: Currency = {
                currencyId: item['currencyId'],
                name: item['name'],
                nickname: item['nickname'],
                logo: item['logo'],
                address: item['address'],
                minimumWithdrawal: item['minimumWithdrawal'],
                balance: item['balance'],
            }
            CurrencyList.push(Item)
        })

        data['network'].forEach( (item: JSON) => {
            const Item: RechargeNetwork = {
                currencyNetworkId: item['currencyNetworkId'],
                name: item['name'],
                currencyId: item['currencyId']
            }
            WithdrawalNetworkList.push(Item)
        })

        data['withdrawalsAddress'].forEach((item: JSON) => {
            const Item: WithdrawalsAddress = {
                WithdrawalAddressId: item['WithdrawalAddressId'],
                currencyId: item['currencyId'],
                currencyNetworkId: item['currencyNetworkId'],
                text: item['notes'] + '  [' + item['address'] + ']',
                notes: item['notes'],
                address: item['address'],
            }
            WithdrawalsAddressList.push(Item)
        })

        SelectedInfo.value.currencyId = CurrencyList[0].currencyId
        changeCurrency(SelectedInfo.value.currencyId)
    }

    service.UserGetWithdrawalsInfo(successFunc, () => {})
}
const changeCurrency = (currencyId) => {
    const Currency = CurrencyList.find(e => e.currencyId === currencyId)
    SelectedInfo.value.logo = Currency.logo
    SelectedInfo.value.name = Currency.nickname
    SelectedInfo.value.address = Currency.address
    SelectedInfo.value.minimumWithdrawal = Currency.minimumWithdrawal
    SelectedInfo.value.balance = Currency.balance
    SelectedInfo.value.withdrawalNum = <number>null

    SelectedInfo.value.NetworkList = WithdrawalNetworkList.filter(e => e.currencyId === currencyId)
    if (SelectedInfo.value.NetworkList.length > 0){
        SelectedInfo.value.networkId = SelectedInfo.value.NetworkList[0].currencyNetworkId
        SelectedInfo.value.networkName = SelectedInfo.value.NetworkList[0].name
        changeNetwork(SelectedInfo.value.networkId)
    }else{
        SelectedInfo.value.networkId = null as number
    }

}
const changeNetwork = (currencyNetworkId) => {
    SelectedInfo.value.WithdrawalsAddressList = WithdrawalsAddressList.filter(e => (e.currencyNetworkId === currencyNetworkId && e.currencyId === SelectedInfo.value.currencyId))
    if (SelectedInfo.value.WithdrawalsAddressList.length > 0){
        SelectedInfo.value.withdrawalAddressId = SelectedInfo.value.WithdrawalsAddressList[0].WithdrawalAddressId
        changeWithdrawalAddress(SelectedInfo.value.withdrawalAddressId)
    }else{
        SelectedInfo.value.withdrawalAddressId = null as number
    }
}
const changeWithdrawalAddress = (withdrawalAddressId) => {
    const withdrawalAddress = WithdrawalsAddressList.find(e => e.WithdrawalAddressId === withdrawalAddressId)
    console.log(withdrawalAddress)
    SelectedInfo.value.withdrawalsAddressNotes = withdrawalAddress.notes
    SelectedInfo.value.withdrawalsAddress = withdrawalAddress.address

}
const confirmWithdrawals = () => {
    const successFunc = (data: object) => {
        if(! data) return

        if(data['num'] === 0){
            ElNotification({message: '没有查到新增充值，请充值后重试', type: 'error'})
        }else{
            ElNotification({message: '已新增' + data['num'] + '笔充值', type: 'success'})

            AssetDynamicsRef.value.GetWalletLogList()
        }

        loadingInstance.close()
    }

    const loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    const data: UserGetConfirmRechargeDTO = {
        currencyId: SelectedInfo.value.currencyId,
        networkId: SelectedInfo.value.networkId
    }

    service.UserGetConfirmRecharge(data, successFunc, () => {loadingInstance.close()})
}
const openWithdrawalsConfirmDialog = () => {
    if(SelectedInfo.value.withdrawalAddressId === null){
        ElNotification({message: '请选择提现地址！', type: 'error'})
        return
    }
    if(SelectedInfo.value.networkId === null){
        ElNotification({message: '请选择提现网络！', type: 'error'})
        return
    }
    if(SelectedInfo.value.currencyId === null){
        ElNotification({message: '请选择提现货币！', type: 'error'})
        return
    }
    if(SelectedInfo.value.withdrawalNum < SelectedInfo.value.minimumWithdrawal){
        ElNotification({message: '请大于最低提现金额！', type: 'error'})
        return
    }
    WithdrawalsConfirmDialogVisible.value = true
}
const ToBack = () => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    delete newQuery['actionPageId']
    router.push({ query: newQuery}).then(()=>{
        router.go(0)
    })
}
const deepCopy = (data: object) => {
  return JSON.parse(JSON.stringify(data))
}
const rowState = (arg) => {
    return {
        backgroundColor: arg.rowIndex % 2 === 1 ? '#131515' : '#0A0A0A',
        color: 'color: rgba(255,255,255,0.6)',
        'text-align': 'center'
    }
}
const WithdrawalManagementDisplayChange = () => {
  IsWithdrawalManagement.value = !IsWithdrawalManagement.value
}
const inputAll = () => {
  SelectedInfo.value.withdrawalNum = SelectedInfo.value.balance
}

Init()

</script>

<style scoped lang="scss">
.el-popper {
    background: #0F1010;
}
.select_item {
    margin-bottom: 0.3rem;
    .logo {
        width: 2.16rem;
        height: 2.16rem;
        border-radius: 50%
    }
}

.user-asset-withdrawals-box {
    width: 100%;
    min-height: 100vh;
    background: #000000;

    .top {
        display: flex;
        font-weight: bold;

        .comeback {
            width: 1.22rem;
            height: 0.91rem;
            font-size: 1rem;
            color: #0DA88B;
            cursor: pointer;

            .icon {
                width: 1rem;
                height: 0.7rem;
            }
        }

        .title {
            margin-left: 0.2rem;
            font-size: 1rem;
            color: #FFFFFF;
            line-height: 1.56rem;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei,serif;
        }
    }

    .main {
        margin-top: 1rem;
        height: 60%;
        display: flex;
        justify-content: space-between;

        .detailed {
            width: 70%;
            background: #0A0A0A;
            padding: 1rem;
            border-radius: 5px 0 0 5px;

            .item {
                margin-bottom: 1rem;
                width: 100%;

                .prompt {
                    display: flex;
                    margin-left: 2rem;
                    margin-top: 1rem;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    font-family: PingFang SC-Medium, PingFang SC,serif;
                    font-weight: 500;
                    color: rgba(255,255,255,0.3);
                    line-height: 1.5rem;

                    .left_text {
                        display: flex;
                        .icon {
                            width: 1.5rem;
                            height: 1.5rem;
                        }

                        .text {
                            margin-left: 0.5rem;
                        }
                    }

                    .right_text {
                        display: flex;

                        .num {
                            font-size: 1rem;
                            font-family: PingFang SC-Medium, PingFang SC,serif;
                            font-weight: 500;
                            color: #FFFFFF;
                            line-height: 1.3rem;
                        }
                    }
                }

                .label {
                    font-size: 0.5rem;
                    font-family: PingFang SC-Bold, PingFang SC,serif;
                    font-weight: bold;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.37rem;
                    margin-bottom: 0.5rem;
                    display: flex;
                    justify-content: space-between;

                    .right_text {
                        font-weight: bold;
                        color: #0DA88B;
                        cursor: pointer;
                    }
                }

                .currencySelect {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    position: relative;

                    .currencySelected {
                        display: flex;
                        position: absolute;
                        top: 50%;
                        left: 5%;
                        transform: translate(-5%, -50%);
                        text-indent: 1px;
                        z-index: 1;

                        .logo {
                            width: 1.5rem;
                            height: 1.5rem;
                            border-radius: 50%
                        }

                        .name {
                            margin-left: 1rem;
                            font-size: 1.17rem;
                            font-family: PingFang SC-Medium, PingFang SC,serif;
                            font-weight: 500;
                            color: rgba(255,255,255,0.5);
                            line-height: 1.5rem;
                        }
                    }

                    ::v-deep .el-select, ::v-deep .el-input, ::v-deep .el-input__inner {
                        background-color: transparent;
                        border: none;
                        text-indent: -9999px;
                    }
                }

                .select {
                    width: 100%;
                    ::v-deep .el-input__inner {
                        margin-left: 3%;
                        font-size: 1.17rem;
                        font-family: PingFang SC-Medium, PingFang SC,serif;
                        font-weight: 500;
                        color: rgba(255,255,255,0.5);
                        line-height: 1.5rem;
                    }

                    ::v-deep .el-input__wrapper {
                        width: 100%;
                        height: 2.5rem;
                        background: #0F1010;
                        color:#fff;
                        box-shadow: none !important;
                        text-align: center;
                    }

                }

                .address {
                    width: 100%;
                    height: 2.5rem;
                    background: #0F1010;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .text {
                        font-size: 1.17rem;
                        font-family: PingFang SC-Medium, PingFang SC,serif;
                        font-weight: 500;
                        color: rgba(255,255,255,0.5);
                        line-height: 1.5rem;
                        margin-left: 4%;
                    }

                    .copyItem {
                        width: 1rem;
                        height: 1rem;
                        margin-right: 4%;
                        cursor: pointer;
                    }
                }

                .input {
                    width: 100%;
                    height: 2.5rem;
                    background: #0F1010;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .text {
                        font-size: 1.17rem;
                        font-family: PingFang SC-Medium, PingFang SC,serif;
                        font-weight: 500;
                        color: rgba(255,255,255,0.5);
                        line-height: 1.5rem;
                        margin-left: 4%;
                        width: 70%;

                        ::v-deep .el-input {
                            --el-input-focus-border-color: none !important;
                        }
                        ::v-deep .el-input__inner{
                            color: rgba(255,255,255,0.5);
                            font-size: 1rem;
                        }
                        ::v-deep .el-input__wrapper{
                            background: #0F1010 !important;
                            box-shadow: none !important;
                            color: rgba(255,255,255,0.5);
                            font-size: 0.8rem;
                        }
                        ::v-deep input::-webkit-outer-spin-button,
                        ::v-deep input::-webkit-inner-spin-button {
                            -webkit-appearance: none !important;
                        }
                        ::v-deep input[type="number"] {
                            -moz-appearance: textfield !important;
                        }
                    }

                    .inputAll {
                        margin-right: 4%;
                        cursor: pointer;
                        font-size: 0.7rem;
                        font-family: PingFang SC-Bold, PingFang SC, serif;
                        font-weight: bold;
                        color: rgba(255,255,255,0.7);
                        line-height: 1.56rem;
                    }
                }
            }

            .exegesis {
                border: 0.08rem solid rgba(255,255,255,0.2);
                border-radius: 0.33rem;
                padding: 1rem 1.5rem;

                .title {
                    font-size: 1rem;
                    font-family: PingFang SC-Bold, PingFang SC,serif;
                    font-weight: bold;
                    color: rgba(255,255,255,0.7);
                }

                .item {
                    margin-bottom: 0;
                    margin-top: 1rem;
                    font-size: 0.8rem;
                    font-family: PingFang SC-Medium, PingFang SC,serif;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);
                }
            }

            .confirmWithdrawals {
                cursor: pointer;
                margin: 1rem auto;
                width: 20rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(137deg, #06B99A 0%, #0DA88B 100%);
                border-radius: 10px;
                height: 3rem;
                font-size: 0.7rem;
                font-family: PingFang SC-Semibold, PingFang SC,serif;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 1.37rem;
            }
        }

        .currencyList_box {
            width: 50%;
            background: #0F1010;
            padding: 1rem;
            border-radius: 0 5px 5px 0;

            ::v-deep .el-table {
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
                text-align: center;
            }
            ::v-deep .el-table td.el-table__cell, ::v-deep .el-table th.el-table__cell.is-leaf {
                border-bottom: none !important;
            }
            ::v-deep .el-table_1_column_1 {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            ::v-deep .el-table td.el-table__cell div {
                text-align: center;
            }
            .currencyListTable {
                width: 60%;
                margin: 2rem auto 0 auto;

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
    }

    .bottom {
        margin-top: 1rem;
    }
}
</style>
<style lang="scss">
.WithdrawalsConfirm_box {
    width: 30% !important;
    background: #0A0A0A !important;

    .el-dialog__body {
        padding: 0 !important;
    }
    .el-dialog__header {
        padding: 0.8rem 0;
        margin-right: 0;
        background-color:#131515;

        .el-dialog__title {
            margin-left: 2rem;
            font-size: 0.8rem;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei,serif;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 1.56rem;
            border-left: 0.15rem solid #0DA88B;
        }

        .el-dialog__headerbtn {
            top: 0;
        }
    }

    .el-dialog__footer {
        display: flex;
        justify-content: center;

        .cancel {
            background-color: #0A0A0AFF !important;
            border-color: rgba(255,255,255,0.2) !important;
        }

        .el-button {
            background-color: #06B99AFF;
            border-color: #06B99AFF;
        }
    }

    .main {
        padding: 0 2rem;
        margin-top: 1rem;

        .header {
            width: 100%;
            background: rgba(41,41,41,0.56);
            border-radius: 5px;
            padding: 0.2rem 2rem;
            font-size: 0.8rem;
            font-family: PingFang SC-Semibold, PingFang SC,serif;
            font-weight: 600;
            color: rgba(255,255,255,0.5);
            align-items: center;
            display: flex;

            .icon {
                width: 1.5rem;
                height: 1.5rem;
            }
        }

        .body {
            margin-top: 1rem;

            .item {
                display: flex;
                justify-content: space-between;
                padding: 1rem 0;

                .label {
                    font-size: 0.8rem;
                    font-family: PingFang SC-Semibold, PingFang SC,serif;
                    font-weight: 600;
                    color: rgba(255,255,255,0.5);
                }

                .value {
                    display: flex;
                    .prompt {
                        padding: 2px;
                        font-size: 0.2rem;
                        color: rgba(255,255,255,0.3);
                        background: #0F1010;
                    }

                    .highlight {
                        color: #06B99A;
                    }
                }
            }

            .confirm_button {
                background: linear-gradient(137deg, #06B99A 0%, #0DA88B 100%);
                display: flex;
                align-items: center;
                margin: auto;
                width: 10rem;
            }
        }

        .bottom {
            border: 0.08rem solid #FFFFFF33;
            border-radius: 0.33rem;
            padding: 1rem 1.5rem;
            margin: 1rem 0;

            .title {
                font-size: 1rem;
                font-family: PingFang SC-Bold, PingFang SC,serif;
                font-weight: bold;
                color: rgba(255,255,255,0.7);
            }

            .item {
                margin-bottom: 0;
                margin-top: 1rem;
                font-size: 0.8rem;
                font-family: PingFang SC-Medium, PingFang SC,serif;
                font-weight: 500;
                color: rgba(255,255,255,0.7);
            }
        }
    }
}
</style>
