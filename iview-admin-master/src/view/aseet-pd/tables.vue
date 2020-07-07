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
import { getPdBatTableData } from '@/api/fuyaoAssetPdBat'
import { addExceptionBat } from '@/api/fuyaoAssetPdBat'

export default {
  name: 'asset_pd_bat',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '批次编号', key: 'pdBatId', sortable: true },
        { title: '盘点开始时间', key: 'pdStartDate',format:'yyyy-MM-dd' },
        { title: '盘点结束时间', key: 'pdEndDate',format:'yyyy-MM-dd' },
        { title: '盘点范围', key: 'orgList' },
        { title: '原盘点批次编号', key: 'headId' },
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          fixed: 'right',
          width: 300,
          button: [
            (h, params, vm) => {
              return [h('button', {
                on: {
                   click: () =>
                    this.toCheckListPage(params.row.pdBatId)
                    //vm.$emit('on-delete', params)
                    //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }

              }, [
                h('Button', '查看盘点列表')
              ]),
                h('button', {
                  on: {
                    click: () =>
                      this.toCheckException(params.row.pdBatId,params.row.pdEndDate,params.row.orgList)
                    //vm.$emit('on-delete', params)
                    //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }

                }, [h('Button', '新增异常盘点')]),
              ]
            },

            /*(h, params, vm) => {
              return [h('button', {
                on: {
                  click: () =>
                    this.toUpdatePage(params.row)
                  //vm.$emit('on-delete', params)
                  //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                }

              }, [h('Button', '编辑')]),
                h('button', {
                  on: {
                    click: () =>
                      this.addTransfer(params.row)
                    // this.toUpdatePage(params.row)
                    //vm.$emit('on-delete', params)
                    //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }

                }, [h('Button', '新增转移单')]),
                h('button', {
                  on: {
                    click: () =>
                      this.getOneByAssetNumber(params.row)
                    // this.toUpdatePage(params.row)
                    //vm.$emit('on-delete', params)
                    //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }

                }, [h('Button', '维修履历')]),
                h('button', {
                  on: {
                    click: () =>
                      this.getLifeRecored(params.row)
                    // this.toUpdatePage(params.row)
                    //vm.$emit('on-delete', params)
                    //vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }

                }, [h('Button', '生命周期履历')])]
            }*/

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
        name: 'asset_pd_bat_list',
        params: {
            pdBatId: index
          },
        meta: {
          title: `查看盘点列表-${index}`
        }
      }
      this.$router.push(route)
      },
    toCheckException (index,endDate,org) {

      if(confirm("确定要生成新的批次吗！")){
        const data ={
          pdBatId: index,
          pdEndDate:endDate,
          orgList:org,
        }
        addExceptionBat(data).then(res => {
          const data = res.data
          this.$Message.success(data)
          close();
          resolve()
        }).catch(err => {
          reject(err)
          this.$Message.success(data)
        })
      }else{

      }

    },

  },
  mounted () {
    getPdBatTableData().then(res => {
      this.tableData = res.data
      console.log(this.tableData);
    })
  }
}
</script>

<style>

</style>
