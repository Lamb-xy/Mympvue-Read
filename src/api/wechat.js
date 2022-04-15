//  //判断小程序是否获得授权
//  export function getSetting(auth,onSuccess,onFail) {
//       mpvue.getSetting({
//         success(res) {
//         //   console.log(res)
//           if(res.authSetting[`scope.${auth}`]){
//               onSuccess(res)
//           }else{
//               onFail(res)
//           }
//         },
//         fail(res) {
//           console.log(res)
//         }
//       })
//     }


//为了适配不同端，需要封装原函数
export function getUserProfile (onSuccess, onFail) {
    mpvue.getUserProfile({
        desc: '用于完善个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
            const { userInfo } = res
            if (userInfo) {
                // console.log(userInfo);
                onSuccess(userInfo)
            } else {
                onFail(res)
            }
        },
        fail: (res) => {
            console.log(res);
        }
    })
}

//在本地存储个人信息
export function setStorageSync (key, data) {
    mpvue.setStorageSync(key, data)
}
//从本地获取个人信息
export function getStorageSync (key) {
    return mpvue.getStorageSync(key)
}

import { getOpenId } from './index'
export function getUserOpenId (callback) {
    mpvue.login(
        {
            // console.log(res);
            success (res) {
                const { code } = res
                if (code) {
                    // console.log(code);
                    //这里调用后端getOpenId接口
                    getOpenId(code).then(response => {
                        // console.log(response);
                        const { data: { data: { openid } }
                        } = response
                        setStorageSync('openId', openid)
                        callback && callback(openid)
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    console.log(res);
                }
            },
            fail (res) {
                console.log(res);
            }
        }
    )
}

export function showLoading (title) {
    mpvue.showLoading({
        title,
        mask: true
    })
}
export function hideLoading (title) {
        mpvue.hideLoading()
}
export function showToast (title) {
    mpvue.showToast({
        title,
        duration:2000
        })
}
export function setNavigationBarTitle (title){
    mpvue.setNavigationBarTitle({title})
}