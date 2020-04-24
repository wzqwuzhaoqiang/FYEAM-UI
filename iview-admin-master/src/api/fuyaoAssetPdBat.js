import axios from '@/libs/api.request'

export const getPdBatTableData = () => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/assetPdBatList',
    method: 'post'
  })
}

export const getTransferAssetTableData = () => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/assetTransferList',
    method: 'post'
  })
}

export const getCheckTableData = () => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/assetPdList',
    method: 'post'
  })
}

export const getCheckBatTableData = data => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/assetPdList',
    data: data,
    method: 'post'
  })
}

export const updateSubmit = data => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/updateAssetData',
    data: data,
    method: 'post'
  })
}

export const addSubmit = data => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/addAssetData',
    data: data,
    method: 'post'
  })
}

export const getAssetTableData = () => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/assetList',
    method: 'post'
  })
}

export const getSoftAssetTableData = () => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/assetSoftList',
    method: 'post'
  })


}

export const checkBatchSubmit = data => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/toAddCheckBat',
    data: data,
    method: 'post'
  })
}

export const tranferSubmit = data => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/tranferSubmit',
    data: data,
    method: 'post'
  })
}

export const updateStatus = data => {
  return axios.request({
    url: 'http://10.112.5.135:9001/eam/udpateStatus',
    data: data,
    method: 'post'
    })
}
