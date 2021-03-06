//初始化flyio
function createFly() {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}
function handleError(err){
console.log(err.message);
}

export function get (url,params={},showError=true){
    const fly = createFly()
    if(fly){
        return new Promise((resolve,reject)=>{
            fly.get(url,params).then(response=>{
                if(response && response.data &&response.data.error_code===0){
                resolve(response)
                }else{
                // reject(response)
                if(showError){
                 const msg=(response&&response.data&&response.data.msg) || '请求失败'
                mpvue.showToast({
                    title: msg,
                    icon: 'error',
                    duration: 2000
                })
                }
                }
            }).catch(err=>{
                handleError(err)
                reject(err)
            })
        })
    }
}
export function post (url,params={},showError=true){
    const fly = createFly()
    if(fly){
        return new Promise((resolve,reject)=>{
            fly.post(url,params).then(response=>{
                if(response && response.data &&response.data.error_code===0){
                resolve(response)
                }else{
                // reject(response)
                if(showError){
                 const msg=(response&&response.data&&response.data.msg) || '请求失败'
                mpvue.showToast({
                    title: msg,
                    icon: 'error',
                    duration: 2000
                })
                }
                }
            }).catch(err=>{
                handleError(err)
                reject(err)
            })
        })
    }
}