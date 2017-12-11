

	


function reset_cb()
{			   
	console.log('reset');
	$("#add_topic_content").val("");
	$("#add_topic_description").val("");
}

/*
function edit_cb()
{
	$("#topic").prop('readonly', false)
	$("#description_box").prop('readonly', false)
}
*/



function create_new_topic_cb(add_result, description_box_id) {
	
	console.log('add_result: ' + add_result)
	if(add_result == "created") {
		
		var topic = $("#add_topic_content").html();
		var tmptopic = topic;
		//console.log('t: ' + t);
		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");
		
		var top_tr_id = tmptopic + "_top"
		var topic_column = '<tr class="spaceUnder" id='
		topic_column += '\''
		topic_column +=	top_tr_id
		topic_column += '\''
		topic_column += '><td>'
		
		//topic_column += '<div  id='
		//topic_column += '\''
		//topic_column += tmptopic
		//topic_column += '\''
		//topic_column += ' style="display: ">'
		var anchor_tr_id = tmptopic + "_anchortr"
		topic_column += '<table>'
		topic_column += '	<tr id='
		topic_column += '\''
		topic_column +=	anchor_tr_id
		topic_column += '\''
		topic_column += '><td>'
		
		var a_tmptopic = tmptopic + "_anchor"
		topic_column += '<a class="a_topic" id='
		topic_column += '\''
		topic_column += a_tmptopic
		topic_column += '\''
		topic_column += '>'
		topic_column += topic;
		topic_column += '</a></td></tr>'
		
		var tr_id = tmptopic + "_tr"
		
		topic_column += '	<tr style="display:none;" id='
		topic_column += '\''
		topic_column += tr_id
		topic_column += '\''
		topic_column += '>'
		
		topic_column += '	<td>'
		topic_column += '		<table>'
		topic_column += '			<tr class="spaceUnder1">'
		topic_column += '				<td align="right">'
		//topic_column += '					<button class="button" >Edit / Save</button><br><br>'
		
		
		topic_column += '				<div class="btn-group">'
		topic_column += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
		topic_column += '\''
		var hide_id = tmptopic + "_hide"
		topic_column += hide_id
		topic_column += '\''
		topic_column += '>Hide</button>'
		
		
		topic_column += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
		topic_column += '\''
		var edit_save_id = tmptopic + "_editsave"
		topic_column += edit_save_id
		topic_column += '\''
		topic_column += '>Edit/Save</button>'
		
		topic_column += '				<button type="button" disabled class="btn btn-outline-primary btn-transparent" id='
		//topic_column += '				<button type="button"  class="btn btn-outline-primary btn-transparent" id='
		topic_column += '\''
		var delete_id = tmptopic + "_delete"
		topic_column += delete_id
		topic_column += '\''
		topic_column += '>Delete</button>'
		topic_column += '</div>'
		
		
		topic_column += '				</td>'
		topic_column += '			</tr>'
		topic_column += '			<tr>'
		topic_column += '				<td>'
		
		//var text_tmptopic = tmptopic + "_text"
		//topic_column += '					<textarea name="area2" class="form-control textarea_nodrag" style="width: 900%; height: 350%" readonly id='
		//topic_column += 					'\''
		//topic_column += 					text_tmptopic
		//topic_column += 					'\''
		//topic_column += 					'>'
		//topic_column += '						description'
		//topic_column += '					</textarea>'
		
		var div_tmptopic = tmptopic + "_div"
		var instance_tmptopic = tmptopic + "_instance"
		
		topic_column += '<script>'
		topic_column += 'myNicEditor.setPanel("'
		topic_column += div_tmptopic
		topic_column += '");'
		topic_column += '</script>'
		
		topic_column += '<script>'
		topic_column += 'myNicEditor.addInstance("'
		topic_column += instance_tmptopic
		topic_column += '");'
        topic_column += '</script>'
		
		topic_column += '<div id='
		topic_column += '\''
		topic_column += div_tmptopic
		topic_column += '\''
		topic_column += ' style="width:900px; height:5%; border: 2px solid #c0c0c0; ">'
		topic_column += '</div>'
		
		
		topic_column += '<div class="container" contenteditable="false" id='
		topic_column += '\''
		topic_column += instance_tmptopic
		topic_column += '\''
		topic_column += ' style="width: 900px; overflow-y: scroll; overflow-x:hidden; height:450px; font-size: 16px; background-color: #c0c0c0; padding: 3px; border: 4px solid #c0c0c0; ">'
		topic_column += '</div>'
		
		
		//topic_column += '<br>'
		
		//topic_column += '<textarea name="area2" style="width: 100%;">'
        //topic_column += '   Some Initial Content was in this textarea'
		//topic_column += '</textarea><br>'

		topic_column += '					'
		topic_column += '				</td>'
		topic_column += '			</tr>'
		topic_column += '		</table>'
		topic_column += '	</td>'
		topic_column += '	</tr>'
		topic_column += '</table>'
		//topic_column += '</div>'
		
		topic_column += '</td>'
		topic_column += '</tr>'
	
	
		console.log(topic_column)
		//$('#techlist  tr:last').after(topic_column);
		$('#techlist').append('<tr><td>' + topic_column + '</tr></td>');
		
		var anchor = topic;
		anchor = anchor.replace(/ /g,'_');
		anchor = anchor + "_anchor"
		console.log(anchor);
		$("#" + anchor).on('click', show_cb);

		var hide = topic;
		hide = hide.replace(/ /g,'_');
		hide = hide + "_hide"
		console.log(hide);
		$("#" + hide).on('click', hide_cb);

		var edit_save = topic;
		edit_save = edit_save.replace(/ /g,'_');
		edit_save = edit_save + "_editsave"
		console.log(edit_save);
		$("#" + edit_save).on('click', edit_save_cb);
		
		var del = topic;
		del = del.replace(/ /g,'_');
		del = del + "_delete"
		console.log(del);
		$("#" + del).on('click', del_cb);

	}
	else {

	/*
		var tmp_description_box_id = description_box_id.split('_');
	
		description_box_id = ""
		tmp_description_box_id.forEach(function(elem, index) {
			if(index != tmp_description_box_id.length - 1) {
				if(index == 0) {
					description_box_id = tmp_description_box_id[0]
				}
				else {
					description_box_id = description_box_id + "_" + tmp_description_box_id[index]
				}
			}
		});

		description_box_id = description_box_id + "_text"
		console.log(description_box_id)
	
		$("#" + description_box_id).prop('readonly', true)
*/
	}

}

function add_cb()
{
	// topic and description should not be empty
	if($("#add_topic_content").html() == "" || $("#add_topic_description").html() == "")
	{
		return;
	}

	var tmp_topic = $("#add_topic_content").html();
	var tmp_description = $("#add_topic_description").html();

	if((tmp_topic.indexOf('\'') > -1))
	{
		return;
	}

	var topic = tmp_topic.replace(/"/g, '\\"');
	var description = tmp_description.replace(/"/g, '\\"');

	topic = topic.replace(/(?:\r\n|\r|\n)/g, '<br>');
	description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
	//description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
	description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:\/\\\|\}\{\[\]`~]*/g, '');

	//console.log('topic: ' + topic);
	//console.log(description);

	var overwrite = "true"
	var technology = $("#tech_hid").val()
	$.post('/create_topic',
			'data={"topic" : ' + '"' + encodeURIComponent(topic) + '"' + ', "description" : ' + '"' + encodeURIComponent(description) + '"' + ', "technology" : ' + '"' + encodeURIComponent(technology) + '"' + '}',
			create_new_topic_cb
			);
}



function show_description_cb(result, description_box_id, prog_id) {

	// result.description is an array of 1 element
	//result.description[0] = result.description[0].replace(/\<br>/g, "&lt;br&gt;<br>");
	//result.description[0] = result.description[0].replace(/\</g, "&lt;");
	//result.description[0] = result.description[0].replace(/\>/g, "&gt;");
	
	console.log(result.description[0])
	
	console.log("#" + description_box_id)
	$("#" + description_box_id).html(result.description[0]);
	$("#" + prog_id).html(result.description[1]);
}

/*
function convert_topic_to_db_format(selected_topic) {
	selected_topic = selected_topic.replace(/\_/g, ' ')
	return selected_topic;
}

function get_selected_topic() {
	
	var selected_topic = $("input[name='topicname']:checked").val();
	
	console.log(selected_topic)
	selected_topic = convert_topic_to_db_format(selected_topic)
	
	return selected_topic;
	
}
*/

function show_cb(event)
{
	//nicEditors.TextAreaWithId()
	var selected_topic = getTopicName($(this).attr("id"))
	// getTopicName gives value with underscores. Replace that with empty space now
	selected_topic = selected_topic.replace(/_/g, " ")
	
	//console.log(selected_topic)
		
	var description_tr_id = getTopicName($(this).attr("id")) + "_tr"
	//console.log(description_tr_id)
	$('#' + description_tr_id).show()
	
	var description_box_id = getTopicName($(this).attr("id")) + "_instance"
	var prog_id = getTopicName($(this).attr("id")) + "_progcode"
	//$("#" + description_box_id).prop('readonly', true)
	var dataJobj = event.data
	if(dataJobj.editsave == 'true') {
		$("#" + description_box_id).attr('contenteditable', 'true')
		$("#" + prog_id).attr('contenteditable', 'true')
	}
	else {
		$("#" + description_box_id).attr('contenteditable', 'false')
		//$("#" + prog_id).attr('contenteditable', 'false')
	}
	
	//console.log(description_box_id)
	
	//$('#' + description_box_id).scrollTop($('#' + description_box_id)[0].scrollHeight);
	$('#' + description_box_id).scrollTop(0);
	$('#' + prog_id).scrollTop(0);
	
	var technology = $("#tech_hid").val()
	
	//var data=encodeURI('data={"topic" : ' + '"' + encodeURIComponent(selected_topic) + '"' + ', "technology" : ' + encodeURIComponent(technology) + '}')
	//var data='data={"topic" : ' + '"' + encodeURIComponent(selected_topic) + '"' + ', "technology" : ' + '"' + encodeURIComponent(technology) + '"' + '}'
	var data='&topic=' + encodeURIComponent(selected_topic) + '&technology=' + encodeURIComponent(technology)
	console.log(data)
	
	$.ajax({
		url: '/read_description',
		type: 'GET',
		data: data,
		success: (result) => {
			show_description_cb(result, description_box_id, prog_id)
		}
	});


}

/*
function convert_from_db_to_display_format(selected_topic) {
	selected_topic = selected_topic.replace(" ", "_");
	return selected_topic; 
}
*/

function delete_topic_cb(id) {

/*
	var topic_row_id = getTopicName(id) + "_anchortr";
	//rowid = convert_from_db_to_display_format(rowid)
	console.log(topic_row_id)
	$('#' + topic_row_id).remove();
	
	var description_row_id = getTopicName(id) + "_tr";
	//rowid = convert_from_db_to_display_format(rowid)
	console.log(description_row_id)
	$('#' + description_row_id).remove();
*/

	var top_row_id = getTopicName(id) + "_top";
	//rowid = convert_from_db_to_display_format(rowid)
	console.log(top_row_id)
	$('#' + top_row_id).remove();
	//$("#topic").val("");
	//$("#description_box").val("");
}


function del_cb()
{
	var selected_topic = getTopicName($(this).attr("id"));
	selected_topic = selected_topic.replace(/_/g, " ")
	
	//var data=encodeURI('data={"topic": ' + '"' + encodeURIComponent(selected_topic) + '"' + '}')
	var technology = $("#tech_hid").val()
	var data='&topic=' + encodeURIComponent(selected_topic) + '&technology=' + encodeURIComponent(technology)
	$.ajax({
		url: '/delete_topic',
		type: 'DELETE',
		data: data,
		success: () => {
			delete_topic_cb($(this).attr("id"))
		}
	});

}


function hide_cb()
{
	var topic_name = getTopicName($(this).attr("id"))
	var description_box_id = topic_name + "_text"
	$("#" + description_box_id).prop("readonly", true)
	
	var tr_id = topic_name + "_tr" 
	console.log(tr_id)
	$('#' + tr_id).hide()
}

function save_topic_cb(add_result, description_box_id, prog_id) {
	
	console.log('add_result: ' + add_result)

	var tmp_description_box_id = description_box_id.split('_');
	
	description_box_id = ""
	tmp_description_box_id.forEach(function(elem, index) {
		if(index != tmp_description_box_id.length - 1) {
			if(index == 0) {
				description_box_id = tmp_description_box_id[0]
			}
			else {
				description_box_id = description_box_id + "_" + tmp_description_box_id[index]
			}
		}
	});

	description_box_id = description_box_id + "_instance"
	console.log(description_box_id)

	var tmp_prog_id = prog_id.split('_');
	
	prog_id = ""
	tmp_prog_id.forEach(function(elem, index) {
		if(index != tmp_prog_id.length - 1) {
			if(index == 0) {
				prog_id = tmp_prog_id[0]
			}
			else {
				prog_id = prog_id + "_" + tmp_prog_id[index]
			}
		}
	});
	prog_id = prog_id + "_progcode"
	
	console.log(prog_id)
	

	//$("#" + description_box_id).prop('readonly', true)
	$("#" + description_box_id).attr('contenteditable', 'true')
	$("#" + prog_id).attr('contenteditable', 'true')

}

function save_description()
{
	selected_topic = $(this).attr("id")
	description_id = getTopicName(selected_topic) + "_instance"
	prog_id = getTopicName(selected_topic) + "_progcode"
	console.log(description_id)
	
	var description = $("#" + description_id).html()
	var program = $("#" + prog_id).html()
	console.log('description: ' + description)
	
	var tmp_topic = getTopicName(selected_topic);
	tmp_topic = tmp_topic.replace(/_/g, " ")
	
	var tmp_description = description
	var tmp_prog = program

	if((tmp_topic.indexOf('\'') > -1))
	{
		return;
	}

	var topic = tmp_topic.replace(/"/g, '\\"');
	description = tmp_description.replace(/"/g, '\\"');
	program = tmp_prog.replace(/"/g, '\\"');

	topic = topic.replace(/(?:\r\n|\r|\n)/g, '<br>');
	description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
	//description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
	description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:\/\\\|\}\{\[\]`~]*/g, '');
	
	program = program.replace(/(?:\r\n|\r|\n)/g, '<br>');
	//description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
	program = program.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:\/\\\|\}\{\[\]`~]*/g, '');
	
	
	console.log(topic)
	console.log(description);
	console.log(program);
	
	var technology = $("#tech_hid").val()
	$.post('/update_description',
			'data={"topic" : ' + '"' + encodeURIComponent(topic) + '"' + ', "description" : ' + '"' + encodeURIComponent(description) + '"' + ', "technology" : ' + '"' + encodeURIComponent(technology) + '"' + ', "program" : ' + '"' + encodeURIComponent(program) + '"' + '}',
			(save_result) => {
				save_topic_cb(save_result, description_id, prog_id)
			}
		  );

}

function getTopicName(selected_topic) {

	var tmp_id = selected_topic.split('_');
	
	var id = ""
	tmp_id.forEach(function(elem, index) {
		if(index != tmp_id.length - 1) {
			if(index == 0) {
				id = tmp_id[0]
			}
			else {
				id = id + "_" + tmp_id[index]
			}
		}
	});
	
	return id;
}

function display_program_output(prog_output, prog_output_field)
{
	$("#" + prog_output_field).html(prog_output)
}

function edit_save_cb()
{
	var description_id = getTopicName($(this).attr("id")) + "_instance"
	var program_id = getTopicName($(this).attr("id")) + "_progcode"
	//description_id = description_id + "_text"
	console.log(description_id)

	//console.log($("#" + description_id).prop('readonly'))
	
	if($("#" + description_id).attr('contenteditable') == 'true') {
		console.log('Editable. Can save now')
		save_description($(this).attr("id"))
	}
	
	$("#" + description_id).attr('contenteditable', true)
	$("#" + program_id).attr('contenteditable', true)
	console.log($("#" + program_id).text())
}

function technology_info_display_cb(topic_description_table, subject, dataJobj) {
							
	if(topic_description_table == "no_collection")
	{
		$("#subject_topic").html('<font color="c0c0c0">Collection ' + subject + ' does not exist in mongo');
		return;
	}
						
	//console.log(topic_description_table);
						
	// topic_description_table.file indicates html content to be loaded in subject_topic <div>
	var subject_topic = '<div id=add_topic>'
	subject_topic += '<input type=hidden value=hid id=tech_hid>'
	subject_topic += '<input type=hidden value=hid id=tmp_hid>'
	
	if(dataJobj.topic_description_table == 'true') {
		/*
		subject_topic += '		<table class="table-bordered table-condensed" style="background-color: #696969">'
		subject_topic += '			<tr><td>'
		subject_topic += '				<table>'
		subject_topic += '					<tr class="spaceUnder1" ><td class="a_topic" align="center"><font size="4">Add new topics here'
		subject_topic += '					<tr class="spaceUnder1"><td>'
		subject_topic += '							<input type=text class="form-control col-lg-3" size=40 id=add_topic_content placeholder="Enter topic here">'
		subject_topic += '						<tr><td>'
		subject_topic += '							<textarea class="form-control textarea_nodrag" rows=14 cols=80 id=add_topic_description placeholder="Write topic description here"></textarea></table>'
		subject_topic += '			</td></tr>'
		subject_topic += '			<tr><td align="right">'
		subject_topic += '				<button class="btn btn-primary" id=add_topic_but>Add</button>'
		subject_topic += '				<button class="btn btn-primary" id=reset_topic_but>Reset</button>'
		subject_topic += '			</td></tr>'
		subject_topic += '		</table>'
		*/
		
		subject_topic += '<script>'
		subject_topic += 'myNicEditor.setPanel("'
		subject_topic += 'add_topic_control'
		subject_topic += '");'
		subject_topic += '</script>'
		
		subject_topic += '<script>'
		subject_topic += 'myNicEditor.addInstance("'
		subject_topic += 'add_topic_content'
		subject_topic += '");'
        subject_topic += '</script>'
		
		subject_topic += '<script>'
		subject_topic += 'myNicEditor.addInstance("'
		subject_topic += 'add_topic_description'
		subject_topic += '");'
        subject_topic += '</script>'
		
		subject_topic += '		<table class="table-bordered table-condensed" style="background-color: #696969">'
		
		subject_topic += '			<tr><td colspan=2>'
		subject_topic += '<div id='
		subject_topic += '\''
		subject_topic += 'add_topic_control'
		subject_topic += '\''
		subject_topic += ' style="width:900px; height:5%; background-color: #000000; border: 2px solid #c0c0c0; ">'
		subject_topic += '</div>'
		subject_topic += '</td></tr>'
		
		subject_topic += '			<tr><td colspan=2>'
		subject_topic += '<div class="container div1" contenteditable="true" id='
		subject_topic += '\''
		subject_topic += 'add_topic_content'
		subject_topic += '\''
		subject_topic += ' data-placeholder="Write topic here"   style="width: 900px; background-color: #000000; overflow-y: hidden; overflow-x:hidden; height:30px; font-size: 16px; background-color: #c0c0c0; padding: 3px; border: 4px solid #c0c0c0; ">'
		subject_topic += '</div>'
		subject_topic += '</td></tr>'
		
		subject_topic += '			<tr><td colspan=2>'
		subject_topic += '<div class="container div1" contenteditable="true" id='
		subject_topic += '\''
		subject_topic += 'add_topic_description'
		subject_topic += '\''
		subject_topic += ' data-placeholder="Write description here"   style="width: 900px; background-color: #000000; overflow-y: scroll; overflow-x:hidden; height:400px; font-size: 16px; background-color: #c0c0c0; padding: 3px; border: 4px solid #c0c0c0; ">'
		subject_topic += '</div>'
		subject_topic += '</td></tr>'
		
		subject_topic += '			<tr><td align="right">'
		subject_topic += '				<button class="btn btn-primary" id=add_topic_but>Add</button>'
		subject_topic += '				<button class="btn btn-primary" id=reset_topic_but>Reset</button>'
		subject_topic += '			</td></tr>'
	}
	
	subject_topic += '</div>'
	subject_topic += '<table   id=techlist><tr class="spaceUnder2"><td></td></tr></table>'
	
	
	$("#subject_topic").html(subject_topic)
	
	$("#tech_hid").val(subject)
	//console.log($("#tech_hid").val())
						
	// below variable indicates the description of selected topic
	// to be loaded into 'show' textarea upon clicking of 'show Description' button
	var content = '';
	var firstEntryDescription = '';
	var firstEntryTopic = '';
	//data = $.parseJSON(data);
	//console.log(topic_description_table.rows)
	topic_description_table.rows.forEach(function(row) {
		var topic = row.topic;
		//var description = row.description;
		
		//console.log(tableName);
    	if(topic === undefined)
		{
			return false;
		}

		var tmptopic = topic;
		//console.log('t: ' + t);
		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");
		
		var top_tr_id = tmptopic + "_top"
		var topic_column = '<tr class="spaceUnder" id='
		topic_column += '\''
		topic_column +=	top_tr_id
		topic_column += '\''
		topic_column += '><td>'
		
		var anchor_tr_id = tmptopic + "_anchortr"
		topic_column += '<table>'
		topic_column += '	<tr id='
		topic_column += '\''
		topic_column +=	anchor_tr_id
		topic_column += '\''
		topic_column += '><td>'
		
		var a_tmptopic = tmptopic + "_anchor"
		topic_column += '<a class="a_topic" id='
		topic_column += '\''
		topic_column += a_tmptopic
		topic_column += '\''
		topic_column += '>'
		topic_column += topic;
		topic_column += '</a></td></tr>'
		
		var tr_id = tmptopic + "_tr"
		
		topic_column += '	<tr style="display:none;" id='
		topic_column += '\''
		topic_column += tr_id
		topic_column += '\''
		topic_column += '>'
		
		topic_column += '	<td>'
		topic_column += '		<table style="width:900px;">'
		topic_column += '			<tr class="spaceUnder1">'
		topic_column += '				<td align="right">'
		//topic_column += '					<button class="button" >Edit / Save</button><br><br>'
		
		
		topic_column += '				<div class="btn-group">'
		topic_column += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
		topic_column += '\''
		var hide_id = tmptopic + "_hide"
		topic_column += hide_id
		topic_column += '\''
		topic_column += '>Hide</button>'
		
		if(dataJobj.editsave == 'true') {
			topic_column += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
			topic_column += '\''
			var edit_save_id = tmptopic + "_editsave"
			topic_column += edit_save_id
			topic_column += '\''
			topic_column += '>Save</button>'
		}

		
		if(dataJobj.delete == 'true') {
			//topic_column += '				<button type="button"  class="btn btn-outline-primary btn-transparent" id='
			topic_column += '				<button type="button" disabled class="btn btn-outline-primary btn-transparent" id='		
			topic_column += '\''
			var delete_id = tmptopic + "_delete"
			topic_column += delete_id
			topic_column += '\''
			topic_column += '>Delete</button>'
		}
		topic_column += '</div>'
		
		
		topic_column += '				</td>'
		topic_column += '			</tr>'
		topic_column += '			<tr>'
		topic_column += '				<td>'
		
		//var text_tmptopic = tmptopic + "_text"
		//topic_column += '					<textarea name="area2" class="form-control textarea_nodrag" style="width: 900%; height: 350%" readonly id='
		//topic_column += 					'\''
		//topic_column += 					text_tmptopic
		//topic_column += 					'\''
		//topic_column += 					'>'
		//topic_column += '						description'
		//topic_column += '					</textarea>'
		
		var div_tmptopic = tmptopic + "_div"
		var instance_tmptopic = tmptopic + "_instance"
		var des_div_tmptopic = tmptopic + "_des_div"
		var prog_div_tmptopic = tmptopic + "_prog_div"
		
		topic_column += '<script>'
		topic_column += 'myNicEditor.setPanel("'
		topic_column += div_tmptopic
		topic_column += '");'
		topic_column += '</script>'
		
		topic_column += '<script>'
		topic_column += 'myNicEditor.addInstance("'
		topic_column += instance_tmptopic
		topic_column += '");'
        topic_column += '</script>'
		
		var ul_tmptopic = tmptopic + "_ul"
		var des_li_tmptopic = tmptopic + "_desli"
		var prog_li_tmptopic = tmptopic + "_progli"
		//topic_column += '<div>'
		topic_column += '<table class="table-bordered">'
		topic_column += '<tr><td>'
		topic_column += '	<ul class="nav nav-pills nav-justified" id='
		topic_column += '\''
		topic_column += ul_tmptopic
		topic_column += '\''
		topic_column += '>'
		topic_column += '		<li class="a1 active" data-toggle="tab" id='
		topic_column += '\''
		topic_column += des_li_tmptopic
		topic_column += '\''
		topic_column += '><a href="">Description</a></li>'
		
		topic_column += '		<li class="a1" data-toggle="tab" id='
		topic_column += '\''
		topic_column += prog_li_tmptopic
		topic_column += '\''
		topic_column += '><a href="">Program</a></li>'
		topic_column += '	</ul>'

		

		
		topic_column += '<tr><td>'
		
		topic_column += '<div style="display:;" id='
		topic_column += '\''
		topic_column += des_div_tmptopic
		topic_column += '\''
		topic_column += '>'
		
		
		topic_column += '		<table class="table-condensed" style="background-color:  #151705 ; border: 0px solid #000000;">'
		if(dataJobj.editsave == 'true') {
			topic_column += '			<tr><td>'
			topic_column += '<div id='
			topic_column += '\''
			topic_column += div_tmptopic
			topic_column += '\''
			topic_column += ' style="width:900px; background-color:  #151705 ; height:5%; border: 0px solid #c0c0c0; ">'
			topic_column += '</div>'
			topic_column += '			</td></tr>'
		}

		topic_column += '			<tr><td>'		
		topic_column += '<div class="container" contenteditable="true" id='
		topic_column += '\''
		topic_column += instance_tmptopic
		topic_column += '\''
		topic_column += '  style="width: 900px; background-color:  #151705 ; overflow-y: scroll; overflow-x:hidden; height:550px; font-size: 16px;  padding: 0px; border: 0px solid #c0c0c0; ">'
		topic_column += '</div>'
		topic_column += '			</td></tr>'
		topic_column += '	</table>'
		topic_column += '</div>'
		
		topic_column += '<div style="display:none;" id='
		topic_column += '\''
		topic_column += prog_div_tmptopic
		topic_column += '\''
		topic_column += '>'
		
		var prog_code_control = tmptopic + "_progcodecontrol"
		var prog_code = tmptopic + "_progcode"

		
		
		topic_column += '<script>'
		topic_column += 'myNicEditor.setPanel("'
		topic_column += prog_code_control
		topic_column += '");'
		topic_column += '</script>'
		
		topic_column += '<script>'
		topic_column += 'myNicEditor.addInstance("'
		topic_column += prog_code
		topic_column += '");'
        topic_column += '</script>'
		
		topic_column += '		<table class="table-condensed" style="background-color:  #151705 ; border: 0px solid #000000;">'
		if(dataJobj.editsave == 'true') {
			topic_column += '			<tr><td>'
			topic_column += '<div id='
			topic_column += '\''
			topic_column += prog_code_control
			topic_column += '\''
			topic_column += ' style="width:900px; background-color:  #151705 ; height:5%; border: 0px solid #c0c0c0; ">'
			topic_column += '</div>'
			topic_column += '			</td></tr>'
		}
		
		topic_column += '			<tr><td>'
		topic_column += '<table>'
		topic_column += '<tr><td>'
		topic_column += '<div class="container" contenteditable="true" id='
		topic_column += '\''
		topic_column += prog_code
		topic_column += '\''
		topic_column += '  style="width: 900px; background-color:  #151705 ; overflow-y: scroll; overflow-x:hidden; height:700px; font-size: 16px;  padding: 0px; border: 0px solid #c0c0c0; ">'
		topic_column += '</div>'
		topic_column += '</td></tr>'
		
		var prog_code_table = tmptopic + "_progcodetable"
		var prog_input = tmptopic + "_proginput"
		var prog_output = tmptopic + "_progoutput"
		var prog_send = tmptopic + "_progsend"
		
		
		topic_column += '<tr><td id='
		topic_column += '\''
		topic_column += prog_code_table
		topic_column += '\''
		topic_column += '>'
		topic_column += '<tr><td>'
		topic_column += '<table class="" width=98% height=300% class="">'
		topic_column += '<tr class="spaceUnder1"><td><br><textarea style="border-color: #c0c0c0;color:#fff; height: 60px; border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
		topic_column += '\''
		topic_column += prog_input
		topic_column += '\''
		topic_column += ' ></textarea>'
		topic_column += '</tr></td>'
		topic_column += '<tr class="spaceUnder1"><td><br><textarea style="border-color: #c0c0c0;color:#fff; height: 200px; border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
		topic_column += '\''
		topic_column += prog_output
		topic_column += '\''
		topic_column += ' ></textarea>'
		topic_column += '</tr></td>'
		topic_column += '<tr><td align=right>'
		topic_column += '<button class="btn btn-primary" id='
		topic_column += '\''
		topic_column += prog_send
		topic_column += '\''
		topic_column += '>Run Program</button>'
		topic_column += '</td></tr>'
		topic_column += '</table>'
		topic_column += '</td></tr>'
		topic_column += '</table>'
		
		
		
		topic_column += '			</td></tr>'
		topic_column += '	</table>'
		topic_column += '</div>'
		
		topic_column += '</table>'
		
		
		//topic_column += '<br>'
		
		//topic_column += '<textarea name="area2" style="width: 100%;">'
        //topic_column += '   Some Initial Content was in this textarea'
		//topic_column += '</textarea><br>'

		topic_column += '					'
		topic_column += '				</td>'
		topic_column += '			</tr>'
		topic_column += '		</table>'
		topic_column += '	</td>'
		topic_column += '	</tr>'
		topic_column += '</table>'
		//topic_column += '</div>'
		
		topic_column += '</td>'
		topic_column += '</tr>'
	
	
		//console.log(topic_column)
		//$('#techlist  tr:last').after(topic_column);
		$('#techlist').append('<tr><td>' + topic_column + '</tr></td>');
		//nicEditors.TextAreaWithId(text_tmptopic)
		
		if(dataJobj.editsave != 'true') {
			$('#' + instance_tmptopic).attr('contenteditable', 'false');
		}
		
		$('#' + instance_tmptopic).css('background-color', '#0e0f02 '); 
		
		if(dataJobj.editsave != 'true') {
			//$('#' + prog_code).attr('contenteditable', 'false');
		}
		
		$('#' + prog_code).css('background-color', '#0e0f02 '); 
		
		
		$("#" + des_li_tmptopic).on('click', function() {
			$("#" + des_div_tmptopic).css('display', '')
			$("#" + prog_div_tmptopic).css('display', 'none')
		})
		
		$("#" + prog_li_tmptopic).on('click', function() {
			$("#" + des_div_tmptopic).css('display', 'none')
			$("#" + prog_div_tmptopic).css('display', '')
		})
		
		/*
		$("#" + prog_code).keypress(function (e) {
			if (e.keyCode == 13) {
				console.log('You pressed enter!');
				var content = $(this).html()
				console.log(content)
			}
		});
		*/

		$("#" + prog_send).on('click', function() {
			
			var prog_content = $("#" + prog_code).html()
			console.log('prog_html: ' + prog_content)

			prog_content = prog_content.replace(/\0x0D/g, '\\\n\\\n')
			prog_content = prog_content.replace(/<br>/g, "%3Cbr%3E")
			prog_content = prog_content.replace(/"/g, "%22")
			
			$("#tmp_hid").html(prog_content)
			prog_content = $("#tmp_hid").text()
			console.log('prog_content: ' + prog_content)

			var prog_in = $("#" + prog_input).html()
			console.log('prog_in: ' + prog_in)

			prog_in = prog_in.replace(/<br>/g, "%3Cbr%3E")
			prog_in = prog_in.replace(/"/g, "%22")
			
			$("#tmp_hid").html(prog_in)
			prog_in = $("#tmp_hid").text()
			console.log('prog_in: ' + prog_in)
			
			$.post('/run_program',
			'data={"prog_input" : ' + '"' + encodeURIComponent(prog_in) + '"' + ', "program" : ' + '"' + encodeURIComponent(prog_content) + '"' + '}',
				(prog_result) => {
					display_program_output(prog_result, prog_output)
				}
			);
			
			
			/*
			$.ajax({
				type: "POST",
				url: "/run_program",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: "{program: '" + encodeURIComponent(prog_content) + "'}",
				success: function(prog_result) {
				    display_program_output(prog_result, prog_output)
				}
    
			});
			*/
			
			
		})
		
		//nicEditors.TextAreaWithId()
		
	});
	
		
						
	topic_description_table.rows.forEach(function(row) {
		try {
			var anchor = row.topic;
			anchor = anchor.replace(/ /g,'_');
			anchor = anchor + "_anchor"
			console.log(anchor);
			$("#" + anchor).bind('click', dataJobj, show_cb);

			var hide = row.topic;
			hide = hide.replace(/ /g,'_');
			hide = hide + "_hide"
			console.log(hide);
			$("#" + hide).on('click', hide_cb);

			if(dataJobj.editsave == 'true') {
				var edit_save = row.topic;
				edit_save = edit_save.replace(/ /g,'_');
				edit_save = edit_save + "_editsave"
				console.log(edit_save);
				//$("#" + edit_save).on('click', edit_save_cb);
				$("#" + edit_save).on('click', save_description);
				
			}
			
			if(dataJobj.delete == 'true') {
				var del = row.topic;
				del = del.replace(/ /g,'_');
				del = del + "_delete"
				console.log(del);
				$("#" + del).on('click', del_cb);
			}
			
			
		}
		catch(except) {
							
		}
		
	});

	$("#add_topic_but").on('click', add_cb);
	$("#reset_topic_but").on('click', reset_cb);
		
		//bkLib.onDomLoaded(function() { nicEditors.allTextAreas() });
		//nicEditors.TextAreaWithId()
		//nicEditors.allTextAreas()
		
		
	// now that we have a new html content from server,
	// let's add some event handlers corresponding to that content
	//$("#edit").on('click', edit_cb);
	//$("#Add").on('click', Add_cb);
	//$("#show").on('click', show_cb);
	//$("#Reset").on('click', reset_cb);
	//$("#del").on('click', del_cb);
						
}

function get_technology_topics(dataJobj)
{
		// callbacks for click events for buttons Add, Show, Edit, Reset, and Delete have to be loaded
		// once we click on tab buttons because Add, Show, Edit, Reset, and Delete buttons are dynamically
		// loaded
		var tabs = dataJobj.tabs
		//console.log('tabs: ' + tabs)
		
		$(tabs).on('click', (event) => {
		
			//console.log(event.target.id);

			var technology = event.target.id;
			technology = technology.split('_');
			//console.log(technology[0]);

			$.ajax({
						url: '/list_topics',
						type: 'GET',
						data: '&technology=' + technology[0],
						success: (topic_description_table) => {
							technology_info_display_cb(topic_description_table, technology[0], dataJobj)
						}
		
					});
			
		});
}
