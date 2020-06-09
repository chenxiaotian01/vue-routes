<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideSubCategorys" @mouseenter="showFirstCategorys">
        <h2 class="all">全部商品分类</h2>
        <transition name="move">
        <div class="sort" v-show="isShowFirst">
            <div class="all-sort-list2" @click="toSearch2">

              <div class="item" :class="{item_on: index===currentIndex}" v-for="(c1, index) in categoryList" 
                :key="c1.categoryId" @mouseenter="showSubScategorys(index)">
                <h3>
                  <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                  <!-- <a href="javascript:" @click="toSearch({categoryName: c1.categoryName, category1Id: c1.categoryId})">{{c1.categoryName}}</a> -->
                  <a href="javascript:" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                        <!-- <a href="javascript:" @click="toSearch({categoryName: c2.categoryName, category2Id: c2.categoryId})">{{c2.categoryName}}</a> -->
                        <a href="javascript:" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>

                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                          <!-- <a href="javascript:" 
                            @click="toSearch({categoryName: c3.categoryName, category3Id: c3.categoryId})">
                            {{c3.categoryName}}
                          </a> -->
                          <a href="javascript:" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import { mapState, mapActions } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2,
      isShowFirst:this.$route.path==='/'
    };
  },
  computed: {
    //   计算3级列表
    categoryList1() {
      return this.$store.state.home.categoryList;
    },
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  },
  mounted() {
    // this.getCategoryList();
  },
  methods: {
    ...mapActions(["getCategoryList"]),
    // 显示一级分类列表
    showFirstCategorys(){
      this.isShowFirst = true
      // 让子分类列表改变未指定的下标
      this.currentIndex = -1
    },
    // 隐藏
    hideSubCategorys(){
        this.currentIndex = -2
        if(this.$route.path!=='/'){
          this.isShowFirst = false
        }
    },
    // 显示指定下标对应的子分类列表
    showSubScategorys: throttle(function (index) {
        console.log('showSubScategorys', index)
        // 只有当光标没有完全离开时, 才更新
        if (this.currentIndex!==-2) {
          this.currentIndex = index
        }
      }, 200),
      // 跳转到Search
      toSearch({categoryName,category1Id,category2Id,category3Id}){
        
        // 准备query
        const query = {
          categoryName,
        }
        if(category1Id){
          query.category1Id = category1Id
        }else if(category2Id){
          query.category2Id = category2Id
        }else if(category3Id){
          query.category3Id = category3Id
        }
        const location = {
          name:'search',
          query
        }
        this.$router.push(location)
      },
      toSearch2(event){
        const {categoryname,category1id,category2id,category3id} = event.target.dataset
        // 如果点击的不是分类项，直接结束
        if(!categoryname) return

        const query = {
          categoryName:categoryname
        }
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else if(category3id){
          query.category3Id = category3id
        }
        const location = {
          name:'search',
          query
        }
        const keyword = this.$route.params.keyword
        if(keyword){
          location.params = {keyword}
        }
        this.$router.push(location)
        this.hideSubCategorys()
      }
  }
};
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;
        // 指定显示过程的transtion
        &.move-enter-active {
          transition: all .3s;
        }
        // 指定隐藏时的样式
        &.move-enter, &.move-leave-to {
          opacity: 0;
          height: 0;
        }

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &.item_on {
              background: #ccc;
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>