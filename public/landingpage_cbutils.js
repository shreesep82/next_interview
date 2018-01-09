
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

    //div_home += '<div class="col-lg-10" style="">'

    //div_home += '<div class="row" >'
    //div_home += '<div class="col-lg-12 col-sm-12" >'
    
    div_home += '		<table class="col-lg-10 col-xs-12 table-bordered table-condensed" style="width:; background-color:#1F1F1F">'

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

    //div_home += '			</div>'
    //div_home += '			</div>'
    //div_home += '			</div>'
    
    
    /*
    div_home += '<table class="table-bordered"><tr><td><div class="col-lg-12">'
	div_home += '<input type=text class="form-control" id=add_topic_content placeholder="Enter topic here">'
    div_home += '</div>'
    
	div_home += '<div class="col-lg-12" id='
	div_home += '\''
	div_home += 'add_topic_control'
	div_home += '\''
	div_home += '  ">'
	div_home += '</div>'
    
        div_home += '<div class="col-lg-10" contenteditable="true" id='
	div_home += '\''
	div_home += 'add_topic_description'
	div_home += '\''
	div_home += '  style="overflow-y:scroll; overflow-x:hidden; height:350px; color:#ffffff">'
	div_home += '</div></table>'
	*/


    
    return div_home;
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
	topic_entry += '<table class="col-lg-12 col-xs-12 col-md-12" style="width:;border-style:;">'
	topic_entry += '	<tr style="width:;" id='
	topic_entry += '\''
	topic_entry +=	anchor_tr_id
	topic_entry += '\''
	topic_entry += '><td>'
		
	var a_tmptopic = tmptopic + "_anchor"
	topic_entry += '<a class="a4" id='
	topic_entry += '\''
	topic_entry += a_tmptopic
	topic_entry += '\''
	topic_entry += '>'
	topic_entry += topic;
	topic_entry += '</a></td></tr>'
		
	var tr_id = tmptopic + "_tr"
		
	topic_entry += '	<tr style="display:none; width:;" id='
	topic_entry += '\''
	topic_entry += tr_id
	topic_entry += '\''
	topic_entry += '>'
		
	topic_entry += '	<td>'
	topic_entry += '		<table class="col-lg-12 col-xs-12 col-md-12" style="width:; border-style:;">'
	topic_entry += '			<tr class="spaceUnder1" style="width:;">'
	topic_entry += '				<td align="right">'
    
    return topic_entry
}

function create_hide_save_delete_buttons(tmptopic, dataJobj)
{
    var topic_entry = ''
    
    //topic_entry += '<div class=container-fluid>'
    //topic_entry += '<div class="row">'
    //topic_entry += '<div class="">'
    topic_entry += '				<div class=" btn-group" style="width:;  align:;">'
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
    //topic_entry += '</div>'
    //topic_entry += '</div>'
    //topic_entry += '</div>'
		
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
    
	topic_entry += '<table class="col-lg-12 col-xs-12 table-bordered" style="width:;">'
	topic_entry += '<tr><td>'
    
    /*
     topic_entry += '<ul class="nav nav-tabs">'
    topic_entry += '<li class="active"><a data-toggle="tab" href="#home">Home</a></li>'
    topic_entry += '<li><a data-toggle="tab" href="#menu1">Menu 1</a></li>'

  topic_entry += '</ul>'
    */
    
    
	topic_entry += '	<ul class="nav nav-tabs nav-pills" id='
	topic_entry += '\''
	topic_entry += ul_tmptopic
	topic_entry += '\''
	topic_entry += '>'
	topic_entry += '		<li class="a3 active" data-toggle="tab" id='
	topic_entry += '\''
	topic_entry += des_li_tmptopic
	topic_entry += '\''
	topic_entry += '><a href="">Description</a></li>'
		
	topic_entry += '		<li class="a3" data-toggle="tab" id='
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
    
    topic_entry += '		<table class="col-lg-12 col-xs-12 table-condensed" style="width:; background-color:  #151705 ; border: 0px solid #000000;">'
    
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
	topic_entry += '<div class="" contenteditable="true" id='
	topic_entry += '\''
	topic_entry += instance_tmptopic
	topic_entry += '\''
	topic_entry += '  style="width:; background-color:  #151705 ; overflow-y:scroll; overflow-x:hidden; height:650px; font-size: 16px;  padding: 0px; border: 0px solid #c0c0c0; ">'
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

	topic_entry += '		<table class="col-lg-12 col-xs-12 table-condensed" style="width:; background-color:  #151705 ; border: 0px solid #000000;">'
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
		
	topic_entry += '<table class="col-lg-12 col-xs-12" style="width:;">'
	topic_entry += '<tr><td>'
		
	topic_entry += '<div class="" contenteditable="true" id='
	topic_entry += '\''
	topic_entry += prog_code
	topic_entry += '\''
	topic_entry += '  style="background-color:  #151705 ; color: #ffffff; overflow-y:scroll; overflow-x:hidden; height:450px;  font-size: 16px;  padding: 0px; border: 0px solid #c0c0c0; ">'
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
	topic_entry += '<table class="col-lg-12 col-xs-12" class="" style="width:;">'
	topic_entry += '<tr class="spaceUnder1"><td><br><textarea placeholder="Program input goes here" style="border-color: #c0c0c0;color:#fff; height:100px; border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
	topic_entry += '\''
	topic_entry += prog_input
	topic_entry += '\''
	topic_entry += ' ></textarea>'
	topic_entry += '</tr></td>'
	topic_entry += '<tr class="spaceUnder1"><td><br><textarea placeholder="Program output appears here" readonly style="border-color: #c0c0c0;color:#fff; height:100px; border-width: 2px; background-color: #130106 ; border: 2px;" class="form-control textarea_nodrag" style="width:" id='
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