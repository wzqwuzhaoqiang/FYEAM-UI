<template>
  <div>
    <Card>
      <h2 class="addBat">增加资产转移单</h2>
         <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
      <FormItem label="转移日期"  prop="handoverTime" >
            <DatePicker placeholder="转移日期"  style="width: 200px"  v-model="formValidate.handoverTime" ></DatePicker>

      </FormItem>
      <FormItem label="资产编号"  prop="AssetNumber">
            <Input  type="text"  v-model="formValidate.AssetNumber" name = "AssetNumber" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="序列号"  prop="SerialNumber">
            <Input  type="text"   v-model="formValidate.SerialNumber"  name = "SerialNumber" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="接收人工号"  prop="jobNum">
            <Input  type="text"  v-model="formValidate.jobNum" name = "jobNum" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="接收人名称"  prop="userName">
            <Input  type="text"  v-model="formValidate.userName" name = "userName" style="width: 200px"></Input>
    </FormItem>
      <FormItem label="转移人工号"  prop="handoverPerson">
            <Input type="text"  v-model="formValidate.handoverPerson" name = "handoverPerson" style="width: 200px"></Input>
    </FormItem>
     <FormItem label="转移公司"  prop="handoverCpt">
       <Select   style="width:200px" v-model="formValidate.handoverCpt"  placeholder="请选择转移公司">
          <Option v-for="item in orgList" :value="item.value">{{item.label}}</Option>
    </Select>
     </FormItem>
       <FormItem label="上传转移证据" >
         <Upload   ref="upload"  action="http://127.0.0.1:9001/eam/uploadFile" :data="file" >
        <Button icon="ios-cloud-upload-outline">上传附件</Button>
    </Upload>
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
import { tranferSubmit } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'params',
  data () {
      return {
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
                handoverTime: [
                { required: true, type: 'date', message: '请输入转移时间', trigger: 'change' }
                ],
                AssetNumber: [
                { required: true, type: 'string', message: '请输入资产编号', trigger: 'blur'}
                ],
                 SerialNumber: [
                { required: true, type: 'string', message: '请输入序列号', trigger: 'change' }
                ],
                 jobNum: [
                { required: true, type: 'string', message: '请接收人工号', trigger: 'blur'}
                ],
                 userName: [
                { required: true, type: 'string', message: '请接收人名字', trigger: 'blur'}
                ],
                handoverCpt: [
                        { required: false, message: '请选择转移公司', trigger: 'change' }
                    ],
                     handoverPerson: [
                        { required: false, message: '请选择转移人员工号', trigger: 'change' }
                    ],
                downloadFile: [
                { required: true, type: 'string', message: '请上传文件', trigger: 'change' }
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
                        const data ={
                          handoverCpt:  this.formValidate.handoverCpt,
                          handoverPerson: this.formValidate.handoverPerson,
                          handoverTime: this.formValidate.handoverTime,
                          AssetNumber:this.formValidate.AssetNumber,
                          jobNum:this.formValidate.jobNum,
                           SerialNumber:this.formValidate.SerialNumber,
                           userName:this.formValidate.userName,
                          //handoverFile:this.formValidate.handoverFile
                        }
                        tranferSubmit(data).then(res => {
                      const data = res.data
                      this.$Message.success(data)
                      close();
                      resolve()
                    }).catch(err => {
                      reject(err)
                       this.$Message.error(data)
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
                this.$refs[name].resetFields();
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
    //this.formValidate = this.$route.params.info
    if(this.$route.params.info != null){
      this.formValidate.handoverTime = new Date;
      //资产编号
      this.formValidate.AssetNumber = this.$route.params.info.assetNumber;
      //序列号 SerialNumber
      this.formValidate.SerialNumber = this.$route.params.info.serialNumber;
      //接收人工号 jobNum
      //接收人名称 userName
      //转移人工号 handoverPerson
      this.formValidate.handoverPerson = this.$route.params.info.jobnum;

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
