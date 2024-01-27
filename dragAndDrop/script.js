const draggables = document.querySelectorAll(".draggeble");
const containers = document.querySelectorAll(".container");

draggables.forEach(draggable => {

    draggable.addEventListener("dragstart", ()=> {
        draggable.classList.add('dragging');
    })

    draggable.addEventListener('dragend', ()=>{
        draggable.classList.remove('dragging');
    })
})


containers.forEach(container => {

    container.addEventListener('dragover', e=>{
        e.preventDefault(); // by default dropping inside of an element is prevented, this will allow that, and "not allow" cursor is changed inside the the container by doing this.
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging'); // becoz at that time only dragged element is having this class "dragging".
        // container.appendChild(draggable);
        if (afterElement == null) {
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement)
        }
    })
})


function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggeble:not(.dragging)')]
  

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}