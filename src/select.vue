/**
 * sf-select 组件
 *
 * @author:   sch
 * @props  {String} prop         -参数         
 * 
 */

<template>
	<div class="m-select" ref="select-box">
		<div class="select-sel" @click="toggle" :id="selected.id" :class="{disabled: disabled}">
			<span>{{selected.name}}</span>
			<i class="u-icon-down"></i>
		</div>
		<div class="select-cnt" v-show="isShow">
			<ul class="list">
				<slot></slot>
			</ul>
		</div>
	</div>
</template>

<style lang="sass" scoped>
	.m-select{
	    display: inline-block;
	    position: relative;
	    margin: 0 auto;
	    height: 32px;
	    vertical-align: middle;
	    background: #fafafa;
	    border: 1px solid #ebebeb;
	    border-radius: 2px;
	    box-shadow: 0 1px 2px -3px #000;
	    cursor: pointer;
	    .select-sel{
	        height: 32px;
	    	line-height: 32px;
	        padding: 0 50px 0 40px;
	        color: #000;
	        border: none;
	        span{
	            line-height: 32px;
	            vertical-align: top;
	        }
	        &.disabled{
	        	color: #999;
	        	background: #eee;
	        	cursor: not-allowed;
	        }
	    }
	    .select-cnt{
	        position: absolute;
	        top: 36px;
	        left: 0;
	        width: 150px;
	        border: 1px solid #e6eaeb;
	        border-radius: 2px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
	        background-color: #fff;
	        z-index: 10;
	        .list{
	            position: relative;
	            max-height: 300px;
	            overflow: hidden;
	            background-color: #fff;
	        }
	    }
	    .u-icon-down{
	        position: absolute;
	        top: 15px;
	        right: 10px;
	        width: 12px;
	        height: 12px;
	        background: url(/docs/res/img/icon-12.png);
	        background-position: 0 -540px;
	        background-size: 120px auto;
	    }
	}
</style>

<script>
	module.exports = {
		name: 'sf-select',
		componentName: 'select',
		computed: {

		},
		props: {
			defid: [String, Number],
			title: String,
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				selected: {},
				isShow: false
			}
		},
		methods: {
			toggle() {
				if(this.disabled == true) return;
				this.isShow = !this.isShow;
			},
			/**
			 * 选择某一项(主动)
			 * @param  {object} option 选中项
			 * @return {void}        
			 */
			select(option) {
				this.selected = option;
				this.hide();
			},
			hide() {
				this.isShow = false;
			},
			/**
			 * 某一项被选中(被动)
			 * @param  {object} option 选中项
			 * @return {void}        
			 */
			onOptionSelect(option) {
				this.selected = option;
				this.$emit('change', this.selected);
				this.hide();
			}
		},
		created() {
			this.$on('selectOption', this.onOptionSelect);
			this.$nextTick(function(){
				var option = this.$children.filter(function(item){
					return item.id === this.defid;
				}.bind(this))[0];
				if(option){
					this.selected = option;
				}else{
					this.selected = {
						name: this.title || '请选择'
					}
				}
			});
		}
	}
</script>
