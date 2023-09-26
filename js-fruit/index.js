let fruits = [
    {id: 1, title: 'Avocado', price: 20, img: 'https://dobryanka-rus.ru/storage/goods/5201_300x300.jpg'},
    {id: 2, title: 'Banaos', price: 30, img: 'https://cdn.ime.by/UserFiles/images/catalog/Goods/3033/00093033/norm/thumbs/00093033.n_1_140x140@2x.png.webp'},
    {id: 3, title: 'Apple', price: 40, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8XytFRvjh5onhXXooFGePZzTcvYW6dYAvGg&usqp=CAU'}
]

const toHTML = fruit => `
<div class="col">
<div class="card">
    <img class="card-img-top" style="height: 300px;" src="${fruit.img}">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
    </div>
  </div>
</div>
`

function render() {
    const html = fruits.map(toHTML).join('')
 document.querySelector('#fruits').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Price',
    closable: true,
    width: '400px',

    footerButtons:[
    {text: 'Ok', type: 'primary', handler() {
        priceModal.close()
    }},
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)


    if (btnType === 'price') {
        priceModal.setContent(`
        <p>Price of ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)

       priceModal.open() 
    } else if (btnType === 'remove') {
        $.confirm({title: 'Вы уверены?', 
        content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
    }).then(() => {
        fruits = fruits.filter(f => f.id !==id)
        render()
        }).catch(() => {
    console.log('Cancel')
        })
    }
})



