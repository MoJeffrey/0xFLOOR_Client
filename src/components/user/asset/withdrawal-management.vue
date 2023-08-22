<template>
    <div class="withdrawal-management-box">
        <div class="top">
            <div class="comeback" @click="ToBack">
                <svg t="1692403200498" class="icon" viewBox="0 0 1366 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3483" width="200" height="200">
                    <path d="M450.922842 24.950479 24.993146 450.88318C-8.27416 484.150485-8.27416 538.087396 24.993146 571.354702L450.922841 997.284395C484.190146 1030.54569 538.127057 1030.54569 571.394362 997.284395 604.664673 964.017092 604.664673 910.077175 571.394362 876.812877L290.882159 596.303677 1277.833259 596.303677C1324.882304 596.303677 1363.020996 558.16498 1363.020996 511.115934 1363.020996 464.066888 1324.885308 425.928191 1277.833259 425.928191L290.882159 425.928193 571.391357 145.418994C588.02501 128.785341 596.343339 106.982786 596.343339 85.186239 596.343339 63.386687 588.028015 41.584131 571.394362 24.950479 538.124052-8.316826 484.193152-8.316826 450.922842 24.950479L450.922842 24.950479Z" p-id="3484" fill="#0DA88B"></path>
                </svg></div>
            <div class="title selected">提币地址管理</div>
            <div class="title" style="margin-left: 1rem;">联系人管理</div>
        </div>
        <div class="main">
            <div class="header">
                <div class="currencySelect">
                    <div class="currencySelected" v-if="SelectedInfo.currencyId">
                        <img :src="SelectedInfo.logo" class="logo" alt="">
                        <div class="name">{{ SelectedInfo.name }}</div>
                    </div>
                    <div class="currencySelected" v-else>
                        <div class="name">请选择币种</div>
                    </div>
                    <el-select class="select" v-model="SelectedInfo.currencyId" @change="SelectWithdrawalAddress_ChangeCurrency" placeholder="请选择币种">
                        <el-option v-for="(item, index) in props.CurrencyList" :key="index" class="select_item" :value="item.currencyId">
                            <img :src="item.logo" alt="" class="logo">
                            {{ item.nickname }}
                        </el-option>
                    </el-select>
                </div>
                <div class="addBottom" @click="OpenAddressDialog">新增提币地址</div>
            </div>
            <el-table :data="withdrawalAddressList" :row-style="rowState" class="withdrawalManagementTable" >
                <el-table-column prop="name" label="币种"
                    :width="(withdrawalAddressTableObj.value.name.width / TableTotalWidth * 100) + '%'">
                    <template #default="{ row }">
                        <div class="currencyName">
                            <img :src="row.logo" alt="" class="logo">
                            <div class="name">{{ row.name }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="链类型" :width="(withdrawalAddressTableObj.value.type.width / TableTotalWidth * 100) + '%'">
                </el-table-column>
                <el-table-column prop="remark" label="地址备注" :width="(withdrawalAddressTableObj.value.remark.width / TableTotalWidth * 100) + '%'">
                </el-table-column>
                <el-table-column prop="address" label="提币地址" :width="(withdrawalAddressTableObj.value.address.width / TableTotalWidth * 100) + '%'">
                </el-table-column>
                <el-table-column label="操作" :width="withdrawalAddressList.length === 0 ? '0' : '30%'">
                    <template #default="{ row }">
                        <div class="actionsList">
                            <div class="item" @click="DeleteWithdrawalsAddress(row.withdrawalInfoId)">
                                <svg t="1692544760225" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2617" width="200" height="200"><path d="M519.620465 0c-103.924093 0-188.511256 82.467721-192.083349 185.820279H85.015814A48.91386 48.91386 0 0 0 36.101953 234.686512a48.91386 48.91386 0 0 0 48.913861 48.866232h54.010046V831.345116c0 102.852465 69.822512 186.844279 155.909954 186.844279h439.200744c86.087442 0 155.909953-83.491721 155.909954-186.844279V284.100465h48.91386a48.91386 48.91386 0 0 0 48.913861-48.890046 48.91386 48.91386 0 0 0-48.913861-48.866233h-227.756651A191.559442 191.559442 0 0 0 519.620465 0z m-107.234232 177.080558c3.548279-49.771163 46.627721-88.540279 99.851907-88.540279 53.224186 0 96.327442 38.745302 99.351813 88.540279h-199.20372z m-111.997024 752.044651c-30.981953 0-65.083535-39.15014-65.083535-95.041488V287.744h575.488v546.839814c0 55.915163-34.077767 95.041488-65.059721 95.041488H300.389209v-0.500093z" fill="#D81E06" p-id="2618"></path><path d="M368.116093 796.814884c24.361674 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.908465-48.818605-44.27014-48.818604-24.33786 0-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.293954 48.818605z m154.933581 0c24.361674 0 44.293953-21.670698 44.293954-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.293954-48.818604-24.33786 0-44.27014 21.670698-44.270139 48.818604v278.623256c0 27.147907 19.932279 48.818605 44.293953 48.818605z m132.810419 0c24.33786 0 44.27014-21.670698 44.27014-48.818605v-278.623256c0-27.147907-19.932279-48.818605-44.27014-48.818604s-44.27014 21.670698-44.27014 48.818604v278.623256c0 27.147907 19.360744 48.818605 44.27014 48.818605z" fill="#D81E06" p-id="2619"></path></svg>
                                <div class="name">删除</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog v-model="AddAddressDialogVisible" title="&nbsp;新增提币地址" :visible="AddAddressDialogVisible" class="addAddress_box">
            <div class="main">
                <div class="item">

                    <div class="input_item">
                        <div class="label">币种</div>
                        <div class="currencySelect">
                            <div class="currencySelected" v-if="SelectedInfo.addWithdrawalAddressCurrencyId">
                                <img :src="SelectedInfo.addWithdrawalAddressLogo" class="logo" alt="">
                                <div class="name">{{ SelectedInfo.addWithdrawalAddressName }}</div>
                            </div>
                            <div class="currencySelected" v-else>
                                <div class="name">请选择币种</div>
                            </div>
                            <el-select class="select" v-model="SelectedInfo.addWithdrawalAddressCurrencyId" @change="AddressWithdrawalAddress_ChangeCurrency">
                                <el-option v-for="(item, index) in props.CurrencyList" :key="index" class="select_item" :value="item.currencyId">
                                    <img :src="item.logo" alt="" class="logo">
                                    {{ item.nickname }}
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="input_item">
                        <div class="label">链类型</div>
                        <el-select class="select" v-model="SelectedInfo.addWithdrawalAddressNetworkId" placeholder="请选择链类型">
                            <el-option v-for="(item, index) in SelectedInfo.addWithdrawalNetworkList" :key="index" class="select_item" :value="item.currencyNetworkId" :label="item.name"></el-option>
                        </el-select>
                    </div>

                </div>

                <div class="input_item">
                    <div class="label">提币地址</div>
                    <el-input placeholder="请输入提币地址" v-model="SelectedInfo.addWithdrawalAddress"></el-input>
                </div>

                <div class="input_item">
                    <div class="label">地址备注</div>
                    <el-input placeholder="最多支持20个字符" v-model="SelectedInfo.addWithdrawalAddressRemarks"></el-input>
                </div>

            </div>
            <template #footer>
                <el-button type="primary" @click="AddAddressDialogVisible = false" class="cancel">取消</el-button>
                <el-button type="primary" @click="AddWithdrawalsAddress">确定</el-button>
            </template>
        </el-dialog>
    </div>

</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {api} from "../../../utils/api";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {ElNotification, ElLoading} from "element-plus";
import {UserGetConfirmRechargeDTO} from "../../../utils/ResultDTO/UserGetConfirmRechargeDTO";
import {UserGetWalletLogListDTO} from "../../../utils/ResultDTO/UserGetWalletLogListDTO";
import {UserGetWithdrawalAddressListDTO} from "../../../utils/ResultDTO/UserGetWithdrawalAddressListDTO";
import {UserWithdrawalAddressCreateDTO} from "../../../utils/ResultDTO/UserWithdrawalAddressCreateDTO";
import {UserWithdrawalAddressDeleteDTO} from "../../../utils/ResultDTO/UserWithdrawalAddressDeleteDTO";

interface RechargeNetwork {
    name: string;
    currencyId: number;
    currencyNetworkId: number
}

interface withdrawalAddressDTO {
    withdrawalInfoId: string;
    type: string
    name: string;
    logo: string;
    remark: string;
    address: string;
}

interface Currency {
    currencyId: number;
    nickname: string;
    logo: string;
}

const props = defineProps({
    CurrencyList:{
        type: Array,
        required: true,
        default: [
            {
                currencyId: 0,
                nickname: '无',
                logo: null
            }
        ]
    },
    WithdrawalNetworkList: {
        type: Array,
        required: true,
        default: [
            {
                currencyId: 0,
                name: '无',
                Id: 0
            }
        ]
    }
})
const emits = defineEmits(['comeBack']);
const router = useRouter()
const service = new api()
const AddAddressDialogVisible = ref(false)
const SelectedInfo = ref({
    logo: '',
    name: '',
    selectWithdrawalAddressListCurrencyId: null,
    currencyId: null,
    addWithdrawalAddressLogo: '',
    addWithdrawalAddressName: '',
    addWithdrawalAddressCurrencyId: null as number | null,
    addWithdrawalAddressNetworkId: null as number | null,
    addWithdrawalNetworkList: [] as RechargeNetwork[],
    addWithdrawalAddress: '',
    addWithdrawalAddressRemarks: '',
    networkId: 1,
    minimumWithdrawal: 1,
    balance: 1,
    withdrawalNum: 1,
})
const Init = () => {
    GetWithdrawalAddressList()
    withdrawalAddressTableObj.value = calColWidth(withdrawalAddressTableLabel, withdrawalAddressList)
}

const withdrawalAddressTableObj = ref()
const TableTotalWidth = ref(0)
const withdrawalAddressTableLabel = {
    name: '币种',
    type: '链类型',
    remark: '备注',
    address: '提币地址',
}
const withdrawalAddressList: UnwrapNestedRefs<withdrawalAddressDTO[]> = reactive([])

const GetWithdrawalAddressList = () => {
    const successFunc = (data: object) => {
        if(! data) return

        withdrawalAddressList.length = 0
        const CurrencyList = props.CurrencyList as Currency[]
        const WithdrawalNetworkList = props.WithdrawalNetworkList as RechargeNetwork[]

        data['data'].forEach( (item: JSON) => {
            const Currency = CurrencyList.find(e => e.currencyId === item['currencyId'])
            const RechargeNetwork = WithdrawalNetworkList.find(e => e.currencyNetworkId === item['currencyNetworkId'])
            const Item: withdrawalAddressDTO = {
                withdrawalInfoId: item['id'],
                type: RechargeNetwork.name,
                name: Currency.nickname,
                logo: Currency.logo,
                remark: item['notes'],
                address: item['address']
            }
            withdrawalAddressList.push(Item)
        })
    }

    const data: UserGetWithdrawalAddressListDTO = {
        currencyId: SelectedInfo.value.selectWithdrawalAddressListCurrencyId,
        page: 1,
        limit: 10
    }
    service.UserGetWithdrawalAddressList(data, successFunc, ()=> {})
}
const AddressWithdrawalAddress_ChangeCurrency = (currencyId) => {
    const CurrencyList = props.CurrencyList as Currency[]
    const Currency = CurrencyList.find(e => e.currencyId === currencyId)
    const WithdrawalNetworkList = props.WithdrawalNetworkList as RechargeNetwork[]

    SelectedInfo.value.addWithdrawalAddressLogo = Currency.logo
    SelectedInfo.value.addWithdrawalAddressName = Currency.nickname
    SelectedInfo.value.addWithdrawalAddressCurrencyId = currencyId
    SelectedInfo.value.addWithdrawalNetworkList = WithdrawalNetworkList.filter(e => e.currencyId === currencyId)
    SelectedInfo.value.addWithdrawalAddressNetworkId = SelectedInfo.value.addWithdrawalNetworkList[0].currencyNetworkId
}
const SelectWithdrawalAddress_ChangeCurrency = (currencyId) => {
    const CurrencyList = props.CurrencyList as Currency[]
    const Currency = CurrencyList.find(e => e.currencyId === currencyId)
    SelectedInfo.value.logo = Currency.logo
    SelectedInfo.value.name = Currency.nickname
    SelectedInfo.value.selectWithdrawalAddressListCurrencyId = currencyId
    GetWithdrawalAddressList()
}
const OpenAddressDialog = () => {
    AddAddressDialogVisible.value = true
    SelectedInfo.value.addWithdrawalAddress = ''
    SelectedInfo.value.addWithdrawalAddressRemarks = ''
}
const AddWithdrawalsAddress = () => {
    const successFunc = (data: object) => {
        if(! data) return

        ElNotification({message: '已添加', type: 'success'})
        GetWithdrawalAddressList()
        AddAddressDialogVisible.value = false
        loadingInstance.close()
    }

    const loadingInstance = ElLoading.service({
        lock: true,
        text: '添加中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    const data: UserWithdrawalAddressCreateDTO = {
        currencyId: <number>SelectedInfo.value.addWithdrawalAddressCurrencyId,
        currencyNetworkId: <number>SelectedInfo.value.addWithdrawalAddressNetworkId,
        notes: SelectedInfo.value.addWithdrawalAddressRemarks,
        address: SelectedInfo.value.addWithdrawalAddress
    }

    service.UserWithdrawalAddressCreate(data, successFunc, () => {loadingInstance.close()})
}
const DeleteWithdrawalsAddress = (Id) => {
    const successFunc = (data: object) => {
        if(! data) return

        ElNotification({message: '已删除', type: 'success'})
        GetWithdrawalAddressList()
        loadingInstance.close()
    }

    const loadingInstance = ElLoading.service({
        lock: true,
        text: '删除中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    const data: UserWithdrawalAddressDeleteDTO = {
        withdrawalAddressId: Id
    }

    service.UserWithdrawalAddressDelete(data, successFunc, () => {loadingInstance.close()})
}

const ToBack = () => {
    emits('comeBack')
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
        'text-align': 'center'
    }
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
.withdrawal-management-box {
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
            font-size: 0.8rem;
            color: #FFFFFF;
            line-height: 1.56rem;
            font-family: Microsoft YaHei-Bold, Microsoft YaHei,serif;
        }

        .selected {
            border-bottom: 0.1rem solid #0DA88B;
        }
    }

    .main {
        margin-top: 1rem;

        .header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 1rem;

            .currencySelect {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                position: relative;

                .currencySelected {
                    display: flex;
                    position: absolute;
                    top: 50%;
                    left: 1%;
                    transform: translate(-5%, -50%);
                    text-indent: 1px;
                    z-index: 1;
                    font-size: 0.5rem;
                    font-family: PingFang SC-Medium, PingFang SC,serif;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);

                    .logo {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%
                    }

                    .name {
                        margin-left: 1rem;
                        line-height: 1.5rem;
                    }

                }

                ::v-deep .el-select, ::v-deep .el-input, ::v-deep .el-input__inner {
                    background-color: transparent;
                    border: none;
                    text-indent: -9999px;
                }

                .select {
                    width: 25%;
                    ::v-deep .el-input__inner {
                        font-size: 1.17rem;
                        font-family: PingFang SC-Medium, PingFang SC,serif;
                        font-weight: 500;
                        color: rgba(255,255,255,0.5);
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
            }

            .addBottom {
                cursor: pointer;
                width: 10rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(137deg, #06B99A 0%, #0DA88B 100%);
                border-radius: 5px;
                height: 2.5rem;
                font-size: 0.7rem;
                font-family: PingFang SC-Bold, PingFang SC,serif;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 1.37rem;
            }
        }

        ::v-deep .el-table {
            --el-table-border-color: none !important;
            --el-table-row-hover-bg-color: none !important;
            --el-table-bg-color: #0A0A0A !important;
            --el-table-tr-bg-color: none !important;
            border-radius: 7px 7px 0 0;
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
        .withdrawalManagementTable {
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

            .actionsList {
                display: flex;

                .item {
                    display: flex;
                    cursor: pointer;
                    .icon {
                        width: 1.48rem;
                        height: 1.37rem;
                    }

                    .name {
                        font-size: 0.8rem;
                        font-family: PingFang SC-Medium, PingFang SC,serif;
                        font-weight: 500;
                        color: #E4413C;
                    }
                }
            }
        }
    }

}
</style>
<style lang="scss">
.addAddress_box {
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
        margin-top: 0;

        .item {
            display: flex;
            justify-content: space-between;
        }

        .input_item {
            margin-bottom: 1rem;
            width: 100%;

            .label {
                font-size: 0.5rem;
                font-family: PingFang SC-Semibold, PingFang SC, serif;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.7);
                line-height: 1.37rem;
                margin-bottom: 0.3rem;
            }

            .select {
                width: 80%;

                .el-input__inner {
                    margin-left: 1rem;
                    font-size: 0.5rem;
                    font-family: PingFang SC-Medium, PingFang SC,serif;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);
                }

                .el-input__wrapper {
                    width: 100%;
                    height: 2.5rem;
                    background: #0F1010;
                    color:#fff;
                    box-shadow: none !important;
                    text-align: center;
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
                    top: 32%;
                    left: 6%;
                    transform: translate(-5%, -50%);
                    text-indent: 1px;
                    z-index: 1;
                    font-size: 0.5rem;
                    font-family: PingFang SC-Medium, PingFang SC,serif;
                    font-weight: 500;
                    color: rgba(255,255,255,0.5);

                    .logo {
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%
                    }

                    .name {
                        margin-left: 1rem;
                        line-height: 1.5rem;
                    }

                }

                .el-select, .el-input, .el-input__inner {
                    background-color: transparent;
                    border: none;
                    text-indent: -9999px;
                }
            }

            .el-input {
                background: #131515;
                font-size: 0.5rem;
                font-family: PingFang SC-Medium, PingFang SC,serif;
                font-weight: 500;
                color: #FFFFFF80;

                .el-input__wrapper {
                    background-color: #131515;
                    border-radius: 0;
                    box-shadow: none;
                }
            }
        }

    }
}
</style>
