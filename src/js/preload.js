const createPackageObject = () => {
    const packageObj = {}
    for (var i = 0; i < 51; i++) {
        packageObj['bit' + i] = 0;
    }
    return packageObj
}

window.addEventListener('DOMContentLoaded', () => {
    const package = document.getElementById('package')

    for (let index = 0; index < 52; index++) {
        package.innerHTML += `<div class="bitGroup">
                <label class="bitLabel"> BIT ${index} </label>
                <select class="bitSelect" id="bit${index}">
                    <option value="0" selected>0</option>
                    <option value="1">1</option>
                </select>
            </div>`
    }
})