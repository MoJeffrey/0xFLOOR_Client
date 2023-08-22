import {AxiosRequestConfig} from "axios";
import { createAxios } from './axios'
import { UserRegisterDTO } from "./ResultDTO/UserRegisterDTO";
import { ElNotification } from 'element-plus'
import { UserVerifyEmailDTO } from "./ResultDTO/UserVerifyEmailDTO";
import {UserLoginDTO} from "./ResultDTO/UserLoginDTO";
import {User} from "./User";
import {CloudCurrencyListDTO} from "./ResultDTO/CloudCurrencyListDTO";
import {CloudProductListDTO} from "./ResultDTO/CloudProductListDTO";
import {CloudGetProductDTO} from "./ResultDTO/CloudGetProductDTO";
import {CloudCreateOrderDTO} from "./ResultDTO/CloudCreateOrderDTO";
import {CloudPaymentInfoDTO} from "./ResultDTO/CloudPaymentInfoDTO";
import {CloudConfirmPaymentDTO} from "./ResultDTO/CloudConfirmPaymentDTO";
import {UserCloudPowerListMinerListDTO} from "./ResultDTO/UserCloudPowerListMinerListDTO";
import {UserOrderDetailsDTO} from "./ResultDTO/UserOrderDetailsDTO";
import {UserMinerDetailsDTO} from "./ResultDTO/UserMinerDetailsDTO";
import {UserMinerGetPledgeInfoDTO} from "./ResultDTO/UserMinerGetPledgeInfoDTO";
import {UserMinerPledgeDTO} from "./ResultDTO/UserMinerPledgeDTO";
import {UserMinerOpenOrStop} from "./ResultDTO/UserMinerOpenOrStopDTO";
import {UserGetBalanceDTO} from "./ResultDTO/UserGetBalanceDTO";
import {UserElectricityRechargeDTO} from "./ResultDTO/UserElectricityRechargeDTO";
import {UserGetWalletDTO} from "./ResultDTO/UserGetWalletDTO";
import {UserCashOutApplyDTO} from "./ResultDTO/UserCashOutApplyDTO";
import {UserOrderListDTO} from "./ResultDTO/UserOrderListDTO";
import {UserGetWalletListDTO} from "./ResultDTO/UserGetWalletListDTO";
import {UserGetConfirmRechargeDTO} from "./ResultDTO/UserGetConfirmRechargeDTO";
import {UserGetWalletLogListDTO} from "./ResultDTO/UserGetWalletLogListDTO";
import {UserGetWithdrawalAddressListDTO} from "./ResultDTO/UserGetWithdrawalAddressListDTO";
import {UserWithdrawalAddressCreateDTO} from "./ResultDTO/UserWithdrawalAddressCreateDTO";
import {UserWithdrawalAddressDeleteDTO} from "./ResultDTO/UserWithdrawalAddressDeleteDTO";

export class api {

    constructor() {

    }

    public UserWithdrawalAddressDelete(data: UserWithdrawalAddressDeleteDTO,
                                       success: (data: JSON) => void,
                                       error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/withdrawals_address_delete/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserWithdrawalAddressCreate(data: UserWithdrawalAddressCreateDTO,
                                       success: (data: JSON) => void,
                                       error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/withdrawals_address_create/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetWithdrawalAddressList(data: UserGetWithdrawalAddressListDTO,
                                        success: (data: JSON) => void,
                                        error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_withdrawals_address_list/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetWithdrawalsInfo(success: (data: JSON) => void,  error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_withdrawals_info/',
            method: 'POST',
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetWalletLogList(data: UserGetWalletLogListDTO,
                                  success: (data: JSON) => void,
                                  error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_wallet_log_list/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetConfirmRecharge(data: UserGetConfirmRechargeDTO,
                                  success: (data: JSON) => void,
                                  error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_confirm_recharge/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetRechargeInfo(success: (data: JSON) => void,  error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_recharge_info/',
            method: 'POST',
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetWalletList(data: UserGetWalletListDTO,
                             success: (data: JSON) => void,
                             error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_wallet_list/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserCashOutApply(data: UserCashOutApplyDTO,
                           success: (data: JSON) => void,
                           error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/cash_out_apply/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetWallet(data: UserGetWalletDTO,
                         success: (data: JSON) => void,
                         error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'user/frontend/get_wallet/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserElectricityRecharge(data: UserElectricityRechargeDTO,
                                   success: (data: JSON) => void,
                                   error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/electricity-recharge/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetBalance(data: UserGetBalanceDTO,
                          success: (data: JSON) => void,
                          error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/get-balance/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserMinerOpenOrStop(data: UserMinerOpenOrStop,
                               success: (data: JSON) => void,
                               error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/miner-open-or-stop/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserMinerPledge(data: UserMinerPledgeDTO,
                           success: (data: JSON) => void,
                           error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/pledge/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserMinerGetPledgeInfo(data: UserMinerGetPledgeInfoDTO,
                                  success: (data: JSON) => void,
                                  error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/miner-get-pledge-info/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            if (data['msg']){
                ElNotification({message: data['msg'], type: 'error'})
            }
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserMinerDetails(data: UserMinerDetailsDTO,
                            success: (data: JSON) => void,
                            error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/miner-details/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserOrderDetails(data: UserOrderDetailsDTO,
                            success: (data: JSON) => void,
                            error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'order/frontend/order-details/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserCloudPowerListMinerList(data: UserCloudPowerListMinerListDTO,
                                       success: (data: JSON) => void,
                                       error: (data: JSON) => void){

        const config: AxiosRequestConfig = {
            url: 'mining-machine-product/frontend/user/cloud-power-list/miner-list/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserCloudPowerListCurrencyList(success: (data: JSON) => void,
                                          error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'mining-machine-product/frontend/user/cloud-power-list/currency-list/',
            method: 'POST',
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public CloudConfirmPayment(data: CloudConfirmPaymentDTO,
                               success: (data: JSON) => void,
                               error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'order/frontend/confirm-payment/',
            method: 'POST',
            data: data,
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public CloudPaymentInfo(data: CloudPaymentInfoDTO,
                            success: (data: JSON) => void,
                            error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'order/frontend/get-payment-info/',
            method: 'POST',
            data: data,
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserOrderList(data: UserOrderListDTO,
                         success: (data: JSON) => void,
                         error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'order/frontend/order-list/',
            method: 'GET',
            params: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public CloudCreateOrder(data: CloudCreateOrderDTO,
                            success: (data: JSON) => void,
                            error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'order/frontend/create-order/',
            method: 'POST',
            data: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public CloudGetProduct(data: CloudGetProductDTO,
                           success: (data: JSON) => void,
                           error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'mining-machine-product/frontend/get-product/',
            method: 'GET',
            params: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public CloudProductList(data: CloudProductListDTO,
                            success: (data: JSON) => void,
                            error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'mining-machine-product/frontend/mining-machine-product-list/',
            method: 'GET',
            params: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public CloudCurrencyList(data: CloudCurrencyListDTO,
                             success: (data: JSON) => void,
                             error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'mining-machine-product/frontend/currency-list/',
            method: 'GET',
            params: data
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserLoginLogsList(success: (data: JSON) => void,
                             error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'user/frontend/login-logs-list/',
            method: 'GET'
        };
        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserGetInfo(success: (data: JSON) => void,
                       error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: 'user/frontend/user-info/',
            method: 'GET'
        };
        const successFunc = (data) => {
            const u = new User()
            u.setUserName(data.username)
            u.setEmail(data.email)

            success(data)
        }

        const errorFunc = (data) => {
            error(data)
        }

        return createAxios(config, successFunc, errorFunc)
    }

    public UserLogout(success: (data: JSON) => void,
                      error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: '/user/frontend/rest-auth/logout/',
            method: 'POST'
        };

        const successFunc = (data) => {
            ElNotification({message: data.detail, type: 'success'})
            new User().clear()
            success(data)
        }

        const errorFunc = (data) => {
            const Notification = (Msg) => {
                ElNotification({message: Msg, type: 'error'})
            }

            const enumParam = ['detail']

            enumParam.forEach( (value: string) => {
                if(! data[value]) return

                if(typeof data[value] === 'string') Notification(data[value])
                else
                    data[value].forEach( (Msg: string) => {
                        Notification(Msg)
                    })
            })


            error(data)
        }
        return createAxios(config, successFunc, errorFunc)

    }

    public UserLogin(data: UserLoginDTO,
                     success: (data: JSON) => void,
                     error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: '/user/frontend/rest-auth/login/',
            data: data,
            method: 'POST'
        };

        const successFunc = (data) => {
            ElNotification({message: '登入成功', type: 'success'})
            const u = new User()
            u.setToken(data.key)

            success(data)
        }

        const errorFunc = (data) => {
            const Notification = (Msg) => {
                ElNotification({message: Msg, type: 'error'})
            }

            const enumParam = ['email', 'non_field_errors', 'msg']

            enumParam.forEach( (value: string) => {
                if(! data[value]) return

                if(typeof data[value] === 'string') Notification(data[value])
                else
                data[value].forEach( (Msg: string) => {
                    Notification(Msg)
                })
            })


            error(data)
        }
        return createAxios(config, successFunc, errorFunc)

    }

    public UserRegister(data: UserRegisterDTO,
                        success: (data: JSON) => void,
                        error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: '/user/frontend/rest-auth/registration/',
            data: data,
            method: 'POST'
        };

        const successFunc = (data) => {
            if(data.detail){
                ElNotification({message: data.detail, type: 'success'})
            }

            success(data)
        }

        const errorFunc = (data) => {
            const Notification = (Msg) => {
                ElNotification({message: Msg, type: 'error'})
            }

            const enumParam = ['username', 'email', 'password1', 'password2']

            enumParam.forEach( (value: string) => {
                if(data[value]){
                    data[value].forEach( (Msg: string) => {
                        Notification(Msg)
                    })
                }
            })


            error(data)
        }
        return createAxios(config, successFunc, errorFunc)

    }

    public UserVerifyEmail(data: UserVerifyEmailDTO,
                           success: (data: JSON) => void,
                           error: (data: JSON) => void){
        const config: AxiosRequestConfig = {
            url: '/user/frontend/rest-auth/registration/verify-email/',
            data: data,
            method: 'POST'
        };

        const successFunc = (data) => {
            success(data)
        }

        const errorFunc = (data) => {
            const Notification = (Msg) => {
                ElNotification({message: Msg, type: 'error'})
            }

            const enumParam = ['detail']

            enumParam.forEach( (value: string) => {
                if(data[value]){
                    data[value].forEach( (Msg: string) => {
                        Notification(Msg)
                    })
                }
            })


            error(data)
        }
        return createAxios(config, successFunc, errorFunc)

    }
}
