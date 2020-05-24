
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openSub1() {
	if( document.getElementById("mySidenav1").style.display == "block")
    document.getElementById("mySidenav1").style.display = "none";

	else{
		document.getElementById("mySidenav1").style.display = "block";
	}
}
function openSub2() {
	if( document.getElementById("mySidenav2").style.display == "block")
    document.getElementById("mySidenav2").style.display = "none";

	else{
		document.getElementById("mySidenav2").style.display = "block";
	}
}