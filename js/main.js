var inputName=document.querySelector('#inputName');
var inputURL=document.querySelector('#inputURL');
var submitBtn=document.querySelector('#submitBtn');
var clearBtn=document.querySelector('#clearBtn');
var messName=document.querySelector('#messName');
var messurl=document.querySelector('#messurl');
var linkList=[];
if(localStorage.getItem('linkData')!=null){
      linkList=JSON.parse(localStorage.getItem('linkData'));
     drawData(linkList);
 }

function submitData(){
    if(validationName()==true&&validationURL()==true){
        link={
            name:inputName.value,
            URL:inputURL.value,
        }
        linkList.push(link);
        localStorage.setItem('linkData',JSON.stringify(linkList));
        clearData();
        showData();
    }
     
}
function clearData(){
    inputName.value='';
    inputURL.value='';
    inputURL.classList.remove('is-valid');
    inputName.classList.remove('is-valid');

}
function showData(){
    container='';
    var lastIndex=linkList.length-1;
    container=`
    <tr class="">
                        <td scope="row">${lastIndex+1}</td>
                        <td>${linkList[lastIndex].name}</td>
                        <td><button class="btn btn-warning text-white"><i class="fa-solid fa-eye"></i>
                        <a href="${linkList[lastIndex].URL}" target="_blank">visit</a></button></td>
                        <td><button class="btn btn-danger rounded-3" onclick="deleteData()"><i class="fa-solid fa-trash me-1"></i> Delete</button></td>
                    </tr>
    `
    document.getElementById('tbody').innerHTML+=container;
}
function drawData(list){
    container='';
    for(i=0;i<list.length;i++){
        container+=`
                   <tr class="">
                        <td scope="row">${i+1}</td>
                        <td>${list[i].name}</td>
                        <td><button class="btn btn-warning text-white"><i class="fa-solid fa-eye"></i>
                        <a href="${list[i].URL}" target="_blank">visit</a></button></td>
                        <td><button onclick="deleteData(${i})" class="btn btn-danger rounded-3"><i class="fa-solid fa-trash me-1"></i>Delete</button></td>
                    </tr>
    `
    document.getElementById('tbody').innerHTML=container;
    }
}
function deleteData(index){
    linkList.splice(index,1);
    localStorage.setItem('linkData',JSON.stringify(linkList));
    drawData(linkList);
}
// ///////////////////////

function validationName(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    var validateName=inputName.value;
    if(regex.test(validateName)==true){
        inputName.classList.add('is-valid');
        inputName.classList.remove('is-invalid');
        messName.classList.add('d-none');
        return true;
    }
    else{
        inputName.classList.add('is-invalid');
        inputName.classList.remove('is-valid');
        messName.classList.remove('d-none');
        return false;
    }
}
function validationURL(){
    var regex=/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    var validateURL=inputURL.value;
    if(regex.test(validateURL)==true){
        inputURL.classList.add('is-valid');
        inputURL.classList.remove('is-invalid');
        messurl.classList.add('d-none');
        return true;
    }
    else{
        inputURL.classList.add('is-invalid');
        inputURL.classList.remove('is-valid');
        messurl.classList.remove('d-none');
        return false;
    }
}