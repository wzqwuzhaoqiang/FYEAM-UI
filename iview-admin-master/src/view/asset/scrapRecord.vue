<template>
  <div>
    <Card>
      <tables  width="1000" length="500" sref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import { getScrapRecordList } from '@/api/fuyaoAssetPdBat'


import { Z_FIXED } from 'zlib'
export default {
  name: 'scrapRecord',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
{ title: 'OA表单ID',width:'130', key: 'odId', sortable: true },
        { title: '公司',width:'130', key: 'company'},
        { title: '使用部门',width:'130', key: 'usedepartment', sortable: true },
        { title: '创建日期',width:'130', key: 'createDate'},
        { title: '单据编号',width:'130', key: 'formNumber', sortable: true },
        { title: '资产类型',width:'130', key: 'asserType', sortable: true },
        { title: '部门主管',width:'130',  key: 'departmentHead'},
        { title: '资产编号',width:'130',  key: 'assetNumber', sortable: true },
        { title: '资产名称',width:'130',  key: 'assetName', sortable: true },
        { title: '规格型号',width:'130', key: 'model'},
        { title: '启用日期',width:'130', key: 'startDate' },
        { title: '剩余年限',width:'130',  key: 'supplusLife'},
        { title: '保税属性',width:'130', key: 'bondedAttribute', sortable: true },
        { title: '数量',width:'130', key: 'count'},
        { title: '资产净值',width:'130', key: 'assetNatValue', sortable: true },
        { title: '报废原因',width:'130', key: 'reason', sortable: true },
        { title: '处理建议',width:'130', key: 'handingSuggestions', sortable: true },
        { title: '合计金额',width:'130', key: 'sumMoney', sortable: true },
        { title: '非正常报废的纠正措施',width:'130', key: 'measures', sortable: true },
 // {
 //          title: '操作',
 //          key: 'handle',
 //          // key: 'action',
 //          align: 'center',
 //          fixed: 'right',
 //          width: 300,
 //          button: [
 //     (h, params, vm) => {
 //       return [h('button', {
 //         on: {
 //           click: () =>
 //             this.toUpdatePage(params.row)
 //           //vm.$emit('on-delete', params)
 //           //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
 //         }
 //
 //       }, [h('Button', '编辑')]),
 //         h('button', {
 //         on: {
 //           click: () =>
 //             this.addTransfer(params.row)
 //            // this.toUpdatePage(params.row)
 //           //vm.$emit('on-delete', params)
 //           //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
 //         }
 //
 //       }, [h('Button', '新增转移单')]),
 //         h('button', {
 //         on: {
 //           click: () =>
 //             this.addTransfer(params.row)
 //           // this.toUpdatePage(params.row)
 //           //vm.$emit('on-delete', params)
 //           //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
 //         }
 //
 //       }, [h('Button', '维修履历')])]
 //     }
 //   ],
 //        },

      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    createNew(){
      const route = {
        name: 'asset_add',
        meta: {
          title: '新增资产'
        }
      }
      this.$router.push(route)
    },


    exportExcel () {
     if (this.tableData.length) {
        this.exportLoading = true
        const params = {
          title: ['组织名称','财务编码','使用人工号','使用人名称','计算机名','资产编码','机型(1:笔记本;2:移动工作站;3:台式工作站;4:台式机;5:其他;)','型号','序列号','基本配置','显示器','MAC地址','服务代码','鼠标','无线MAC','键盘','电源适配器','启用时间','使用部门','生产厂商售厂商','保修期(按月)','OA总计(两位小数)','状态(0-有效、1-无效)','备注'],
          key: ['organizationName','financialCode','jobnum','username','description','assetNumber','htcIncredible','assetmodel','serialNumber','allocation','displayer','macaddress','serviceid','mouse','wifimac','keyboard','poweradapt','usingstarttime','workCenterName','manufacturer','warrantyperiod','amount','status','remark'],
          data: this.tableData,
          autoWidth: true,
          filename: '计算机资产列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    },
    exportExcelTempelete () {
  const params = {
          title: ['组织名称','财务编码','使用人工号','使用人名称','计算机名','资产编码','机型','型号','序列号','基本配置','显示器','MAC地址','服务代码','鼠标','无线MAC','键盘','电源适配器','启用时间','使用部门','生产厂商售厂商','保修期(按月)','OA总计(两位小数)','状态','备注'],
          key: [],
          data: [],
          autoWidth: true,
          filename: '计算机资产批量导入模板'
        }
         excel.export_array_to_excel(params)
        this.exportLoading = false
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
      const fileExt = file.name.split('.').pop().toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {

        this.file = file
        this.$refs.upload.post(this.file)

      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    uploadSuccess(response, file, fileList) {
      alert("上传成功，提示："+response)
    },
    addTransfer (row) {
      const route = {
        name: 'add_asset_Transfer',
        params: {
          info: row
        },
        meta: {
          title: `新增转移单-${row.serialNumber}`
        }
      }
      this.$router.push(route)

    },
      toUpdatePage (row) {
      const route = {
        name: 'asset_update',
        params: {
            info: row
          },
        meta: {
          title: `跳转修改页面-${row.serialNumber}`
        }
      }
      this.$router.push(route)
      }

    },
  mounted () {

    getScrapRecordList().then(res => {
          this.tableData = res.data
        })
//alert("123")
    // if(this.$route.params.info != null){
    //   const data ={
    //     assetNumber:this.$route.params.info.assetNumber
    //   }
    //   getOneByAssetNumber(data).then(res => {
    //     this.tableData = res.data
    //   })
    // }
    // else{
    //   getRepairRecordList().then(res => {
    //     this.tableData = res.data
    //   })
    // }

  }
}
</script>

<style scoped>
  .paging{
      float:right;
      margin-top:10px;
  }
</style>

