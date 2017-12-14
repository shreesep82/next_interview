

	


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
		
		var topic = $("#add_topic_content").val();
		
		var content = '';
		var firstEntryDescription = '';
		var firstEntryTopic = '';
		
		var dataJobj = {}
		dataJobj.editsave = 'true'
		dataJobj.delete = 'true'

		//topic_list.list.forEach(function(list_item) {
			//var topic = list_item.topic;

	    	if(topic === undefined)
			{
				return false;
			}

			var tmptopic = topic;
			//console.log('t: ' + t);
			tmptopic = tmptopic.replace(/ /g,'_');
			tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
			tmptopic = tmptopic.replace("'", "\'");

			var topic_entry = ''
		
			topic_entry += create_topic_link(topic)
			
			topic_entry += create_hide_save_delete_buttons(tmptopic, dataJobj)

			var des_div_tmptopic = tmptopic + "_des_div"
			var prog_div_tmptopic = tmptopic + "_prog_div"
			var prog_code_control = tmptopic + "_progcodecontrol"
			var prog_code = tmptopic + "_progcode"
			var des_li_tmptopic = tmptopic + "_desli"
			var prog_li_tmptopic = tmptopic + "_progli"
		
			var prog_code_table = tmptopic + "_progcodetable"
			var prog_input = tmptopic + "_proginput"
			var prog_output = tmptopic + "_progoutput"
			var prog_send = tmptopic + "_progsend"
		
			topic_entry += add_script_topic_panel_instance(tmptopic)
			
			topic_entry += create_description_program_headers(tmptopic)

			var div_tmptopic = tmptopic + "_div"
			var instance_tmptopic = tmptopic + "_instance"
		
			if(dataJobj.editsave == 'true') {
				topic_entry += topic_edit_panel(tmptopic)
			}
		
			topic_entry += description_panel(tmptopic)
			
			topic_entry += add_description_program_content(dataJobj, tmptopic)
	
			$('#techlist').append('<tr><td>' + topic_entry + '</tr></td>');
		
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
		
			$("#" + prog_send).on('click', function() {
			
				var prog_content = $("#" + prog_code).html()
				console.log('prog_html: ' + prog_content)

				prog_content = prog_content.replace(/<br>/g, "%3Cbr%3E")
				prog_content = prog_content.replace(/"/g, "%22")
			
				$("#tmp_hid").html(prog_content)
				prog_content = $("#tmp_hid").text()
				console.log('prog_content: ' + prog_content)

				var prog_in = $("#" + prog_input).val()
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
			
			})

			//topic_list.list.forEach(function(list_item) {
			try {
				var anchor = topic;
				anchor = anchor.replace(/ /g,'_');
				anchor = anchor + "_anchor"
				console.log(anchor);
				$("#" + anchor).bind('click', dataJobj, show_cb);

				var hide = topic;
				hide = hide.replace(/ /g,'_');
				hide = hide + "_hide"
				console.log(hide);
				$("#" + hide).on('click', hide_cb);

				var edit_save = topic;
				edit_save = edit_save.replace(/ /g,'_');
				edit_save = edit_save + "_editsave"
				console.log(edit_save);
				//$("#" + edit_save).on('click', edit_save_cb);
				$("#" + edit_save).on('click', save_description);

				var del = topic;
				del = del.replace(/ /g,'_');
				del = del + "_delete"
				console.log(del);
				$("#" + del).on('click', del_cb);

			}
			catch(except) {
						
			}

	}
	else {

	}

}

function add_cb()
{
	// topic and description should not be empty
	console.log('des: ' + $("#add_topic_description").html())
	console.log('topic: ' + $("#add_topic_content").val())
	if($("#add_topic_content").val() == "" || $("#add_topic_description").html() == "")
	{
		return;
	}

	console.log('des: ' + $("#add_topic_description").html())
	var tmp_topic = $("#add_topic_content").val();
	var tmp_description = $("#add_topic_description").html();
	
	console.log(tmp_description)

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
	console.log(description);

	var overwrite = "true"
	var technology = $("#tech_hid").val()
	$.post('/create_topic',
			'data={"topic" : ' + '"' + encodeURIComponent(topic) + '"' + ', "description" : ' + '"' + encodeURIComponent(description) + '"' + ', "technology" : ' + '"' + encodeURIComponent(technology) + '"' + '}',
			create_new_topic_cb
			);
}



function show_description_cb(result, description_box_id, prog_id) {

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

function new_topic_show_cb(event)
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
	
	$("#" + description_box_id).attr('contenteditable', 'true')
	$("#" + prog_id).attr('contenteditable', 'true')
	
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

	var top_row_id = getTopicName(id) + "_top";

	console.log(top_row_id)
	$('#' + top_row_id).remove();

}


function del_cb()
{
	var selected_topic = getTopicName($(this).attr("id"));
	selected_topic = selected_topic.replace(/_/g, " ")
	
	var id = $(this).attr("id")
	
	bootbox.confirm({
        message: "Are you sure you want to delete this topic",
        buttons: {
            confirm: {
                label: 'Yes',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result) {
				var technology = $("#tech_hid").val()
				var data='&topic=' + encodeURIComponent(selected_topic) + '&technology=' + encodeURIComponent(technology)
				
				$.ajax({
					url: '/delete_topic',
					type: 'DELETE',
					data: data,
					success: () => {
						delete_topic_cb(id)
					}
				});
			}
			else {
				
			}
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
	console.log('prog_output: ' + prog_output)
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

function technology_info_display_cb(topic_list, subject, dataJobj) {
							
	var subject_topic = '<div id=add_topic>'
	subject_topic += '<input type=hidden value=hid id=tech_hid>'
	subject_topic += '<input type=hidden value=hid id=tmp_hid>'
	
	if(dataJobj.add_topic_table == 'true') {
		
		// add script block for panel and instance
		subject_topic += add_topic_setpanel_addinstance()
		
		// add full panel
		subject_topic += add_topic_panel()

	}
	
	subject_topic += '</div>'
	    
    subject_topic += '<table   id=techlist><tr class="spaceUnder2"><td></td></tr></table>'

	$("#subject_topic").html(subject_topic)
	
	$("#tech_hid").val(subject)

	var content = '';
	var firstEntryDescription = '';
	var firstEntryTopic = '';

	topic_list.list.forEach(function(list_item) {
		var topic = list_item.topic;

    	if(topic === undefined)
		{
			return false;
		}

		var tmptopic = topic;
		//console.log('t: ' + t);
		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");

		var topic_entry = ''
		
		topic_entry += create_topic_link(topic)
		
		topic_entry += create_hide_save_delete_buttons(tmptopic, dataJobj)

		var des_div_tmptopic = tmptopic + "_des_div"
		var prog_div_tmptopic = tmptopic + "_prog_div"
		var prog_code_control = tmptopic + "_progcodecontrol"
		var prog_code = tmptopic + "_progcode"
		var des_li_tmptopic = tmptopic + "_desli"
		var prog_li_tmptopic = tmptopic + "_progli"
		
		var prog_code_table = tmptopic + "_progcodetable"
		var prog_input = tmptopic + "_proginput"
		var prog_output = tmptopic + "_progoutput"
		var prog_send = tmptopic + "_progsend"
		
		topic_entry += add_script_topic_panel_instance(tmptopic)
		
		topic_entry += create_description_program_headers(tmptopic)

		var div_tmptopic = tmptopic + "_div"
		var instance_tmptopic = tmptopic + "_instance"
		
		if(dataJobj.editsave == 'true') {
			topic_entry += topic_edit_panel(tmptopic)
		}
		
		topic_entry += description_panel(tmptopic)
		
		topic_entry += add_description_program_content(dataJobj, tmptopic)
	
		$('#techlist').append('<tr><td>' + topic_entry + '</tr></td>');
		
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
		

		$("#" + prog_send).on('click', function() {
			
			var prog_content = $("#" + prog_code).html()
			console.log('prog_html: ' + prog_content)

			prog_content = prog_content.replace(/<br>/g, "%3Cbr%3E")
			prog_content = prog_content.replace(/"/g, "%22")
			
			$("#tmp_hid").html(prog_content)
			prog_content = $("#tmp_hid").text()
			console.log('prog_content: ' + prog_content)

			var prog_in = $("#" + prog_input).val()
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

			
		})

	});
				
	topic_list.list.forEach(function(list_item) {
		try {
			var anchor = list_item.topic;
			anchor = anchor.replace(/ /g,'_');
			anchor = anchor + "_anchor"
			console.log(anchor);
			$("#" + anchor).bind('click', dataJobj, show_cb);

			var hide = list_item.topic;
			hide = hide.replace(/ /g,'_');
			hide = hide + "_hide"
			console.log(hide);
			$("#" + hide).on('click', hide_cb);

			if(dataJobj.editsave == 'true') {
				var edit_save = list_item.topic;
				edit_save = edit_save.replace(/ /g,'_');
				edit_save = edit_save + "_editsave"
				console.log(edit_save);
				//$("#" + edit_save).on('click', edit_save_cb);
				$("#" + edit_save).on('click', save_description);
				
			}
			
			if(dataJobj.delete == 'true') {
				var del = list_item.topic;
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
						success: (topic_list) => {
							technology_info_display_cb(topic_list, technology[0], dataJobj)
						}
		
					});
			
		});
}
