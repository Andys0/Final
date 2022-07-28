const d=document,
$shows=d.getElementById("shows"),
$template=d.getElementById("show-template").content,
$fragment=d.createDocumentFragment();

d.addEventListener("keypress",async e =>{
    if(e.target.matches("#search")){
        //console.log(e.key);
        if(e.key==="Enter"){
            try{
                $shows.innerHTML= `<img class="loader" src="cargar.jpg" alt="cargando...">`;

            let query=e.target.value.toLowerCase(),
            api=`https://api.tvmaze.com/search/shows?q=${query}`,
            res=await fetch(api),
            json=await res.json();
            //console.log(api,res,json)
            
            if(!res.ok)throw{status:res.status,statusText:res.statusText};
            if(json.length===0){
                $shows.innerHTML=`<h2>No hay resultados para: <mark>${query}</mark></h2>`;
            }else{
                json.forEach(el=>{
                    $template.querySelector("h3").textContent=el.show.name;
                    $template.querySelector("div").innerHTML=el.show.summary ? el.show.summary:"Sin descripción";
                    $template.querySelector("img").src= el.show.image.medium;
                    $template.querySelector("img").alt=el.show.name;
                    $template.querySelector("img").style.maxWidth="100%";
                    $template.querySelector("a").href=el.show.url ? el.show.url:"#";

                let $clone=d.importNode($template,true);
                $fragment.appendChild($clone);
                });
                $shows.innerHTML=``;
                $shows.appendChild($fragment);
            }
            }catch(err){
                console.log(err);
                let message= err.statusText || "Ocurrio un error";
                $shows.innerHtml=`<p>Error$(err.status):$(message)</p>`;
            }
        }
    }
})