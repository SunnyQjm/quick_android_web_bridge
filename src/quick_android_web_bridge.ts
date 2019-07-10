
export default class QuickAndroidWebBridge {
    static JS_CALLER_NAME: string = "QuickAndroidJsCallEr";

    //////////////////////////////////////////////
    ///////// 回调名称定义
    //////////////////////////////////////////////
    static CALLBACK_BASE_NAME: String = 'Quick_Android_Js_Callback_';
    // 扫码回调
    static CALLBACK_SCAN_CODE_SUCCESS = `${QuickAndroidWebBridge.CALLBACK_BASE_NAME}scan_code_success`;
    // 扫码回调
    static CALLBACK_SCAN_CODE_FAIL = `${QuickAndroidWebBridge.CALLBACK_BASE_NAME}scan_code_fail`;
    // 获取系统信息成功
    static CALLBACK_GET_SYSTEM_INFO_SUCCESS = `${QuickAndroidWebBridge.CALLBACK_BASE_NAME}get_system_info_success`;
    // 获取系统信息失败
    static CALLBACK_GET_SYSTEM_INFO_FAIL = `${QuickAndroidWebBridge.CALLBACK_BASE_NAME}get_system_info_fail`;

    static getCaller() {
        // @ts-ignore
        return (window && window[this.JS_CALLER_NAME]) || null;
    }

    static doNativeCall(functionName: string, callback: (caller: any) => void) {
        let caller = this.getCaller();
        caller && caller[functionName] && callback(caller);
    }

    //////////////////////////////////////////////////////
    /////////// Android 原生接口调用
    //////////////////////////////////////////////////////

    /**
     * 调用Android原生接口显示吐司提示
     * @param msg
     */
    static toast(msg: String) {
        this.doNativeCall("toast", caller => {
            caller.toast(msg)
        });
    }

    /**
     * 调用原生接口显示snackbar
     * @param msg
     */
    static snackbar(msg: String) {
        this.doNativeCall("snackbar", caller => {
            caller.snackbar(msg);
        });
    }

    /**
     * 调用原生接口进行扫码操作
     */
    static scanCode(): Promise<string> {
        return new Promise((resolve: Function, reject: Function) => {
            this.doNativeCall("scanCode", caller => {
                // 接收扫码成功结果回调
                // @ts-ignore
                window[QuickAndroidWebBridge.CALLBACK_SCAN_CODE_SUCCESS] = (result: string) => {
                    resolve(result);
                };

                // 扫码失败回调
                // @ts-ignore
                window[QuickAndroidWebBridge.CALLBACK_SCAN_CODE_FAIL] = (errMsg: string) => {
                    reject(errMsg);
                };
                caller.scanCode();
            });
        });
    }

    /**
     * 调用原生接口获取手机设备的信息
     */
    static getSystemInfo(): Promise<string> {
        console.log('try to get system info');
        return new Promise((resolve, reject) => {
            this.doNativeCall("getSystemInfo", caller => {
                // 获取系统信息成功回调
                // @ts-ignore
                window[QuickAndroidWebBridge.CALLBACK_GET_SYSTEM_INFO_SUCCESS] = (result: string) => {
                    resolve(result)
                };

                // 获取系统信息失败回调
                // @ts-ignore
                window[QuickAndroidWebBridge.CALLBACK_GET_SYSTEM_INFO_FAIL] = (errMsg: string) => {
                    reject(errMsg)
                };
                caller.getSystemInfo();
            });
        });
    }
}
