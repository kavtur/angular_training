(function($) {
 	
	$.widget("ui.filelist", {
	  options: {
	  	listFiles: []
	  },
	  _create: function() {

	  	
	  	this._render(this.options.listFiles);
	  },

	  _render: function(listFiles) {
			var thisObj = this;

			thisObj.element.html();

			var ul = $('<ul>').appendTo(thisObj.element);
	        
	  		$.each(listFiles, function(index, file) {
	  			var li = $('<li>').appendTo(ul);
	  			var input = $('<input type="checkbox">').attr('id', file.name).attr('checked', file.selected).appendTo(li)
	  			input.on('change', function() {
	  				file.selected = input[0].checked;
	  				thisObj._trigger("onValueChanged", null, file);
	  			});

	  			var label = $('<label>').attr('for', input.attr('id')).html(file.name).appendTo(li);
	  		});

	  		thisObj.element.dialog({'width': 400, 'height': 600});
	  },

	  updateFiles: function(listFiles){
	  	this.options.listFiles = listFiles;
	  	this._render(this.options.listFiles);
	  }

	})

})(jQuery);