export default class strFormat {
    //限制输入数字
    static fmtNum(str) {
        let result = str.match(/^[0-9]*$/)
        return result;      
    }
    
    //限制输入只能为汉字
    static fmtStr(str){
         let result=str.replace(/[^\u4E00-\u9FA5]/g, '')
         return result
    }
}