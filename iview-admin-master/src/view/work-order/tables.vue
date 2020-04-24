<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      </br>
      <Button @click="addCheckBatch" style="margin: 10px 0;" type="primary"><Icon type="search"/>&nbsp;&nbsp;新增</Button>&nbsp
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Excel文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import { getWorkorderTableData } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'asset_pd_bat',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '工单编码', key: 'WorkOrderId', sortable: true },
        { title: '工单描述', key: 'WorkOrderDescription' },
        { title: '资产名称', key: 'assetName' },
        { title: '部门', key: 'workcenter' },
         { title: '运营组织', key: 'OrganizationName' },
          { title: '状态', key: 'Status' },
        {
          title: '操作',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '查看详细信息?'
                },
                on: {
                  'on-ok': () => {
                    this.toCheckListPage(params.row.pdBatId)
                    //vm.$emit('on-delete', params)
                    //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '查看详细信息')
              ])
            }
          ]
        }
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
    addCheckBatch () {
      const route = {
        name: 'asset_Batch',
        meta: {
          title: '新增盘点批次'
        }
      }
      this.$router.push(route)
      
    },
    toCheckListPage (index) {
      const route = {
        name: 'asset_pd_list',
        params: {
          index
        },
        meta: {
          title: `查看盘点列表-${index}`
        }
      }
      this.$router.push(route)
      
    }
  },
  mounted () {
    getPdBatTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
