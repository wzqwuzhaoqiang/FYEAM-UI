<template>
  <div>
    <Card>
      <h2 class="addBat">盘点结果编辑</h2>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
        <FormItem label="备注"  prop="remark">
          <Input  type="text"  v-model="formValidate.remark" name = "remark" style="width: 200px"></Input>
        </FormItem>
        <FormItem label="修改人"  prop="updateMan">
          <Input  type="text"   v-model="formValidate.updateMan"  name = "updateMan" style="width: 200px" readonly="true"></Input>
        </FormItem>
                <FormItem label="盘点结果"  prop="status">
                            <Select   style="width:200px" v-model="formValidate.status"  placeholder="请选择状态">
                              <Option v-for="item in statusList" :value="item.value">{{item.label}}</Option>
                            </Select>
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
import { AssetPdUpdateSubmit } from '@/api/fuyaoAssetPdBat'
import ls from '@/api/ls'
export default {
  name: 'params',
  data () {
      return {

        statusList: [{
          label: '未盘点',
          value: 0
        },{
          label: '盘点完成',
          value: 1
        },{
          label: '盘点失败',
          value: 2
        },{
          label: '资产无码',
          value: 3
        },{
          label: '转移',
          value: 4
        },{
          label: '盘亏',
          value: 5
        }
        ],
    formValidate: {
      changeTime:'',
      updateName:'',
      changeRemark:'',
      assetStatus:'',

      },
        updatepeaple:'',
                ruleValidate: {

                },
            }


  },
  beforeMount() {

  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),

    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
               const data = this.formValidate
              AssetPdUpdateSubmit(data).then(res => {
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
     },
    mounted () {
     this.formValidate = this.$route.params.info
      this.formValidate.updateMan = ls.getItem("activeUser")

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
