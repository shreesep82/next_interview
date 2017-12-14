
function add_topic_setpanel_addinstance()
{
    var subject_topic = ''
    
    subject_topic += '<script>'
	subject_topic += 'myNicEditor.setPanel("'
	subject_topic += 'add_topic_control'
	subject_topic += '");'
	subject_topic += '</script>'

	subject_topic += '<script>'
	subject_topic += 'myNicEditor.addInstance("'
	subject_topic += 'add_topic_description'
	subject_topic += '");'
    subject_topic += '</script>'
    
    return subject_topic;
}

function add_topic_panel()
{
    var subject_topic = ''
    

    subject_topic += '<div class="container-fluid">'
    subject_topic += '<div class="row">'
    subject_topic += '<div class="col-lg-12" style="background-color:yellow;">'
    subject_topic += '		<table width=100% class="table-bordered table-condensed" style="background-color: #696969">'

	subject_topic += '			<tr><td>'
	subject_topic += '<input type=text class="form-control" id=add_topic_content placeholder="Enter topic here">'
	subject_topic += '</td></tr>'
		
	subject_topic += '			<tr><td>'
	subject_topic += '<div class="col-lg-12" id='
	subject_topic += '\''
	subject_topic += 'add_topic_control'
	subject_topic += '\''
	subject_topic += ' style="background-color: #000000; border: 2px solid #c0c0c0; ">'
	subject_topic += '</div>'
	subject_topic += '</td></tr>'
				
	subject_topic += '			<tr><td>'
	subject_topic += '<div class="col-lg-12" contenteditable="true" id='
	subject_topic += '\''
	subject_topic += 'add_topic_description'
	subject_topic += '\''
	subject_topic += ' data-placeholder="Write description here"   style=" background-color: #000000; overflow-y: scroll; overflow-x:hidden;  font-size: 16px; background-color: #c0c0c0; ">'
	subject_topic += '</div>'
	subject_topic += '</td></tr>'
		
	subject_topic += '			<tr><td align="right">'
    subject_topic += '<div class="col-lg-12">'
	subject_topic += '				<button class="btn btn-primary" id=add_topic_but>Add</button>'
	subject_topic += '				<button class="btn btn-primary" id=reset_topic_but>Reset</button>'
    subject_topic += '			</div>'
    
	subject_topic += '			</td></tr>'
    
    subject_topic += '			</table>'
    subject_topic += '			</div>'
    subject_topic += '			</div>'
    subject_topic += '			</div>'
    
    return subject_topic;
}

function create_topic_link(topic)
{
    var topic_entry = ''
	var tmptopic = topic;

	tmptopic = tmptopic.replace(/ /g,'_');
	tmptopic = tmptopic.replace(/(?:\r\n|\r|\n)/g, '<br>');
	tmptopic = tmptopic.replace("'", "\'");
    
    var top_tr_id = tmptopic + "_top"
	topic_entry += '<tr class="spaceUnder" id='
	topic_entry += '\''
	topic_entry +=	top_tr_id
	topic_entry += '\''
	topic_entry += '><td>'
		
	var anchor_tr_id = tmptopic + "_anchortr"
	topic_entry += '<table>'
	topic_entry += '	<tr id='
	topic_entry += '\''
	topic_entry +=	anchor_tr_id
	topic_entry += '\''
	topic_entry += '><td>'
		
	var a_tmptopic = tmptopic + "_anchor"
	topic_entry += '<a class="a_topic" id='
	topic_entry += '\''
	topic_entry += a_tmptopic
	topic_entry += '\''
	topic_entry += '>'
	topic_entry += topic;
	topic_entry += '</a></td></tr>'
		
	var tr_id = tmptopic + "_tr"
		
	topic_entry += '	<tr style="display:none;" id='
	topic_entry += '\''
	topic_entry += tr_id
	topic_entry += '\''
	topic_entry += '>'
		
	topic_entry += '	<td>'
	topic_entry += '		<table style="">'
	topic_entry += '			<tr class="spaceUnder1">'
	topic_entry += '				<td align="right">'
    
    return topic_entry
}

function create_hide_save_delete_buttons(tmptopic, dataJobj)
{
    var topic_entry = ''
    
    topic_entry += '<div class=container>'
    topic_entry += '<div class="row">'
    topic_entry += '				<div class="col-sm-8 btn-group">'
	topic_entry += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
	topic_entry += '\''
		
	var hide_id = tmptopic + "_hide"
	topic_entry += hide_id
	topic_entry += '\''
	topic_entry += '>Hide</button>'
		
	if(dataJobj.editsave == 'true') {
		topic_entry += '				<button type="button" class="btn btn-outline-primary btn-transparent" id='
		topic_entry += '\''
			
		var edit_save_id = tmptopic + "_editsave"
		topic_entry += edit_save_id
		topic_entry += '\''
		topic_entry += '>Save</button>'
	}
    
	if(dataJobj.delete == 'true') {
		topic_entry += '				<button type="button"  class="btn btn-outline-primary btn-transparent" id='
		//topic_entry += '				<button type="button" disabled class="btn btn-outline-primary btn-transparent" id='		
		topic_entry += '\''
		var delete_id = tmptopic + "_delete"
		topic_entry += delete_id
		topic_entry += '\''
		topic_entry += '>Delete</button>'
	}
    
	topic_entry += '</div>'
    topic_entry += '</div>'
    topic_entry += '</div>'
		
	topic_entry += '				</td>'
	topic_entry += '			</tr>'
	topic_entry += '			<tr>'
	topic_entry += '				<td>'
    
    return topic_entry
}

function add_script_topic_panel_instance(tmptopic)
{
    var topic_entry = ''	
	var div_tmptopic = tmptopic + "_div"
	var instance_tmptopic = tmptopic + "_instance"
        
	topic_entry += '<script>'
	topic_entry += 'myNicEditor.setPanel("'
	topic_entry += div_tmptopic
	topic_entry += '");'
	topic_entry += '</script>'
		
	topic_entry += '<script>'
	topic_entry += 'myNicEditor.addInstance("'
	topic_entry += instance_tmptopic
	topic_entry += '");'
    topic_entry += '</script>'
    
    return topic_entry
}

function create_description_program_headers(tmptopic)
{
    var topic_entry = ''
	var des_div_tmptopic = tmptopic + "_des_div"
	var prog_div_tmptopic = tmptopic + "_prog_div"
	var ul_tmptopic = tmptopic + "_ul"
	var des_li_tmptopic = tmptopic + "_desli"
	var prog_li_tmptopic = tmptopic + "_progli"
    
	topic_entry += '<table class="table-bordered">'
	topic_entry += '<tr><td>'
	topic_entry += '	<ul class="nav nav-pills nav-justified" id='
	topic_entry += '\''
	topic_entry += ul_tmptopic
	topic_entry += '\''
	topic_entry += '>'
	topic_entry += '		<li class="a1 active" data-toggle="tab" id='
	topic_entry += '\''
	topic_entry += des_li_tmptopic
	topic_entry += '\''
	topic_entry += '><a href="">Description</a></li>'
		
	topic_entry += '		<li class="a1" data-toggle="tab" id='
	topic_entry += '\''
	topic_entry += prog_li_tmptopic
	topic_entry += '\''
	topic_entry += '><a href="">Program</a></li>'
	topic_entry += '	</ul>'

	topic_entry += '<tr><td>'
		
	topic_entry += '<div style="display:;" id='
	topic_entry += '\''
	topic_entry += des_div_tmptopic
	topic_entry += '\''
	topic_entry += '>'
    
    topic_entry += '		<table class="table-condensed" style="background-color:  #151705 ; border: 0px solid #000000;">'
    
    return topic_entry
}

function topic_edit_panel(tmptopic)
{
    var topic_entry = ''
    var div_tmptopic = tmptopic + "_div"
			
	topic_entry += '			<tr><td>'
	topic_entry += '<div id='
	topic_entry += '\''
	topic_entry += div_tmptopic
	topic_entry += '\''
	topic_entry += ' style=" background-color:  #151705 ;  border: 0px solid #c0c0c0; ">'
	topic_entry += '</div>'
	topic_entry += '			</td></tr>'

    return topic_entry
}

function description_panel(tmptopic)
{
    var topic_entry = ''
    var instance_tmptopic = tmptopic + "_instance"
    
	topic_entry += '			<tr><td>'
	topic_entry += '<div class="container" contenteditable="true" id='
	topic_entry += '\''
	topic_entry += instance_tmptopic
	topic_entry += '\''
	topic_entry += '  style=" background-color:  #151705 ; overflow-y: scroll; overflow-x:hidden;  font-size: 16px;  padding: 0px; border: 0px solid #c0c0c0; ">'
	topic_entry += '</div>'

	topic_entry += '			</td></tr>'
	topic_entry += '	</table>'
	topic_entry += '</div>'
    
    return topic_entry
}

function add_description_program_content(dataJobj, tmptopic)
{
    var topic_entry = ''
	var des_div_tmptopic = tmptopic + "_des_div"
	var prog_div_tmptopic = tmptopic + "_prog_div"
    
    topic_entry += '<div style="display:none;" id='
	topic_entry += '\''
	topic_entry += prog_div_tmptopic
	topic_entry += '\''
	topic_entry += '>'
		
	var prog_code_control = tmptopic + "_progcodecontrol"
	var prog_code = tmptopic + "_progcode"

	topic_entry += '<script>'
	topic_entry += 'myNicEditor.setPanel("'
	topic_entry += prog_code_control
	topic_entry += '");'
	topic_entry += '</script>'
		
	topic_entry += '<script>'
	topic_entry += 'myNicEditor.addInstance("'
	topic_entry += prog_code
	topic_entry += '");'
    topic_entry += '</script>'

	topic_entry += '		<table class="table-condensed" style="background-color:  #151705 ; border: 0px solid #000000;">'
	if(dataJobj.editsave == 'true') {
		
		topic_entry += '			<tr><td>'
		topic_entry += '<div id='
		topic_entry += '\''
		topic_entry += prog_code_control
		topic_entry += '\''
		topic_entry += ' style=" background-color:  #151705 ;  border: 0px solid #c0c0c0; ">'
		topic_entry += '</div>'
		topic_entry += '			</td></tr>'
			
	}
		
	topic_entry += '			<tr><td>'
		
	topic_entry += '<table>'
	topic_entry += '<tr><td>'
		
	topic_entry += '<div class="container" contenteditable="true" id='
	topic_entry += '\''
	topic_entry += prog_code
	topic_entry += '\''
	topic_entry += '  style="background-color:  #151705 ; overflow-y: scroll; overflow-x:hidden;  font-size: 16px;  padding: 0px; border: 0px solid #c0c0c0; ">'
	topic_entry += '</div>'
		
	topic_entry += '</td></tr>'
		
	var prog_code_table = tmptopic + "_progcodetable"
	var prog_input = tmptopic + "_proginput"
	var prog_output = tmptopic + "_progoutput"
	var prog_send = tmptopic + "_progsend"
				
	topic_entry += '<tr><td id='
	topic_entry += '\''
	topic_entry += prog_code_table
	topic_entry += '\''
	topic_entry += '>'
	topic_entry += '<tr><td>'
	topic_entry += '<table class="" class="">'
	topic_entry += '<tr class="spaceUnder1"><td><br><textarea style="border-color: #c0c0c0;color:#fff;  border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
	topic_entry += '\''
	topic_entry += prog_input
	topic_entry += '\''
	topic_entry += ' ></textarea>'
	topic_entry += '</tr></td>'
	topic_entry += '<tr class="spaceUnder1"><td><br><textarea readonly style="border-color: #c0c0c0;color:#fff;  border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
	topic_entry += '\''
	topic_entry += prog_output
	topic_entry += '\''
	topic_entry += ' ></textarea>'
	topic_entry += '</tr></td>'
	topic_entry += '<tr><td align=right>'
	topic_entry += '<button class="btn btn-primary" id='
	topic_entry += '\''
	topic_entry += prog_send
	topic_entry += '\''
	topic_entry += '>Run Program</button>'
	topic_entry += '</td></tr>'
	topic_entry += '</table>'
	topic_entry += '</td></tr>'
	topic_entry += '</table>'

	topic_entry += '			</td></tr>'
	topic_entry += '	</table>'
	topic_entry += '</div>'
		
	topic_entry += '</table>'
    	
	topic_entry += '					'
	topic_entry += '				</td>'
	topic_entry += '			</tr>'
	topic_entry += '		</table>'
	topic_entry += '	</td>'
	topic_entry += '	</tr>'
	topic_entry += '</table>'
		
	topic_entry += '</td>'
	topic_entry += '</tr>'
    
    return topic_entry
}