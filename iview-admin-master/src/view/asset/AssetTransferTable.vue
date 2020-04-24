<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <Button @click="addTransfer" style="margin: 10px 0;" type="primary"><Icon type="search"/>&nbsp;&nbsp;新增</Button>&nbsp
     
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import { getTransferAssetTableData } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'asset_pd_bat',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '资产编号', key: 'assetNumber', sortable: true },
		{ title: '序列号', key: 'serialNumber' },
		 { title: 'OA单据号', key: 'oABillNum' },
        { title: '接收人工号', key: 'jobNum' },
		{ title: '接收人名称', key: 'userName' },
		  { title: '移交人工号', key: 'handoverPerson' },
        { title: '移交时间', key: 'handoverTime' },
		{ title: '移交公司', key: 'handoverCpt' },
		 { title: '是否经过财务变更', key: 'isFT' },
   {
                        title: '文件',
                        key: 'downloadFile',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '下载')
                               
                            ]);
                        }
                    }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    downloadFile (index) {
     if (this.tableData.length) {
        this.exportLoading = true
        const params = {
          title: ['批次编号', '盘点开始时间', '盘点结束时间', '盘点范围'],
          key: ['pdBatId', 'pdStartDate', 'pdEndDate', 'orgList'],
          data: this.tableData,
          autoWidth: true,
          filename: '盘点批次列表'
        }
        excel.export_array_to_excel(params)
        this.exportLoading = false
      } else {
        this.$Message.info('表格数据不能为空！')
      }
    },
    addTransfer () {
      const route = {
        name: 'add_asset_Transfer',
        meta: {
          title: '新增转移单'
        }
      }
      this.$router.push(route)
      
    }
  },
  mounted () {
    getTransferAssetTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
