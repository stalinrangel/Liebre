function vide1()
{
	document.getElementById("psi").value="";
	
}

function addCode(tag)
 {
   var Field = document.getElementById('psi');
   	
	if(Field.value.length > 19)
	{
		  document.getElementsByClassName('bf').setAttribute('disabled', 'true');

	}
	else
	{
	 
   var val = Field.value;
   var selected_txt = val.substring(Field.selectionStart, Field.selectionEnd);
   var before_txt = val.substring(0, Field.selectionStart);
   var after_txt = val.substring(Field.selectionEnd, val.length);
   Field.value += tag  ;
  
	}
   
}

