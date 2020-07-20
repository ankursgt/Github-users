import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    title = 'app';
    
    flag=0;
    users;
    api='';
    login='';
    usertype='';
    repos;
    follow='';
    imgurl='';
    tkn;
    cue = new Subject<string>();

    
  constructor(private http: HttpClient){
    this.cue.pipe(debounceTime(1000)).subscribe(v=>{this.searchUser(v)});
    
  }

  url = 'https://api.github.com/users';
  searchurl = 'https://api.github.com/search/users?q=';

  
  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('User-Agent','ankursgt'); 
  }

//Search a user
  searchUser(value){
    console.log("request at: ", new Date().toUTCString());
    this.showDropDown = true;

    if(this.flag==0){
      this.toggleDropDown();
       this.flag=1;
     }
      
      
     if(value){
      if(value.length>3){
      
     this.http.get<UserResponse>(this.searchurl+value).map(response => response.items).subscribe(data=>{
        this.users = data,
        err=>console.log(err);
    });
      }
    }
    
    
    
  }
//Get all users
  getAllUsers(){
    this.showDropDown =true;
    this.http.get(this.url).subscribe(data=>{ 
      this.users = data,
      err=>console.log(err);
  });
  }

  showDropDown = false;

  toggleDropDown(){
    this.showDropDown = !this.showDropDown;
  }

  //Select a user and display repository
  selectUser(value){
    this.showDropDown = false;
    this.http.get(this.url+"/"+value+"/repos").subscribe(data=>{
    // this.api='API: '+data[0].url;
    // this.login='ID: '+data[0].login;
    // this.imgurl=data[0].avatar_url;
    // this.usertype='Type: '+data[0].type;
    console.log(data);
    this.repos=data;
    // this.follow='Followers: '+data[0].followers_url;
    });


  }
  
}

// function search(et){
//   document.getElementsByClassName("dropdown").style.display = "block";
// }

//var query: string = document.getElementById("in")




interface UserResponse {
  items: string[];
}

