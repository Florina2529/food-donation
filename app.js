var Store={
  load:function(k){try{var v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)?v:[];}catch(e){return[];}},
  save:function(k,v){localStorage.setItem(k,JSON.stringify(v));},
  get:function(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}},
  set:function(k,v){localStorage.setItem(k,JSON.stringify(v));}
};
function currentUser(){return Store.get('currentUser');}
function isAdmin(){var u=currentUser();return u&&u.role==='admin';}
function isNGO(){var u=currentUser();return u&&u.role==='ngo';}
function isDonor(){var u=currentUser();return u&&u.role==='donor';}
function logout(){Store.set('currentUser',null);window.location.href='login.html';}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function buildNav(active){
  var u=currentUser();
  var links=[
    {h:'index.html',l:'Home',p:'index'},
    {h:'about.html',l:'About',p:'about'},
    {h:'donate.html',l:'Donate',p:'donate'},
    {h:'contact.html',l:'Contact',p:'contact'}
  ];
  if(!u){
    links.push({h:'login.html',l:'Login',p:'login'});
  } else if(u.role==='admin'){
    links.push({h:'admin.html',l:'Admin Dashboard',p:'admin'});
    links.push({h:'#',l:'Logout ('+u.name+')',p:'',oc:'logout()'});
  } else if(u.role==='ngo'){
    links.push({h:'ngo.html',l:'NGO Dashboard',p:'ngo'});
    links.push({h:'#',l:'Logout ('+u.name+')',p:'',oc:'logout()'});
  } else {
    links.push({h:'donor.html',l:'My Donations',p:'donor'});
    links.push({h:'#',l:'Logout ('+u.name+')',p:'',oc:'logout()'});
  }
  var html='<nav class="navbar navbar-expand-lg navbar-dark bg-success"><div class="container">'+
    '<a class="navbar-brand" href="index.html">🍲 Food Donation Platform</a>'+
    '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"><span class="navbar-toggler-icon"></span></button>'+
    '<div class="collapse navbar-collapse" id="navMenu"><ul class="navbar-nav ms-auto">';
  links.forEach(function(l){
    var a=l.p===active?' active':'';
    var oc=l.oc?' onclick="'+l.oc+'"':'';
    html+='<li class="nav-item"><a class="nav-link'+a+'" href="'+l.h+'"'+oc+'>'+l.l+'</a></li>';
  });
  html+='</ul></div></div></nav>';
  document.getElementById('mainNav').outerHTML=html;
}
