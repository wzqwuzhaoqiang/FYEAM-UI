<template>
	<!--取消订单弹框和老板批准弹框-->
	 <Modal
        :visible.sync="show"
        title="提示"
        :loading="loading"
        @on-ok="asyncOK">
        <Row>
            <i-col span="3"></i-col>
        	<i-col span="1" style="color:red;margin-top:7px;font-weight: bold">*</i-col>
        	<i-col span="2" style="margin-top:5px;">授权码</i-col>
        	<i-col span="6">
        	 <input class="ivu-input errorInput" type="number"  v-model="code" placeholder="请输入" @blur="codeBlur">
        	 <div class="fade-transition ivu-form-item-error-tip error" style="display:none;position: static">验证码错误</div>
        	</i-col>
        	<i-col span="3" style="margin-left:5px;">
        		   <i-button type="primary" :loading="loadingBtn" @click="toLoading">
				        <span v-if="!loadingBtn">{{btnText}}</span>
				        <span v-else>{{btnText}}</span>
				    </i-button>
        	</i-col>
        </Row>
    </Modal>
</template>
<script type="text/javascript">

</script>