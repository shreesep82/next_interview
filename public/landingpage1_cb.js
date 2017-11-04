
/*
function reset_cb()
{			   
	console.log('reset');
	$("#topic").val("");
	$("#description_box").val("");

	
	$("#topic").attr('readonly', false)
	$("#description_box").attr('readonly', false)
	
}


function edit_cb()
{
	$("#topic").prop('readonly', false)
	$("#description_box").prop('readonly', false)
}
*/

function add_new_topic_cb(add_result, description_box_id) {
	
	console.log('add_result: ' + add_result)
	if(add_result == "added") {
	}
	else {

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

	}

}


function Add_cb()
{
	console.log($("#topic").val())
	// get overwrite property
	var overwrite = $("#overwrite").prop('checked');

	// topic and description should not be empty
	if($("#topic").val() == "" || $("#description_box").val() == "")
	{
		return;
	}

	var tmp_topic = $("#topic").val();
	var tmp_description = $("#description_box").val();

	if((tmp_topic.indexOf('\'') > -1))
	{
		return;
	}

	var topic = tmp_topic.replace(/"/g, '\\"');
	var description = tmp_description.replace(/"/g, '\\"');

	topic = topic.replace(/(?:\r\n|\r|\n)/g, '<br>');
	description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
	description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');

	//console.log('topic: ' + topic);
	//console.log(description);

	$.post('/create',
			'data={"overwrite" : ' + '"' + overwrite + '"' + ',"topic" : ' + '"' + encodeURIComponent(topic) + '"' + ', "description" : ' + '"' + encodeURIComponent(description) + '"' + '}',
			add_new_topic_cb
			);
}



function show_description_cb(result, description_box_id) {

	result = result.replace(/\<br>/g, "\r\n");
	console.log(result)
	
	console.log("#" + description_box_id)
	$("#" + description_box_id).html(result);
	
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

function show_cb()
{	
	var selected_topic = getTopicName($(this).attr("id"))
	// getTopicName gives value with underscores. Replace that with empty space now
	selected_topic = selected_topic.replace(/_/g, " ")
	
	console.log(selected_topic)
		
	var description_tr_id = getTopicName($(this).attr("id")) + "_tr"
	console.log(description_tr_id)
	$('#' + description_tr_id).show()
	
	
    

	var description_box_id = getTopicName($(this).attr("id")) + "_text"
	console.log(description_box_id)
	
	//$('#' + description_box_id).scrollTop($('#' + description_box_id)[0].scrollHeight);
	$('#' + description_box_id).scrollTop(0);
	
	var data=encodeURI('data={"topic" : ' + '"' + encodeURIComponent(selected_topic) + '"}')
	console.log(data)
	$.ajax({
		url: '/description',
		type: 'GET',
		data: data,
		success: (result) => {
			show_description_cb(result, description_box_id)
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

	var rowid = getTopicName(id) + "_tr";
	rowid = convert_from_db_to_display_format(rowid)
	console.log(rowid)
	$('#inheritance_with_different_access_specifiers_editsave_tr').remove();
	
	$("#topic").val("");
	$("#description_box").val("");
}


function del_cb()
{
	var selected_topic = getTopicName($(this).attr("id"));
	selected_topic = selected_topic.replace(/_/g, " ")
	
	var data=encodeURI('data={"topic": ' + '"' + encodeURIComponent(selected_topic) + '"' + '}')
	$.ajax({
		url: '/delete',
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

function save_description(selected_topic)
{	
	description_id = getTopicName(selected_topic) + "_text"
	console.log(description_id)
	
	var description = $("#" + description_id).val()
	console.log('description: ' + description)
	
	var tmp_topic = getTopicName(selected_topic);
	tmp_topic = tmp_topic.replace(/_/g, " ")
	
	var tmp_description = description

	if((tmp_topic.indexOf('\'') > -1))
	{
		return;
	}

	var topic = tmp_topic.replace(/"/g, '\\"');
	description = tmp_description.replace(/"/g, '\\"');

	topic = topic.replace(/(?:\r\n|\r|\n)/g, '<br>');
	description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
	description = description.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '');
	
	console.log(topic)
	console.log(description);
	
	
	$.post('/create',
			'data={"overwrite" : "true", "topic" : ' + '"' + encodeURIComponent(topic) + '"' + ', "description" : ' + '"' + encodeURIComponent(description) + '"' + '}',
			(add_result) => {
				add_new_topic_cb(add_result, description_id)
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

function edit_save_cb()
{
	var description_id = getTopicName($(this).attr("id")) + "_text"
	//description_id = description_id + "_text"
	console.log(description_id)

	console.log($("#" + description_id).prop('readonly'))
	
	if(! $("#" + description_id).prop('readonly')) {
		console.log('not readonly. Can save now')
		save_description($(this).attr("id"), description_id)
	}
	
	$("#" + description_id).prop('readonly', false)
}

function technology_info_display_cb(topic_description_table, subject) {
							
	if(topic_description_table == "no_collection")
	{
		$("#subject_topic").html('<font color="c0c0c0">Collection ' + subject + ' does not exist in mongo');
		return;
	}
						
	//console.log(topic_description_table);
						
	// topic_description_table.file indicates html content to be loaded in subject_topic <div>
	$("#subject_topic").html('<table id=techlist><tr><td></td></tr></table>')
						
	// below variable indicates the description of selected topic
	// to be loaded into 'show' textarea upon clicking of 'show Description' button
	var content = '';
	var firstEntryDescription = '';
	var firstEntryTopic = '';
	//data = $.parseJSON(data);
	console.log(topic_description_table.rows)
	topic_description_table.rows.forEach(function(row) {
		var topic = row.topic;
		//var description = row.description;
		
		//console.log(tableName);
    	if(topic === undefined)
		{
			return false;
		}
		
		var topic_column = '<tr class="spaceUnder"><td>'
		
		var tmptopic = topic;
		//console.log('t: ' + t);
		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");
		
		
		
		
		//topic_column += '<div  id='
		//topic_column += '\''
		//topic_column += tmptopic
		//topic_column += '\''
		//topic_column += ' style="display: ">'
		topic_column += '<table><tr><td>'
		
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
		
		topic_column += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
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
		
		var text_tmptopic = tmptopic + "_text"
		topic_column += '					<textarea class="form-control textarea_nodrag" rows=18 cols=120 readonly id='
		topic_column += 					'\''
		topic_column += 					text_tmptopic
		topic_column += 					'\''
		topic_column += 					'>'
		topic_column += '						description'
		topic_column += '					</textarea>'

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
	});
	
						
	topic_description_table.rows.forEach(function(row) {
		try {
			var anchor = row.topic;
			anchor = anchor.replace(/ /g,'_');
			anchor = anchor + "_anchor"
			console.log(anchor);
			$("#" + anchor).on('click', show_cb);

			var hide = row.topic;
			hide = hide.replace(/ /g,'_');
			hide = hide + "_hide"
			console.log(hide);
			$("#" + hide).on('click', hide_cb);

			var edit_save = row.topic;
			edit_save = edit_save.replace(/ /g,'_');
			edit_save = edit_save + "_editsave"
			console.log(edit_save);
			$("#" + edit_save).on('click', edit_save_cb);
			
			/*
			var del = row.topic;
			del = del.replace(/ /g,'_');
			del = del + "_delete"
			console.log(del);
			$("#" + del).on('click', del_cb);
			*/
			
		}
		catch(except) {
							
		}
	});
				
	// now that we have a new html content from server,
	// let's add some event handlers corresponding to that content
	//$("#edit").on('click', edit_cb);
	//$("#Add").on('click', Add_cb);
	//$("#show").on('click', show_cb);
	//$("#Reset").on('click', reset_cb);
	//$("#del").on('click', del_cb);
						
}

