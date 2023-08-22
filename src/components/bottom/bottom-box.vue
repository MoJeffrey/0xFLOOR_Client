<template>
    <div class="bottom">
        <div class="bottom-box">
            <span>
                <div class="logo-icon">
                    <img src="#" />
                    <p>OxFloor</p>
                </div>
                <div class="code-box">
                    <div></div>
                    <div></div>
                </div>
            </span>
            <div class="nav-box">
                <div>
                    <h1>公司</h1>
                    <p>关于我们</p>
                    <p>新闻</p>
                    <p>资讯</p>
                    <p>公告</p>
                </div>
                <div>
                    <h1>产品</h1>
                    <p>矿机共享</p>
                    <p>云托管</p>
                    <p>云服务</p>
                </div>
                <div>
                    <h1>服务</h1>
                    <p>机构服务</p>
                    <p>三方市场</p>
                    <p>数据中心</p>
                    <p>算力计算器</p>
                </div>
                <div>
                    <h1>支持</h1>
                    <p>帮助中心</p>
                    <p>提交工单</p>
                    <p>联系我们</p>
                </div>
            </div>
        </div>
        <div class="agreement-box">
            <div class="agr-box">
                <p>&nbsp;条款和条件&nbsp;</p>
                |
                <p>&nbsp;隐私政策&nbsp;</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.bottom {
    width: 1920px;
    height: 497px;
    background: #11173e;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    //align-items: center;
    position: relative;
}
.bottom-box {
    width: 1200px;
    height: 100%;
    display: flex;
    //justify-content: center;
    //align-items: center;
    padding-top: 110px;
    box-sizing: border-box;
    .logo-icon {
        display: flex;
        p {
            font-size: 34px;
            font-weight: bold;
            background: linear-gradient(
                to right,
                rgba(12, 243, 235, 0.8) 40%,
                rgb(231, 65, 231) 80%
            );
            -webkit-background-clip: text;
            color: transparent;
            cursor: pointer;
            //line-height: 58px;
            margin-left: 10px;
        }
    }
    .code-box {
        width: 225px;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
            width: 100px;
            height: 100px;
            background-color: white;
        }
    }
}
.nav-box {
    width: 690px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    div h1 {
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    div h1:hover {
        background: linear-gradient(
            320deg,
            rgba(0, 255, 166, 0.67),
            rgba(215, 15, 215, 0.31)
        );
        background-clip: text;
        color: #fff;
        border-radius: 10px;
        padding: 0px 10px;
        box-sizing: border-box;
        transition: all 0.3s ease;
    }
    div p:hover {
        background: linear-gradient(
            320deg,
            rgba(0, 255, 166, 0.67),
            rgba(215, 15, 215, 0.31)
        );
        background-clip: text;
        color: #fff;
        border-radius: 10px;
        padding: 0px 10px;
        box-sizing: border-box;
        transition: all 0.3s ease;
    }
    div p {
        font-size: 18px;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.7;
        margin: 30px auto;
        cursor: pointer;
        transition: all 0.3s ease;
    }
}
.agreement-box {
    position: absolute;
    bottom: 56px;
    right: 550px;
    .agr-box {
        display: flex;
        font-size: 18px;
        transition: all 0.3s ease;
        font-weight: 400;
        color: #fefefe;
        opacity: 0.5;
        cursor: pointer;
    }
    .agr-box > P:hover {
        color: #aaccb7;
        transition: all 0.3s ease;
    }
}
</style>
