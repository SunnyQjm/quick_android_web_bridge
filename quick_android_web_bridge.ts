export default class QuickAndroidWebBridge {
    static JS_CALLER_NAME = "QuickAndroidJsCallEr";

    //////////////////////////////////////////////
    ///////// 回调名称定义
    //////////////////////////////////////////////
    static CALLBACK_BASE_NAME = 'Quick_Android_Js_Callback_';
    static CALLBACK_SCAN_CODE_SUCCESS = `${QuickAndroidWebBridge.CALLBACK_BASE_NAME}scan_code_success`;     // 扫码回调
    static CALLBACK_SCAN_CODE_FAIL = `${QuickAndroidWebBridge.CALLBACK_BASE_NAME}scan_code_fail`;     // 扫码回调


    static getCaller() {
        return (window && window[this.JS_CALLER_NAME]) || null;
    }

    //////////////////////////////////////////////////////
    /////////// Android 原生接口调用
    //////////////////////////////////////////////////////

    /**
     * 调用Android原生接口显示吐司提示
     * @param msg
     */
    static toast(msg: String) {
        let caller = this.getCaller();
        caller && caller.toast(msg);
    }

    /**
     * 调用原生接口显示snackbar
     * @param msg
     */
    static snackbar(msg: String) {
        let caller = this.getCaller();
        caller && caller.snackbar(msg)
    }

    /**
     * 调用原生接口进行扫码操作
     */
    static scanCode() {
        return new Promise((resolve, reject) => {
            let caller = this.getCaller();
            if (!caller) {
                return;
            }

            // 接收扫码成功结果回调
            window[QuickAndroidWebBridge.CALLBACK_SCAN_CODE_SUCCESS] = (result) => {
                resolve(result);
            };

            // 扫码失败回调
            window[QuickAndroidWebBridge.CALLBACK_SCAN_CODE_FAIL] = (errMsg) => {
                reject(errMsg);
            };

            // 调用原生扫码接口
            caller && caller.scanCode()
        });
    }
}
