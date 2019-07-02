//公共确认弹框
function confirmDialog(title, content, $confirm){
    return Dialog.$create({
        type:"confirm",
        icon:"",
        title: title,
        content: content,
        confirmBtn: {
            text: "确定",
            active: false,
            disable: false,
            href: "javascript:;"
        },
        cancelBtn:{
            text: "取消",
            active: true,
            disable: false,
            href: 'javascript:;'
        },
        onConfirm: $confirm, //取消事件为空，弹框也消失
        onCancel: () => {}
    }).show()
}
export { confirmDialog }