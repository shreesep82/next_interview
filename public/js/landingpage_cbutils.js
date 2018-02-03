
function add_topic_setpanel_addinstance()
{
    var div_home = ''
    
    div_home += '<script>'
	div_home += 'myNicEditor.setPanel("'
	div_home += 'add_topic_control'
	div_home += '");'
	div_home += '</script>'

	div_home += '<script>'
	div_home += 'myNicEditor.addInstance("'
	div_home += 'add_topic_description'
	div_home += '");'
    div_home += '</script>'
    
    return div_home;
}

function add_topic_panel()
{
    var div_home = ''
    
    div_home += '		<table class="col-lg-12 col-xs-12  table-condensed table-bordered" style="width:; background-color:#1F1F1F">'

	div_home += '			<tr><td>'
	div_home += '<div style="background-color: ;" class="a_topic"><center>Admin adds new topics here</center></div>'
	div_home += '</td></tr>'
    
	div_home += '			<tr><td>'
	div_home += '<input type=text class="form-control" id=add_topic_content placeholder="Enter topic here">'
	div_home += '</td></tr>'


    
	div_home += '			<tr><td>'

	div_home += '<div  id='
	div_home += '\''
	div_home += 'add_topic_control'
	div_home += '\''
	div_home += '  ">'
	div_home += '</div>'

	div_home += '</td></tr>'
				
	div_home += '			<tr><td>'

    div_home += '<div contenteditable="true" id='
	div_home += '\''
	div_home += 'add_topic_description'
	div_home += '\''
	div_home += '  style="overflow-y:scroll; overflow-x:hidden; height:350px; color:#ffffff">'
	div_home += '</div>'

	div_home += '</td></tr>'
		
	div_home += '			<tr><td align="right">'

	div_home += '				<button class="btn btn-primary" id=add_topic_but>Add</button>'
	div_home += '				<button class="btn btn-primary" id=reset_topic_but>Reset</button>'

    div_home += '</td></tr>'
    div_home += '</table>'

    return div_home;
}

function create_topic_link(topic)
{
    var topic_entry = ''
	var tmptopic = topic;

	tmptopic = tmptopic.replace(/ /g,'_');
	tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
	tmptopic = tmptopic.replace("'", "\'");

	var a_tmptopic = tmptopic + "_anchor"
	topic_entry += '<a class="a4" id='
	topic_entry += '\''
	topic_entry += a_tmptopic
	topic_entry += '\''
	topic_entry += '>'
	topic_entry += topic;

    topic_entry += '</a>'

    
    return topic_entry
}


