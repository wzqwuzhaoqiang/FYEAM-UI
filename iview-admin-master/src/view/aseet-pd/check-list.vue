<template>

<div>
<Card >
<tables :loading="loading" width="1000" height="500" ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
<Button @click="returnBack" style="margin: 10px 0;" type="primary"><Icon type="search"/>&nbsp;&nbsp;返回</Button>&nbsp
<Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Excel文件</Button>
</Card>
</div>
</template>

<script>
import Tables from '_c/tables'
import excel from '@/libs/excel'
import { getCheckBatTableData,updateStatus } from '@/api/fuyaoAssetPdBat'
//import { updateStatus } from '@/api/fuyaoAssetPdBat'
export default {
name: 'asset_pd_list',
components: {
Tables
},
data () {
return {
columns: [
{ title: '运营组织', key: 'organizationName',  width: 100,
fixed: 'left',sortable: true },
{ title: '部门', key: 'department',   width: 100,sortable: true },
{ title: '使用人工号',  width: 110,key: 'jobNum' },
{ title: '使用人名字', width: 110, key: 'userName'},
{ title: '计算机名',  width: 100,key: 'description' },
{ title: '资产编号', width: 100, key: 'assetNumber'},
{ title: '型号', width: 100, key: 'assetModel' },
{ title: '基本配置',  width: 100,key: 'allocation' },
{ title: '序列号',  width: 100,key: 'serialNumber', sortable: true },
{ title: '盘点时间',  width: 120,key: 'pdTime', sortable: true },
{ title: '盘点批次ID', width: 100, key: 'pdBatId', sortable: true },
{ title: '结果', width: 100, key: 'status', sortable: true ,render(h,params){
let renderText = params.row.status === 0? '未盘点' : params.row.status === 1?'盘点完成':'盘点异常'
// jsx
return (<span>{renderText}</span>)
}} ,
{ title: '图片', width: 120, key: 'pdImgPath',render(h,params){
var state = params.row.pdImgPath;      
if ((state!= null)&& (state!='')) {
return h('img',{
props:{
type: 'primary',
size: 'small'},
attrs: {
//src:require('../../../img/'+params.row.pdImgPath+'.jpg')
src:params.row.pdImgPath
},

style:{
height:'120px'}})
}}} ,
{
title: 'Action',
key: 'action',
width: 150,
align: 'center',
fixed: 'right',
width: 130,
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
}, '查看'),
h('Poptip', {
props: {
confirm: true,
title: '修改成已盘点?'
},
on: {
'on-ok': () => {
this.updateStatu(params.index)
}
}
}, '修改')
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
exportExcel () {
if (this.tableData.length) {
this.exportLoading = true
const params = {
title: ['运营组织', '部门', '使用人工号', '使用人名字', '计算机名', '资产编号', '型号', '基本配置', '序列号', '盘点时间', '盘点批次ID', '结果(1-成功；2-异常；0-未完成)'],
key: ['organizationName',  'department', 'jobNum', 'userName', 'description', 'assetNumber', 'assetModel', 'allocation', 'serialNumber', 'pdTime', 'pdBatId', 'status'],
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
show (index) {
this.$Modal.info({
title: '盘点信息',
content: `userName：${this.tableData[index].userName}<br>jobNum：${this.tableData[index].jobNum}<br>serialNumber：${this.tableData[index].serialNumber}<br>require('../../../img/'+${this.tableData[index].pdImgPath}+'.jpg')`
})
},
updateStatu (index) {

const data = {'pdCode':this.tableData[index].pdCode}
updateStatus(data).then(res => {
     const data2 ={
     pdBatId:null
     }
getCheckBatTableData(data2).then(res => {
this.tableData = res.dataList.data
})
})
},
handleReachTop () {
return new Promise(resolve => {
setTimeout(() => {
const first = this.tableData[0];
for (let i = 1; i < 11; i++) {
this.tableData.unshift(first - i);
}
resolve();
}, 2000);
});
}
// returnBack () {
//   const route = {
//     name: 'asset_pd',
//     meta: {
//       title: '盘点批次'
//     }
//   }
//   this.$router.push(route)
// }
},
mounted () {
      const data ={
     pdBatId:null
     }
getCheckBatTableData(data).then(res => {

this.tableData = res.data
})
}
}
</script>

<style>

</style>
