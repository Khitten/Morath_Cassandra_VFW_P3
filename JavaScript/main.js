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
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//convert the string from local storage valyue back to an oblect by using JSON.parse()
			var obj = JSON.parse(value); //I knew this!
			var makeSubList = document.createElement("ul")
			makeli.appendChild(makeSubList);
			for (var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0] + " "+ obj[n][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	//clear local storage... ths clears everything. I need a finction that lets me clear one field or entry.
	function clearLocal(){
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