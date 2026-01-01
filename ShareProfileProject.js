const modal = document.querySelector(".modal-container");
const overlay = document.querySelector(".overlay");

const openmodal = () =>{
    console.log("modal is now open");
    modal.classList.add("active");
    overlay.classList.add("overlayactive");

}

const closemodal = () =>{
    console.log("modal is now close");
    modal.classList.remove("active");
    overlay.classList.remove("overlayactive");
}