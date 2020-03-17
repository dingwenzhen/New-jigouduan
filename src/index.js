import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import App from './App';
import { HashRouter as Router, Route } from "react-router-dom"
import store from "@store"
import { encryptionData, decryptData } from "@utils/crypto"
// 加密  解密  添加到左右用于中，使用的时候可以通过 this.$加密/解密  使用
// 加密
React.Component.prototype.$encryptionData = encryptionData
// 解密
React.Component.prototype.$decryptData = decryptData

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App} />
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);


