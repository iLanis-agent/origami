/* Origami tests: engine vs tests/expected.json (python oracle). */
'use strict';
const fs=require('fs'),path=require('path');
const O=require(path.join(__dirname,'..','engine.js'));
const items=JSON.parse(fs.readFileSync(path.join(__dirname,'expected.json'),'utf8')).items;
let pass=0,fail=0;
function ok(){pass++;}
function bad(l,a,b){fail++;console.log('FAIL '+l+': got '+JSON.stringify(a)+' want '+JSON.stringify(b));}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}
for(const it of items){
  const T=it.kind+' '+JSON.stringify(it).slice(0,45)+' ';
  if(it.kind==='paper'){
    const r=O.paperFor(it.model,it.target),o=it.oracle;
    if(o===null){if(r===null)ok();else bad(T+'null',r,o);continue;}
    if(r&&r.sideCm===o.sideCm&&r.suggest===o.suggest)ok(); else bad(T,{s:r&&r.sideCm,g:r&&r.suggest},o);
  }else if(it.kind==='cut'){
    const r=O.cutSquare(it.w,it.h);
    if(same(r,it.oracle))ok(); else bad(T,r,it.oracle);
  }else{
    const r=O.sheetSquare(it.id),o=it.oracle;
    if(r&&r.side===o.side&&same(r.leftover,o.leftover))ok(); else bad(T,r,o);
  }
}
// sanity
const ids=O.list().map(m=>m.id);
if(new Set(ids).size===ids.length&&ids.length===10)pass++; else bad('model list',ids.length,10);
if(O.list().every(m=>m.ratio>0&&m.ratio<1))pass++; else bad('ratios','out of range','0<r<1');
console.log(pass+' passed, '+fail+' failed');
process.exit(fail?1:0);
