/* Origami engine: model size ratios, paper sizing, square cutting.
   Finished-size ratios are approximations measured from classic folds;
   actual results vary with fold precision and paper thickness.
   Pure JS, browser + Node. */
(function(root,factory){
  if(typeof module==='object'&&module.exports){module.exports=factory();}
  else{root.Origami=factory();}
})(typeof self!=='undefined'?self:this,function(){
'use strict';
/* ratio: finished model's signature dimension / paper side (approx) */
var MODELS=[
 {id:'crane',name:'Crane (Tsuru)',difficulty:2,steps:22,ratio:0.42,dim:'wingspan',
  note:'The thousand-crane classic. Use thin crisp paper.'},
 {id:'frog',name:'Jumping Frog',difficulty:1,steps:16,ratio:0.35,dim:'body length',
  note:'Press the back edge to make it hop.'},
 {id:'boat',name:'Traditional Boat',difficulty:1,steps:12,ratio:0.40,dim:'hull length',
  note:'Floats briefly; waxed paper lasts longer.'},
 {id:'box',name:'Masu Box',difficulty:1,steps:14,ratio:0.25,dim:'base width',
  note:'Box side = paper/4; two sheets make box + lid (lid +3%).'},
 {id:'lily',name:'Iris / Lily',difficulty:2,steps:20,ratio:0.38,dim:'petal span',
  note:'Curl petals over a pencil for the finish.'},
 {id:'dart',name:'Dart Plane',difficulty:1,steps:8,ratio:0.62,dim:'fuselage length',
  note:'The schoolyard classic; flies best from A4.'},
 {id:'butterfly',name:'Yoshizawa Butterfly',difficulty:2,steps:18,ratio:0.45,dim:'wingspan',
  note:'Akira Yoshizawa elevated origami to art.'},
 {id:'helmet',name:'Samurai Helmet (Kabuto)',difficulty:1,steps:10,ratio:0.40,dim:'width',
  note:'Folded for Children\'s Day in Japan.'},
 {id:'balloon',name:'Water Balloon',difficulty:1,steps:13,ratio:0.30,dim:'diameter',
  note:'Inflates through the corner hole.'},
 {id:'star',name:'Lucky Star (per strip)',difficulty:1,steps:6,ratio:0.05,dim:'star diameter',
  note:'Made from long strips, not squares; ratio is to strip length.'}
];
function list(){return MODELS;}
function byId(id){for(var i=0;i<MODELS.length;i++)if(MODELS[i].id===id)return MODELS[i];return null;}
var STD_SQUARES=[7.5,10,15,20,25,30,35];
/* paper side needed for a target finished dimension */
function paperFor(modelId,targetCm){
  var m=byId(modelId);
  if(!m||!(targetCm>0))return null;
  var side=targetCm/m.ratio;
  var std=null;
  for(var i=0;i<STD_SQUARES.length;i++)if(STD_SQUARES[i]>=side){std=STD_SQUARES[i];break;}
  return {sideCm:Math.round(side*10)/10,suggest:std,model:m.name,dim:m.dim};
}
/* biggest square from a rectangular sheet + leftover strips */
function cutSquare(w,h){
  if(!(w>0)||!(h>0))return null;
  var side=Math.min(w,h),rest=Math.abs(w-h);
  var leftover=[];
  if(rest>0){
    if(w>h)leftover.push({w:Math.round(rest*10)/10,h:h});
    else leftover.push({w:w,h:Math.round(rest*10)/10});
  }
  return {side:Math.round(side*10)/10,leftover:leftover};
}
var SHEETS=[
 {id:'a4',name:'A4',w:21.0,h:29.7},{id:'a3',name:'A3',w:29.7,h:42.0},
 {id:'a5',name:'A5',w:14.8,h:21.0},{id:'letter',name:'US Letter',w:21.6,h:27.9},
 {id:'legal',name:'US Legal',w:21.6,h:35.6}
];
function sheets(){return SHEETS;}
function sheetSquare(id){
  for(var i=0;i<SHEETS.length;i++)if(SHEETS[i].id===id){
    var s=SHEETS[i];
    var r=cutSquare(s.w,s.h);
    r.sheet=s.name;
    return r;
  }
  return null;
}
return {list:list,byId:byId,paperFor:paperFor,cutSquare:cutSquare,sheets:sheets,sheetSquare:sheetSquare};
});
