<template>
    <div class="user-asset-recharge-box">
        <div class="top">
            <div class="comeback" @click="ToBack">
                <svg t="1692403200498" class="icon" viewBox="0 0 1366 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3483" width="200" height="200">
                    <path d="M450.922842 24.950479 24.993146 450.88318C-8.27416 484.150485-8.27416 538.087396 24.993146 571.354702L450.922841 997.284395C484.190146 1030.54569 538.127057 1030.54569 571.394362 997.284395 604.664673 964.017092 604.664673 910.077175 571.394362 876.812877L290.882159 596.303677 1277.833259 596.303677C1324.882304 596.303677 1363.020996 558.16498 1363.020996 511.115934 1363.020996 464.066888 1324.885308 425.928191 1277.833259 425.928191L290.882159 425.928193 571.391357 145.418994C588.02501 128.785341 596.343339 106.982786 596.343339 85.186239 596.343339 63.386687 588.028015 41.584131 571.394362 24.950479 538.124052-8.316826 484.193152-8.316826 450.922842 24.950479L450.922842 24.950479Z" p-id="3484" fill="#0DA88B"></path>
                </svg></div>
            <div class="title">充值</div>
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
                    <div class="label">选择充值网络</div>
                    <el-select class="select" v-model="SelectedInfo.networkId">
                        <el-option v-for="(item, index) in SelectedInfo.NetworkList" :key="index" class="select_item" :value="item.Id" :label="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div class="label">充币地址</div>
                    <div class="address">
                        <div class="text">{{ SelectedInfo.address }}</div>
                        <img src="../../../assets/img/user/asset_recharge/copy.png" alt="" class="copyItem" @click="copy(SelectedInfo.address)">
                    </div>
                    <div class="prompt">
                        <svg t="1692393919570" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1944" width="200" height="200">
                            <path d="M512 128c212.064 0 384 171.936 384 384s-171.936 384-384 384S128 724.064 128 512 299.936 128 512 128z m0 64C335.296 192 192 335.296 192 512s143.296 320 320 320 320-143.296 320-320S688.704 192 512 192z m6.848 429.728a48 48 0 1 1 0 96 48 48 0 0 1 0-96zM516.576 320a32 32 0 0 1 32 32v182.848a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z" fill="#cdcdcd" p-id="1945"></path>
                        </svg>
                        <div class="text">最小充值数量：0.01USDT | 预计到账时间：20个网路确认</div>
                    </div>
                </div>
                <div class="exegesis">
                    <div class="title">温馨提示</div>
                    <div class="item">· 该地址仅支持USDT资产充值, 充值其他资产到此地址将无法到账且找回。</div>
                    <div class="item">· 请注意：若单笔充值金额小于最小充值数量将无法入账。由此若造成您的资产损失，平台将不予处理，感谢您的理解与支持！</div>
                </div>
                <div class="confirmRecharge" @click="confirmRecharge">确认充值</div>
            </div>
            <div class="fig"></div>
        </div>
        <div class="bottom">
            <AssetDynamics ref="AssetDynamicsRef" :showToMoreButton="true" :RechargeLogTableShowList="RechargeLogTableShowList" :Type="1"/>
        </div>
    </div>

</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {api} from "../../../utils/api";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {ElNotification, ElLoading} from "element-plus";
import {UserGetConfirmRechargeDTO} from "../../../utils/ResultDTO/UserGetConfirmRechargeDTO";
import AssetDynamics from "../asset/assetDynamics.vue";

interface RechargeNetwork {
    name: string;
    currencyId: number;
    Id: number
}
interface Currency {
    currencyId: number;
    name: string;
    nickname: string;
    logo: string;
    address: string;
}

const router = useRouter()
const service = new api()
const AssetDynamicsRef = ref<any>()
const CurrencyName = ref('')
const SelectedInfo = ref({
    logo: '',
    name: '',
    address: '',
    currencyId: 1,
    networkId: 1,
    NetworkList: []
})
const RechargeLogTableShowList = ['currencyName', 'date', 'status', 'amount', 'voucher', 'progress']
const Init = () => {
    GetRechargeInfo()
}

const RechargeNetworkList: UnwrapNestedRefs<RechargeNetwork[]> = reactive([])
const CurrencyList: UnwrapNestedRefs<Currency[]> = reactive([])

const GetRechargeInfo = () => {
    const successFunc = (data: object) => {
        if(! data) return
        data['currency'].forEach( (item: JSON) => {
            const Item: Currency = {
                currencyId: item['currencyId'],
                name: item['name'],
                nickname: item['nickname'],
                logo: item['logo'],
                address: item['address'],
            }
            CurrencyList.push(Item)
        })

        data['network'].forEach( (item: JSON) => {
            const Item: RechargeNetwork = {
              Id: item['currencyNetworkId'],
              name: item['name'],
              currencyId: item['currencyId']
            }
            RechargeNetworkList.push(Item)
        })

        SelectedInfo.value.currencyId = CurrencyList[0].currencyId
        changeCurrency(SelectedInfo.value.currencyId)
    }

    service.UserGetRechargeInfo(successFunc, () => {})
}
const changeCurrency = (currencyId) => {
    const Currency = CurrencyList.find(e => e.currencyId === currencyId)
    SelectedInfo.value.logo = Currency.logo
    SelectedInfo.value.name = Currency.nickname
    SelectedInfo.value.address = Currency.address

    SelectedInfo.value.NetworkList = RechargeNetworkList.filter(e => e.currencyId === currencyId)
    SelectedInfo.value.networkId = SelectedInfo.value.NetworkList[0].Id
}
const confirmRecharge = () => {
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

const ToBack = () => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    delete newQuery['actionPageId']
    router.push({ query: newQuery}).then(()=>{
        router.go(0)
    })
}
const copy = (data) => {
    navigator.clipboard.writeText(data);
    ElNotification({message: '已复制', type: 'success'})
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

.user-asset-recharge-box {
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
            width: 60%;
            background: #0A0A0A;
            padding: 1rem;
            border-radius: 5px;

            .item {
                margin-bottom: 1rem;
                width: 100%;

                .prompt {
                    display: flex;
                    margin-left: 2rem;
                    margin-top: 1rem;

                    .icon {
                        width: 1.5rem;
                        height: 1.5rem;
                    }

                    .text {
                        margin-left: 0.5rem;
                        font-size: 1rem;
                        font-family: PingFang SC-Medium, PingFang SC,serif;
                        font-weight: 500;
                        color: rgba(255,255,255,0.3);
                        line-height: 1.5rem;
                    }
                }

                .label {
                    font-size: 0.5rem;
                    font-family: PingFang SC-Bold, PingFang SC,serif;
                    font-weight: bold;
                    color: rgba(255,255,255,0.7);
                    line-height: 1.37rem;
                    margin-bottom: 0.5rem;
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

            .confirmRecharge {
                cursor: pointer;
                margin: 1rem auto;
                width: 10rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(137deg, #06B99A 0%, #0DA88B 100%);
                border-radius: 15px;
                height: 2rem;
                font-size: 1.17rem;
                font-family: PingFang SC-Semibold, PingFang SC,serif;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 1.37rem;
            }
        }

        .fig {
            width: 70%;
        }
    }

    .bottom {
        margin-top: 1rem;
    }
}
</style>
