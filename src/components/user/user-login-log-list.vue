<template>
    <div class="my-login">
        <div class="title-login">登陆记录</div>
        <div class="my-titles">
            <div class="time">登陆时间</div>
            <div>来源</div>
            <div>IP</div>
        </div>
        <div class="my-login-text">
            <div v-for="(item, index) in timeList" :key="index" class="state-login">
                <p class="text-time">{{ item.time }}</p>
                <p class="text-source">{{ item.source }}</p>
                <p class="text-state">{{ item.IP }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import { useRouter } from 'vue-router'
import { api } from "../../utils/api";
import { UnwrapNestedRefs } from "@vue/reactivity";

const router = useRouter()
const id = ref(1)
const service = new api()

const Init = () => {
    GetLoginLogsList()
}

const timeList = reactive([
    {time: '2023-4-30 13:20', source: 'web', IP: '成功' },
])
const GetLoginLogsList = () => {
    const ChangeTimeFormatted = (time: string) => {
        function padZero(value: number): string {
            return value.toString().padStart(2, '0');
        }
        const dateTime = new Date(time);
        return `${dateTime.getFullYear()}-${padZero(dateTime.getMonth() + 1)}-${padZero(dateTime.getDate())} ${padZero(dateTime.getHours())}:${padZero(dateTime.getMinutes())}:${padZero(dateTime.getSeconds())}`;

    }

    const successFunc = (data: object) => {
        if(! data.results) return
        timeList.length = 0

        data.results.forEach( (item: JSON) => {
            timeList.push(
                {
                    time: ChangeTimeFormatted(item['createTime']),
                    source: item['address'],
                    IP: item['ip'],
                }
            )
        })
    }

    service.UserLoginLogsList(successFunc, () => {})
}

Init()

</script>

<style scoped lang="scss">
// 登陆记录
.my-login {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px;
    box-sizing: border-box;
    border-radius: 20px;
    .title-login {
        width: 100%;
        background: rgba(254, 254, 254, 0.1);
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 25px 30px;
        box-sizing: border-box;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
        line-height: 18px;
    }
    .my-titles {
        width: 100%;
        //height: 48px;
        background: rgba(254, 254, 254, 0.1);
        display: flex;
        padding: 0 30px;
        box-sizing: border-box;
        justify-content: space-between;
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fff;
        .time {
            width: 134px;
        }
    }
    .my-login-text {
        width: 100%;
        background: rgba(254, 254, 254, 0.1);
        padding: 30px 30px;
        box-sizing: border-box;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .state-login {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        //background: rgba(254, 254, 254, 0.1);
        .text-time {
            font-size: 18px;
            font-weight: 400;
            color: #cdcdce;
            line-height: 18px;
        }
        .text-source {
            font-size: 18px;
            font-weight: 400;
            color: #cdcdce;
            line-height: 18px;
        }
        .text-state {
            font-size: 18px;
            font-weight: 400;
            color: #73d8a1;
            line-height: 18px;
        }
    }
}

</style>
