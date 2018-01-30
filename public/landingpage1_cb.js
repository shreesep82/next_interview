

	


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



function create_new_topic_cb(add_result) {
	
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
/*	
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

/*		
			if(dataJobj.editsave == 'true') {
				topic_entry += topic_edit_panel(tmptopic)
			}
		
			topic_entry += description_panel(tmptopic)
			
			topic_entry += add_description_program_content(dataJobj, tmptopic)
*/
	


		var topic_entry = ''
		
		topic_entry += create_topic_link(topic)
	
		var tmptopic = topic;

		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");
	
		var tr_id = tmptopic + "_top"
		console.log(tr_id)
		var td_id = tmptopic + "_td"
		var techlist_div_id = tmptopic + "_techlist_div"
		
		$('#techlist').append('<tr class="spaceUnder2" id="' + tr_id + '"><td id="' + td_id + '">' + topic_entry + '</tr></td>');
		$('#' + td_id).append('<br>')
		$('#' + td_id).append('<div id="' + techlist_div_id + '"></div>')
	
/*	
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
*/
			//topic_list.list.forEach(function(list_item) {

			try {

				var anchor = topic;
				anchor = anchor.replace(/ /g,'_');
				anchor = anchor + "_anchor"
				console.log(anchor);
				$("#" + anchor).bind('click', dataJobj, show_cb);
/*
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
			*/
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


/*
function show_description_cb(result, description_box_id, prog_id) {

	//console.log(result.description[0])
	
	//console.log("#" + description_box_id)
	//$("#" + description_box_id).html(result.description[0]);
	//$("#" + prog_id).html(result.description[1]);
	
	
}
*/

function show_description_cb(result, topic, dataJobj) {

	var techlist_div_id = topic + "_techlist_div"
	var div_tr_id = topic + "_tr"
	
	var hide_id = topic + "_hide"
	var edit_save_id = topic + "_editsave"
	var delete_id = topic + "_delete"

	var div_tmptopic = topic + "_div"
	var instance_tmptopic = topic + "_instance"
        
	var prog_code_control = topic + "_progcodecontrol"
	var prog_code = topic + "_progcode"
			
	var prog_input = topic + "_proginput"
	var prog_output = topic + "_progoutput"

	var prog_send = topic + "_progsend"
	var topic_description = topic + "_description"
	
	var content = '<br>'
	content += '<div class="row" id="' + div_tr_id + '">'
		content += '<div class="col-lg-12 " style="background-color:#1F1F1F;">'
            content += '<div class="panel panel-primary">'
                content += '<div class="panel-heading">'
                    content += '<h3 class="panel-title">&#9805</h3>'
                    content += '<span class="pull-right">'

						var ul_tag = topic + "_ul_tag"
						var program = topic + "_program"
                        content += '<ul class="nav panel-tabs" id="' + ul_tag + '">'
                            content += '<li class="active a3"><a href="#' + instance_tmptopic + '" data-toggle="tab">Description</a></li>'
                            content += '<li class="a3"><a href="#' + program + '" data-toggle="tab">Program</a></li>'
                            content += '<li class="a3"><a href="#hide" data-toggle="tab" id="' + hide_id + '">Hide</a></li>'
							if(dataJobj.editsave == 'true') {
								content += '<li class="a3"><a href="#save" data-toggle="tab" id="' + edit_save_id + '">Save</a></li>'
								content += '<li class="a3"><a href="#delete" data-toggle="tab" id="' + delete_id + '">Delete</a></li>'
							}
                            
                        content += '</ul>'
                    content += '</span>'
                content += '</div>'
                //content += '<div class="panel-body" >'
                    content += '<div class="tab-content" style=" ">'

							var editable = 'false'
							if(dataJobj.editsave == 'true') {
								editable = 'true'
							}
					
						content += ' <div style="border-width: thin;background-color:#1F1F1F; border-style: ridge;border-color: coral;" class="tab-pane active" id="' + instance_tmptopic + '">'
							//if(dataJobj.editsave == 'true') {
								content += '<script>'
								content += 'myNicEditor.setPanel("'
								content += div_tmptopic
								content += '");'
								content += '</script>'
		
								content += '<script>'
								content += 'myNicEditor.addInstance("'
								content += instance_tmptopic
								content += '");'
								content += '</script>'
							
								content += '<div contenteditable="' + editable + '" style="" id='
									content += '\''
									content += div_tmptopic
									content += '\''
									content += ' style="  ">'
								content += '</div>'
							//}


							//if(dataJobj.editsave == 'true') {
								content += '<div contenteditable="' + editable + '" style="height:680px; overflow-y:scroll;" id="' + topic_description + '">'
							//}
							//else {
							//	content += '<div style="background-color:#130106;">'
							//}
									content += result.description[0]
									
							//if(dataJobj.editsave == 'true') {
								content += '</div>'
							//}
							//else {
							//	content += '</div>'
							//}
							
						content += '</div>'
						
						content += ' <div style="border-width: thin;background-color:#1F1F1F; border-style: ridge;border-color: coral;" class="tab-pane" id="' + program + '">'
							
							//if(dataJobj.editsave == 'true') {
								content += '<script>'
								content += 'myNicEditor.setPanel("'
								content += prog_code_control
								content += '");'
								content += '</script>'
		
								content += '<script>'
								content += 'myNicEditor.addInstance("'
								content += prog_code
								content += '");'
								content += '</script>'
							
								content += '<div contenteditable="' + editable + '" id='
									content += '\''
									content += prog_code_control
									content += '\''
									content += ' style=" background-color:  #151705 ;  border: 0px solid #c0c0c0; ">'
								content += '</div>'
							//}

							//if(dataJobj.editsave == 'true') {
								content += '<div contenteditable="true" style="border-style: ridge;border-width: thin;background-color:#1F1F1F;height:500px; overflow-y:scroll;" id="' + prog_code + '">'
							//}
							//else {
							//	content += '<div class="col-lg-12" contenteditable="true" style="overflow-y:scroll;height:500px; background-color:#130106;" id="' + prog_code + '">'
							//}							
							
								content += result.description[1]
							
							//if(dataJobj.editsave == 'true') {	
								content += '</div>'
							//}
							//else {
							//	content += '</div>'
							//}
							
							content += '<div contenteditable="true" style="border-style: ridge;border-width: thin;background-color:#1F1F1F;height:80px; overflow-y:scroll;" id="' + prog_code + '">'
								content += '<textarea placeholder="Program input goes here" style="border-color: #c0c0c0;color:#fff; height:100px; border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
								content += '\''
								content += prog_input
								content += '\''
								content += ' ></textarea>'
							content += '</div>'
							
							content += '<div style="border-style: ridge;border-width: thin;background-color:#1F1F1F;height:100px; overflow-y:scroll;" id="' + prog_code + '">'
								content += '<textarea placeholder="Program output appears here" readonly style="border-color: #c0c0c0;color:#fff; height:100px; border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
								content += '\''
								content += prog_output
								content += '\''
								content += ' ></textarea>'
							content += '</div>'

							content += '<div align=right style="relative:absolute; right:5px; top:5px; border-style: ridge;border-width: thin;background-color:#1F1F1F;height:50px; overflow-y:scroll;" id="' + prog_code + '">'
							content += '<button class="btn btn-primary" id='
							content += '\''
							content += prog_send
							content += '\''
							content += '>Run Program</button>'
							content += '</div>'
						
							//content += '<div class="tab-pane" id="tab3">Hide</div>'
							//content += ' <div class="tab-pane" id="tab4">Save</div>'
							//content += ' <div class="tab-pane" id="tab5">'
							//	content += 'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet</div></div>'
							//content += '</div>'
	                content += '</div>'
	            content += '</div>'
	        content += '</div>'
		content += '</div>'

		
	$('#' + techlist_div_id).html('')
	$('#' + techlist_div_id).append(content)
    
	//console.log('hide_id: ' + hide_id)
	$("#" + hide_id).on('click', hide_cb);

	if(dataJobj.editsave == 'true') {
		$("#" + edit_save_id).on('click', save_description);
	}
			
	if(dataJobj.delete == 'true') {
		$("#" + delete_id).on('click', del_cb);
	}
	
	$("#" + prog_send).on('click', function() {
			
		var prog_content = $("#" + prog_code).html()
		console.log('prog_html: ' + prog_content)

		prog_content = prog_content.replace(/<div>/g, "<br>")
		prog_content = prog_content.replace(/<br>/g, "%3Cbr%3E")
		prog_content = prog_content.replace(/"/g, "%22")
			
		$("#tmp_hid").html(prog_content)
		prog_content = $("#tmp_hid").text()
		console.log('prog_content: ' + prog_content)

		var prog_in = $("#" + prog_input).val()
		console.log('prog_in: ' + prog_in)

		prog_in = prog_in.replace(/<br>/g, "%3Cbr%3E")
		prog_in = prog_in.replace(/\n/g, " ")
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
	/*	
	//console.log(selected_topic)
		
	var description_tr_id = getTopicName($(this).attr("id")) + "_tr"
	

	//console.log(description_tr_id)
	$('#' + description_tr_id).show()
	
	var description_box_id = getTopicName($(this).attr("id")) + "_instance"
	var prog_id = getTopicName($(this).attr("id")) + "_progcode"
	
	/*
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
	*/

	var topic = getTopicName($(this).attr("id"))
	var techlist_div_id = topic + "_techlist_div"
	var content = $('#' + techlist_div_id).html()
	//$('#' + techlist_div_id).show()
	//console.log('content: ' + content)
	//console.log('techlist_div_id: ' + techlist_div_id)
	if(content != '') {
		console.log('show and return')
		$('#' + techlist_div_id).show()
		var ul_tag = topic + "_ul_tag"
		var instance_tmptopic = topic + "_instance"
		var topic_description = topic + "_description"
		$('#' + ul_tag + ' a[href="#' + instance_tmptopic + '"]').tab('show');
		return
	}
	
	var dataJobj = event.data
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
			//show_description_cb(result, description_box_id, prog_id)
			show_description_cb(result, getTopicName($(this).attr("id")), dataJobj)
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
    /*
	bootbox.confirm("Are you sure?", function(result) {
  Example.show("Confirm result: "+result);
}); */

}


function hide_cb()
{
	//console.log('hide_cb hit')
	var topic_name = getTopicName($(this).attr("id"))
	//var description_box_id = topic_name + "_text"
	//$("#" + description_box_id).prop("readonly", true)
	
	var techlist_div_id = topic_name + "_techlist_div"
	console.log('techlist_div_id: ' + techlist_div_id)
	$('#' + techlist_div_id).hide()
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
	description_id = getTopicName(selected_topic) + "_description"
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
	
	
	//console.log(topic)
	//console.log(description);
	//console.log(program);
	
	var technology = $("#tech_hid").val()
	///*
	$.post('/update_description',
			'data={"topic" : ' + '"' + encodeURIComponent(topic) + '"' + ', "description" : ' + '"' + encodeURIComponent(description) + '"' + ', "technology" : ' + '"' + encodeURIComponent(technology) + '"' + ', "program" : ' + '"' + encodeURIComponent(program) + '"' + '}',
			(save_result) => {
				save_topic_cb(save_result, description_id, prog_id)
			}
		  );
		  //*/

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
							
	var subject_topic = ''//<div id=add_topic class=container>'
	subject_topic += '<input type=hidden value=hid id=tech_hid>'
	subject_topic += '<input type=hidden value=hid id=tmp_hid>'
	
	if(dataJobj.add_topic_table == 'true') {
		
		// add script block for panel and instance
		subject_topic += add_topic_setpanel_addinstance()
		
		// add full panel
		subject_topic += add_topic_panel()

	}
	
	subject_topic += '<br>'
	//subject_topic += '<div class=col-lg-6 class="backround-color:c0c0c0;">'
	subject_topic += '<table class="col-lg-6 style="backround-color:c0c0c0;">'
	subject_topic += '<tr><td class=a7><br>'
	var tech = subject == 'cplusplus' ? 'C++' : subject

	subject_topic += 'Search ' + tech + ' topics here'
	subject_topic += '<div id='
	subject_topic += '</td></tr>'
	subject_topic += '<tr><td>'
	subject_topic += '<input onkeyup="myFunction()" type=text placeholder="Search topics here" class=form-control id=search_topic>'
	subject_topic += '<br></td></tr>'
	subject_topic += '</table>'

	//subject_topic += '</div>'
	
    //subject_topic += '<table class="col-lg-12 col-xs-12 col-sm-12 " style="width:; background-color:;" id=techlist><tr class="spaceUnder2"><td></td></tr></table>'
	subject_topic += '<br><table class="col-lg-12 col-xs-12 col-sm-12 " style="width:; background-color:;" id=techlist></table>'


	
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
/*
		var tmptopic = topic;
		//console.log('t: ' + t);
		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");
*/
		var topic_entry = ''
		
		topic_entry += create_topic_link(topic)
		
		//topic_entry += create_hide_save_delete_buttons(tmptopic, dataJobj)

		/*
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
		*/

		var tmptopic = topic;

		tmptopic = tmptopic.replace(/ /g,'_');
		tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
		tmptopic = tmptopic.replace("'", "\'");
	
		var tr_id = tmptopic + "_top"
		console.log(tr_id)
		var td_id = tmptopic + "_td"
		var techlist_div_id = tmptopic + "_techlist_div"
		
		$('#techlist').append('<tr class="spaceUnder2" id="' + tr_id + '"><td id="' + td_id + '">' + topic_entry + '</tr></td>');
		$('#' + td_id).append('<br>')
		$('#' + td_id).append('<div id="' + techlist_div_id + '"></div>')
		
		/*
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
				

					var prog_send = tmptopic + "_progsend"
		$("#" + prog_send).on('click', function() {
			
			var prog_content = $("#" + prog_code).html()
			console.log('prog_html: ' + prog_content)

			prog_content = prog_content.replace(/<div>/g, "<br>")
			prog_content = prog_content.replace(/<br>/g, "%3Cbr%3E")
			prog_content = prog_content.replace(/"/g, "%22")
			
			$("#tmp_hid").html(prog_content)
			prog_content = $("#tmp_hid").text()
			console.log('prog_content: ' + prog_content)

			var prog_in = $("#" + prog_input).val()
			console.log('prog_in: ' + prog_in)

			prog_in = prog_in.replace(/<br>/g, "%3Cbr%3E")
			prog_in = prog_in.replace(/\n/g, " ")
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
	*/
		

	});
	
				
	topic_list.list.forEach(function(list_item) {
		try {
			var anchor = list_item.topic;
			anchor = anchor.replace(/ /g,'_');
			anchor = anchor + "_anchor"
			console.log(anchor);
			$("#" + anchor).bind('click', dataJobj, show_cb);

			/*
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
			*/
			
			
		}
		catch(except) {
							
		}
		
	});

	$("#add_topic_but").on('click', add_cb);
	$("#reset_topic_but").on('click', reset_cb);

						
}

function technology_click_handler(event)
{		
	//console.log(event.target.id);

	var dataJobj = event.data;
	var technology = event.target.id;
	technology = technology.replace(/_/g,' ');
	console.log('tech: ' + technology);

	$.ajax({
				url: '/list_topics',
				type: 'GET',
				data: '&technology=' + technology,
				success: (topic_list) => {
					console.log(topic_list)
					technology_info_display_cb(topic_list, technology, dataJobj)
				}
	
			});
			
}

function get_technology_topics(dataJobj)
{
		// callbacks for click events for buttons Add, Show, Edit, Reset, and Delete have to be loaded
		// once we click on tab buttons because Add, Show, Edit, Reset, and Delete buttons are dynamically
		// loaded
		var tabs = dataJobj.tabs
		//console.log('tabs: ' + tabs)

		$(tabs).bind('click', dataJobj, technology_click_handler);
}
