/**
 * Created by 曹昊 on 2017/3/2.
 */
const Syscommon = (($) => {

    /**
     * ------------------------------------------------------------------------
     * 私有方法
     * ------------------------------------------------------------------------
     */
    function writeLog() {
        console.log("当前用户名称为：" + Syscommon.userName);
    }

    /**
     * --------------------------------------------------------------------------
     * 公开方法
     * --------------------------------------------------------------------------
     */
    let Syscommon = {

        userName: '未设置',

        setUserName(name) {
            Syscommon.userName = name
            writeLog(name);
        },
        //详情页面的记忆查询
        //js存储
        setSaveContent(key, content){
            localStorage.setItem(key,content);
        },
        //js获取存储内容
        getSaveContent(key){
            var result=window.localStorage.getItem(key);
            if(result==null)
                return "";
            else
                return result;
        },
        //删除存储内容
        delSaveContent(key){
            window.localStorage.removeItem(key);
        },
        //文本框回车字符转化
        GetPageControlsNew(element) {
            var reVal = "";
            $(element).find('input,select,textarea').each(function (r) {
                var id = $(this).attr('id');
                var value = $(this).val();
                var type = $(this).attr('type');
                switch (type) {
                    case "checkbox":
                        if ($(this).is(':checked')) {
                            reVal += '"' + id + '"' + ':' + '"1",';
                        } else {
                            reVal += '"' + id + '"' + ':' + '"0",';
                        }
                        break;
                    default:
                        reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",';
                        break;
                }
            });
            reVal = reVal.substr(0, reVal.length - 1).replace(/\n/g,"\\\\n").replace(/\r/g,"\\\\n");
            return JSON.parse( '{' + reVal + '}' );
        }
    }

    return Syscommon;

})(jQuery)

export default Syscommon