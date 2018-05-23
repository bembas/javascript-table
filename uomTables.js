(function () {
      'use strict';
   //variables
     var table=document.getElementById('uomTable');
     var tbod=document.getElementById('tbody');
     var tfoot=document.querySelector('tfoot');
     var numbers =document.querySelectorAll("td");
     var heads =document.querySelectorAll("th");
     var allnums=document.getElementsByTagName("td").length;
     var allrows=document.getElementsByTagName('tr').length;
     var cols=allnums/(allrows-1);
     
     heads[3].style.textAlign="left";
     
     
    //creating the table!
    for (var i = 0; i < numbers.length; i++) {
        
      var x =document.createElement("INPUT");
      x.setAttribute("type","number");
      document.body.getElementsByTagName('td').innerHTML=x.setAttribute("value",numbers[i].innerHTML);
      numbers[i].innerHTML=x.innerHTML;
      numbers[i].appendChild(x);
      x.style.width="60px";
    }
      for(var i=3; i<numbers.length; i+=cols){
            numbers[i].appendChild(addclone());
            numbers[i].appendChild(adddelete());
          
        }
      // tfoot select items
          var array = ["Min","Max","Mean","Mode","Median","Range","Variance","StdDev"];
          var tr1 = document.createElement('tr');
          tfoot.appendChild(tr1);
        var selectList=new Array();
        for (var j = 0; j < 4; j++) {
                var td1 = document.createElement('td');
                tr1.appendChild(td1);
                selectList[j] = document.createElement("select");
                td1.appendChild(selectList[j]);
            
                for (var i = 0; i < array.length; i++) {
                   var option = document.createElement("option");
                   option.value = array[i];
                   option.text = array[i];
                   selectList[j].appendChild(option);
                   selectList[j].style.borderRadius='25px';
                   selectList[j].style.border='3px solid red';
                }
            
        }
        
      // second tfoot row for results
        var tr2 = document.createElement('tr');
          tfoot.appendChild(tr2);
         var td2 =new Array();
        for (var j = 0; j < 4; j++) {
             td2[j]=( document.createElement('td'));
                tr2.appendChild(td2[j]);
                td2[j].innerHTML= Min(j);
        }
    
     
    
    //event listener for the select elements
    table.addEventListener("change",function (evt) {
        var index=evt.target.parentNode.cellIndex;
        switch(selectList[index].value){
            case 'Min':
                td2[index].innerHTML=Min(index);
                break;
            case 'Max':
                td2[index].innerHTML=Max(index);
                break;
            case 'Median':
                td2[index].innerHTML=Median(index);
                break;
            case 'Mode':
                td2[index].innerHTML=Mode(index);
                break;
            case 'Mean':
               td2[index].innerHTML=Avg(index).toFixed(2);
                break;
            case 'Variance':
                td2[index].innerHTML=Var(index).toFixed(1);
                break;
            case 'Range':
                td2[index].innerHTML=(Max(index)-Min(index)).toFixed(2);
                break;
            case 'StdDev':
                td2[index].innerHTML=Math.sqrt(Var(index)).toFixed(2);
                break;  
        }  
    },false)
  
   
    //EventListener for delete and copy targets    
    table.addEventListener("click",function (evt) {
             if(evt.target.classList.contains('deletebtn')){
                 var index=evt.target.parentNode.parentNode.rowIndex;
                 var instantrows=tbod.getElementsByTagName('tr').length;  
                if (confirm("Do you want to delete the whole row? ")) {
                    var table = document.getElementById("uomTable");
                    if(instantrows>1){
                    table.deleteRow(index);
                    }
                    else{
                        alert('THIS IS THE LAST ROW ....');
                    }
                }
             }   
          if(evt.target.classList.contains('copybtn')){
              var index=evt.target.parentNode.parentNode;
             cloneRow(index);
          }
        },false)
   
    //clone function
    function cloneRow(index) {
      var tbod = document.getElementById("tbody");
      var clone = index.cloneNode(true); 
      clone.classList.add("copybtn"); 
      tbod.appendChild(clone); 
        
    }
    //sort function 
    function sort_table(tbody, col, asc){
    var rows = tbody.rows, rlen = rows.length, arr = new Array(), i, j, cells, clen;
   
    for(i = 0; i < rlen; i++){
    cells = rows[i].cells;
    clen = cells.length;
    arr[i] = new Array();
        for(j = 0; j < clen; j++){
        arr[i][j] = cells[j].innerHTML;
            
        }
    }
    arr.sort(function(a, b){
        return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1*asc);
    });
    for(i = 0; i < rlen; i++){
        arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";
    }
    tbody.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";
}
   
    //sorting the headers logika tha mporouse na graftei kai poio genika!
    heads[0].addEventListener("click",function (evt) {
           var thStyle = evt.target.style,
               bgColor = thStyle.backgroundColor;
            thStyle.backgroundColor = (bgColor === 'yellow')? '' : 'yellow';  
         if(thStyle.backgroundColor=='')  {
         sort_table(tbod,0,1);
         }
         else{
             sort_table(tbod,0,-1);
         }
         },false)
    
    heads[1].addEventListener("click",function (evt) {
           var thStyle = evt.target.style,
               bgColor = thStyle.backgroundColor;
            thStyle.backgroundColor = (bgColor === 'yellow')? '' : 'yellow';  
         if(thStyle.backgroundColor=='')  {
         sort_table(tbod,1,1);
         }
         else{
             sort_table(tbod,1,-1);
         }
         },false)
    
    heads[2].addEventListener("click",function (evt) {
           var thStyle = evt.target.style,
               bgColor = thStyle.backgroundColor;
            thStyle.backgroundColor = (bgColor === 'yellow')? '' : 'yellow';  
         if(thStyle.backgroundColor=='')  {
         sort_table(tbod,2,1);
         }
         else{
             sort_table(tbod,2,-1);
         }
         },false)
    
    heads[3].addEventListener("click",function (evt) {
           var thStyle = evt.target.style,
               bgColor = thStyle.backgroundColor;
            thStyle.backgroundColor = (bgColor === 'yellow')? '' : 'yellow';  
         if(thStyle.backgroundColor=='')  {
         sort_table(tbod,3,1);
         }
         else{
             sort_table(tbod,3,-1);
         }
         },false)
     
    //copy image and delete image
    function addclone()  {
    var x = document.createElement("IMG");
    x.setAttribute("src", "clone.svg");
    x.setAttribute("width", "20");
    x.setAttribute("height", "15");
    x.classList.add("copybtn");
    
    return x;
}
    function adddelete() {
    var x = document.createElement("IMG");
    x.setAttribute("src", "icon.svg");
    x.setAttribute("width", "20");
    x.setAttribute("height", "15");
    x.classList.add("deletebtn");
    return x;
}
    
    //min,max,median....
    function Min(index){
        var allmin=new Array();
        for(var i=1; i<table.rows.length-2; i++){
            allmin[i] =parseFloat(table.rows[i].cells[index].querySelector('input').value);
        }
        
        return allmin.reduce(function(a, b) { return Math.min(a, b); });
   }
    function Max(index){
        var allmax=new Array();
        for(var i=1; i<table.rows.length-2; i++){
            allmax[i] =parseFloat(table.rows[i].cells[index].querySelector('input').value);
        }
        
        return allmax.reduce(function(a, b) { return Math.max(a, b); });
   }
    function Avg(index){
        var avg=new Array();
        var sum=0;
        for(var i=1; i<table.rows.length-2; i++){
            avg[i] =parseFloat(table.rows[i].cells[index].querySelector('input').value);
            sum+=avg[i];
        }
        return sum/tbod.rows.length;
    }
    function Median(index){
        var med=new Array();
        var len=table.rows.length-2;
        
        for(var i=1; i<len; i++){
            med[i] =parseFloat(table.rows[i].cells[index].querySelector('input').value);
        }
        var newmed=med.sort();
        if((len/2)%2==1){
            return newmed[(len/2)-1];
        }else{
            return (newmed[((len-1)/2)-1]+newmed[((len+1)/2)-1])/2;
        }
    }
    function Var(index){
        var variance=new Array();
        var v=0;
        var len=table.rows.length-2;
        for(var i=1; i<table.rows.length-2; i++){
            variance[i] =parseFloat(table.rows[i].cells[index].querySelector('input').value);
            v+=parseFloat(Math.pow((variance[i]-Avg(index)),2));
        }
        return parseFloat(v/(len-1));
    }
    function Mode(index){
        var mod=new Array();
        var len=table.rows.length-2;
        
        for(var i=1; i<len; i++){
            mod[i] =parseFloat(table.rows[i].cells[index].querySelector('input').value);
        }
        if (helpermode(mod).length==len-1){
            return 'All Numbers';
        }else{
            return helpermode(mod);
        }
      
    }
   
       function helpermode(array) {
		          if (!array.length) return [];
		            var modeMap = {},
			        maxCount = 0,
			        modes = [];

		            array.forEach(function(val) {
			        if (!modeMap[val]) modeMap[val] = 1;
			       else modeMap[val]++;

			       if (modeMap[val] > maxCount) {
				   modes = [val];
				   maxCount = modeMap[val];
			        }
			      else if (modeMap[val] === maxCount) {
				   modes.push(val);
				   maxCount = modeMap[val];
			      }
		      });
		      return modes;
	        }

}());