<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      </br>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Excel文件</Button>
      <Upload ref="upload" action="http://127.0.0.1:9001/eam/importSoftAssets" :on-success="uploadSuccess" :before-upload="handleBeforeUpload" :data="file" accept=".xls, .xlsx">
        <Button style="margin: 10px 0;" @click="handleUploadFile">批量导入资产（Excel）</Button>
      </Upload>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import { getSoftAssetTableData } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'asset_pd_bat',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
       { title: '组织', key: 'organizationName', sortable: true },
        { title: '管理员工号', key: 'jobnum', sortable: true },
        { title: '软件名称', key: 'description', sortable: true },
        { title: '资产编码', key: 'assetNumber', sortable: true },
        { title: '型号', key: 'assetmodel'},
          { title: '类型', key: 'softType',render(h,params){
              let renderText = params.row.softType ===1?'单机版':'网络版'
            return (<span>{renderText}</span>)
} },
        { title: '合同号', key: 'oabillnum'},
        { title: '生产厂商售厂商', key: 'manufacturer', sortable: true },
        { title: '软件状态', key: 'softwarestatus', sortable: true,render(h,params){
              let renderText = params.row.softwarestatus ===2?'到期':'在用'
            return (<span>{renderText}</span>)
} },
        { title: '来源', key: 'source',render(h,params){
              let renderText = params.row.source ===1?'升级':params.row.source === 2?'新购':params.row.source === 5?"升级+新购":"其他"
            return (<span>{renderText}</span>)
}  },
         { title: '启用时间', key: 'usingstarttime' },
        { title: '过保日期', key: 'warrantydate' },
        { title: '过保提醒日期', key: 'warrantyreminderdate' },
        { title: '套数', key: 'suite' },
         { title: '备注', key: 'remark' }

      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
     if (this.tableData.length) {
        this.exportLoading = true
        const params = {
          title: ['使用人工号','软件名称','资产编码','型号','售厂商','软件状态','来源','过保日期','过保提醒日期','套数'],
          key: ['jobnum','description','Assetnumber','assetmodel','manufacturer','softwarestatus','source' ,'warrantydate' ,'warrantyreminderdate' ,'suite' ],
          data: this.tableData,
          autoWidth: true,
          filename: '软件资产列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
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
    handleUploadFile () {
      this.initUpload()
    },
    initUpload () {
      this.file = null
      this.showProgress = true
      this.loadingProgress = 0
    },

  },
  mounted () {
    getSoftAssetTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
