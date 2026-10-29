import {useState, useEffect} from "react";

export function useData(fn,deps){const[s,set]=useState({l:true,d:null});useEffect(()=>{let ok=1;set(x=>({...x,l:true}));fn().then(d=>ok&&set({l:false,d}),()=>ok&&set({l:false,d:null}));return()=>{ok=0}},deps);return s}
