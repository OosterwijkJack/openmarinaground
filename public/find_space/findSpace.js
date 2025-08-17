window.onload = function(){
    const urlParams = new URLSearchParams(window.location.search);

    const startDate = urlParams.get('start')
    const endDate = urlParams.get('end')

    console.log(startDate)
    console.log(endDate)
}