<template>
<div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"></Floor>
    <Like></Like>
    <Brand></Brand>
</div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex'

import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
    name:'Home',

    computed: {
        ...mapState({
            floors: state => state.home.floors
        })
    },
    mounted() {
        // 分发给异步action请求获取楼层列表
        this.$store.dispatch('getFloors')
        this.$store.dispatch('getBanners')
        this.$store.dispatch('getTodays')
    },
    components:{
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
    }
}
</script>

<style scoped>


</style>
