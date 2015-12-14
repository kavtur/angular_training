(function($) {
 	
	$.widget("ui.filelist", {
	  options: {
	  	fileList: []
	  },
	  _create: function() {

	  	
	  	this._render(this.options.fileList);
	  	console.log("created (widget)")
	  },

	  _render: function(fileList) {
			var thisObj = this;

			thisObj.element.html();

			var ul = $('<ul>').appendTo(thisObj.element);
	        
	  		$.each(fileList, function(index, file) {
	  			var li = $('<li>').appendTo(ul);
	  			var input = $('<input type="checkbox">').attr('id', file.name).attr('checked', file.selected).appendTo(li)
	  			input.on('change', function() {
	  				file.selected = input[0].checked;
	  				thisObj._trigger("onValueChanged", null, file);
	  			});

	  			var label = $('<label>').attr('for', input.attr('id')).html(file.name).appendTo(li);
	  		});

	  		thisObj.element.dialog({'width': 400, 'height': 600});
	  		console.log("rendered (widget)")
	  },

	  updateFiles: function(fileList){
	  	this.options.fileList = fileList;
	  	this._render(this.options.fileList);
	  	console.log("file list updated (widget)")
	  }

	})

})(jQuery);