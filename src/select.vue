/**
 * sf-select 组件
 *
 * @author:   sch
 * @props  {String} prop         -参数         
 * 
 */

<template>
	<div class="m-select" ref="select-box">
		<div class="select-sel" @mousedown="_onToggle($event)" :id="selected.id" :class="{disabled: disabled}">
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
			/**
			 * 展开/折叠下拉列表(主动)
			 * @param  {boolean} show 
			 * @return {void}     
			 */
			toggle(show) {
				if(this.disabled == true) return;
				if(show == undefined){
					this.isShow = !this.isShow;
				}else{
					this.isShow = show;
				}
				this.$emit('toggle', {show: this.isShow});
			},
			/**
			 * 展开/折叠下拉列表(被动)
			 * @param {event} event 
			 * @param  {boolean} show 
			 * @return {void}     
			 */
			_onToggle(event, show){
				this.toggle(show);
			},
			/**
			 * 选择某一项(主动)
			 * @param  {object} option 选中项
			 * @return {void}        
			 */
			select(option) {
				this.selected = option;
			},
			/**
			 * 某一项被选中(被动)
			 * @param  {object} option 选中项
			 * @return {void}        
			 */
			_onOptionSelect(option) {
				this.selected = option;
				this.$emit('change', this.selected);
				this.toggle(false);
			},
			_onMousedown(event){
				if(!this.$refs['select-box'].contains(event.target)){
					this.toggle(false);
				}
			}
		},
		created() {
			document.addEventListener('mousedown', this._onMousedown);
			this.$on('selectOption', this._onOptionSelect);
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
		},
		destroyed(){
			document.removeEventListener('mousedown', this._onMousedown);
		}
	}
</script>