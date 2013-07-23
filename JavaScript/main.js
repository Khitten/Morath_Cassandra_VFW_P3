// JavaScript Document
//Cassandra Morath
//VFW Project 2 1307
//Jan 8, 2013
window.addEventListener("DOMContentLoaded", function(){
//Get elementById function
	function $(x){
		var elementId = document.getElementById(x);
		return elementId;
	}
	
//create select field element and populate with options
	function chooseBreed(){ 
		var selectLi = $('breed');
		var	makeSelect = document.createElement('select');
			makeSelect.setAttribute("id" ,"breed");
		for(var i=0 , j=breedInfo.length; i<j; i++) {
			var pickOption = document.createElement("option");
			var optionText = breedInfo[i];
			pickOption.setAttribute("value", optionText);
			pickOption.innerHTML = optionText;
			selectLi.appendChild( pickOption );
	
	}	
}
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}

	function toggleControls(n){
		switch(n){
			case "on":
				$("clientInformation").style.display = "none";
				$("clear").style.display = "inline";
				$("display").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("clientInformation").style.display = "block";
				$("clear").style.display = "inline";
				$("display").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;		
		}
		
	}

	function storeInfo(){
		var id = Math.floor(Math.random()*100000000001);
		getSelectedRadio();
		var item = {};
			
			item.oname = ["Owner's Name:", $("oname").value];
			item.onotes = ["Owner's Notes:", $("onotes").value];
			item.pname = ["Pet's Name:", $("pname").value];
			item.breed = ["Breed:", $("breed").value];
			item.gdate = ["Groom Date:", $("gdate").value];
			item.slider = ["Difficulty:", $("slider").value];
			item.gnotes = ["Grooming Notes:", $("gnotes").value];
			item.pnotes = ["Pet Notes:", $("pnotes").value];
			item.sex = ["Sex:", sexValue]; 
			//Save data into local storage: use Stringify to convert object to a string. 
			
		localStorage.setItem(id, JSON.stringify(item));
		alert("Pet saved!");		
	}

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in local storage.");
			}
		//Write data from local storage
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement("li");
			var linksli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local storage valyue back to an oblect by using JSON.parse()
			var obj = JSON.parse(value); 
			var makeSubList = document.createElement("ul")
			makeli.appendChild(makeSubList);
			for (var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0] + " "+ obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksli);
			}
			makeItemLinks(localStorage.key(i), linksli); //create our edit and delete buttons/link for each item in local storage
		}
	}
	//make item links function
	//Create the edit and delete linksfor each stored item displayed.
	function makeItemLinks(key, linksli){
		//add edit single item link
		var editLinks = document.createElement("a");
		editLinks.href = "#";
		editLinks.key = key;
		var changeText = "Edit Information";
		editLinks.addEventListener("click" , editItem);
		editLinks.innerHTML = changeText;
		linksli.appendChild(editLinks);
		
		//add line break
		var bTag = document.createElement("br");
		linksli.appendChild(bTag);
		
		//add delete single item delete
		var deleteLinks = document.createElement("a");
		deleteLinks.href = "#";
		deleteLinks.key = key;
		var deleteText = "Delete Information";
		//deleteLinks.addEventListener("click" , deleteItem);
		deleteLinks.innerHTML = deleteText;
		linksli.appendChild(deleteLinks);
		
	}
	
	function editItem(){
		//Grab the data from our item in local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the form
		toggleControls("off");
		
		//populate the form fields with the current localStorage values
		$("oname").value = item.oname[1];
		$("pname").value = item.pname[1];
		$("breed").value = item.breed[1];
		var radios = document.forms[0].sex;
		for (var i=0; i<radios.length; i++){
			if(radios[i].value == "Male" && item.sex[1] == "Male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Female" && item.sex[1] == "Female"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Neutered" && item.sex[1] == "Neutered"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Spayed" && item.sex[1] == "Spayed"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Unknown" && item.sex[1] == "Unknown"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		
		$("slider").value = item.slider[1];
		$("gdate").value = item.gdate[1];
		$("onotes").value = item.onotes[1];
		$("gnotes").value = item.gnotes[1];
		$("pnotes").value = item.pnotes[1];
	}
	 
	function clearLocal(){
		//clear local storage.
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All contacts are deleted.")
			window.location.reload();
			return false;
		}
		
	}

	//Variable defaults
	var breedInfo = ["--Choose A Breed--", "Dogs", "Cats" ], //Not working?
		sexValue;
	chooseBreed();
	/*Set link and submit click events*/
	var clear = $("clear");
		clear.addEventListener("click" , clearLocal);
	var display = $("display");
		display.addEventListener("click", getData);
	var store = $("store");
		store.addEventListener("click" , storeInfo);
		
});