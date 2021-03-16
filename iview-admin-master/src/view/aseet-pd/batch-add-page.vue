<template>
  <div>
    <Card>
      <h2 class="addBat">增加盘点批次</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
      <FormItem label="开始盘点日期"  prop="pdStartDate" >
            <DatePicker placeholder="盘点开始日期"  style="width: 200px"  v-model="formValidate.pdStartDate" ></DatePicker>

      </FormItem>
      <FormItem label="结束盘点日期"  prop="pdEndDate">
            <DatePicker type="date"  placeholder="盘点结束日期" v-model="formValidate.pdEndDate"  name = "pdEndDate" style="width: 200px"></DatePicker>
    </FormItem>
     <FormItem label="盘点范围"  prop="orgList">
       <Checkbox
         :key="1"
       :indeterminate="indeterminate"
       :value="checkAll"
       @click.prevent.native="handleCheckAll">福清地区</Checkbox>

       <CheckboxGroup v-model="formValidate.fqList"  @on-change="checkAllGroupChange" >
         <Checkbox label="福耀玻璃工业集团股份有限公司（总办）FYG"></Checkbox>
         <Checkbox label="福耀浮法FYF"></Checkbox>
         <Checkbox label="福耀ARG"></Checkbox>
         <Checkbox label="福耀集团(福建)机械制造有限公司"></Checkbox>
         <Checkbox label="福耀汽玻FYA"></Checkbox>
         <Checkbox label="福耀三锋"></Checkbox>
         <Checkbox label="福清汽车玻璃"></Checkbox>
         <Checkbox label="福清汽车饰件"></Checkbox>
       </CheckboxGroup>

       <Checkbox
         :key="2"
         :indeterminate="gzindeterminate"
         :value="gzcheckAll"
         @click.prevent.native="gzhandleCheckAll">广州地区</Checkbox>

       <CheckboxGroup v-model="formValidate.gzList"  @on-change="gzcheckAllGroupChange" >

         <Checkbox label="广州汽车玻璃"></Checkbox>
       </CheckboxGroup>



     </FormItem>
     <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
        </Form>
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkBatchSubmit } from '@/api/fuyaoAssetPdBat'
//import $ from 'jquery';
export default {
  name: 'params',
  data () {
      return {
         formValidate: {
                    pdEndDate: '',
                    pdStartDate: '',
                    orgList: [],
                    fqList:[],
                    gzList:[],
                },
                ruleValidate: {
                orgList: [
                { required: true, type: 'array', min: 1, message: '至少选择一个', trigger: 'change' },
                ],
                pdStartDate: [
                { required: true, type: 'date', message: '请输入盘点开始时间', trigger: 'change' }
                ],
                pdEndDate: [
                { required: true, type: 'date', message: '请输入盘点结束时间', trigger: 'change' }
                ]
                },
                indeterminate: true,
                checkAll: false,
        gzindeterminate: true,
        gzcheckAll: false,
                orgList: ['福耀玻璃工业集团股份有限公司（总办）FYG', '福耀浮法FYF','福耀ARG','福耀集团(福建)机械制造有限公司','福耀汽玻FYA','福耀三锋','福清汽车玻璃','福清汽车饰件','广州汽车玻璃','福耀汽车铝件（福建）有限公司']
            }


  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
      handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.formValidate.fqList = ['福耀玻璃工业集团股份有限公司（总办）FYG', '福耀浮法FYF','福耀ARG','福耀集团(福建)机械制造有限公司','福耀汽玻FYA','福耀三锋','福清汽车玻璃','福清汽车饰件','广州汽车玻璃','福耀汽车铝件（福建）有限公司'];
                } else {
                    this.formValidate.fqList = [];
                }
            },
    gzhandleCheckAll () {
      if (this.gzindeterminate) {
        this.gzcheckAll = false;
      } else {
        this.gzcheckAll = !this.gzcheckAll;
      }
      this.gzindeterminate = false;

      if (this.gzcheckAll) {
        this.formValidate.gzList = ['广州'];
      } else {
        this.formValidate.gzList = [];
      }
    },

    gzcheckAllGroupChange (data) {
      if (data.length === 3) {
        this.gzindeterminate = false;
        this.gzcheckAll = true;
      } else if (data.length > 0) {
        this.gzindeterminate = true;
        this.gzcheckAll = false;
      } else {
        this.gzindeterminate = false;
        this.gzcheckAll = false;
      }

    },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }

        },
        // submitForm(){
        //     //alert(this.formItem.pdStartDate)
        //
        //       console.info(this.formItem);
        //       const formData = new FormData()
        //       checkBatchSubmit(data)
        //
        // },
          handleSubmit (name) {
            this.formValidate.orgList = this.formValidate.fqList.concat(this.formValidate.gzList);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        const data ={
                          orgList:  this.formValidate.orgList,
                          pdStartDate: this.formValidate.pdStartDate,
                          pdEndDate:this.formValidate.pdEndDate
                        }
                        checkBatchSubmit(data).then(res => {
                      const data = res.data
                      this.$Message.success(data)
                      close();
                      resolve()
                    }).catch(err => {
                      reject(err)
                       this.$Message.success(data)
                    })

                    } else {
                        this.$Message.error('Fail!')
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
        close () {
            /**
             * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
             * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
             */
            this.closeTag({
              name: 'params',
              params: {
                id: this.$route.params.id
              }
            })
          }
     }
}
</script>
 <style lang="less">
.addBat{
  position: relative;
  width: 500px;
  height: 50px;
  background: white;
  border: 1px solid white;
  text-align:left;
}
</style>
