let Tasks= []
let idCounter=0
$('.inputform').after(`<p class="text-danger warning">field must not be empty</p>`)
$('.warning').hide()


function countTasks(){
$('.task-counter').html(Tasks.length)
}


$('form').on('submit', (e)=>{
e.preventDefault()
if($('form input').val()!=='')
{   $('.warning').hide()
    idCounter++
Tasks.unshift({task: $('form input').val(), id: idCounter, checked: false});
$('.thebox').prepend(`
<div class="p-3 mt-2 border rounded d-flex taskbox id="${idCounter}">
<div class="form-check">
<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" data-id="${idCounter}">
</div>
<div class="flex-grow-1  thetask" data-id='${idCounter}'>${$('form input').val()}</div>
<div class="text-danger closebtn" data-id='${idCounter}'>X</div>
</div>`)
countTasks()

$('form input').val('')

}
else{
    $('.warning').show()
    setTimeout(()=>{$('.warning').fadeOut()}, 3000)
}
})

$(document).on('click', '.closebtn' ,(e)=>{
    Tasks = Tasks.filter((item) => item.id != $(e.target).data('id'))
    $(e.target).parent().remove()
    countTasks()
})

$(document).on('click', 'input[type="checkbox"]', (e)=>{
    let thetask=$(`.thetask[data-id='${$(e.target).data("id")}']`)
    if(e.target.checked == true){
        thetask.addClass('checked');
        Tasks.find(item=>{
            if(item.id==$(e.target).data("id")){
                item.checked=true
                console.log(Tasks);
            }
        })
    }
    else{
        thetask.removeClass('checked');
        Tasks.find(item=>{
            if(item.id==$(e.target).data("id")){
                item.checked=false
                console.log(Tasks);
            }
        })
    }
})


$('.form-select').on('change', (e)=>{
    if(e.target.value == 'all'){
       $('input[type="checkbox"]').closest('.taskbox').removeClass('d-none')
    }
    else if(e.target.value == 'active'){
       $('input[type="checkbox"]').closest('.taskbox').removeClass('d-none')
       $('input:checked').closest(".taskbox").addClass('d-none')
    }
    else{
        $('input[type="checkbox"]').closest('.taskbox').removeClass('d-none')
        $('input:not(:checked)').closest(".taskbox").addClass('d-none')
    }
})


