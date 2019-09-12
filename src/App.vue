<template>
  <div id="app">
    <div class="pc">
      <router-view class="router-view" v-if="isRouterAliveTwo"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
      reloadTwo: this.reloadTwo
    };
  },
  created() {},

  data() {
    return {
      isRouterAlive: true,
      isRouterAliveTwo: true,
      scrollTop: 0,
      btnFlag: false
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = true;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    reloadTwo() {
      this.isRouterAliveTwo = false;
      this.$nextTick(function() {
        this.isRouterAliveTwo = true;
      });
    },
    showIcon() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.showIcon, true);
  },
  destroyed() {
    //离开该页面需要移除这个监听的事件
    window.removeEventListener("scroll", this.showIcon);
  },
  beforeDestroy() {
    localStorage.removeItem('subnameList')
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
 .flex_a{
   display:flex;
   justify-content: flex-start;
   align-items: center;
 } 
 .flex_b{
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .flex_f{
   display: flex;
   justify-content: flex-start;
   align-items: center;
 }
  .flex_f_f{
   display: flex;
   justify-content: flex-start;
   align-items: flex-start;
   flex-direction: column;
 }
  .flex_b_c{
   display: flex;
   justify-content: space-between;
   align-items: center;
   flex-direction: column;
 }
 .flex_b_a{
    display: flex;
   justify-content: space-around;
   align-items: center;
   flex-direction: column;  
 }
 .flex_s{
   display: flex;
   justify-content: flex-start;
 }
 .flex_s_c{
   display: flex;
   justify-content: flex-start;
   align-items: center;
 }
p {
  margin: 0;
}

a {
  text-decoration: none !important;
}

a li {
  color: #fff;
}
.color2{
  color: #4e78ff;
}
.el-input__inner{
   background-color: #11113f !important;
   border: 1px solid #333151!important;
}
.number,.btn-prev,.btn-next,.btn-quicknext,.more{
   background-color: #11113f !important;
   color: #b0aed0 !important;
}
.el-pagination__total,.el-input__inner,.el-pagination__jump{
  color: #b0aed0 !important;
}
.color3{
  color: #3bf6ef;
}
.fontstyle1{
  	font-size: 0.2rem;
	font-weight: normal;
	font-style: italic;
	font-stretch: normal;
   text-overflow: ellipsis
}
.fontstyle2{
  	font-family: MicrosoftYaHei;
	font-size: 0.16rem;
	font-weight: normal;
	font-stretch: normal;
	line-height: 30px;
	letter-spacing: 0px;
  text-overflow: ellipsis
}
.fontsize1{
  font-size: 0.24rem
}
.fontsize2{
  font-size: 0.16rem
}
.fontsize3{
  font-size: 18px;
}
.opacite1{
  opacity: 0.6;
}
.opacite2{
  opacity: 0.9;
}
.opacite3{
  opacity: 0.7;
}
.color5{
  color: #366af5;
}
.color6{
  color: #3bd9f1;
}
.color7{
  color: #ef2c8f;
}
.color8{
  color: #36bef3;
}
.color9{
  color: #36eee7
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1300px!important;
  /*margin-top: 60px;*/
     overflow-x: hidden;
    overflow-y: hidden;
    text-align: left;
   -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
    -ms-scroll-chaining: chained;
    -ms-overflow-style: none;
    -ms-content-zooming: zoom;
    -ms-scroll-rails: none;
    -ms-content-zoom-limit-min: 100%;
    -ms-content-zoom-limit-max: 500%;
    -ms-scroll-snap-type: proximity;
    -ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);
    -ms-overflow-style: none;
    overflow: auto;

}
.pc{
  min-width: 1300px!important;
  font-size: 14px;
}
.backtop {
  position: fixed;
  bottom: 0.28rem;
  right: 0.26rem;
  border-radius: 50%;
  background-color: rgba(236, 243, 251, 1);
}

.backtop img {
  width: 0.4rem;
  height: 0.4rem;
}

body {
  /*background: #5714d1;*/
}

li {
  list-style: none;
  /*display: inline-block;*/
}

input,
button {
  outline: none;
  line-height: normal;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /*-webkit-appearance: none;*/
  /*appearance: none;*/
  margin: 0;
  color: #999999;
}

.el-timeline-item__tail {
  top: 0.1rem !important;
}

.el-timeline-item__node--normal {
  top: 0.1rem !important;
}
@media (max-width: 1300px) {
#app{
  font-size: 100px!important
}
}
/* 火狐 */

/*input{*/

/*-moz-appearance:textfield;*/

/*}*/

/*input::-webkit-input-placeholder ,textarea::-webkit-input-placeholder {*/

/*color: #666*/

/*}*/

/*　input::-moz-placeholder textarea::-moz-placeholder {*/

/*color: #666*/

/*}*/

/*input::-moz-placeholder, textarea::-moz-placeholder {*/

/*color:#666;*/

/*}*/

/*　　input:-ms-input-placeholder, textarea:-ms-input-placeholder {*/

/*color:#666;*/

/*}*/
</style>
