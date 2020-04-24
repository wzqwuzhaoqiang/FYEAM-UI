<template>
  <div>
    <Card>
      <h2 class="addBat">编辑资产</h2>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
        <FormItem label="财务编码"  prop="financialCode">
            <Input  type="text"  v-model="formValidate.financialCode" name = "financialCode" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="序列号"  prop="serialNumber">
            <Input  type="text"   v-model="formValidate.serialNumber"  name = "serialNumber" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="使用人工号"  prop="jobnum">
            <Input  type="text"  v-model="formValidate.jobnum" name = "jobnum" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="使用人名称"  prop="username">
            <Input  type="text"  v-model="formValidate.username" name = "username" style="width: 200px"></Input>
    </FormItem>
      <FormItem label="计算机名"  prop="description">
            <Input type="text"  v-model="formValidate.description" name = "description" style="width: 200px"></Input>
    </FormItem>
      <FormItem label="资产编码"  prop="description">
            <Input type="text"  v-model="formValidate.assetNumber" name = "assetNumber" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="组织编码"  prop="organizationName"> 
       <Select   style="width:200px" v-model="formValidate.organizationName"  placeholder="请选择组织编码">
                         <Option v-for="item in orgList" :value="item.value">{{item.label}}</Option>

         <!-- <Option value="集团管理局"></Option>
        <Option value="福耀浮法集团" ></Option>
        <Option value="福耀国际集团"></Option>
          <Option value="福清机械制造" ></Option>
        <Option value="福耀汽玻集团" ></Option>
         <Option value="福耀三峰股份有限公司" ></Option> -->
    </Select>
     </FormItem>
     </FormItem>
     <FormItem label="机型"  prop="htcIncredible"> 
       <Select   style="width:200px" v-model="formValidate.htcIncredible"  placeholder="请选择机型">
                <Option v-for="item in dataList" :value="item.value">{{item.label}}</Option>

         <!-- <Option value="1">笔记本</Option>
        <Option value="2" >台式</Option>
        <Option value="3">移动工作站</Option>
          <Option value="4" >其他</Option> -->
    </Select>
     </FormItem>
 </FormItem>
      <FormItem label="型号"  prop="assetmodel">
            <Input type="text"  v-model="formValidate.assetmodel" name = "assetmodel" style="width: 200px"></Input>
    </FormItem>
     </FormItem>
      <FormItem label="基本配置"  prop="allocation">
            <Input type="text"  v-model="formValidate.allocation" name = "allocation" style="width: 200px"></Input>
    </FormItem>
     </FormItem>
      <FormItem label="显示器"  prop="displayer">
            <Input type="text"  v-model="formValidate.displayer" name = "displayer" style="width: 200px"></Input>
    </FormItem>
     </FormItem>
      <FormItem label="MAC地址"  prop="macaddress">
            <Input type="text"  v-model="formValidate.macaddress" name = "macaddress" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="鼠标"  prop="mouse">
            <Input type="text"  v-model="formValidate.mouse" name = "mouse" style="width: 200px"></Input>
    </FormItem>
     </FormItem>
      <FormItem label="无线MAC"  prop="wifimac">
            <Input type="text"  v-model="formValidate.wifimac" name = "wifimac" style="width: 200px"></Input>
    </FormItem>
     </FormItem>
      <FormItem label="键盘"  prop="keyboard">
            <Input type="text"  v-model="formValidate.keyboard" name = "keyboard" style="width: 200px"></Input>
    </FormItem>
     </FormItem>
      <FormItem label="电源适配器"  prop="poweradapt">
            <Input type="text"  v-model="formValidate.poweradapt" name = "poweradapt" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="使用部门"  prop="workCenterName">
            <Input type="text"  v-model="formValidate.workCenterName" name = "workCenterName" style="width: 200px"></Input>
    </FormItem>
      <FormItem label="启用时间"  prop="usingstarttime" >
            <DatePicker placeholder="启用时间"  style="width: 200px"  v-model="formValidate.usingstarttime" ></DatePicker>
 
      </FormItem>
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
import { updateSubmit } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'params',
  data () {
      return {
        dataList: [{
        label: '笔记本',
        value: 1
    },{
        label: '台式',
        value: 2
    },{
        label: '移动工作站',
        value: 3
    },{
        label: '其他',
        value: 4
    }],
     orgList: [{
        label: '集团管理局',
        value: '集团管理局'
    },{
        label: '福耀浮法集团',
        value: '福耀浮法集团'
    },{
        label: '福耀国际集团',
        value: '福耀国际集团'
    },{
        label: '福清机械制造',
        value: '福清机械制造'
    },{
        label: '福耀汽玻集团',
        value: '福耀汽玻集团'
    },{
        label: '福耀三峰股份有限公司',
        value: '福耀三峰股份有限公司'
    }],
    formValidate: {
        // handoverTime: '',
        // AssetNumber: '',
        // SerialNumber:'',  
        // downloadFile:'',
        // jobNum:'',
        //   city: '',
      // handoverCpt: ['集团管理局', '福耀浮法集团','福耀国际集团','福清机械制造','福耀汽玻集团','福耀三峰股份有限公司']

      },
                ruleValidate: { 
              
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

                    
                        updateSubmit(data).then(res => {
                           const data = res.data
                      this.$Message.success(data)
                      close();

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
                close()
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