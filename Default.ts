/// <reference path="angular.d.ts" />

var app = angular.module("myapp", []);

app.controller('DataController', function ($http) {
	var self = this;
	this.target={};
	this.isList=true;
	this.isCreate=false;
	$http.get("https://api.github.com/users/mralexgray/repos").success(function (response) {
		self.items = response;
	});
	
	this.Create=function(){
		self.isList=false;
		self.target={};
		self.isCreate=true;
	};
	this.Edit=function(item){
		self.isList=false;
		self.target=angular.copy(item);
	};
	this.Save=function(target){
		if(self.isCreate){
			var date=Date.now();
			target.id=date.toString();
			target.created_at=date;
			self.items.push(target);
			self.isCreate=false;
		}
		else{
			angular.forEach(self.items,function(value,key){
				if(self.items[key].id===target.id){
					console.log(self.items[key]);
					self.items[key].name=target.name;
					self.items[key].full_name=target.full_name;
					self.items[key].created_at=Date.now();
				}
			});
		}
		this.isList=true;
	};
	this.Delete=function(item){
		var deleteData = self.items.indexOf(item);
		self.items.splice(deleteData,1);
	};
})