(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{50:function(e,t,a){e.exports=a(92)},89:function(e,t,a){},92:function(e,t,a){"use strict";a.r(t);var n=a(36),l=a(37),r=a(38),s=a(44),i=a(39),c=a(45),o=a(0),h=a(10),p=a(99),u=a(95),m=a(14),g=a(96),d=a(100),v=a(41),b=a.n(v),f=a(42),E=a.n(f),y=a(101),S=a(98);function C(e){var t=o.useState(e.checked),a=Object(m.a)(t,2),n=a[0],l=a[1];return o.createElement(y.a,{control:o.createElement(S.a,{value:e.value,color:"primary",checked:n,onClick:function(){var t=!n;l(t),e.toggle(e.retVal,t)}}),label:e.label})}var w=[{value:"base-count",label:"Number of Bases",retVal:"bc"},{value:"gc-ratio",label:"GC ratio",retVal:"gc"},{value:"n-base",label:"N Bases",retVal:"nb"},{value:"original",label:"Original ",retVal:"os"},{value:"complement",label:"Complement ",retVal:"cs"},{value:"reverse",label:"Reverse ",retVal:"rs"},{value:"rev-complement",label:"Reverse Complement",retVal:"rcs"}];function x(e){var t=o.useState(!1),a=Object(m.a)(t,2),n=a[0],l=a[1],r=o.useState(e.grp),s=Object(m.a)(r,2),i=s[0],c=s[1],h=e.checkedState,p=o.useState(h),u=Object(m.a)(p,2),v=u[0],f=u[1],y=function(t,a){h[t]=a,f(h),e.onCheckboxToggle(t,a)},S=function(){l(!1)};return o.createElement("div",{style:{position:"relative"}},o.createElement("div",{style:{position:"absolute",top:"10px",fontSize:"45px"},onClick:function(){l(!0)}},o.createElement(b.a,{color:"primary",fontSize:"inherit",style:{cursor:"pointer"}})),o.createElement(g.a,{open:n,onClose:S,"aria-labelledby":"Options","aria-describedby":"Options",style:{overflowY:"scroll"}},o.createElement("div",{style:{backgroundColor:"white",padding:"5px",width:"95vw",maxWidth:"350px",border:"solid 1px red",position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column"}},o.createElement("div",{style:{display:"flex",flexDirection:"row",justifyContent:"space-between"}},o.createElement("h2",{style:{margin:"0"}},"Options"),o.createElement(E.a,{color:"primary",onClick:S,style:{cursor:"pointer"}})),o.createElement("h3",{style:{margin:"0.5em 0 0 0"}},"Chunk Size"),o.createElement(d.a,{defaultValue:i,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",onChange:function(t,a){c(a),e.onSliderChange(t,a)},step:1,marks:!0,min:0,max:6}),o.createElement("h3",{style:{margin:"0.5em 0 0 0"}},"Outputs"),w.map(function(e){return o.createElement(C,{value:e.value,label:e.label,retVal:e.retVal,checked:v[e.retVal],toggle:y})}))))}var k=a(97),O=a(93),N=a(94),j=a(43),A=a.n(j);function T(e){var t=o.useState(e.show),a=Object(m.a)(t,2),n=a[0],l=a[1];return o.createElement("div",null,o.createElement(k.a,{disabled:!e.show,expanded:n&&e.show,style:{margin:"10px 0"},onChange:function(){l(!n)}},o.createElement(O.a,{style:{margin:"0",minHeight:"1em",padding:"0 24px"},expandIcon:o.createElement(A.a,null)},o.createElement("h4",{style:{margin:"0"}},e.label)),o.createElement(N.a,{style:{padding:"0 24px"}},e.content)))}function V(e){return e.show?o.createElement("pre",null,e.val.split("").map(function(e){return o.createElement("span",{style:{color:"N"===e?"red":"inherit"}},e)})):null}String.prototype.removeWhiteSpace=function(){return this.replace(/\s/g,"")},String.prototype.sanitize=function(){return this.removeWhiteSpace().toUpperCase().replace(/[^A|C|T|G|N]/g,"N")},String.prototype.countBase=function(){return this.removeWhiteSpace().length},String.prototype.getGCRatio=function(){var e=(this.match(/G|C|g|c/g)||[]).length,t=(this.match(/A|T|a|t/g)||[]).length;return Math.round(100*e/(t+e))/100},String.prototype.getNBase=function(){return this.match(/N|n/g)?this.match(/N|n/g).length:0},String.prototype.getInvalidBase=function(){return this.replace(/A|C|T|G|N|a|c|t|g|n|\s|\n/g,"").length},String.prototype.rev=function(){return this.split("").reverse().join("")},String.prototype.comp=function(){var e={A:"T",T:"A",C:"G",G:"C",N:"N"};return this.split("").map(function(t){return e[t]}).join("")},String.prototype.addSpace=function(e){if(0===e)return this.toString();var t=new RegExp(".{0,"+e+"}","g");return this.match(t).join(" ")};a(89);a.d(t,"default",function(){return G});var G=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,c=new Array(r),o=0;o<r;o++)c[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(c)))).state={seq:"ACTG",bc:!0,bcval:4,gc:!0,gcval:.5,nb:!0,nbval:0,invalid:0,os:!0,osval:"ACTG",cs:!0,csval:"TGAC",rs:!0,rsval:"GTCA",rcs:!0,rcsval:"CAGT",grp:4},a.sanitizedValue="ACTG",a.displaySeqs=function(e){a.state.os&&a.setState({osval:e.addSpace(a.state.grp)}),a.state.rs&&a.setState({rsval:e.rev().addSpace(a.state.grp)}),a.state.cs&&a.setState({csval:e.comp().addSpace(a.state.grp)}),a.state.rcs&&a.setState({rcsval:e.rev().comp().addSpace(a.state.grp)})},a.onInputChange=function(e){var t=e.target.value;t||(t=""),a.sanitizedValue=t.sanitize(),a.setState({seq:t}),a.displaySeqs(a.sanitizedValue),a.setState({bcval:t.countBase()}),a.setState({gcval:t.getGCRatio()}),a.setState({nbval:t.getNBase(),invalid:t.getInvalidBase()})},a.onFocusInput=function(e){e.target.select()},a.handleCheckboxToggle=function(e,t){a.setState(Object(n.a)({},e,t))},a.handleSliderChange=function(e,t){a.setState({grp:t},function(){a.displaySeqs(a.sanitizedValue)})},a}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return o.createElement("div",{className:"App",style:{display:"flex",flexDirection:"column"}},o.createElement("div",{style:{width:"50px",height:"100vh",position:"fixed",top:"0"}}," ",o.createElement(x,{checkedState:{bc:this.state.bc,gc:this.state.gc,nb:this.state.nb,rs:this.state.rs,os:this.state.os,cs:this.state.cs,rcs:this.state.rcs},onCheckboxToggle:this.handleCheckboxToggle,onSliderChange:this.handleSliderChange,grp:this.state.grp})),o.createElement("div",{style:{width:"calc(100% - 50px)",marginLeft:"50px"}},o.createElement("h1",{style:{margin:"0",padding:"10px 0"}},"DNA"),o.createElement(u.a,null,o.createElement("h3",{style:{margin:"10px 0 10px 0"}},"Input DNA Data"),o.createElement(p.a,{style:{resize:"vertical",minHeight:"20px",fontSize:"1em"},rows:5,value:this.state.seq,spellCheck:!1,"aria-label":"Enter DNA sequence",placeholder:"White spaces and line breaks will be ignored. Input is not case sensitive.",onChange:this.onInputChange,onFocus:this.onFocusInput})),o.createElement("h3",{style:{margin:"10px 0 0 0"}},"Outputs"),o.createElement(T,{label:"Base Count",content:this.state.bc?o.createElement(o.Fragment,null,o.createElement("pre",null,this.state.bcval)):"",show:this.state.bc}),o.createElement(T,{label:"GC Ratio",content:this.state.gc?o.createElement(o.Fragment,null,o.createElement("pre",null,this.state.gcval)):"",show:this.state.gc}),o.createElement(T,{label:"N Bases",content:this.state.nb?o.createElement(o.Fragment,null,o.createElement("pre",null,o.createElement("span",{style:{color:this.state.nbval>0?"red":"inherit"}},this.state.nbval)," ","N bases and"," ",o.createElement("span",{style:{color:this.state.invalid>0?"red":"inherit"}},this.state.invalid)," ","invalid bases.")):"",show:this.state.nb}),o.createElement(T,{label:"Original Sequence",content:o.createElement(V,{val:this.state.osval,show:this.state.os}),show:this.state.os}),o.createElement(T,{label:"Complement Sequence",content:o.createElement(V,{val:this.state.csval,show:this.state.cs}),show:this.state.cs}),o.createElement(T,{label:"Reverse Sequence",content:o.createElement(V,{val:this.state.rsval,show:this.state.rs}),show:this.state.rs}),o.createElement(T,{label:"Reverse Complement Sequence",content:o.createElement(V,{val:this.state.rcsval,show:this.state.rcs}),show:this.state.rcs})),o.createElement("footer",{style:{height:"50px",marginTop:"30px"}},"Made by ",o.createElement("a",{href:"https://www.darshanbaral.com/"},"Darshan"),". Fork"," ",o.createElement("a",{href:"https://github.com/darshanbaral/dna"},"here"),"."))}}]),t}(o.Component),q=document.getElementById("root");Object(h.render)(o.createElement(G,null),q)}},[[50,2,1]]]);
//# sourceMappingURL=main.66533f01.chunk.js.map