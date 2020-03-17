import axios from "axios";
import qs from "qs"

const server = axios.create({
    //延迟的时间
    timeout: 5000,
    // 允许携带cookie
    withCredential: true
})
//拦截器的配置
server.interceptors.request.use((config) => {
    // 判断当请求的数据是get形式的时候
    if (config.method.toUpperCase() == "GET") {
        // config.headers["content-type"]="application/json";
        // 浅复制  如果前面非要写data就把数据给params  因为get请求的参数是在params中
        config.params = {...config.params}
        
        // 如果是post请求的时候  设置响应头
    } else if (config.method.toUpperCase() == "POST") {
        config.headers["content-type"]="application/json";
        //config.data=qs.stringify(config.data)
    }
    return config;
}, (err) => {
    Promise.reject(err);
})
server.interceptors.response.use((res) => {
    // if (res.status == 200) {
        return res.data;
    // }
}, (err) => {
    Promise.reject(err);
})
export default (method, url, data = {}) => {
    if (method.toUpperCase() == "GET") {
        return server.get(url, {
            params: data
        })
    } else if (method.toUpperCase() == "POST") {
        return server.post(url, data);
    }
}
