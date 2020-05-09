export default function collapseFunction(){
    var x = document.querySelector(".hideWithCollapse");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
}