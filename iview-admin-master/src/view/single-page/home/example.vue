<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import { getBeShowData } from '@/api/fuyaoAssetPdBat'
export default {
  name: 'serviceRequests',
  data () {
    return {
        YEAR:[],
        NUM:[],
      // tableData: [],
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {



    getBeShowData().then(res => {
      console.log(res.data)
      for(var i=0;i<res.data.length;i++){
        this.YEAR.push(res.data[i].YEAR);
        this.NUM.push(res.data[i].NUM);
      }
     // alert("2222222"+this.YEAR.toString())

        this.$nextTick(() => {

         // alert("111111"+option.xAxis[0].data.toString())
         // alert("3333333333"+option.xAxis[0].data.toString())
          this.dom = echarts.init(this.$refs.dom)
          this.dom.setOption(option)
          on(window, 'resize', this.resize)
        })

    }


    )
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '1.2%',
        right: '1%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.YEAR
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '新增资产数目',
          type: 'line',
          stack: '总量',
          areaStyle: {
            normal: {
              color: '#2d8cf0'
            }
          },
          data: this.NUM
        }
        // },
        // {
        //   name: '银行/证券',
        //   type: 'line',
        //   stack: '总量',
        //   areaStyle: { normal: {
        //     color: '#10A6FF'
        //   } },
        //   data: [257, 358, 278, 234, 290, 330, 310]
        // },
        // {
        //   name: '游戏/视频',
        //   type: 'line',
        //   stack: '总量',
        //   areaStyle: { normal: {
        //     color: '#0C17A6'
        //   } },
        //   data: [379, 268, 354, 269, 310, 478, 358]
        // },
        // {
        //   name: '餐饮/外卖',
        //   type: 'line',
        //   stack: '总量',
        //   areaStyle: { normal: {
        //     color: '#4608A6'
        //   } },
        //   data: [320, 332, 301, 334, 390, 330, 320]
        // },
        // {
        //   name: '快递/电商',
        //   type: 'line',
        //   stack: '总量',
        //   label: {
        //     normal: {
        //       show: true,
        //       position: 'top'
        //     }
        //   },
        //   areaStyle: { normal: {
        //     color: '#398DBF'
        //   } },
        //   data: [820, 645, 546, 745, 872, 624, 258]
        // }
      ]
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
