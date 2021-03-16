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
import { getBorrowForm } from '@/api/fuyaoAssetPdBat'


import { Z_FIXED } from 'zlib'
export default {
  name: 'borrowRecord',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '借用人工号',width:'130', key: 'borrowerId'},
        { title: '借用人姓名',width:'130', key: 'borrowerName', sortable: true },
        { title: '联系方式',width:'130', key: 'mobile', sortable: true },
        { title: '借用物品',width:'130', key: 'tools'},
        { title: '数量',width:'130', key: 'count', sortable: true },
        { title: '借用时间',width:'130', key: 'borrowTime', sortable: true },
        { title: '归还时间',width:'130',  key: 'returnTime'},
        { title: '状态',width:'130',  key: 'status', sortable: true },
        // {
        //   title: '操作',
        //   key: 'action',
        //   width: 150,
        //   align: 'center',
        //   fixed: 'right',
        //   width: 130,
        //   render: (h, params) => {
        //     return h('div', [
        //       h('Button', {
        //         props: {
        //           type: 'primary',
        //           size: 'small'
        //         },
        //         style: {
        //           marginRight: '5px'
        //         },
        //         on: {
        //           click: () => {
        //             this.show(params.index)
        //           }
        //         }
        //       }, '借用确认'),
        //       h('Button', {
        //         props: {
        //           confirm: true,
        //           title: '修改成已盘点?'
        //         },
        //         on: {
        //           click: () => {
        //             this.updateStatu(params.index)
        //           }
        //         }
        //       }, '归还确认')
        //     ]);
        //   }
        // }
        // { title: '用途',width:'130',  key: 'borrowConfirm', sortable: true },
        // { title: '资产编号',width:'130', key: 'backConfirm'},
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

    getBorrowForm().then(res => {
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

