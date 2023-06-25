<template>
    <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0;display: flex; justify-content: space-around ">
          <div>
            <h1 style="font-size: 18px;">Daskboard Product</h1>
          </div>
          <div>   
            <a-breadcrumb-item>User</a-breadcrumb-item>
            <a-breadcrumb-item>Bill</a-breadcrumb-item> 
            <a-breadcrumb-item>App</a-breadcrumb-item> 
           </div>
          <a-button type="primary" @click="showModal1" size="large"> Create Category
            <template #icon>
              <PlusOutlined />
            </template>
          </a-button>
          <a-modal v-model:visible="visible1" width="1000px" title="Create Product" @ok="createProduct" >

            <div style="width: 100%; display: flex; justify-content: center">
              <a-space direction="vertical" >
              <label style="font-size: 16px;">Name Items</label>
                <a-select
                  v-model:value="value"
                  show-search
                  placeholder="Select Items"
                  style="width: 500px"
                  :options="listSubC"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"

                ></a-select>
                <label style="font-size: 16px;">Name Product</label>
                <a-input v-model="new_name" placeholder="Input Name Product" @input="handleInput_nameProduct" style="width: 500px"/>
                <label style="font-size: 16px;">Upload Image</label>
                <a-upload
                v-model:file-list="fileList"
                name="file"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange1"
                >
                <a-button>
                  <upload-outlined></upload-outlined>
                  Click to Upload
                </a-button>
              </a-upload>
              <div>
                <div style="display: flex;justify-content: space-around; position: relative; ">
                
                  <a-space direction="horizontal"><div >
                    <label style="font-size: 16px;" >Shope 1</label>
                    <a-input v-model="shop1" placeholder="Input Name Shope" @input="handleInput_shop1"></a-input>
                  </div>
                  <div>
                    <label style="font-size: 16px;">Price</label>
                    <a-input v-model="shop2" placeholder="Input Price" @input="handleInput_shop2"></a-input>
                  </div></a-space>
                
                </div>
                <div style="display: flex;justify-content: space-around; position: relative; ">
                  <a-space direction="horizontal">  <div >
                    <label style="font-size: 16px;">Shope 2 </label>
                    <a-input v-model="price1" placeholder="Input Name Shope" @input="handleInput_price1"></a-input>
                  </div>
                  <div>
                    <label style="font-size: 16px;">Price</label>
                    <a-input v-model="price2" placeholder="Input Price" @input="handleInput_price2"></a-input>
                  </div></a-space>
                
                </div>
              </div>
              </a-space>
            </div>
         
          </a-modal>
       
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">

            <!-- Listing data from table  -->
            <a-table
                    :columns="columns"
                    :data-source="listP"
                    :row-key = "getRowKey" 
                    bordered 
                    
                                  
                            >
                <template #bodyCell="{ column, index, record }" >
                <template v-if="column.key == 'name'" >{{ record.name }}</template>
                <template v-else-if="column.key === 'Editor'">
                   <a-space >
                    <a-button type="primary" style="background-color: ;"  @click="showModal(index)" :key="index">Edit</a-button>
                    <a-button type="primary" style="background-color: rgb(255, 44, 44);border: rgb(185, 20, 20); border-radius: ;"  @click="deleteProduct(index)" >Delete</a-button>
                    <a-modal
                      v-model:visible="visible"
                      title="Category"
                      ok-text="OK"
                      cancel-text="Cancel"
                      @ok="UpdateCategory(index)"
                    >
                    <a-space direction="vertical">
                        <div>
                          <h3>Category : {{ this.default_categoryID }}</h3>
                          <h3>Old Name : {{ this.default_name }}</h3>
                        </div>
                      <div style="text-align: centers;"><h2>Update Information Category</h2></div>
                      <label style="font-size: 16px;">Name Category</label>
                        <a-select
                          v-model:value="value"
                          show-search
                          placeholder="Select a Category"
                          style="width: 300px"
                          :options="listSubC"
                          :filter-option="filterOption"
                          @focus="handleFocus"
                          @blur="handleBlur"
                          @change="handleChange"

                        ></a-select>
                      <label>New Items</label>
                      <a-input :v-model="new_name" placeholder="Input Items"   @input="handleInput_nameCategory" style="width: 300px"/>
                      </a-space>

                    </a-modal>
                    
                   </a-space>
                </template>
                <template  v-else-if="column.key === 'image'" >
                  <div style="width: 100%; display: flex; justify-content: center">
                    <a-button type="dashed" block style="width: 130px; height: 40px;" @click="showModal2(index)">Image Product</a-button>
                    <a-modal v-model:visible="visible2" width="700px" title="Image Product" @ok="hideModal2">
                     <div style="width: 100%; display: grid; justify-content: center;text-align: center;">
                      <h2>{{ listP[this.index].name }}</h2>
                      <a-image
                        :width="300"
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                     </div>
                    </a-modal>
                  </div>
                </template>
                <template  v-else-if="column.key === 'store'" >
                  <div style="width: 100%; display: flex; justify-content: center">
                    <a-button type="dashed" block style="width: 130px; height: 40px; " @click="showModal3(index)">Store</a-button>
                    <a-modal v-model:visible="visible3" width="700px" title="Image Product" @ok="hideModal3">
                      <div  style="width: 100%; display: grid; justify-content: center;text-align: center;">
                        <h2>{{ listP[this.index].name }}</h2>
                        <div v-for="(pro,index) in listP[this.index].store" :key="index">
                          <h2>{{ pro.shop }} - {{ pro.price }} $</h2>
                        </div>
                      </div>
                    
                    </a-modal>
                  </div>
                </template>
              </template>
                
            </a-table>
        </div>
    </a-layout-content>
</template>



<script lang="ts">
import {
    UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  FileOutlined,
  ExclamationCircleOutlined ,
  PlusOutlined
  
} from '@ant-design/icons-vue';
import  { defineComponent, ref, withKeys    } from 'vue'; 
import { Ref, UnwrapRef ,createVNode } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { message, Modal,SelectProps  } from 'ant-design-vue';
import type { TableProps ,UploadChangeParam } from 'ant-design-vue';
const visible = ref<boolean>(false);
const visible1 = ref<boolean>(false);
const visible2 = ref<boolean>(false);
const visible3 = ref<boolean>(false);
const fileList = ref([]);





const columns= [

    {
        title : 'ID',
        dataIndex : 'productID',
        sorter : true,
        width : '10%',
        key:'productID',
    },
    {
        title : 'Product',
        dataIndex: 'name',
        sorter : true,
        width : '15%',
        key:'name',


    },
    {
        title : 'Subcategory_ID',
        dataIndex: 'subcategoryID',
        sorter : true,
        width : '15%',
        key:'subcategoryID',


    },
    {
        title : 'Image',
        dataIndex: 'image',
        sorter : true,
        width : '20%',
        key:'image',


    },
    {
        title : 'Store',
        width : '20%',
        key : 'store'
    },
    {
        title : 'Editor',
        width : '20%',
        key : 'Editor'
    }

]

const options = ref<SelectProps['options']>([]);

interface DataItem {
  subcategoryID: number;
  name: string;
  categoryID:number;

}
    
export default defineComponent({
    props: {
    dataObject: {
      type: Array,
      required: true,
    },
  },

  components: {
    UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
    FileOutlined,
    PlusOutlined
    
  },


  setup(){
    const listSubC = ref([])
    return{
      listSubC
    }
  },

  data() {
    return {
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      columns,
      index:ref(),
      
      listP : ref([]),
      itemRefs : ref([]),
      visible,
      confirm,
      visible1,
      visible2,
      visible3,
      value: ref<string | undefined>(undefined),
      options,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      
      

      // data from dataform of update category 
      new_categoryID : ref(),
      new_name : ref(''),
      image : ref,
      default_categoryID : ref(''),
      default_name: ref(''),
      shop1 : ref(''),
      shop2 : ref(''),
      price1 : ref(),
      price2 : ref()
     
    };
  },
  methods:{
      async listProduct(){
            let res = await fetch("http://localhost:8080/api/read_product")
            this.listP = await res.json();
            this.listP = this.listP.data
            console.log(this.listP.data)
            return this.listP
            
        },
      // async listCategory(){
      //       let res =await fetch("http://localhost:8080/api/read_category");
      //       this.listC = await res.json();
            
      //       this.listC = this.listC.map(item => {
      //         return {
      //           value: item.categoryID,
      //           label: item.name
      //         }
      //       })
      //       this.option = this.listC;
      //       console.log(this.option)
      //       return this.listC
      //   },
      async listSubCategory(){
              let res = await fetch("http://localhost:8080/api/read_subcategory")
              this.listSubC = await res.json();
              
              this.listSubC = this.listSubC.map(item => {
                return {
                  value: item.subcategoryID,
                  label: item.name
                }
              })
              this.option = this.listSubC;
              console.log(this.listSubC);
              return this.listSubC
      },

      async createProduct(event){
        visible1.value = false;
        fetch("http://localhost:8080/api/create_product",{
            method:"POST",
            headers: {
              "Content-Type": "multipart/form-data"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "subcategoryID": this.new_categoryID,              // keys and values we want to add
                "name": this.new_name,
                "store[0][shop]" : this.shop1,
                "store[1][shop]" : this.shop2,
                "store[0][price]" : this.price1,
                "store[1][price]" : this.price2,
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listSubC = this.listSubCategory()
              return data
              
            }).then(data => {
                return message.success(data.message);
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
             
              
            })
      },
    

        async deleteProduct(index){
          let res = await this.listP[index].productID
          
          console.log(res)
           fetch("http://localhost:8080/api/delete_product/"+res,{
            method:"POST",
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listP = this.listProduct()
              return data
               
            }).then(data => {
              if(data.update){
                return message.success(data.message)
              }else{
                return message.error(data.message)
              }
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
            })
        },

        async UpdateCategory(index){
          visible.value = false;
          let res = await this.listSubC[index].subcategoryID
          console.log(this.new_categoryID,this.new_name)
          fetch("http://localhost:8080/api/update_subcategory",{
            method:"POST",
            headers: {
              "Content-Type": "application/json"    // declares format of data
            },
            body: JSON.stringify(               // turns data into JSON string
              {
                "categoryID": this.new_categoryID,              // keys and values we want to add
                "name": this.new_name,
                "subcategoryID" : res
              }
            ) 
           }).then(response => response.json())
              .then(data => {
              // Process the response data
              console.log(data);
              this.listSubC = this.listSubCategory()
              return data
            
            }).then(data =>{
              if(data.update){
                return message.success(data.message)
              }else{
                return message.error(data.message)
              }
            })
            .catch(error => {
              // Handle any errors
              console.error(error);
              
            })
            
        },
       
        getRowKey(record, index) {
          return index; // Return the index as the row key
        },

        handleInput_categoryID(event) {
          console.log(event.target.value);
          this.new_categoryID = event.target.value
        },
        
        handleInput_nameProduct(event){
          console.log(event.target.value);
          this.new_name = event.target.value
          
        },

        handleInput_shop1(event){
          console.log(event.target.value);
          this.shop1 = event.target.value
          
        },

        handleInput_shop2(event){
          console.log(event.target.value);
          this.shop2 = event.target.value
          
        },

        handleInput_price1(event){
          console.log(event.target.value);
          this.price1 = event.target.value
          
        },

        handleInput_price2(event){
          console.log(event.target.value);
          this.price2 = event.target.value
          
        },




        // async show(){
            
        //     console.log(this.new_categoryID,this.new_name)
        // },
        
         showModal(index){
            console.log(index)
            visible.value = true;
            let i=0;
            for( i=0;i<this.listC.length;i++){
              console.log( this.listC[i])
              if(this.listSubC[index].categoryID === this.listC[i].value){
                this.default_categoryID = this.listC[i].label
              }
            }
            this.default_name = this.listSubC[index].name
          },
          hideModal (event){
            visible.value = false;
            console.log(this.new_categoryID,this.new_name)
          },
          showModal1(){
            visible1.value = true;
          },
          hideModal1 (event){
            visible1.value = false;
            console.log(this.new_categoryID,this.new_name)
          },

          showModal2(index){
            
            this.index = index
            console.log(this.index)
            visible2.value = true;
          },
          hideModal2 (event){
            visible2.value = false;
            console.log(this.new_categoryID,this.new_name)
          },

          showModal3(index){
            
            this.index = index
            console.log(this.index)
            visible3.value = true;
          },
          hideModal3 (event){
            visible3.value = false;
            console.log(this.new_categoryID,this.new_name)
          },

          handleChange (value: string){
            this.new_categoryID = value;
            console.log(`selected ${value}`);
          },
          handleBlur  (){
            console.log('blur');
          },
          handleFocus (){
            console.log('focus');
          },
          filterOption(input: string, option: any)  {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          },

          handleChange1 (info: UploadChangeParam)  {
            this.image = info.fileList
            console.log(info.file)
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
           
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }},

          confirm  ()  {
            Modal.confirm({
              title: 'Confirm',
              icon: createVNode(ExclamationCircleOutlined),
              content: 'Bla bla ...',
              okText: 'OK',
              cancelText: 'Cancel',
            });
          },
        
  },
  mounted(){
    // this.listCategory()
    this.listSubCategory()
    this.listProduct()

    // this.show()
  }

}); 
</script>

<style>
/* #components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
} */

.header{
    background-color: rgb(105, 100, 100)
}

tr{
    background-color: antiquewhite;
    border: 2px solid black;
    font-size: large;
}

td{
    background-color:rgb(193, 193, 184);
    font-size: medium;
    margin-top:100px;
}

.ant-breadcrumb{
  height: 70px;
  margin: auto;
  text-align: center;
}
</style>
