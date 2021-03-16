<template>
  <div>
    <Card>
      <h2 class="addBat">编辑资产</h2>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
        <FormItem label="组织"  prop="organizationName">
          <Select   style="width:200px" v-model="formValidate.organizationName"  placeholder="请选择组织编码">
            <Option v-for="item in orgList" :value="item.value">{{item.label}}</Option>
          </Select>
    </FormItem>
     <FormItem label="管理员工号"  prop="jobnum">
            <Input  type="text"   v-model="formValidate.jobnum"  name = "jobnum" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="软件名称"  prop="description">
            <Input  type="text"  v-model="formValidate.description" name = "description" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="资产编码"  prop="assetNumber">
            <Input  type="text"  v-model="formValidate.assetNumber" name = "assetNumber" style="width: 200px"></Input>
    </FormItem>

        <FormItem label="型号"  prop="assetmodel">
          <Input  type="text"  v-model="formValidate.assetmodel" name = "assetmodel" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="类型"  prop="softType">
                    <Select   style="width:200px" v-model="formValidate.softType"  placeholder="请选择状态">
                      <Option v-for="item in softTypeList" :value="item.value">{{item.label}}</Option>
                    </Select>
                  </FormItem>


        <FormItem label="合同号"  prop="contractId">
          <Input  type="text"  v-model="formValidate.contractId" name = "contractId" style="width: 200px"></Input>
        </FormItem><FormItem label="生产厂商售厂商"  prop="manufacturer">
        <Input  type="text"  v-model="formValidate.manufacturer" name = "manufacturer" style="width: 200px"></Input>
      </FormItem>
        <FormItem label="软件状态"  prop="softwarestatus">
        <Select   style="width:200px" v-model="formValidate.softwarestatus"  placeholder="请选择状态">
          <Option v-for="item in softwarestatusList" :value="item.value">{{item.label}}</Option>
<!--        <Option value="1">在用</Option>-->
<!--        <Option value="2" >到期</Option>-->
        </Select>
    </FormItem>

        <FormItem label="来源"  prop="source">
          <Select   style="width:200px" v-model="formValidate.source"  placeholder="请选择状态">
            <Option v-for="item in sourceList" :value="item.value">{{item.label}}</Option>
          </Select>
      </FormItem>
        <FormItem label="启用时间"  prop="usingstarttime">
          <DatePicker placeholder="启用时间"  style="width: 200px"  v-model="formValidate.usingstarttime" ></DatePicker>
        </FormItem>
        <FormItem label="过保日期"  prop="warrantdate">
          <DatePicker placeholder="启用时间"  style="width: 200px"  v-model="formValidate.warrantdate" ></DatePicker>
        </FormItem><FormItem label="过保提醒日期"  prop="warrantyreminderdate">
        <DatePicker placeholder="启用时间"  style="width: 200px"  v-model="formValidate.warrantyreminderdate" ></DatePicker>
      </FormItem><FormItem label="套数"  prop="suite">
        <Input  type="text"  v-model="formValidate.suite" name = "suite" style="width: 200px"></Input>
      </FormItem>
        <FormItem label="备注"  prop="remark">
        <Input  type="text"  v-model="formValidate.remark" name = "remark" style="width: 200px"></Input>
        </FormItem>


        <!--        <FormItem label="状态"  prop="status">-->
<!--          <Select   style="width:200px" v-model="formValidate.status"  placeholder="请选择状态">-->
<!--            <Option v-for="item in statusList" :value="item.value">{{item.label}}</Option>-->

<!--            &lt;!&ndash; <Option value="1">笔记本</Option>-->
<!--           <Option value="2" >台式</Option>-->
<!--           <Option value="3">移动工作站</Option>-->
<!--             <Option value="4" >其他</Option> &ndash;&gt;-->
<!--          </Select>-->
<!--        </FormItem>-->
     <FormItem>
     <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
      </FormItem>
        </Form>
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { softAssetUpdateSubmit } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'params',
  data () {
      return {
        softTypeList: [{
        label: '单机版',
        value: 1
    },{
        label: '网络版',
        value: 2
    }
        ],

        softwarestatusList: [{
          label: '在用',
          value: 1
        },{
          label: '到期',
          value: 2
        }
        ],
        sourceList: [{
          label: '升级',
          value: 1
        },{
          label: '新购',
          value: 2
        },{
          label: '升级+新购',
          value: 5
        }
        ],


     statusList:[{label: '在用', value: 0},{label: '借用', value: 1},{label: '报废', value: 2},{label: '待报废', value: 3},{label: '闲置', value: 4},{label: '设备', value: 5}],
        orgList: [{
          label: '福耀玻璃工业集团股份有限公司（总办）FYG',
          value: '福耀玻璃工业集团股份有限公司（总办）FYG'
        },{
          label: '福耀浮法FYF',
          value: '福耀浮法FYF'
        },{
          label: '福耀ARG',
          value: '福耀ARG'
        },{
          label: '福清机械制造',
          value: '福清机械制造'
        },{
          label: '福耀汽玻FYA',
          value: '福耀汽玻FYA'
        },{
          label: '福耀三锋',
          value: '福耀三锋'
        },{
          label: '福清汽车玻璃',
          value: '福清汽车玻璃'
        },{
          label: '福清汽车饰件',
          value: '福清汽车饰件'
        },{
          label: '广州汽车玻璃',
          value: '广州汽车玻璃'
        },{
          label: '福耀汽车铝件（福建）有限公司',
          value: '福耀汽车铝件（福建）有限公司'
        }],
    formValidate: {
      changeTime:'',
      updateName:'',
      changeRemark:'',
      assetStatus:'',
        // handoverTime: '',
        // AssetNumber: '',
        // SerialNumber:'',
        // downloadFile:'',
        // jobNum:'',
        //   city: '',
      // handoverCpt: ['集团管理局', '福耀浮法集团','福耀国际集团','福清机械制造','福耀汽玻集团','福耀三峰股份有限公司']

      },
                ruleValidate: {
                  suite: [
                    {   required: true,
                      pattern: /^[-\+]?\d+$/,//可以写正则表达式呦呦呦
                      message: '必须为整数',
                      trigger: 'blur' }
                  ],
                  warrantdate: [
                    { required: true, type: 'date', message: '请选择日期', trigger: 'blur'}
                  ],
                assetNumber: [
                { required: true, type: 'string', message: '请输入资产编号', trigger: 'blur'}
                ],
                 serialNumber: [
                { required: true, type: 'string', message: '请输入序列号', trigger: 'change' }
                ],
                 jobnum: [
                { required: true, type: 'string', message: '请输入工号', trigger: 'blur'}
                ],
                 username: [
                { required: true, type: 'string', message: '请输入名字', trigger: 'blur'}
                ],
                 // status:[{ required: true, message: '请选择状态', trigger: 'blur'}],
                organizationName: [
                        { required: false, message: '请输入公司', trigger: 'change' }
                    ]

                },
                indeterminate: true,
                checkAll: false,
            }


  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
          handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // const data ={
                        //  organizationName:  this.formValidate.organizationName,
                        // financialCode:  this.formValidate.financialCode,
                        //   jobnum:  this.formValidate.jobnum,
                        //   username:  this.formValidate.username,
                        //   description:  this.formValidate.description,
                        //   assetNumber:  this.formValidate.assetNumber,
                        //   htcIncredible:  this.formValidate.htcIncredible,
                        //   assetmodel:  this.formValidate.assetmodel,
                        //   serialNumber:  this.formValidate.serialNumber,
                        //   allocation:  this.formValidate.allocation,
                        //   displayer:  this.formValidate.displayer,
                        //   macaddress:  this.formValidate.macaddress,
                        //   mouse:  this.formValidate.mouse,
                        //   wifimac:  this.formValidate.wifimac,
                        //   keyboard:  this.formValidate.keyboard,
                        //   poweradapt:  this.formValidate.poweradapt,
                        //   usingstarttime:  this.formValidate.usingstarttime,
                        //   workCenterName:  this.formValidate.workCenterName,

                        //   //handoverFile:this.formValidate.handoverFile
                        // }
                         const data = this.formValidate


                        softAssetUpdateSubmit(data).then(res => {
                           const data = res.data
                      this.$Message.success(data)


                          this.$router.back(-1)
                      //this.close();

                      resolve()
                    }).catch(err => {
                      reject(err)
                       this.$Message.error( res.data)
                    })
                    }
                 else {
                   alert("Fail")
                        this.$Message.error('Fail!')
                    }
                    })
                // )
            },
            handleReset (name) {
                this.$router.back(-1)
            },
            initUpload () {
      this.file = null
      this.showProgress = true
      this.loadingProgress = 0
    },
    handleUploadFile () {
      this.initUpload()
    },
    handleRemove () {
      this.initUpload()
      this.$Message.info('上传的文件已删除！')
    },
    handleBeforeUpload (file) {
        this.file = file
        this.$refs.upload.post(this.file)

    },
    uploadSuccess(response, file, fileList) {
      alert("上传成功，提示："+response)
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
     },
    mounted () {
      this.formValidate = this.$route.params.info
    if(this.$route.params.info.changeTime != null){

    }else{
      this.formValidate.changeTime = new Date;
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
