document.querySelectorAll(".opt").forEach(element => {
    element.addEventListener("click", () => {
        const tag = element.getAttribute("tag")
        document.querySelectorAll(".sec").forEach(element => {
            if (element.id != tag) {
                element.classList.remove("activate")
            }
            else {
                element.classList.add("activate")
            }
        })
    })
});