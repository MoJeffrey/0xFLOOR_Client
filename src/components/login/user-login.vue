<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { UserVerifyEmailDTO } from "../../utils/ResultDTO/UserVerifyEmailDTO";
import { api } from "../../utils/api";
import { UserLoginDTO } from "../../utils/ResultDTO/UserLoginDTO";

const service = new api()
const router = useRouter()

const formLabelAlign = reactive({
    email: '',
    pwd: '',
})
// 校验
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
        },
    ],
    pwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '至少6位数', trigger: 'blur' },
        { max: 18, message: '最大18位数', trigger: 'blur' },
    ],
})
// 登录前协议
const agreement = ref(false)
const agreementButton = () => {
    agreement.value = !agreement.value;
}

// 登录
const login = (ruleFormRef: FormInstance | undefined) => {
    if (!agreement.value) {
        ElNotification({
            title: '提示',
            message: '请先阅读并同意服务条款及用户协议',
        })
        return;
    }

    if (!ruleFormRef) return

    const data: UserLoginDTO = {
        email: formLabelAlign.email,
        password: formLabelAlign.pwd,
    }

    service.UserLogin(data, regMain, () => {})

}
// 跳转注册
const regBut = () => {
    router.push('/register')
}

/**
 * 跳转主页
 */
const regMain = () => {
    router.push('/')
}

// 验证邮箱
const verifyEmail = () => {
    const success = (data: JSON) => {
        ElNotification({
            message: 'Email验证成功',
            type: 'success'
        })
        router.push('/login')
    }

    if (! router.currentRoute.value.query.code) return

    const data: UserVerifyEmailDTO = {
        key: router.currentRoute.value.query['code'].toString()
    }

    service.UserVerifyEmail(data, success, () => {})
}

verifyEmail()

</script>

<template>
    <div class="login-box">
        <div class="userLogin-box">
            <p>选择一种方式，来登录账号 ：</p>
            <!--            电子邮箱-->
            <div class="email">
                <el-icon size="24"><Message /></el-icon>
                <p>电子邮箱</p>
            </div>
            <!--            登录账号-->
            <el-form
                ref="ruleFormRef"
                label-position="top"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
                :rules="rules"
                autocomplete="off"
                hide-required-asterisk="false"
            >
                <el-form-item label="电子邮箱" prop="email">
                    <el-input
                        v-model="formLabelAlign.email"
                        placeholder="请输入电子邮箱"
                    />
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input
                        v-model="formLabelAlign.pwd"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    />
                </el-form-item>
            </el-form>
            <!--            协议-->
            <div class="agreement">
                <div
                    :class="agreement === false ? 'yuan' : 'yuan1'"
                    @click="agreementButton"
                ></div>
                <div>
                    我已阅读并同意 <a>服务条款</a> 及
                    <a>用户协议</a>
                </div>
            </div>
            <!--            登录按钮-->
            <div class="login-but" @click="login(ruleFormRef)">登录</div>
            <!--            忘记密码&注册区域-->
            <div class="forgetPwd-register">
                <div>忘记密码？</div>
                <div>
                    尚无账号？
                    <span style="color: #76db9e" @click="regBut">注册</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.login-box {
    width: 1920px;
    height: 1080px;
    background: #11173e;
    display: flex;
    justify-content: flex-end;
    padding: 215px 198px;
    box-sizing: border-box;
    margin: 0 auto;
}
.userLogin-box {
    width: 645px;
    height: 658px;
    background-color: rgba(238, 234, 234, 0.09);
    border-radius: 30px;
    padding: 71px 93px;
    box-sizing: border-box;
    color: #fefefe;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fefefe;
        line-height: 60px;
    }
    :deep(.el-input) {
        width: 465px;
        height: 61px;
        border: 2px solid #dddddd;
        border-radius: 12px;
        box-shadow: none;
    }
    :deep(.el-input__wrapper) {
        background: none;
    }
    :deep(
            .el-form--default.el-form--label-top
                .el-form-item
                .el-form-item__label
        ) {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #fefefe;
        line-height: 40px;
    }
}
/* 电子邮箱*/
.email {
    width: 160px;
    height: 60px;
    display: flex;
    /*justify-content: space-evenly;*/
    align-items: center;
    background: linear-gradient(81deg, #39d1a9 0%, #4fe48c 99%);
    border-radius: 10px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #fefefe;
    line-height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: -15px;
    p {
        margin-left: 9px;
    }
}
.agreement {
    display: flex;
    align-items: center;
    margin-top: -32px;
    div {
        margin-left: 8px;
    }
    a {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7be197;
        line-height: 80px;
        border-bottom: 0.1rem solid #7be197;
    }
}
// 选项框
.yuan {
    width: 18px;
    height: 18px;
    border: 1px solid #69cdae;
    border-radius: 50%;
    transition: all 1s ease;
}
.yuan1 {
    width: 18px;
    height: 18px;
    border: 2px solid;
    background: linear-gradient(97deg, #69cdae 0%, #7fe692 98%);
    border-radius: 50%;
    transition: all 1s ease;
}
// 登录按钮
.login-but {
    width: 460px;
    height: 60px;
    background: linear-gradient(81deg, #6aceae 0%, #7ee493 99%);
    border-radius: 10px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #fefefe;
    line-height: 60px;
    cursor: pointer;
    text-align: center;
}
// 注册&忘记密码
.forgetPwd-register {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    div {
        cursor: pointer;
    }
}
</style>
