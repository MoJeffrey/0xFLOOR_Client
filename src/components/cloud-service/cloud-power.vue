<script setup lang="ts">
import UserNavigation from '../navigation/user-navigation.vue'
import { ref } from 'vue'
import { reactive } from 'vue';
import {api} from "../../utils/api";
import { CloudCurrencyListDTO } from "../../utils/ResultDTO/CloudCurrencyListDTO";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {CloudProductListDTO} from "../../utils/ResultDTO/CloudProductListDTO";
import route from "../../router/route";
import {User} from "../../utils/User";

const service = new api()
const user: User = new User()
const IsLogin: boolean = user.IsLogin()

const Init = () => {
    GetCurrencyList()
}

interface Currency {
    id: number;
    name: string;
    src: string;
    selected: boolean
}
interface selectItem {
    id: number;
    name: string;
}
interface ModelItem {
    id: number;
    minerModelId: number;
    model: string;
    price: number;
    fixedPrice: number;
    selected: boolean;
}
interface ProductItem {
    id: number;
    packageModeId: number;
    PackageCycleId: number;
    name: string;
    Cycle: string;
    modelList: ModelItem[];
    info: string[];
    price: number,
    fixedPrice: number
}

const GetItemForId = (id: number, List: selectItem[]): selectItem => {
    let returnItem: selectItem = {id: 0, name: ''}
    List.forEach((Item) => {
        if(Item.id === id) returnItem = Item
    })

    return returnItem
}

const currencyList: UnwrapNestedRefs<Currency[]> = reactive([])
const GetCurrencyList = () => {
    const success = (data: object) => {
        currencyList.length = 0

        data.results.forEach((Item: object) => {
            const currencyItem: Currency = {
                id: Item['currencyId'],
                name: Item['nickname'],
                src: Item['imgUrl'],
                selected: false,
            }
            currencyList.push(currencyItem)
        })

        // 默认点击第一个
        currencyList[0].selected = true
        GetProductList(currencyList[0].id)
    }

    const data: CloudCurrencyListDTO = {
        status: 1
    }

    service.CloudCurrencyList(data, success, () => {})
}

const currencyTab = (currencyId: number) => {

    currencyList.forEach( (item) => {
        item.selected = item.id === currencyId;
        if(item.selected) GetProductList(item.id)
    })
}

let packageModeId: number = 0;
const packageModeList: UnwrapNestedRefs<selectItem[]> = reactive([
    { id: 0, name: '套餐模式'},
])
const Init_packageMode = (dataList) => {
    packageModeList.length = 0
    packageModeId = 0
    packageModeList.push({id: 0, name: '套餐模式'})
    if(!dataList) return

    dataList.forEach((Item) => {
        const item: selectItem = {
            id: Item['comboModelId'],
            name: Item['comboModelName'],
        }
        packageModeList.push(item)
    })
}

let MinerModelId: number = 0;
const MinerModelList = reactive([
    { id: 0, name: '矿机型号'},
])
const Init_MinerModel = (dataList) => {
    MinerModelList.length = 0
    MinerModelId = 0
    MinerModelList.push({id: 0, name: '矿机型号'})
    if(!dataList) return

    dataList.forEach((Item) => {
        const item: selectItem = {
            id: Item['miningMachineSpecificationId'],
            name: Item['specification'],
        }
        MinerModelList.push(item)
    })
}

let PackageCycleId: number = 0;
const PackageCycleList = reactive([
    { id: 0, name: '套餐周期'},
])
const Init_PackageCycle = (dataList) => {
    PackageCycleList.length = 0
    PackageCycleId = 0
    PackageCycleList.push({id: 0, name: '套餐周期'})
    if(!dataList) return

    dataList.forEach((Item) => {
        const item: selectItem = {
            id: Item['comboPeriodId'],
            name: Item['period'],
        }
        PackageCycleList.push(item)
    })
}

const id = ref(2)

const miningMachineList: UnwrapNestedRefs<selectItem[]> = reactive([])
const Init_miningMachine = (dataList) => {
    miningMachineList.length = 0
    if(!dataList) return

    dataList.forEach((Item) => {
        const item: selectItem = {
            id: Item['miningMachineId'],
            name: Item['name'],
        }
        miningMachineList.push(item)
    })
}

const ProductList: UnwrapNestedRefs<ProductItem[]> = reactive([])
const ShowProductList: UnwrapNestedRefs<ProductItem[]> = reactive([])
const AddProduct = (modelList: ModelItem[], packageMode: selectItem, PackageCycle: selectItem, miningMachine: selectItem) => {
    const productItem: ProductItem = {
        id: modelList[0].id,
        packageModeId: packageMode.id,
        PackageCycleId: PackageCycle.id,
        name: `${miningMachine.name}[${packageMode.name}]`,
        Cycle: PackageCycle.name,
        modelList: modelList.slice(),
        info: [
            '服务商',
            '历史产出率：6.89%',
            '技术服务费：20%'
        ],
        price: modelList[0].price,
        fixedPrice: modelList[0].fixedPrice
    }
    ProductList.push(productItem)
}
const Init_ProductList = (dataList) => {
    ProductList.length = 0
    if(!dataList) return

    packageModeList.forEach((packageMode) => {
        PackageCycleList.forEach((PackageCycle) => {
            miningMachineList.forEach((miningMachine) => {
                const modelList: ModelItem[] = []

                dataList.forEach((Item) => {
                    if(PackageCycle.id !== Item['comboPeriodId'] ||
                       miningMachine.id !== Item['miningMachineId'] ||
                       packageMode.id !== Item['comboModelId']
                    ) return

                    const item: ModelItem = {
                        id: Item['miningMachineProductId'],
                        minerModelId: Item['miningMachineSpecificationId'],
                        model: GetItemForId(Item['miningMachineSpecificationId'], MinerModelList).name,
                        price: Item['price'],
                        fixedPrice: 0,
                        selected: false
                    }
                    modelList.push(item)

                    if (modelList.length !== 4) return;

                    modelList[0].selected = true
                    AddProduct(modelList, packageMode, PackageCycle, miningMachine)
                    modelList.length = 0
                })

                if (modelList.length === 0) return
                modelList[0].selected = true
                AddProduct(modelList, packageMode, PackageCycle, miningMachine)
            })
        })
    })

    SelectProductChange()
}
const changeProductModel = (ProductId: number, ModelId: number) => {
    ShowProductList.forEach( (Product) => {
        if(Product.id !== ProductId) return

        Product.modelList.forEach((model) => {
            if(model.id !== ModelId){
                model.selected = false
                return
            }

            model.selected = true
            Product.price = <number>model.price
        })
    })
}
const GetProductList = (currencyId: number) => {
    const success = (data: object) => {
        // 套餐模式
        Init_packageMode(data['comboModelList'])

        // 矿机规格
        Init_MinerModel(data['miningMachineSpecificationList'])

        // 矿机
        Init_miningMachine(data['miningMachineList'])

        // 套餐周期
        Init_PackageCycle(data['comboPeriodList'])

        // 产品
        Init_ProductList(data['productList'])
    }

    const data: CloudProductListDTO = {
        currencyId: currencyId
    }

    service.CloudProductList(data, success, () => {})
}

const SelectProductChange = () => {
    ShowProductList.length = 0

    ProductList.slice().forEach((Item => {
        const item = { ...Item }
        if(packageModeId !== 0 && item.packageModeId !== packageModeId) return

        if(PackageCycleId !== 0 && item.PackageCycleId !== PackageCycleId) return;

        if(MinerModelId !== 0){
            const modelList: ModelItem[] = []
            item.modelList.forEach((model) => {
                const Model = { ...model }
                if(Model.minerModelId !== MinerModelId) return;
                Model.selected = false
                modelList.push(Model)
            })

            item.modelList = modelList
        }

        if(item.modelList.length === 0) return;
        item.modelList[0].selected = true
        item.price = item.modelList[0].price
        ShowProductList.push(item)
    }))
}

const buyButton= (productId: number) => {
    if(IsLogin){
        route.push('/confirm-order/?productId=' + productId)
        return
    }

    route.push('/login/')
}
Init()
</script>

<template>
    <div class="user-box">
        <user-navigation :id="id"></user-navigation>
        <div class="news-box">
            <div class="search-box">
                <div class="title">
                    在售中
                </div>
                <el-divider style="margin: 0 0"/>
                <div :class="item.selected ? 'currency selected' : 'currency'" v-for="(item, index) in currencyList" :key="index" @click="currencyTab(item.id)">
                    <img class="logo-icon" :src="item.src" alt=""/>
                    <div class="name"> {{ item.name }} </div>
                </div>
            </div>

            <!-- 右侧展示-->
            <div class="cloud-view-box">
                <div class="select-bar">
                    <select class="select-box" v-model="packageModeId" @change="SelectProductChange">
                        <option :value="item.id" v-for="(item, index) in packageModeList" :key="index">{{ item.name }}</option>
                    </select>

                    <select class="select-box" v-model="MinerModelId" @change="SelectProductChange">
                        <option :value="item.id" v-for="(item, index) in MinerModelList" :key="index">{{ item.name }}</option>
                    </select>

                    <select class="select-box" v-model="PackageCycleId" @change="SelectProductChange">
                        <option :value="item.id" v-for="(item, index) in PackageCycleList" :key="index">{{ item.name }}</option>
                    </select>
                </div>

                <div class="product-list">
                    <div class="product" v-for="(item, index) in ShowProductList">
                        <div class="top">
                            <div class="name"> {{ item.name  }} </div>
                            <div class="Cycle"> {{ item.Cycle  }} </div>
                        </div>
                        <div class="main">
                            <div class="model-box">
                                <div class="title">矿机共享服务规格:</div>
                                <div class="model-list">
                                    <div :class="model.selected ? 'model selected' : 'model'" v-for="(model, index) in item.modelList"
                                         @click="changeProductModel(item.id, model.id)">
                                        <div class="switch"></div>
                                        <div class="text">{{ model.model }} </div>
                                    </div>
                                </div>
                            </div>
                            <el-divider class="dividing-line"/>
                            <div class="info-box">
                                <div class="info" v-for="(info, index) in item.info"> {{ info }} </div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="price"> {{ item.price }}</div>
                            <div class="buy-bottom" @click="buyButton(item.id)">立即购买</div>
                        </div>
                    </div>

                </div>
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
.news-box {
    width: 100%;
    background-color: #fdfdfe;
    padding: 26px 330px;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    .search-box {
        width: 353px;
        height: 855px;
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

        .selected {
            background: #0F173C !important;

            .name {
                color: #ffffff;
            }
        }

        .currency {
            height: 65px;
            margin: 20px 10px;
            background: #ffffff;
            border-radius: 12px;
            display: flex;
            cursor: pointer;

            .logo-icon {
                height: 50px;
                width: 50px;
                margin: auto 10px;
                border-radius: 50px;
                background: #FCB2B4;
            }

            .name {
                font-size: 16px;
                text-align: left;
                width: 100px;
                margin: auto;
            }
        }
        //    按钮筛选
        .screening {
            margin: 10px auto;
            p {
                line-height: 40px;
            }
        }
    }
    .news-navs-box {
        width: 251px;
        height: 174px;
        //margin: 20px auto;
        font-size: 18px;
        font-weight: 400;
        color: #ffffff;
        line-height: 18px;
        .announcement {
            width: 251px;
            height: 67px;
            background: #11173a;
            border-radius: 19px;
            margin: 10px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .news {
            width: 251px;
            height: 67px;
            background: #fff;
            border-radius: 19px;
            margin: 10px auto;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333333;
            cursor: pointer;
        }
    }
}

.cloud-view-box {
    width: 800px;
    height: 1000px;
    margin: 0 auto;

    border-radius: 20px;
    .select-bar {
        display: flex;

        .select-box {
            margin: 0 10px;
            width: 200px;
            height: 50px;
            padding: 10px;
            border-radius: 20px;
            border: 2px solid #BDBDBD;
        }
    }

    .product-list {
        display: flex;
        flex-wrap: wrap;

        .product {
            margin: 20px;
            height: 500px;
            width: 300px;
            background: #0F173C;
            border-radius: 20px;
            border: 2px solid #F2F2F2;

            .top {
                height: 120px;
                width: 100%;
                background: #0F173C;
                border-radius: 20px 20px 0 0;

                .name {
                    padding: 50px 10px 0 10px;
                    color: #ffffff;
                    font-size: 20px;
                }

                .Cycle {
                    padding: 5px 10px;
                    color: #ffffff;
                    font-size: 16px;
                }
            }

            .main {
                height: 300px;
                width: 100%;
                background: #ffffff;
                padding: 10px;

                .model-box {
                    height: 160px;

                    .title {
                        margin: 10px;
                    }

                    .model-list {
                        display: flex;
                        flex-wrap: wrap;

                        .selected {
                            background: #FF0CAE;

                            .switch {
                                background: #ffffff;
                            }

                            .text {
                                color: #ffffff !important;
                            }
                        }

                        .model {
                            margin: 10px;
                            width: 115px;
                            height: 50px;
                            border: 2px solid #F2F2F2;
                            border-radius: 15px;
                            display: flex;
                            cursor: pointer;

                            .switch {
                                width: 20px;
                                height: 20px;
                                margin: auto 10px;
                                border: 3px solid #FF0CAE;
                                border-radius: 50px;
                            }

                            .text {
                                font-size: 10px;
                                color: #FF0CAE;
                                width: 65px;
                                height: 16px;
                                margin: auto;
                            }
                        }
                    }
                }

                .dividing-line {
                    margin: 0 0;
                    color: #FFABDF;
                    background: #FFABDF;
                    border-top: 1px #FFABDF;
                }

                .info-box {
                    margin: 10px;
                    padding: 0 30px;

                    .info {
                        margin: 5px 0;
                    }
                }
            }

            .bottom {
                display: flex;
                margin: 15px auto;

                .price {
                    color: #ffffff;
                    margin: auto;
                    font-size: 20px;
                }

                .buy-bottom {
                    width: 100px;
                    height: 40px;
                    color: #ffffff;
                    background: #34D1AB;
                    border-radius: 15px;
                    padding: 10px 22px;
                    margin: auto;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
