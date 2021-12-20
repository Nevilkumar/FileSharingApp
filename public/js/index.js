const dropzone = document.querySelector('.drop-zone');
const fileinput = document.querySelector('#fileinput');
const browsebtn = document.querySelector('.browsebtn');
const bgprogress = document.querySelector('.bg-progress');
const percentdiv = document.querySelector('#percent');
const progressbar = document.querySelector('.progress-bar');
const progresscontainer = document.querySelector('.progress-container');
const title1 = document.querySelector('#title1');
const fileURL = document.querySelector('#fileURL');
const copy = document.querySelector('.copy');
const sharingcontainer = document.querySelector('.sharing-container');
const toast = document.querySelector('.toast');

const host = 'http://localhost:8000/' ;
const uploadurl = `${host}api/files`;

dropzone.addEventListener("dragover", (e) => {
    
    e.preventDefault();

    if(!dropzone.classList.contains("dragged"))
        dropzone.classList.add("dragged");
});

dropzone.addEventListener("dragleave",(e) => {
    e.preventDefault();
    dropzone.classList.remove("dragged");
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.log(files);
    if(files.length)
    {
        fileinput.files=files;
        uploadFile();
    }
    
});

browsebtn.addEventListener("click", () => {
    fileinput.click();
});

fileinput.addEventListener('change',() => {
    uploadFile();
});

copy.addEventListener("click" , () => {
    fileURL.select();
    document.execCommand("copy");
    toastfunc("Copied!!");
});


const uploadFile = () => {
    progresscontainer.style.display = 'block';
    const file = fileinput.files[0];
    // console.log(file);
    let formdata = new FormData();
    formdata.append("myfile",file);

    // console.log(formdata);
    const xhr = new XMLHttpRequest();

    xhr.open("POST",uploadurl);

    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            title1.innerText = 'Uploaded Sucessfully';
            sharingcontainer.style.display = 'block';
            showlink(JSON.parse(xhr.response));
        }
    };


    xhr.upload.onprogress = updateprogress;
   
    xhr.upload.onerror = () => {
        fileinput.value="";
        toastfunc('Error in upload')
    };


    xhr.send(formdata);
};


const updateprogress = (e) => {

    const percent = Math.round((e.loaded / e.total) * 100);
    bgprogress.style.width = `${percent}%`;
    percentdiv.innerText = percent;
    progressbar.style.width = `${percent}%`;

};

const showlink = ({file}) => {
    fileURL.value = file;
};

let toasttimer;
const toastfunc = (msg) => {

    toast.style.display = 'block';
    toast.innerText = msg;
    toast.style.display = 'block';
    toast.style.opacity = 1;
    clearTimeout(toasttimer);
    toasttimer = setTimeout( () => {
        toast.style.display = 'none';
        toast.style.opacity = '0';
    },2000);
};