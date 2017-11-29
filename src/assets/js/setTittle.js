/**
 * 修改微信title的方法
 * @param t
 */
const setTitle = function (t) {
    document.title = t;
    let i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
        setTimeout(function () {
            i.remove();
        }, 9)
    };
    document.body.appendChild(i);
};
export {
    setTitle
}