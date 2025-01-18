const text = document.getElementById('tarefa')
const btn = document.getElementById('submit')
const list = document.getElementById('lista')

function createDiv() {
    if (text.value) {
        let newDiv = document.createElement('div')
        let newLi = document.createElement('li')
        let taskOk = document.createElement('input')
        let icon = document.createElement('span')
        let taskKill = document.createElement('button')

        newDiv.id = 'task'
        taskOk.type = 'checkbox'
        icon.className = 'task-icon'
        taskKill.innerText = 'X'
        taskKill.style.color = 'red'
        newLi.innerText = text.value;
        newLi.className = 'container'


        newDiv.appendChild(newLi)
        newDiv.appendChild(taskOk)
        newDiv.appendChild(icon)
        newDiv.appendChild(taskKill)
        list.appendChild(newDiv)

        taskOk.addEventListener('change', function() {
            if (taskOk.checked) {
                icon.innerHTML = '✔️';
                newLi.style.textDecoration = 'line-through'
                newLi.style.color = 'gray'
            } else {
                icon.innerHTML = '';
                newLi.style.textDecoration = 'none';
                newLi.style.color = 'black'
            }
        })
        taskKill.addEventListener('click', removeTask)
    }

    


}


function removeTask(event) {
    let divElement = event.target.parentElement
    divElement.remove()
}

btn.addEventListener('click', createDiv)
