<template>
  <div>
    <Card>
      <tables  width="1000" length="500" sref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getAssetErrorList } from '@/api/fuyaoAssetPdBat'


export default {
  name: 'AssetError',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: '序列号',width:'130',  key: 'serial'},
        { title: 'OA单据',width:'130', key: 'oabilliNum', sortable: true },
        { title: '转移人',width:'130', key: 'tranMan'},
        { title: '转移人工号',width:'130', key: 'tranid', sortable: true },
        { title: '接收人',width:'130', key: 'receiveMan'},
        { title: '接收人工号',width:'130', key: 'receiveid', sortable: true },
        { title: '资产名称',width:'130', key: 'assetName', sortable: true },
        { title: '时间',width:'130',  key: 'createDate', sortable: true },
      ],
      tableData: []
    }
  },
  mounted () {

    getAssetErrorList().then(res => {
          this.tableData = res.data
        })
  }
}
</script>

<style scoped>
</style>

