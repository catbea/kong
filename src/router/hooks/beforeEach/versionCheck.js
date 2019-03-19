
import { checkIOSVersion } from '@/utils/tool'
export default async (to, from, next) => {
    let version = checkIOSVersion()
    if (parseFloat(version) < parseFloat('10.3')) {
        this.$dialog.alert({
            message: '当前操作系统无法正常使用AW大师，请升级iOS系统后再次尝试'
        })
        return
    }
    console.log(version)
}