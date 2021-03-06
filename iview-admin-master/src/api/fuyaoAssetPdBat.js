import axios from '@/libs/api.request'


export const getPdBatTableData = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetPdBatList',
    method: 'post'
  })
}

export const getTransferAssetTableData = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetTransferList',
    method: 'post'
  })
}

export const getCheckTableData = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetPdList',
    method: 'post'
  })
}

export const getCheckBatTableData = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetPdList',
    data: data,
    method: 'post'
  })
}

export const updateSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/updateAssetData',
    data: data,
    method: 'post'
  })
}


export const softAssetUpdateSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/softAssetUpdateSubmit',
    data: data,
    method: 'post'
  })
}

export const addSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/addAssetData',
    data: data,
    method: 'post'



  })
}

export const getAssetTableData = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetList',
    method: 'post'
  })
}

export const getSoftAssetTableData = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetSoftList',
    method: 'post'
  })


}


export const softAssetAddSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/softAssetAddSubmit',
    data: data,
    method: 'post'
  })


}

export const AssetPdUpdateSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/AssetPdUpdateSubmit',
    data: data,
    method: 'post'
  })


}


export const checkBatchSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/toAddCheckBat',
    data: data,
    method: 'post'
  })
}

export const tranferSubmit = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/tranferSubmit',
    data: data,
    method: 'post'
  })
}

export const updateStatus = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/udpateStatus',
    data: data,
    method: 'post'
    })
}



export const getRepairRecordList = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getRepairRecordList',
    method: 'post'
  })


}


export const getBorrowRecordList = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getBorrowRecordList',
    method: 'post'
  })


}

export const getOneByAssetNumber = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getOneByAssetNumber',
    data: data,
    method: 'post'
  })


}

export const getLifeRecoredByNum = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getLifeRecoredByNum',
    data: data,
    method: 'post'
  })


}
export const getScrapRecordList = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getScrapRecordList',
    method: 'post'
  })


}

export const getBorrowForm = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getBorrowForm',
    method: 'get'
  })


}

export const getAssetErrorList = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/assetTransError',
    method: 'post'
  })


}


export const getBujiu = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/bujiuControll',
    method: 'post'
  })


}

export const addExceptionBat = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/addExceptionBat',
    data: data,
    method: 'post'
  })


}

export const toSendMessageAgain = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/toSendMessageAgain',
    data: data,
    method: 'post'
  })


}
export const toSendEmail = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/toSendEmail',
    data: data,
    method: 'post'
  })


}

export const getLoginUserName = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getLoginUserName',
    method: 'post'
  })


}

export const getBeShowData = () => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/getBeShowData',
    method: 'post'
  })


}
export const deleteSoftAsset = data => {
  return axios.request({
    url: 'http://127.0.0.1:9001/eam/deleteSoftAsset',
    data: data,
    method: 'post'
  })
}
