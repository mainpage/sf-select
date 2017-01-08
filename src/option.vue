
<template>
	<li :id="id" class="itm" @click="selectOption()" :class="{active: selected, disabled: disabled}" >
		<slot>
			<span class="txt">{{name}}</span>
			<i class="u-icon-tickblue"></i>
		</slot>
	</li>
</template>

<style type="text/css" lang="sass" scoped>
	.itm{
	    padding: 8px 10px;
	    box-sizing: border-box;
	    overflow: hidden;
	    word-wrap: normal;
	    white-space: nowrap;
	    text-overflow: ellipsis;
		.txt{
			display: inline-block;
			vertical-align: middle;
		}
		.u-icon-tickblue{
			display: none;
			width: 14px;
			height: 14px;
			margin-left: 5px;
			vertical-align: middle;
			background: url(/docs/res/img/icon-14.png);
			background-size: 120px auto;
			background-position: 0 -570px;
		}
		&:hover{
			background-color: #e8f1f8;
		    color: #62a8ea;
		}
		&.active{
		    color: #62a8ea;
			.u-icon-tickblue{
				display: inline-block;
			}
		}
		&.disabled{
			color: #999;
			background: #eee;
			cursor: not-allowed;
		}
	}
</style>
<script type="text/javascript">
	module.exports = {
		name: 'sf-option',
		componentName: 'option',
		computed: {
			selected: function(){
				return this.$parent.selected.id == this.id;
			}
		},
		props: {
			id: [String, Number],
			name: String,
			disabled: {
				type: Boolean,
				default: false
			} 
		},
		data() {
			return {};
		},
		methods: {
			selectOption() {
				if(this.disabled) return;
				this.dispatch('select', 'selectOption', this);
			},
			dispatch(componentName, eventName, params) {
			  var parent = this.$parent || this.$root;
			  var name = parent.$options.componentName;
			  while (parent && (!name || name !== componentName)) {
			    parent = parent.$parent;
			    if (parent) {
			      name = parent.$options.componentName;
			    }
			  }
			  if (parent) {
			    parent.$emit.apply(parent, [eventName].concat(params));
			  }
			}
		},
		created() {
      		
      	}
	}
</script>