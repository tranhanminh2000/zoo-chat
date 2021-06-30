async function randomAnimal(array,username){
    return await new Promise((resolve)=>{
        let newArr = array.map(function(ele){
            return `${ele}.jpg`
        })
    
        let ran = Math.floor(Math.random()* array.length)
        let interval = setInterval(function(){
        let gifRan = Math.floor(Math.random()* newArr.length)
            $('#loginForm img').attr('src', '/static/animal/'+newArr[gifRan])
        },50)
    
        // setTimeout(function(){
        //     clearInterval(interval)
        //     $('#loginForm img').attr('src', '/static/animal/'+newArr[ran])
        //     setTimeout(function(){
        //         $('#loginForm h4').hide(1000)
        //         $('#loginForm #userName').hide(1000)
        //         $('#loginForm #btnRegister').hide(1000)
        //         $('#loginForm img').css('margin-top', '60%')
        //         $('#loginForm h4').html(`(${array[ran]})<br>Hi ${username}<br>Welcome to the ZooChat `)
        //         $('#loginForm h4').show(1000)
        //         setTimeout(function(){
                    
        //         },5000)
        //     }, 1000)
        // },3000)
        resolve(array[ran])
        login()
    }) 
}

function login(){
    $('#sectionLogin').hide()
    $('#sectionChat').css('display', 'flex')
}