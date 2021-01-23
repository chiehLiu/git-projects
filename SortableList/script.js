const draggable_list=document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople =[
    'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

//Store list items
const listItems =[];

console.log(listItems);
let dragStartIndex;

createList();


//Insert list items into DOM
function createList(){

    // 如果不使用展開運算子就會只印出一個陣列包含所有名字而無法迭代
    [...richestPeople]
    .map((a) =>({value:a, sort:Math.random()}))

    // 這邊a.sort後面的sort部分是上面object的屬性不是方法要注意
    .sort((a,b) =>(a.sort-b.sort))
    .map((a) =>a.value)
    .forEach((person, index)=>{
        // console.log(person);

        const listItem = document.createElement('li');

        listItem.setAttribute('data-index',index);

        // 為了讓排名的數字不是從零開始所以給它加一
        listItem.innerHTML = `
        <span class="number">${index+1}</span>
        <div class="draggable" draggable ="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i></div>`;


        listItems.push(listItem);

        // 把剛剛做好的li內容貼到DOM上
        draggable_list.appendChild(listItem);
    })

    // 一次要附上多個事件監聽時可以這樣使用
    addEventListeners();
}




function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });

}

check.addEventListener('click', checkOrder);