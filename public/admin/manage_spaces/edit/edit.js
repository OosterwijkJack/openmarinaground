window.onload = async function(){
    const urlParams = new URLSearchParams(window.location.search);

    const spaceName = urlParams.get('space')

    document.getElementById("spaceName").value= spaceName;

    fetch("/api/spaces/get_by_name", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"name": spaceName})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}