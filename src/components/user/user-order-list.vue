<template>
    <user-order-details v-if="IsViewDetails"/>
    <div class="orderBox" v-else>
        <div class="orderBox1">
            <p v-for="itemCoupon in orderTabList" :key="itemCoupon.id"
               :class="TabIndex === itemCoupon.id ? 'couponS': 'coupon'" @click="ChangeTabIndex(itemCoupon.id)">
                {{ itemCoupon.title }}
            </p>
        </div>

        <div>
            <el-table :data="orderList" style="width: 100%">
                <el-table-column prop="time" label="订单日期"></el-table-column>
                <el-table-column prop="id" label="订单ID">
                    <template #default="{ row }">
                        <span @click="viewOrder(row.id)">{{ row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="money" label="订单总额"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
            </el-table>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs, computed} from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../utils/api";
import { UnwrapNestedRefs } from "@vue/reactivity";
import UserOrderDetails from './user-order-details.vue'
import {ElNotification} from "element-plus";
import {UserElectricityRechargeDTO} from "../../utils/ResultDTO/UserElectricityRechargeDTO";
import {UserOrderListDTO} from "../../utils/ResultDTO/UserOrderListDTO";

const router = useRouter()
const service = new api()
const IsViewDetails = ref(false)
const TabIndex = ref(1)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const Init = () => {
    if (router.currentRoute.value.query.orderId){
        IsViewDetails.value = true
        return
    }

    GetOrderList()
}

const ChangeTabIndex = (index: number) => {
    TabIndex.value = index

    GetOrderList()
}

interface Order {
    id: string;
    time: string;
    name: string;
    money: string;
    status: string
}
const orderTabList = [
    { id: 1, title: '矿机订单' },
    { id: 2, title: '电力订单' },
    { id: 3, title: '维修订单' },
]
const orderList: UnwrapNestedRefs<Order[]> = reactive([])
const GetOrderList = () => {
    const ChangeTimeFormatted = (time: string) => {
        function padZero(value: number): string {
            return value.toString().padStart(2, '0');
        }
        const dateTime = new Date(time);
        return `${padZero(dateTime.getMonth() + 1)}-${padZero(dateTime.getDate())} ${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}:${padZero(dateTime.getSeconds())}`;

    }

    const successFunc = (data: object) => {
        if(! data) return
        orderList.length = 0
        total.value = data['totalRows']

        data['list'].forEach( (item: JSON) => {
            const Item: Order = {
                id: item['orderId'],
                time: ChangeTimeFormatted(item['createTime']),
                name: item['orderName'],
                money: item['price'],
                status: item['status']
            }
            orderList.push(Item)
        })
    }

    const successError = (data: object) => {
        ElNotification({message: data['msg'], type: 'error'})
    }

    const data: UserOrderListDTO = {
        orderType: TabIndex.value,
        page: currentPage.value,
        limit: pageSize.value
    }
    service.UserOrderList(data, successFunc, successError)
}

const handleSizeChange = (size) => {
    pageSize.value = size
    GetOrderList()
}
const handleCurrentChange = (page) => {
    currentPage.value = page;
    GetOrderList()
}

const viewOrder = (OrderId: string) => {
    const newQuery = JSON.parse(JSON.stringify(router.currentRoute.value.query))
    newQuery['orderId'] = OrderId
    router.push({ query: newQuery}).then(()=> {
        IsViewDetails.value = true
    })
}

Init()

</script>

<style scoped lang="scss">

// 订单
.orderBox {
    width: 100%;
    height: 786px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    .orderBox1 {
        width: 100%;
        height: 67px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        p {
            margin-left: 30px;
        }
        .couponS {
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            cursor: pointer;
            animation: myCoupon 1s linear;
            animation-fill-mode: forwards;
        }
        @keyframes myCoupon {
            50%,
            100% {
                border-bottom: 4px solid #bb177e;
                border-radius: 2px;
                line-height: 40px;
                box-sizing: border-box;
            }
        }
        .coupon {
            font-size: 16px;
            font-weight: 400;
            color: rgba(234, 219, 173, 0.6);
            cursor: pointer;
        }
    }
    .orderTab {
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
        padding: 0 30px;
    }
    .orderTable {
        width: 100%;
        min-height: 53px;
        border-bottom: 1px solid rgba(234, 219, 173, 0.2);
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
        color: #eadbad;
        margin: 5px 0;
        div:nth-child(1) {
            width: 140px;
            margin-left: 20px;
        }
        div:nth-child(2) {
            width: 190px;
            cursor: pointer;
        }
        div:nth-child(3) {
            width: 170px;
        }
        div:nth-child(4) {
            width: 160px;
        }
        div:nth-child(5) {
            width: 80px;
        }
    }
}

</style>
