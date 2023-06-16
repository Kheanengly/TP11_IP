

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
         
          multiple= "true"
          mode="inline"
          :defaultSelectedKeys="['101']"
          :defaultOpenKeys="['101']"
          :selectedKeys="selectedKeys" 
          :openKeys="openKeys"
          :style="{ height: '100%', borderRight: 0 }"
        >
       
            <a-sub-menu  v-for="(listItem,index1) in listItems " :key=listItem.categoryID @click="this.getcategoryByID(listItems[index1].categoryID ) ">
              <template #title>
                <span>
                  <user-outlined />
                  {{ listItem.name }}
                </span>
              </template>
              <!-- <a-menu-item v-for="(sub,index) in listSubItems" :key ="`${index1}-${index}`">
                <div  v-if="sub.categoryID === listItem.categoryID" >
                  {{sub.name}}
                </div>
                <div v-else-if="sub.categoryID !== listItem.categoryID">
                   {{ index=index-1 }}
                </div>
              </a-menu-item>      -->
              <div v-for="(sub,index) in listSubItems" :key="index">
                <a-menu-item v-if="sub.categoryID === listItem.categoryID" :key ="sub.subcategoryID">
                  {{sub.name}}
                </a-menu-item>
              </div>
            </a-sub-menu>
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
import { UserOutlined, LaptopOutlined, NotificationOutlined, ShopTwoTone } from '@ant-design/icons-vue';
import { defineComponent, nextTick, ref, toValue } from 'vue';
// import axios from 'axios';
export default {
  
              listcategory : `<a-menu-item class="items" key="1">Home</a-menu-item>`,
              // selectedKeys1: ref<string[]>(['2']),
             
          
          
              
              selectedKeys2: ref<String>(["Laptops","Cars","Phone"]),
              collapsed: ref<Boolean>(false),
              openKeys: ref<String>(['Laptops']),
        data() {
          return {
              listsub : ref([]),
              listItems: ref([]),
              nameSub : '',
              oneItem : [],
              listSubItems: [],
              listProduct: [],
              // test : [[ {name:"Asus"},{name:"Lenovo"},{name:"Dell"}],[{name:"Toyota"},{name:"Mazada"},{name:"Merserdes"},{name:"BMW"}],[{name:"Iphone"}]],
             
          }
        },
        methods: {
          async getcategory() {
              let res =await fetch("http://localhost:8080/api/read_category");
                 this.listItems = await res.json();
          },
          async getcategoryByID(id){
               
                let data = [];
                let res =await fetch("http://localhost:8080/api/read_subcategory_CID/"+id);
                // console.log(`http://localhost:8080/api/subcategory_ID/`+id)
                this.oneItem = await res.json()       
                console.log(this.oneItem);
                console.log(this.oneItem.data[0].name)
                
  
                
          },
          async getitems() {
             let res = await fetch("http://localhost:8080/api/read_subcategory");
                this.listSubItems = await res.json();
                console.log(this.listSubItems[0].subcategoryID)
          },
          async getproduct() {
            let res = await fetch("http://localhost:8080/api/read_product");
                this.listProduct = await res.json();
                // console.log(this.listProduct.data[0].name)
          },

          
             

          // Show(){
          //   console.log(this.listSubItems[0])
          // }

        },
        mounted() {
          this.getcategory()
          this.getitems()
          this.getproduct()
          // this.show()

        },components : {
            UserOutlined,
            LaptopOutlined,
            NotificationOutlined,
        }

        
};
</script>