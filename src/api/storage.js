

export const mem={},L={g(k,d){if(k in mem)return mem[k];try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},s(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
