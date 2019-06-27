import SkeletonComponent from './index.vue'
const Skeleton = {
    install: function(Vue){
        Vue.component('Skeleton', SkeletonComponent)
    }
}
export default Skeleton