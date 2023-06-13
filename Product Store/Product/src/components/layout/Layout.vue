

<template>
  <a-layout>
    <a-layout-header class="header" style="position: relative; display: flex; justify-content: space-around;">
      <div class="logo" />
      <div id="menu_bar" style="" >
        <a-menu 
          id="list_menu"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px'}"
         
          >
          <a-menu-item class="items" key="1">Home</a-menu-item>
          <a-menu-item class="items" key="2">About</a-menu-item>
          <a-menu-item class="items" key="3">Product</a-menu-item>
        </a-menu>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
       
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
          
        >
          <div v-for="(list,index) in listItems.length " :key="listItems[index].categoryID">
            <a-sub-menu :key=index>
            <template #title>
              <span>
                <user-outlined />
                {{ listItems[index].name }}
              </span>
            </template>
            <div v-for="(listsub,index) in listSubItems.length" :key="listSubItems[index].subcategoryID">
              <a-menu-item key="1" >{{ listSubItems[index].name }}</a-menu-item>          
            </div>
           
            </a-sub-menu>
          </div>
          
          <!-- <a-sub-menu key="sub2">
            <template #title>
              <span>
                <laptop-outlined />
                subnav 2
              </span>
            </template>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #title>
              <span>
                <notification-outlined />
                subnav 3
              </span>
            </template>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu> -->
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          Content
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;

}
.site-layout-background {
  background: #fff;
}

#menu_bar{
  margin: 0;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  width: 50% 
}

#list_menu{
  width: 100%;
   margin: 0;
  font-size: 20px;
  display: flex;
  
  justify-content: center;
  /* gap:2rem; */
  
}


#list_menu::before{
  content: unset;
}



</style>

<script >
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
// import axios from 'axios';
export default {
        data() {
          return {
              listItems: [],
              listSubItems: [],
              listProduct: [],
              listcategory : `<a-menu-item class="items" key="1">Home</a-menu-item>`
              
          }
        },
        methods: {
          async getcategory() {
              let res =await fetch("http://localhost:8080/api/read_category");
                 this.listItems = await res.json();
                 console.log(this.listItems[0].categoryID);
          },
          async getitems() {
             let res = await fetch("http://localhost:8080/api/read_subcategory");
                this.listSubItems = await res.json();
                // console.log(this.listSubItems)
          },
          async getproduct() {
            let res = await fetch("http://localhost:8080/api/read_product");
                this.listProduct = await res.json();
                console.log(this.listProduct.data[0].name)
          }
        },
        mounted() {
          this.getcategory()
          this.getitems()
          this.getproduct()
        },components : {
            UserOutlined,
            LaptopOutlined,
            NotificationOutlined,
        }

        
};
</script>