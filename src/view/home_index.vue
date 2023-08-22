<template>
    <div class="box">
        <!--        首页展示-->
        <div class="home-box">
            <!--            导航栏-->
            <user-navigation></user-navigation>
            <!--            首页展示图-->
            <div class="animation">
                <div class="text-introduce">
                    <h1>开创共享计算模式，重新定义云计算未来</h1>
                    <p>
                        网心科技打造了流量资源变现的分布模式边缘计算平台模式,
                        并成为业界领先的边缘计算服务商。
                    </p>
                    <div class="transaction">开始交易</div>
                </div>
            </div>
        </div>
        <!--        首页商品展示-->
        <div class="home">
            <!--            最新优惠-->
            <div class="latest-goods">
                <p>最新优惠</p>
                <div class="laGoods-box">
                    <div v-for="(item, index) in goodsList" :key="index">
                        {{ item }}
                    </div>
                </div>
            </div>
            <!--            热门商品-->
            <div class="hot-goods">
                <p>热门商品</p>
                <div class="hotGoods-box">
                    <el-icon size="48" color="#999"><ArrowLeft /></el-icon>
                    <div v-for="(item, index) in goodsList" :key="index">
                        {{ item }}
                    </div>
                    <el-icon size="48" color="#999"><ArrowRight /></el-icon>
                </div>
            </div>
            <!--            机房展示-->
            <div class="machine"></div>
            <!--            赚取收益-->
            <div class="income">
                <p>快来看看有机会赚取多少收益</p>
                <div class="income-box">
                    <div class="calculation">
                        <span>
                            <div>
                                <p>加密货币类型</p>
                                <div
                                    class="calculations"
                                    style="
                                        border-top-left-radius: 20px;
                                        border-bottom-left-radius: 20px;
                                    "
                                >
                                    <p>TYU</p>
                                    <el-icon size="28" color="#fff"
                                        ><ArrowDown
                                    /></el-icon>
                                </div>
                            </div>
                            <div>
                                <p>天数</p>
                                <div class="calculations">
                                    <p>120</p>
                                    <el-icon size="28" color="#fff"
                                        ><ArrowDown
                                    /></el-icon>
                                </div>
                            </div>
                            <div>
                                <p>TH/s</p>
                                <div
                                    class="calculations"
                                    style="
                                        border-top-right-radius: 20px;
                                        border-bottom-right-radius: 20px;
                                    "
                                >
                                    <p>50TH/s</p>
                                    <el-icon size="28" color="#fff"
                                        ><ArrowDown
                                    /></el-icon>
                                </div>
                            </div>
                        </span>
                        <div class="transactionBox">计算收益</div>
                    </div>
                    <!--                    查看矿机共享服务-->
                    <div class="share">
                        <div class="share-text">
                            <p>预计24小时收益</p>
                            <div class="share-texts">
                                $--
                                <h1>(BTC 120D 50TH/s)</h1>
                            </div>
                            <span>查看此矿机共享服务</span>
                        </div>
                        <div class="viewService">查看此矿机共享服务</div>
                    </div>
                </div>
            </div>
            <!--            步骤-->
            <div class="step">
                <p>三个简单步骤，快速开始挖矿</p>
                <div class="steps">
                    <div class="steps-box">
                        <div></div>
                        <p>创建账户</p>
                    </div>
                    <div class="steps-box">
                        <div></div>
                        <p>选择服务</p>
                    </div>
                    <div class="steps-box">
                        <div></div>
                        <p>开始赚钱</p>
                    </div>
                </div>
                <div class="immediately">从今天开始</div>
            </div>
        </div>
        <!--        底部-->
        <div>
            <bottom-box></bottom-box>
        </div>
    </div>
</template>

<script setup lang="ts">
import UserNavigation from '../components/navigation/user-navigation.vue'
import BottomBox from '../components/bottom/bottom-box.vue'

const goodsList = [
    { id: 1, img: '#' },
    { id: 2, img: '#' },
    { id: 3, img: '#' },
]
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

.box {
    width: 1920px;
    background-color: #fdfdfe;
    margin: 0 auto;
}
.home-box {
    width: 1920px;
    height: 1080px;
    background-color: #0f1746;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: space-around;
}
.animation {
    width: 1740px;
    height: 891px;
    background-image: url('../src/assets/img/homeBack.png');
    background-size: 100% 100%;
    background-position: center center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text-introduce {
        position: relative;
        width: 100%;
        height: 60%;
        text-align: center;
        margin: 0 auto;
        //background-color: #89dbbb;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 100px;
        box-sizing: border-box;
        h1 {
            font-size: 66px;
            font-weight: 400;
            color: #ffffff;
            line-height: 146px;
        }
        p {
            width: 542px;
            height: 80px;
            font-size: 20px;
            font-weight: 400;
            color: #ffffff;
            line-height: 60px;
            opacity: 0.8;
            text-align: center;
            //margin-top: 50px;
        }
    }
    // button特效
    .transaction {
        background: transparent;
        color: #fff;
        font-size: 17px;
        text-transform: uppercase;
        font-weight: 600;
        border: none;
        padding: 20px 30px;
        perspective: 30rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.308);
    }

    .transaction::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 28px;
        background: linear-gradient(
            320deg,
            rgba(0, 255, 166, 0.67),
            rgba(215, 15, 215, 0.31)
        );
        z-index: 1;
        transition: background 3s;
    }

    .transaction:hover::before {
        animation: rotate 1s;
        transition: all 0.5s;
    }

    @keyframes rotate {
        0% {
            transform: rotateY(180deg);
        }

        100% {
            transform: rotateY(360deg);
        }
    }
    .transaction {
        width: 226px;
        height: 70px;
        //background: #f510a9;
        opacity: 0.91;
        border-radius: 28px;
        font-size: 36px;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        //margin-top: 127px;
        position: absolute;
        bottom: 0;
        margin-left: 44px;
    }
}
.home {
    width: 1920px;
    //height: 3393px;
    margin: 20px auto;
    //background-color: #89dbbb;
    padding: 46px 370px;
}
.latest-goods {
    width: 100%;
    //background-color: white;
    p {
        font-size: 36px;
        font-weight: 400;
        color: #333333;
        line-height: 60px;
    }
    .laGoods-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
            width: 360px;
            height: 220px;
            background: #0a0a0a;
            border-radius: 20px;
        }
    }
}
.hot-goods {
    width: 100%;
    //background-color: white;
    margin: 55px auto;
    p {
        font-size: 36px;
        font-weight: 400;
        color: #333333;
        line-height: 60px;
    }
    .hotGoods-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
            width: 324px;
            height: 453px;
            background: #0a0a0a;
            border-radius: 20px;
        }
    }
}

// 机房展示
.machine {
    width: 100%;
    height: 454px;
    background-color: #333333;
}
// 收益
.income {
    width: 100%;
    border-radius: 20px;
    margin: 114px auto;
    p {
        font-size: 24px;
        font-weight: 400;
        color: #333333;
        line-height: 60px;
    }
    .income-box {
        width: 1180px;
        height: 490px;
    }
    .calculation {
        width: 100%;
        height: 265px;
        background: #11173e;
        box-shadow: 16px 13px 30px 0px rgba(191, 191, 191, 0.13);
        border-top-left-radius: 21px;
        border-top-right-radius: 21px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        box-sizing: border-box;
        span {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        p {
            font-size: 18px;
            font-weight: 400;
            color: #ffffff;
            line-height: 60px;
            margin-left: 20px;
        }
    }
    .transactionBox {
        width: 160px;
        height: 66px;
        background: linear-gradient(90deg, #69ceae 0%, #81e790 100%);
        border-radius: 20px;
        margin-top: 60px;
        font-size: 20px;
        font-weight: 400;
        color: #ffffff;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
    }
    .calculations {
        width: 300px;
        height: 71px;
        border: 1px solid #eee;
        padding: 20px 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .share {
        width: 100%;
        height: 225px;
        background: #fdfdfe;
        border-bottom-left-radius: 21px;
        border-bottom-right-radius: 21px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40px;
        box-sizing: border-box;
        .share-text {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                font-size: 18px;
                font-weight: 400;
                color: #333333;
                //line-height: 60px;
            }
            .share-texts {
                display: flex;
                align-items: center;
                font-size: 48px;
                font-weight: 600;
                color: #ef36aa;
                //line-height: 60px;
                h1 {
                    font-size: 36px;
                    font-weight: 500;
                    color: #666666;
                    //line-height: 60px;
                }
            }
            span {
                font-size: 18px;
                font-weight: 400;
                color: #999999;
                line-height: 60px;
            }
        }
        .viewService {
            width: 236px;
            height: 66px;
            background: linear-gradient(90deg, #69ceae 0%, #81e790 100%);
            border-radius: 20px;
            font-size: 20px;
            font-weight: 400;
            color: #ffffff;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
        }
    }
}
// 步骤
.step {
    width: 100%;
    height: 560px;
    background: #11173e;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p {
        font-size: 36px;
        font-weight: 400;
        color: #ffffff;
        line-height: 60px;
    }
    .steps {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }
    .steps-box {
        height: 190px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        div {
            width: 110px;
            height: 110px;
            background: #ffffff;
            opacity: 0.26;
            border-radius: 20px;
        }
        p {
            font-size: 24px;
            font-weight: 400;
            color: #ffffff;
            line-height: 60px;
            text-align: center;
        }
    }
    .immediately {
        width: 200px;
        height: 60px;
        background: linear-gradient(
            320deg,
            rgba(0, 255, 166, 0.67),
            rgba(215, 15, 215, 0.31)
        );
        border-radius: 20px;
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
    }
}
</style>
