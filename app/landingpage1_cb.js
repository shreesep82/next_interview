<script>

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

function add_new_topic_cb(add_result) {
	
	console.log(add_result)
	if(add_result == "added") {
		var topic = $("#topic").val();
		var row = '<tr id=';
		row += '\''
		//row += 'row-';

		var tmp_topic = topic;
		tmp_topic = tmp_topic.replace(/ /g,'_');
		tmp_topic = tmp_topic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmp_topic = tmp_topic.replace("'", "\'");

		row += tmp_topic;
		row += '\''
		row += '>';
		row += '<td>&nbsp;<input type=radio value=';
		row += '\'' 
		row += tmp_topic;
		row += '\''
		row += ' name=topicname>&nbsp<b>'
		row += topic;
		row += '</b></td></tr>';
				
		console.log(row)
		$('#techlist  tr:last').after(row);
	}
				
	$("#topic").prop('readonly', true)
	$("#description_box").prop('readonly', true)
									
	topic = topic.replace(/ /g,'_');
	console.log('topic: ' + topic);

	$("#" + topic).on('click', show_cb);
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

function show_description_cb(result) {

	result = result.replace(/\<br>/g, "\r\n");
	console.log(result)
	$("#description_box").html(result);
	$("#description_box").val(result);
}

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

function show_cb()
{
	//input[type=radio][name=baz]:checked
	var selected_topic = get_selected_topic();
	//console.log(selected_topic)
	
	// show selected topic on topic field
	$("#topic").val(selected_topic);

	var data=encodeURI('data={"topic" : ' + '"' + encodeURIComponent(selected_topic) + '"}')
	console.log(data)
	$.ajax({
		url: '/description',
		type: 'GET',
		data: data,
		success: show_description_cb
	});
	
	$("#topic").prop('readonly', true)
	$("#description_box").prop('readonly', true)

}

function convert_from_db_to_display_format(selected_topic) {
	selected_topic = selected_topic.replace(" ", "_");
	return selected_topic;
}

function delete_topic_cb(result) {
	
	//console.log(result)
	var rowid = get_selected_topic();
	rowid = convert_from_db_to_display_format(rowid)
	console.log(rowid)
	$('#' + rowid).remove();
	
	$("#topic").val("");
	$("#description_box").val("");
}

function del_cb()
{
	var selected_topic = get_selected_topic();
	
	selected_topic = convert_topic_to_db_format(selected_topic);
	//console.log(selected_topic)
	
	var data=encodeURI('data={"topic": ' + '"' + encodeURIComponent(selected_topic) + '"' + '}')
	$.ajax({
		url: '/delete',
		type: 'DELETE',
		data: data,
		success: delete_topic_cb
	});

}

</script>