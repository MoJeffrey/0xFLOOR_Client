<template>
    <div class="bottom">
        <div class="left-box">
            <img class="logo" alt="" src="/src/assets/img/bottom/logo.png"/>
            <div class="text">Join our newsletter to stay up to date on features and releases</div>

            <div class="input_gmail">
                <img class="logo_google" alt="" src="/src/assets/img/bottom/logo_google.png"/>
                <el-input placeholder="Email Address"/>
            </div>

        </div>
        <div class="center-box">
            <div class="item">常见问题</div>
            <div class="item">加入团队</div>
            <div class="item">关于我们</div>
            <div class="item">帮助中心</div>
            <div class="item">公告</div>
            <div class="item">意见反馈</div>
        </div>
        <div class="right-box">
            <div class="item">
                <img class="logo" alt="" src="/src/assets/img/bottom/logo_github.png"/>
                <div class="text">github-fill</div>
            </div>
            <div class="item">
                <img class="logo" alt="" src="/src/assets/img/bottom/logo_x.png"/>
                <div class="text">twitter</div>
            </div>
            <div class="item">
                <img class="logo" alt="" src="/src/assets/img/bottom/logo_ins.png"/>
                <div class="text">ins</div>
            </div>
            <div class="item">
                <img class="logo" alt="" src="/src/assets/img/bottom/logo_fb.png"/>
                <div class="text">facebook</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">

.bottom {
    border-top: 0.08rem solid rgba(189,196,202,0.26);
    background: #000000;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    position: relative;

    .left-box {
        width: 25%;

        .logo {
            width: 10rem;
        }

        .text {
            margin-left: 1.5rem;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
            font-weight: 400;
            color: rgba(255,255,255,0.5);
        }



        .input_gmail {
            margin-top: 2rem;
            margin-left: 1.5rem;
            width: 20rem;
            position:relative;

            .logo_google {
                width: 1.5rem;
                height: 1.5rem;
                position: absolute;
                z-index: 9999;
                right: 1rem;
                top: 6px;
            }

            ::v-deep .el-input__inner {
                margin-left: 3%;
                font-size: 0.5rem;
                font-family: PingFang SC-Medium, PingFang SC,serif;
                font-weight: 500;
                color: rgba(255,255,255,0.5);
                line-height: 1.5rem;
            }

            ::v-deep .el-input__wrapper {
                width: 100%;
                height: 2.5rem;
                background: #131515;
                color:#fff;
                box-shadow: none !important;
                border-radius: 20px;
                text-align: center;
            }
        }

    }

    .center-box {
        display: flex;
        padding: 2rem 10rem 0 10rem;
        width: 60%;
        flex-wrap: wrap;

        .item {
            flex: 1;
            font-size: 0.5rem;
            font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
            font-weight: 400;
            color: #FFFFFF;
        }
    }

    .right-box {
        width: 15%;

        .item {
            display: flex;
            margin: 1rem 0;

            .logo {
                width: 2rem;
                height: 2rem;
            }

            .text {
                margin: 0 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.5rem;
                font-family: Microsoft YaHei-Regular, Microsoft YaHei,serif;
                font-weight: 400;
                color: rgba(255,255,255,0.5);
                text-transform: uppercase;
            }
        }
    }
}

</style>
