<template>
  <div>
    <Card>
      <tables  width="1000" length="500" sref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="createNew">创建新的资产</Button>
     &#12288; <Button style="margin: 10px 0;"  @click="exportExcel">导出为Excel文件</Button>
       &#12288;<Button style="margin: 10px 0;" @click="exportExcelTempelete">&nbsp;&nbsp;下载上传资产列表模板</Button>
     <Upload ref="upload" action="http://10.112.5.135:9001/eam/importAssets" :on-success="uploadSuccess" :before-upload="handleBeforeUpload" :data="file" accept=".xls, .xlsx">
     <Button style="margin: 10px 0;" @click="handleUploadFile">批量导入资产（Excel）</Button>
       </Upload>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import { getRepairRecordList } from '@/api/fuyaoAssetPdBat'
import { getOneByAssetNumber } from '@/api/fuyaoAssetPdBat'
import { getBorrowRecordList } from '@/api/fuyaoAssetPdBat'


import { Z_FIXED } from 'zlib'
export default {
  name: 'borrowRecord',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
{ title: 'OA表单ID',width:'130', key: 'odId', sortable: true },
        { title: '公司',width:'130', key: 'company'},
        { title: '日期，借用日期',width:'130', key: 'formDate', sortable: true },
        { title: '借用人',width:'130', key: 'borrower'},
        { title: '部门',width:'130', key: 'department', sortable: true },
        { title: '联系方式',width:'130', key: 'contactInfor', sortable: true },
        { title: '借用物品',width:'130',  key: 'borrowThing'},
        { title: '数量',width:'130',  key: 'number', sortable: true },
        { title: '用途',width:'130',  key: 'purpose', sortable: true },
        { title: '资产编号',width:'130', key: 'assertNumber'},
        { title: '资产名称',width:'130', key: 'assertName' },
        { title: '规格/型号',width:'130',  key: 'model'},
        { title: '序列号',width:'130', key: 'serialNumber', sortable: true },
        { title: '配置信息',width:'130', key: 'configInfo'},
        { title: '启用日期',width:'130', key: 'startDate', sortable: true },
        { title: '借出时间',width:'130', key: 'borrowOutDate', sortable: true },
        { title: '借用时间（单位天）',width:'130', key: 'borrowUseDate', sortable: true },
        { title: '出借人',width:'130', key: 'borrowOutman', sortable: true },
        { title: '是否归还（归还，续借）',width:'130', key: 'returnIs', sortable: true },
        { title: '是否归还',width:'130', key: 'returntwoIs', sortable: true },
        { title: '续借天数（天）',width:'130', key: 'renewDateNumber', sortable: true },
        { title: '物品归还完整状况',width:'130', key: 'thingSituation', sortable: true },
        { title: '接收人',width:'130', key: 'reciver', sortable: true },
        { title: '归还日期',width:'130', key: 'returnDate', sortable: true },
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

    getBorrowRecordList().then(res => {
          this.tableData = res.data
        })

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

